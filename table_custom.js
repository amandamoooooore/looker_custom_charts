//ud2

looker.plugins.visualizations.add({
  id: "simple_html_grid_crossfilter",
  label: "Simple Grid (cross-filter + groups + labels + sorting + widths + hide + highlight)",
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

  // conditional formatting parsing + matching
  _parseConditionalFormatting(str) {
    // Returns:
    // {
    //   byField: { [fieldName]: [rule...] },
    //   byIndex: { [colIndexNumber]: [rule...] }
    // }
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

    // (A) Array: [ { field:"x" OR colIndex:1, when:[...rules] }, ... ]
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

    // (B) Object map: { "field.name":[rules], "2":[rules] }  (supports numeric keys)
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
    const colGroups = visibleFields.map(f => groupByField[f.name] || null);

    // ---- Parse column labels JSON (optional) ----
    let labelOverrides = {};
    try {
      labelOverrides = config.column_labels_json
        ? (JSON.parse(config.column_labels_json) || {})
        : {};
    } catch (e) {
      labelOverrides = {};
    }

    // ---- Parse column widths JSON ----
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

    // Parse conditional formatting JSON once
    const conditional = this._parseConditionalFormatting(config.conditional_formatting_json || "");

    // ---- Determine default sort state (only once) ----
    if (!this._sortState && config.enable_sorting !== false && config.default_sort_field) {
      const exists = visibleFields.find(f => f.name === config.default_sort_field);
      if (exists) {
        const dir = (config.default_sort_direction || "asc").toLowerCase() === "desc" ? "desc" : "asc";
        this._sortState = { fieldName: exists.name, direction: dir };
      }
    }

    // ---- Prepare sorted rows (keep original index for filtering) ----
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

    // ---- Build the table HTML ----
    let html = `
      <table class="simple-grid">
        <thead>
    `;

    // ========== GROUP HEADER ROW (top) ==========
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

    // ========== COLUMN HEADER ROW (second sticky row) ==========
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

    // ========== DATA ROWS (sorted) ==========
    rowsWithIndex.forEach(({ row, originalIndex }) => {
      const isSelected = (originalIndex === this._selectedRowIndex);
      const rowStyle = isSelected
        ? `background:${this._escapeHTML(highlightColor)};color:#ffffff;`
        : "";

      html += `<tr style="${rowStyle}">`;

      visibleFields.forEach((field, colIndex) => {
        const raw   = getRaw(row, field.name);
        const disp  = getRendered(row, field.name);
        const safe  = this._escapeHTML(disp);
        const widthStyle = widthStyleFor(field.name);

        // per-cell conditional formatting (field OR colIndex; skipped when row highlighted)
        let conditionalStyle = "";
        if (!isSelected) {
          const rulesByIndex = conditional.byIndex[colIndex] || [];
          const rulesByField = conditional.byField[field.name] || [];
          const rules = rulesByIndex.length ? rulesByIndex : rulesByField;

          const norm = String(disp ?? "").toLowerCase(); // match against what is displayed
          const matched = rules.find(r => this._matchRule(r, norm));
          if (matched) conditionalStyle = this._styleFromRule(matched);
        }

        html += `
          <td
            data-orig-index="${originalIndex}"
            data-field-name="${this._escapeHTML(field.name)}"
            data-col-index="${colIndex}"
            style="
              padding:6px 10px;
              border-bottom:1px solid #f0f0f0;
              cursor:pointer;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
              font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
              font-size:12px;
              font-weight:400;
              color:inherit;
              ${widthStyle}
              ${conditionalStyle}
            ">
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

    // ========== CLICK HANDLER (sorting + cross-filter) ==========
    container.onclick = function (evt) {
      const th = evt.target.closest("th[data-sort-field]");
      const cell = evt.target.closest("td");

      // --- Header click: sorting ---
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

      // --- Cell click: cross-filter ---
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
