looker.plugins.visualizations.add({
  id: "simple_html_grid_crossfilter",
  label: "Simple Grid (cross-filter + formatting)",
  supports: { crossfilter: true },

  options: {
    click_field: {
      label: "Field to filter on (fully qualified name)",
      type: "string",
      default: ""
    },
    rename_columns: {
      label: "Rename Columns (one per line: field_name = New Label)",
      type: "string",
      default: ""
    }
  },

  create(element) {
    element.innerHTML = `
      <div id="simple_grid_container"
           style="
             width:100%;
             height:100%;
             overflow:auto;
             font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
             font-size:13px;
           ">
      </div>
    `;
  },

  _escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  _parseRenameMap(str) {
    const map = new Map();
    if (!str) return map;

    str.split(/\n/).forEach(line => {
      const m = line.split("=");
      if (m.length >= 2) {
        const field = m[0].trim();
        const label = m.slice(1).join("=").trim();
        if (field && label) map.set(field, label);
      }
    });
    return map;
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

    // --- Column rename map ---
    const renameMap = this._parseRenameMap(config.rename_columns);

    // Determine filter field
    let filterFieldName = (config.click_field || "").trim();
    if (!filterFieldName && dims[0]) filterFieldName = dims[0].name;

    const getCell = (row, fieldName) => row[fieldName] || {};
    const getRaw = (row, fieldName) =>
      ("value" in (row[fieldName] || {})) ? row[fieldName].value : null;

    const getRendered = (row, fieldName) => {
      const c = getCell(row, fieldName);
      return c.html ?? c.rendered ?? c.value ?? "";
    };

    let html = `
      <table style="border-collapse:collapse;width:100%;min-width:100%;">
        <thead>
          <tr>
    `;

    // ---- Header row ----
    for (const f of allFields) {
      const original = f.label_short || f.label || f.name;
      const renamed = renameMap.get(f.name) || original;

      html += `
        <th style="
          position:sticky;
          top:0;
          z-index:3;
          background:#111a44;
          color:#fff;
          padding:10px 12px;
          border-bottom:none; /* REMOVE LINE BETWEEN HEADER ROWS */
          text-align:left;
          white-space:nowrap;
          font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
          font-size:14px;
          font-weight:600;
        ">
          ${this._escapeHTML(renamed)}
        </th>
      `;
    }

    html += `
          </tr>
        </thead>
        <tbody>
    `;

    // ---- Data rows ----
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
            style="
              padding:8px 12px;
              border-bottom:1px solid #e5e5ee;
              cursor:pointer;
              white-space:nowrap;
              font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
              font-size:13px;
              font-weight:400;
              color:#222;
            ">
            ${safe}
          </td>
        `;
      });

      html += "</tr>";
    });

    html += `
        </tbody>
      </table>
    `;

    container.innerHTML = html;

    const viz = this;

    // ---- Click handler for cross-filtering ----
    container.onclick = function (evt) {
      const cell = evt.target.closest("td");
      if (!cell) return;
      if (!filterFieldName) return;

      const rowIndex = Number(cell.getAttribute("data-row-index"));
      if (!Number.isInteger(rowIndex) || rowIndex < 0 || rowIndex >= data.length) return;

      const row = data[rowIndex];
      const rawVal = getRaw(row, filterFieldName);
      const formatted = getRendered(row, filterFieldName);

      if (rawVal === null || rawVal === undefined) return;

      viz.trigger("filter", [{
        field: filterFieldName,
        value: String(rawVal),
        formatted: String(formatted)
      }]);
    };

    done();
  }
});
