looker.plugins.visualizations.add({
  id: "simple_html_grid_crossfilter",
  label: "Simple Grid (cross-filter)",
  supports: { crossfilter: true },

  options: {
    click_field: {
      label: "Field to filter on (fully qualified name)",
      type: "string",
      default: "" // if blank, falls back to first dimension
    }
  },

  create(element) {
    // Basic container for the grid
    element.innerHTML = `
      <div id="simple_grid_container"
           style="width:100%;height:100%;overflow:auto;font-family:inherit;font-size:12px;">
      </div>
    `;
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

    // Build the table HTML
    let html = `
      <table style="border-collapse:collapse;width:100%;min-width:100%;">
        <thead>
          <tr>
    `;

    // Header row
    for (const f of allFields) {
      const label = f.label_short || f.label || f.name;
      html += `
        <th style="position:sticky;top:0;background:#111a44;color:#fff;padding:8px 10px;border-bottom:1px solid #e0e0e0;text-align:left;white-space:nowrap;">
          ${this._escapeHTML(label)}
        </th>`;
    }

    html += `
          </tr>
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

      // We always filter on the configured field, using the raw value from that field in this row
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
