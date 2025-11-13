looker.plugins.visualizations.add({
  id: "simple_html_grid_crossfilter",
  label: "Simple Grid (cross-filter + basic formatting)",
  supports: { crossfilter: true },

  options: {
    click_field: {
      label: "Field to filter on (fully qualified name)",
      type: "string",
      default: "" // if blank, falls back to first dimension
    },
    groups_json: {
      label: "Groups JSON (optional)",
      type: "string",
      default: ""
      // Example:
      // [
      //   { "label":"Outcome", "color":"#2ecc71",
      //     "fields":["inventory.sold_price","inventory.is_confirmed"] }
      // ]
    },
    column_labels_json: {
      label: "Column Labels JSON (optional)",
      type: "string",
      default: ""
      // Example:
      // {
      //   "inventory.stock_item_id": "Stock Item ID",
      //   "inventory.dealer_id": "DID"
      // }
    }
  },

  create(element) {
    // Basic container for the grid
    element.innerHTML = `
      <div id="simple_grid_container"
           style="width:100%;height:100%;overflow:auto;font-family:inherit;font-size:12px;">
      </div>
    `;

    // Inject some CSS once (zebra rows, hover)
    if (!document.getElementById("simple_grid_crossfilter_css")) {
      const style = document.createElement("style");
      style.id = "simple_grid_crossfilter_css";
      style.textContent = `
        #simple_grid_container table.simple-grid {
          border-collapse: collapse;
          width: 100%;
          min-width: 100%;
        }
        #simple_grid_container table.simple-grid tbody tr:nth-child(even) {
          background: #f7f8fd;
        }
        #simple_grid_container table.simple-grid tbody tr:hover {
          background: #eef2ff;
        }
      `;
      document.head.appendChild(style);
    }
  },

  /**
   * Safe HTML escape so we don't accidentally inject anything nasty into the table
   */
  _escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  async updateAsync(data, element, config, queryResponse, details, done) {
    const container = document.getElementById("simple_grid_container");

    const fields = queryResponse.fields || {};
    const dims   = fields.dimension_like || [];
    const meas   = fields.measure_like   || [];
    const allFields = [...dims, ...meas];

    if (!allFields.length) {
      container.innerHTML = "<div style='padding:12px;color:#666'>Add some dimensions/measures, then click <b>Run</b>.</div>";
      done();
      return;
    }

    if (!data || !data.length) {
      container.innerHTML = "<div style='padding:12px;color:#666'>No data.</div>";
      done();
      return;
    }

    // Determine which field we’ll filter on when a cell is clicked
    let filterFieldName = (config.click_field || "").trim();
    if (!filterFieldName && dims[0]) {
      filterFieldName = dims[0].name; // default = first dimension
    }

    // Helpers to pull cell values
    const getCell = (row, fieldName) => row[fieldName] || {};
    const getRaw  = (row, fieldName) => {
      const cell = getCell(row, fieldName);
      return ("value" in cell) ? cell.value : null;
    };
    const getRendered = (row, fieldName) => {
      const cell = getCell(row, fieldName);
      return cell.html ?? cell.rendered ?? cell.value ?? "";
    };

    // ---- Parse groups JSON (optional) ----
    let groupByField = {};
    try {
      const parsed = config.groups_json ? JSON.parse(config.groups_json) : [];
      (parsed || []).forEach(g => {
        const label = g.label || g.name || "";
        const color = g.color || "#d9e3f8";
        const fieldsList = g.fields || [];
        fieldsList.forEach(fn => {
          groupByField[fn] = { label, color };
        });
      });
    } catch (e) {
      groupByField = {};
    }
    const colGroups = allFields.map(f => groupByField[f.name] || null);

    // ---- Parse column labels JSON (optional) ----
    let labelOverrides = {};
    try {
      labelOverrides = config.column_labels_json
        ? (JSON.parse(config.column_labels_json) || {})
        : {};
    } catch (e) {
      labelOverrides = {};
    }

    // ---- Build the table HTML ----
    let html = `
      <table class="simple-grid">
        <thead>
    `;

    // Group row (top header)
    html += "<tr>";

    for (let i = 0; i < allFields.length; ) {
      const g = colGroups[i];
      if (!g) {
        // Ungrouped column – single blank cell
        html += `
          <th style="
                position:sticky;
                top:0;
                z-index:2;
                background:#111a44;
                color:#111a44;
                padding:4px 10px;
                border-bottom:1px solid #e0e0e0;
                white-space:nowrap;">
            &nbsp;
          </th>`;
        i++;
        continue;
      }
      let j = i + 1;
      while (j < allFields.length && colGroups[j] && colGroups[j].label === g.label) j++;
      const colspan = j - i;

      html += `
        <th colspan="${colspan}" style="
              position:sticky;
              top:0;
              z-index:3;
              background:${this._escapeHTML(g.color)};
              color:#0b1020;
              padding:6px 10px;
              border-bottom:1px solid #e0e0e0;
              text-align:center;
              white-space:nowrap;">
          ${this._escapeHTML(g.label)}
        </th>`;
      i = j;
    }

    html += "</tr>";

    // Column header row (second sticky header)
    html += "<tr>";
    for (const f of allFields) {
      const override = labelOverrides[f.name];
      const label = override || f.label_short || f.label || f.name;
      html += `
        <th style="
              position:sticky;
              top:26px;
              z-index:4;
              background:#111a44;
              color:#fff;
              padding:6px 10px;
              border-bottom:1px solid #e0e0e0;
              text-align:left;
              white-space:nowrap;">
          ${this._escapeHTML(label)}
        </th>`;
    }
    html += "</tr>";

    html += `
        </thead>
        <tbody>
    `;

    // Data rows
    data.forEach((row, rowIndex) => {
      html += "<tr>";

      allFields.forEach(field => {
        const raw   = getRaw(row, field.name);
        const disp  = getRendered(row, field.name);
        const safe  = this._escapeHTML(disp);

        html += `
          <td
            data-row-index="${rowIndex}"
            data-field-name="${this._escapeHTML(field.name)}"
            data-raw-value="${raw === null || raw === undefined ? "" : this._escapeHTML(String(raw))}"
            style="padding:6px 10px;border-bottom:1px solid #f0f0f0;cursor:pointer;white-space:nowrap;">
            ${safe}
          </td>`;
      });

      html += "</tr>";
    });

    html += `
        </tbody>
      </table>
    `;

    container.innerHTML = html;

    const viz = this;

    // Single click handler on the container – event delegation
    container.onclick = function (evt) {
      const cell = evt.target.closest("td");
      if (!cell) return;
      if (!filterFieldName) return;

      const rowIndex = Number(cell.getAttribute("data-row-index"));
      if (!Number.isInteger(rowIndex) || rowIndex < 0 || rowIndex >= data.length) return;

      const row = data[rowIndex];
      const rawForFilter = getRaw(row, filterFieldName);
      const displayForFilter = getRendered(row, filterFieldName);

      if (rawForFilter === null || rawForFilter === undefined) return;

      viz.trigger("filter", [{
        field:     filterFieldName,
        value:     String(rawForFilter),
        formatted: String(displayForFilter)
      }]);
    };

    done();
  }
});
