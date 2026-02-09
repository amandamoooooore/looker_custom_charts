//fix bar outside slider

looker.plugins.visualizations.add({
  id: "simple_html_grid_crossfilter",
  label: "Simple Grid (cross-filter + groups + labels + sorting + widths + hide + highlight + sliders)",
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
      values: [
        { Ascending: "asc" },
        { Descending: "desc" }
      ],
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
           style="
             width:100%;
             height:100%;
             overflow:auto;
             font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
             font-size:12px;
           ">
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

        /* Slider layout (marker position is calculated against the pill width, not the whole cell) */
        #simple_grid_container .sg-slider-wrap {
          position: relative;
          width: 100%;
          --sg-inset: 18px;            /* left/right inset like your reference */
          padding: 0 var(--sg-inset);  /* creates the inset area */
          box-sizing: border-box;
        }

        #simple_grid_container .sg-slider-track {
          position: relative;
          height: 16px;
          border-radius: 999px;
          overflow: hidden; /* keeps rounded ends perfect */
          background: #e5e7eb;
          box-sizing: border-box;
        }

        #simple_grid_container .sg-slider-fill {
          position: absolute;
          inset: 0;
          border-radius: 999px;
        }

        /* Marker is positioned relative to the track width via calc() */
        #simple_grid_container .sg-slider-marker {
          position: absolute;
          top: -7px;
          height: 30px;
          width: 3px;
          background: #0b1020;
          border-radius: 2px;
          transform: translateX(-50%);
          pointer-events: none;
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
    String(str)
      .split(/[\n,]/)
      .map(s => s.trim())
      .filter(Boolean)
      .forEach(f => set.add(f));
    return set;
  },

  _parseIndexSet(str) {
    const set = new Set();
    if (!str) return set;
    String(str)
      .split(/[\n,]/)
      .map(s => s.trim())
      .filter(Boolean)
      .forEach(x => {
        const n = Number(x);
        if (Number.isInteger(n) && n >= 0) set.add(n);
      });
    return set;
  },

  _toNumberMaybe(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === "number" && Number.isFinite(v)) return v;
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
    const fill = this._sliderColorFor(value);

    /* 
      IMPORTANT: marker left is calculated against the pill width:
      left = inset + (available_width * value/100)
      where available_width = 100% - 2*inset
    */
    const markerLeftCalc = `calc(var(--sg-inset) + (100% - (2 * var(--sg-inset))) * ${value} / 100)`;

    return `
      <div class="sg-slider-wrap">
        <div class="sg-slider-track">
          <div class="sg-slider-fill" style="background:${this._escapeHTML(fill)};"></div>
        </div>
        <div class="sg-slider-marker" style="left:${markerLeftCalc};"></div>
      </div>
    `;
  },

  _parseConditionalFormatting(str) {
    const out = { byField: {}, byIndex: {} };
    if (!str) return out;

    let parsed;
    try {
      parsed = JSON.parse(str);
    } catch (e) {
      return out;
    }

    const addRules = (target, rules) => {
      if (!Array.isArray(rules)) return;
      target.push(...rules.filter(r => r && typeof r === "object"));
    };

    if (Array.isArray(parsed)) {
      parsed.forEach(item => {
        const rules = item?.when;
        if (!Array.isArray(rules)) return;

        if (Number.isInteger(item?.colIndex)) {
          const idx = item.colIndex;
          if (!out.byIndex[idx]) out.byIndex[idx] = [];
          addRules(out.byIndex[idx], rules);
          return;
        }

        if (typeof item?.field === "string") {
          const field = item.field;
          if (!out.byField[field]) out.byField[field] = [];
          addRules(out.byField[field], rules);
        }
      });
      return out;
    }

    if (parsed && typeof parsed === "object") {
      Object.keys(parsed).forEach(k => {
        const rules = parsed[k];
        if (!Array.isArray(rules)) return;

        const maybeIndex = Number(k);
        if (Number.isInteger(maybeIndex) && String(maybeIndex) === k.trim()) {
          if (!out.byIndex[maybeIndex]) out.byIndex[maybeIndex] = [];
          addRules(out.byIndex[maybeIndex], rules);
        } else {
          if (!out.byField[k]) out.byField[k] = [];
          addRules(out.byField[k], rules);
        }
      });
    }

    return out;
  },

  _matchRule(rule, valueStrLower) {
    if (!rule || typeof rule !== "object") return false;
    const has = (k) => Object.prototype.hasOwnProperty.call(rule, k);

    if (has("equals")) {
      return valueStrLower === String(rule.equals).toLowerCase();
    }
    if (has("contains")) {
      return valueStrLower.includes(String(rule.contains).toLowerCase());
    }
    if (has("in") && Array.isArray(rule.in)) {
      return rule.in.map(v => String(v).toLowerCase()).includes(valueStrLower);
    }
    if (has("regex")) {
      try {
        const re = new RegExp(String(rule.regex), rule.regexFlags || "i");
        return re.test(valueStrLower);
      } catch (e) {
        return false;
      }
    }
    return false;
  },

  _styleFromRule(rule) {
    let s = "";
    if (rule.textColor) s += `color:${this._escapeHTML(rule.textColor)};`;
    if (rule.backgroundColor) s += `background:${this._escapeHTML(rule.backgroundColor)};`;
    if (rule.fontWeight) s += `font-weight:${this._escapeHTML(rule.fontWeight)};`;
    if (rule.fontStyle) s += `font-style:${this._escapeHTML(rule.fontStyle)};`;
    return s;
  },

  async updateAsync(data, element, config, queryResponse, details, done) {
    const container = document.getElementById("simple_grid_container");

    this._lastData = data;
    this._lastElement = element;
    this._lastConfig = config;
    this._lastQueryResponse = queryResponse;
    this._lastDetails = details;

    const fields = queryResponse.fields || {};
    const dims   = fields.dimension_like || [];
    const meas   = fields.measure_like   || [];
    const allFields = [...dims, ...meas];

    if (!allFields.length) {
      container.innerHTML =
        "<div style='padding:12px;color:#666'>Add some dimensions/measures, then click <b>Run</b>.</div>";
      done();
      return;
    }

    if (!data || !data.length) {
      container.innerHTML = "<div style='padding:12px;color:#666'>No data.</div>";
      done();
      return;
    }

    const hiddenSet = this._parseHiddenSet(config.hidden_fields || "");
    const visibleFields = allFields.filter(f => !hiddenSet.has(f.name));

    if (!visibleFields.length) {
      container.innerHTML = "<div style='padding:12px;color:#666'>All fields are hidden. Show at least one.</div>";
      done();
      return;
    }

    const sliderIndexSet = this._parseIndexSet(config.slider_columns || "");

    let filterFieldName = (config.click_field || "").trim();
    if (!filterFieldName && dims[0]) filterFieldName = dims[0].name;

    const getCell = (row, fieldName) => row[fieldName] || {};
    const getRaw  = (row, fieldName) => {
      const cell = getCell(row, fieldName);
      return ("value" in cell) ? cell.value : null;
    };
    const getRendered = (row, fieldName) => {
      const cell = getCell(row, fieldName);
      return cell.html ?? cell.rendered ?? cell.value ?? "";
    };

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
    const colGroups = visibleFields.map(f => groupByField[f.name] || null);

    let labelOverrides = {};
    try {
      labelOverrides = config.column_labels_json
        ? (JSON.parse(config.column_labels_json) || {})
        : {};
    } catch (e) {
      labelOverrides = {};
    }

    let widthMap = {};
    try {
      widthMap = config.column_widths_json
        ? (JSON.parse(config.column_widths_json) || {})
        : {};
    } catch (e) {
      widthMap = {};
    }
    const defaultColWidth =
      Number.isFinite(+config.default_column_width) && +config.default_column_width > 0
        ? +config.default_column_width
        : 110;

    const getColWidth = (fieldName) => {
      const w = widthMap[fieldName];
      const n = Number(w);
      if (Number.isFinite(n) && n > 0) return n;
      return defaultColWidth;
    };

    const widthStyleFor = (fieldName) => {
      const w = getColWidth(fieldName);
      return `min-width:${w}px;max-width:${w}px;`;
    };

    const conditional = this._parseConditionalFormatting(config.conditional_formatting_json || "");

    if (!this._sortState && config.enable_sorting !== false && config.default_sort_field) {
      const exists = visibleFields.find(f => f.name === config.default_sort_field);
      if (exists) {
        const dir = (config.default_sort_direction || "asc").toLowerCase() === "desc" ? "desc" : "asc";
        this._sortState = { fieldName: exists.name, direction: dir };
      }
    }

    let rowsWithIndex = data.map((row, originalIndex) => ({ row, originalIndex }));

    if (config.enable_sorting !== false && this._sortState && this._sortState.fieldName) {
      const sortField = this._sortState.fieldName;
      const dir = this._sortState.direction === "desc" ? "desc" : "asc";

      const getSortValue = (row) => {
        const cell = row[sortField];
        if (!cell || !("value" in cell)) return null;
        const v = cell.value;

        if (typeof v === "number") return v;
        const n = Number(v);
        if (!Number.isNaN(n)) return n;
        return String(v).toLowerCase();
      };

      rowsWithIndex.sort((a, b) => {
        const va = getSortValue(a.row);
        const vb = getSortValue(b.row);

        const na = (va === null || va === "");
        const nb = (vb === null || vb === "");
        if (na && nb) return 0;
        if (na) return 1;
        if (nb) return -1;

        if (typeof va === "number" && typeof vb === "number") {
          return dir === "asc" ? va - vb : vb - va;
        }
        return dir === "asc"
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      });
    }

    let html = `
      <table class="simple-grid">
        <thead>
    `;

    html += "<tr>";

    for (let i = 0; i < visibleFields.length; ) {
      const g = colGroups[i];
      if (!g) {
        html += `
          <th style="
                position:sticky;
                top:0;
                z-index:2;
                background:#111a44;
                color:#111a44;
                padding:4px 10px;
                border-bottom:none;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
                font-size:13px;
                font-weight:600;
          ">
            &nbsp;
          </th>`;
        i++;
        continue;
      }

      let j = i + 1;
      while (j < visibleFields.length && colGroups[j] && colGroups[j].label === g.label) j++;
      const colspan = j - i;

      html += `
        <th colspan="${colspan}" style="
              position:sticky;
              top:0;
              z-index:3;
              background:${this._escapeHTML(g.color)};
              color:#0b1020;
              padding:6px 10px;
              border-bottom:none;
              text-align:center;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
              font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
              font-size:13px;
              font-weight:600;
        ">
          ${this._escapeHTML(g.label)}
        </th>`;
      i = j;
    }

    html += "</tr>";

    html += "<tr>";
    for (const f of visibleFields) {
      const override = labelOverrides[f.name];
      let label = override || f.label_short || f.label || f.name;

      if (config.enable_sorting !== false &&
          this._sortState &&
          this._sortState.fieldName === f.name) {
        label += this._sortState.direction === "asc" ? " ▲" : " ▼";
      }

      const cursor = config.enable_sorting === false ? "default" : "pointer";
      const widthStyle = widthStyleFor(f.name);

      html += `
        <th 
          data-sort-field="${this._escapeHTML(f.name)}"
          style="
              position:sticky;
              top:26px;
              z-index:4;
              background:#111a44;
              color:#fff;
              padding:6px 10px;
              border-bottom:1px solid #e0e0e0;
              text-align:left;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
              font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
              font-size:13px;
              font-weight:600;
              cursor:${cursor};
              ${widthStyle}
        ">
          ${this._escapeHTML(label)}
        </th>`;
    }
    html += "</tr>";

    html += `
        </thead>
        <tbody>
    `;

    const highlightColor = (config.highlight_color || "#EB0037").trim() || "#EB0037";

    rowsWithIndex.forEach(({ row, originalIndex }) => {
      const isSelected = (originalIndex === this._selectedRowIndex);
      const rowStyle = isSelected
        ? `background:${this._escapeHTML(highlightColor)};color:#ffffff;`
        : "";

      html += `<tr style="${rowStyle}">`;

      visibleFields.forEach((field, colIndex) => {
        const raw   = getRaw(row, field.name);
        const disp  = getRendered(row, field.name);
        const widthStyle = widthStyleFor(field.name);

        let conditionalStyle = "";
        if (!isSelected) {
          const rulesByIndex = conditional.byIndex[colIndex] || [];
          const rulesByField = conditional.byField[field.name] || [];
          const rules = rulesByIndex.length ? rulesByIndex : rulesByField;

          const norm = String(disp ?? "").toLowerCase();
          const matched = rules.find(r => this._matchRule(r, norm));
          if (matched) conditionalStyle = this._styleFromRule(matched);
        }

        let cellInnerHTML = this._escapeHTML(disp);
        let isSliderCell = false;

        if (sliderIndexSet.has(colIndex)) {
          const n = this._toNumberMaybe(raw ?? disp);
          if (n !== null && n >= 0 && n <= 100) {
            cellInnerHTML = this._renderSliderHTML(Math.round(n));
            isSliderCell = true;
          }
        }

        const paddingStyle = isSliderCell ? "padding:12px 10px;" : "padding:6px 10px;";
        const overflowStyle = isSliderCell ? "overflow:visible;" : "overflow:hidden;";

        html += `
          <td
            data-orig-index="${originalIndex}"
            data-field-name="${this._escapeHTML(field.name)}"
            data-col-index="${colIndex}"
            style="
              ${paddingStyle}
              border-bottom:1px solid #f0f0f0;
              cursor:pointer;
              white-space:nowrap;
              ${overflowStyle}
              text-overflow:ellipsis;
              font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
              font-size:12px;
              font-weight:400;
              color:inherit;
              ${widthStyle}
              ${conditionalStyle}
            ">
            ${cellInnerHTML}
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

    container.onclick = function (evt) {
      const th = evt.target.closest("th[data-sort-field]");
      const cell = evt.target.closest("td");

      if (th && config.enable_sorting !== false) {
        const fieldName = th.getAttribute("data-sort-field");
        if (fieldName) {
          if (!viz._sortState || viz._sortState.fieldName !== fieldName) {
            viz._sortState = { fieldName, direction: "asc" };
          } else {
            viz._sortState.direction =
              viz._sortState.direction === "asc" ? "desc" : "asc";
          }

          if (viz._lastData && viz._lastElement && viz._lastQueryResponse) {
            viz.updateAsync(
              viz._lastData,
              viz._lastElement,
              viz._lastConfig,
              viz._lastQueryResponse,
              viz._lastDetails || {},
              function () {}
            );
          }
        }
        return;
      }

      if (!cell) return;
      if (!filterFieldName) return;

      const origIndex = Number(cell.getAttribute("data-orig-index"));
      if (!Number.isInteger(origIndex) || origIndex < 0 || origIndex >= (viz._lastData || []).length) return;

      viz._selectedRowIndex = origIndex;

      const row = viz._lastData[origIndex];
      const getCell = (r, fieldName) => r[fieldName] || {};
      const getRaw  = (r, fieldName) => {
        const c = getCell(r, fieldName);
        return ("value" in c) ? c.value : null;
      };
      const getRendered = (r, fieldName) => {
        const c = getCell(r, fieldName);
        return c.html ?? c.rendered ?? c.value ?? "";
      };

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
