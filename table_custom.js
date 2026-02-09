//with slider no number

looker.plugins.visualizations.add({
  id: "simple_html_grid_crossfilter",
  label: "Simple Grid (cross-filter + groups + labels + sorting + widths + hide + highlight + sliders)",
  supports: { crossfilter: true },

  options: {
    click_field: {
      label: "Field to filter on (fully qualified name)",
      type: "string",
      default: ""
    },
    groups_json: {
      label: "Groups JSON (optional)",
      type: "string",
      default: ""
    },
    column_labels_json: {
      label: "Column Labels JSON (optional)",
      type: "string",
      default: ""
    },
    enable_sorting: {
      label: "Enable column sorting",
      type: "boolean",
      default: true
    },
    default_sort_field: {
      label: "Default sort field (fully qualified name)",
      type: "string",
      default: ""
    },
    default_sort_direction: {
      label: "Default sort direction",
      type: "string",
      display: "select",
      values: [{ Ascending: "asc" }, { Descending: "desc" }],
      default: "asc"
    },
    default_column_width: {
      label: "Default column width (px)",
      type: "number",
      default: 110
    },
    column_widths_json: {
      label: "Column Widths JSON (field: width_px)",
      type: "string",
      default: ""
    },
    hidden_fields: {
      label: "Hidden fields (comma/newline separated)",
      type: "string",
      default: ""
    },
    highlight_color: {
      label: "Selected Row Highlight Color",
      type: "string",
      default: "#EB0037"
    },
    conditional_formatting_json: {
      label: "Conditional Formatting JSON (optional)",
      type: "string",
      default: ""
    },
    slider_columns: {
      label: "Slider columns (0-based visible column indexes; comma/newline separated)",
      type: "string",
      default: ""
    }
  },

  _sortState: null,
  _selectedRowIndex: null,

  create(element) {
    element.innerHTML = `
      <div id="simple_grid_container"
           style="width:100%;height:100%;overflow:auto;font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;">
      </div>
    `;

    if (!document.getElementById("simple_grid_crossfilter_css")) {
      const style = document.createElement("style");
      style.id = "simple_grid_crossfilter_css";
      style.textContent = `
        #simple_grid_container table.simple-grid {
          border-collapse: collapse;
          width: 100%;
        }
        #simple_grid_container table.simple-grid tbody tr:nth-child(even) {
          background: #f7f8fd;
        }
        #simple_grid_container table.simple-grid tbody tr:hover {
          background: #eef2ff;
        }

        #simple_grid_container .sg-slider {
          position: relative;
          height: 14px;
          width: 100%;
          min-width: 120px;
          border-radius: 999px;
          overflow: hidden;
          background: #e5e7eb;
        }
        #simple_grid_container .sg-slider-fill {
          position: absolute;
          inset: 0;
          border-radius: 999px;
        }
        #simple_grid_container .sg-slider-marker {
          position: absolute;
          top: -6px;
          height: 26px;
          width: 3px;
          background: #0b1020;
          border-radius: 2px;
          transform: translateX(-1px);
        }
        #simple_grid_container .sg-slider.sg-zero {
          background: #e5e7eb;
        }
      `;
      document.head.appendChild(style);
    }
  },

  _escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  _parseHiddenSet(str) {
    const set = new Set();
    if (!str) return set;
    String(str).split(/[\n,]/).map(s => s.trim()).filter(Boolean).forEach(f => set.add(f));
    return set;
  },

  _parseIndexSet(str) {
    const set = new Set();
    if (!str) return set;
    String(str).split(/[\n,]/).map(s => s.trim()).filter(Boolean).forEach(v => {
      const n = Number(v);
      if (Number.isInteger(n) && n >= 0) set.add(n);
    });
    return set;
  },

  _toNumberMaybe(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  },

  _sliderColorFor(v) {
    if (v === 0) return "#e5e7eb";
    if (v <= 33) return "#ff3b30";
    if (v <= 66) return "#fbbc04";
    return "#34c759";
  },

  _renderSliderHTML(v) {
    const value = Math.max(0, Math.min(100, v));
    const color = this._sliderColorFor(value);
    const fill = value === 0 ? "#e5e7eb" : color;

    return `
      <div class="sg-slider ${value === 0 ? "sg-zero" : ""}">
        <div class="sg-slider-fill" style="background:${fill};"></div>
        <div class="sg-slider-marker" style="left:${value}%;"></div>
      </div>
    `;
  },

  async updateAsync(data, element, config, queryResponse, details, done) {
    const container = document.getElementById("simple_grid_container");

    const fields = queryResponse.fields || {};
    const allFields = [...(fields.dimension_like || []), ...(fields.measure_like || [])];

    const hiddenSet = this._parseHiddenSet(config.hidden_fields);
    const visibleFields = allFields.filter(f => !hiddenSet.has(f.name));
    const sliderIndexSet = this._parseIndexSet(config.slider_columns);

    let html = `<table class="simple-grid"><thead><tr>`;
    visibleFields.forEach(f => {
      html += `<th style="background:#111a44;color:#fff;padding:6px 10px;position:sticky;top:0;">${this._escapeHTML(f.label || f.name)}</th>`;
    });
    html += `</tr></thead><tbody>`;

    data.forEach((row, rIdx) => {
      html += `<tr>`;
      visibleFields.forEach((f, cIdx) => {
        const cell = row[f.name] || {};
        const raw = cell.value ?? cell.rendered ?? "";
        let content = this._escapeHTML(raw);

        if (sliderIndexSet.has(cIdx)) {
          const n = this._toNumberMaybe(raw);
          if (n !== null && n >= 0 && n <= 100) {
            content = this._renderSliderHTML(Math.round(n));
          }
        }

        html += `<td style="padding:6px 10px;">${content}</td>`;
      });
      html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
    done();
  }
});
