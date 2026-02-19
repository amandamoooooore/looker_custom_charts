//with tile functionality and row filter

looker.plugins.visualizations.add({
    id: "simple_html_grid_crossfilter",
    label: "Simple Grid (tiles constant + local table filtering)",
    supports: {crossfilter: true},

    options: {
        click_field: {
            label: "Row click: field to filter on locally (fully qualified name)",
            type: "string",
            default: "",
            section: "Behaviour"
        },
        groups_json: {label: "Groups JSON (optional)", type: "string", default: "", section: "Behaviour"},
        column_labels_json: {label: "Column Labels JSON (optional)", type: "string", default: "", section: "Behaviour"},
        column_order_json: {
            label: "Column Order JSON (0-based visible indexes; e.g. [0,1,6,2,3])",
            type: "string",
            default: "",
            section: "Behaviour"
        },
        enable_sorting: {label: "Enable column sorting", type: "boolean", default: true, section: "Behaviour"},
        default_sort_field: {label: "Default sort field (fully qualified name)", type: "string", default: "", section: "Behaviour"},
        default_sort_direction: {
            label: "Default sort direction",
            type: "string",
            display: "select",
            values: [{Ascending: "asc"}, {Descending: "desc"}],
            default: "asc",
            section: "Behaviour"
        },
        default_column_width: {label: "Default column width (px)", type: "number", default: 110, section: "Appearance"},
        column_widths_json: {label: "Column Widths JSON (field: width_px)", type: "string", default: "", section: "Appearance"},
        hidden_fields: {label: "Hidden fields (comma/newline separated)", type: "string", default: "", section: "Appearance"},
        highlight_color: {label: "Selected Row Highlight Color", type: "string", default: "#EB0037", section: "Appearance"},
        conditional_formatting_json: {label: "Conditional Formatting JSON (optional)", type: "string", default: "", section: "Appearance"},
        slider_columns: {
            label: "Slider columns (0-based visible column indexes; comma/newline separated)",
            type: "string",
            default: "",
            section: "Appearance"
        },

        yes_no_pill_columns: {
            label: "Yes/No Pill columns (0-based visible indexes; JSON array e.g. [2,4,5,6])",
            type: "string",
            default: "[]",
            section: "Appearance"
        },

        info_icon_columns: {
            label: "Info icon columns (0-based visible indexes; JSON array e.g. [1,3])",
            type: "string",
            default: "[]",
            section: "Tooltips"
        },
        info_icon_tooltips_json: {
            label: "Info icon tooltips JSON (keys: colIndex or field name). Value can be literal text OR a field name OR {\"field\":\"view.hidden_field\"}.",
            type: "string",
            default: "{}",
            section: "Tooltips"
        },

        pill_tooltip_columns: {
            label: "Pill tooltip columns (0-based visible column indexes; JSON array e.g. [2,4])",
            type: "string",
            default: "[]",
            section: "Tooltips"
        },
        pill_tooltips_json: {
            label: "Pill tooltips JSON. Keys: colIndex or field name. Value can be string or {\"yes\":\"...\",\"no\":\"...\"}.",
            type: "string",
            default: "{}",
            section: "Tooltips"
        },

        tiles_json: {
            label:
                "Tiles JSON. Supports colIndex (visible index) or field (fully qualified). condition:\"\" = clear. Example: [{\"colIndex\":2,\"condition\":\"Yes\",\"pre_text\":\"AT helped with \",\"post_text\":\" of these sales\"}]",
            type: "string",
            default: "[]",
            section: "Behaviour"
        }
    },

    _sortState: null,
    _selectedRowIndex: null,
    _activeLocalFilters: new Map(),

    _lastData: null,
    _lastElement: null,
    _lastConfig: null,
    _lastQueryResponse: null,
    _lastDetails: null,

    _tooltipEl: null,
    _tooltipTarget: null,

    _forceRerender() {
        if (this._lastData && this._lastElement && this._lastConfig && this._lastQueryResponse) {
            this.updateAsync(
                this._lastData,
                this._lastElement,
                this._lastConfig,
                this._lastQueryResponse,
                this._lastDetails || {},
                function () {
                }
            );
        }
    },

    create(element) {
        element.innerHTML = `
      <div id="simple_grid_root"
           style="width:100%;height:100%;overflow:auto;font-family:'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <div id="sg_tiles" style="padding:18px 16px 40px 16px;"></div>
        <div id="simple_grid_container" style="padding:0 16px 16px 16px; font-size:12px;"></div>
        <div class="sg-tooltip" id="sg_tooltip"></div>
      </div>
    `;

        // tooltip element
        this._tooltipEl = element.querySelector("#sg_tooltip");

        // fast tooltip (no delay) using event delegation
        const root = element.querySelector("#simple_grid_root");
        root.addEventListener("mousemove", (e) => {
            if (!this._tooltipEl || !this._tooltipTarget) return;
            this._positionTooltip(e.clientX, e.clientY);
        });

        root.addEventListener("mouseover", (e) => {
            const t = e.target?.closest?.("[data-sg-tip]");
            if (!t) return;
            const tip = t.getAttribute("data-sg-tip");
            if (!tip) return;

            this._tooltipTarget = t;
            this._showTooltip(tip, e.clientX, e.clientY);
        });

        root.addEventListener("mouseout", (e) => {
            if (!this._tooltipTarget) return;
            const leaving = e.target?.closest?.("[data-sg-tip]");
            const entering = e.relatedTarget?.closest?.("[data-sg-tip]");
            if (leaving && entering === leaving) return;

            this._tooltipTarget = null;
            this._hideTooltip();
        });

        if (!document.getElementById("simple_grid_crossfilter_css")) {
            const style = document.createElement("style");
            style.id = "simple_grid_crossfilter_css";
            style.textContent = `
        /* --- tiles --- */
        
        #sg_tiles .sg-tiles-wrap{
          display:flex;
          justify-content:center;
          align-items:stretch;
          gap:20px;
          flex-wrap:wrap;
        }
        #sg_tiles .sg-tile{
          width:180px;
          min-height:92px;
          border:2px solid #111a44;
          border-radius:2px;
          display:flex;
          align-items:center;
          justify-content:center;
          text-align:center;
          padding:10px 10px;
          box-sizing:border-box;
          background:#fff;
          user-select:none;
        }
        #sg_tiles .sg-tile .sg-tile-text{
          font-size:14px;
          line-height:1.25;
          color:#0b1020;
          font-weight:400;
        }
        #sg_tiles .sg-tile .sg-tile-number{ font-weight:800; }
        #sg_tiles .sg-tile.sg-clickable{ cursor:pointer; }
        #sg_tiles .sg-tile.sg-clickable:hover{ box-shadow:0 2px 10px rgba(0,0,0,0.08); }

        /* --- table --- */
        #simple_grid_container table.simple-grid { border-collapse: collapse; width: 100%; }
        #simple_grid_container table.simple-grid tbody tr:nth-child(even) { background: #f7f8fd; }
        #simple_grid_container table.simple-grid tbody tr:hover { background: #eef2ff; }

        /* sliders */
        #simple_grid_container .sg-slider-wrap {
          position: relative;
          width: 100%;
          --sg-inset: 18px;
          padding: 0 var(--sg-inset);
          box-sizing: border-box;
        }
        #simple_grid_container .sg-slider-track {
          position: relative;
          height: 16px;
          border-radius: 999px;
          overflow: hidden;
          background: #e5e7eb;
          box-sizing: border-box;
        }
        #simple_grid_container .sg-slider-fill {
          position: absolute;
          inset: 0;
          border-radius: 999px;
        }
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

        /* YES/NO pills (match slider height: 16px) */
        #simple_grid_container .sg-pill{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          height:14px;
          padding:2px 18px;
          border-radius:999px;
          font-size:11px;
          font-weight:800;
          letter-spacing:0.5px;
          text-transform:uppercase;
          line-height:16px;
          white-space:nowrap;
        }
        #simple_grid_container .sg-pill.sg-pill-yes{ background:#22c55e; color:#fff; }
        #simple_grid_container .sg-pill.sg-pill-no { background:#ef4444; color:#fff; }

        /* center align ALL body cells */
        #simple_grid_container table.simple-grid tbody td { text-align: center !important; }

        /* info icon */
        #simple_grid_container .sg-cell-with-addon{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
        }
        #simple_grid_container .sg-info-icon{
          width:16px;
          height:16px;
          border-radius:999px;
          border:2px solid #0b1020;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          font-size:12px;
          font-weight:900;
          line-height:1;
          color:#0b1020;
          background:#fff;
          flex:0 0 auto;
          cursor: pointer;
        }
        
        #simple_grid_root{
          padding: 40px 0px 0px 0px;
        }

        /* Custom tooltip (fast) */
        #simple_grid_root .sg-tooltip{
          position: fixed;
          z-index: 999999;
          display: none;
          max-width: 360px;
          padding: 8px 10px;
          border-radius: 6px;
          background: rgba(17, 26, 68, 0.96);
          color: #fff;
          font-size: 12px;
          line-height: 1.25;
          box-shadow: 0 10px 25px rgba(0,0,0,0.18);
          pointer-events: none;
          white-space: normal;
        }
      `;
            document.head.appendChild(style);
        }
    },

    _showTooltip(text, x, y) {
        if (!this._tooltipEl) return;
        this._tooltipEl.textContent = String(text);
        this._tooltipEl.style.display = "block";
        this._positionTooltip(x, y);
    },

    _positionTooltip(x, y) {
        if (!this._tooltipEl) return;

        const pad = 12;
        let left = x + pad;
        let top = y + pad;

        // keep on screen
        const rect = this._tooltipEl.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (left + rect.width + 8 > vw) left = Math.max(8, x - rect.width - pad);
        if (top + rect.height + 8 > vh) top = Math.max(8, y - rect.height - pad);

        this._tooltipEl.style.left = `${left}px`;
        this._tooltipEl.style.top = `${top}px`;
    },

    _hideTooltip() {
        if (!this._tooltipEl) return;
        this._tooltipEl.style.display = "none";
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

    _parseJsonIndexSet(str) {
        const set = new Set();
        const s = (str || "").trim();
        if (!s) return set;
        try {
            const arr = JSON.parse(s);
            if (!Array.isArray(arr)) return set;
            arr.forEach(x => {
                const n = Number(x);
                if (Number.isInteger(n) && n >= 0) set.add(n);
            });
        } catch (e) {
        }
        return set;
    },

    _parseJsonObject(str) {
        const s = (str || "").trim();
        if (!s) return {};
        try {
            const obj = JSON.parse(s);
            return (obj && typeof obj === "object" && !Array.isArray(obj)) ? obj : {};
        } catch (e) {
            return {};
        }
    },

    _applyColumnOrder(visibleFields, orderJsonStr) {
        const s = (orderJsonStr || "").trim();
        if (!s) return visibleFields;

        let arr;
        try {
            arr = JSON.parse(s);
        } catch (e) {
            return visibleFields;
        }
        if (!Array.isArray(arr)) return visibleFields;

        const used = new Set();
        const ordered = [];

        for (const idx of arr) {
            const n = Number(idx);
            if (!Number.isInteger(n)) continue;
            if (n < 0 || n >= visibleFields.length) continue;
            if (used.has(n)) continue;
            used.add(n);
            ordered.push(visibleFields[n]);
        }
        for (let i = 0; i < visibleFields.length; i++) {
            if (!used.has(i)) ordered.push(visibleFields[i]);
        }
        return ordered;
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
        const markerLeftCalc = `calc(var(--sg-inset) + (100% - (2 * var(--sg-inset))) * ${value} / 100)`;

        const markerHTML = value > 0
            ? `<div class="sg-slider-marker" style="left:${markerLeftCalc};"></div>`
            : "";

        return `
      <div class="sg-slider-wrap">
        <div class="sg-slider-track">
          <div class="sg-slider-fill" style="background:${this._escapeHTML(fill)};"></div>
        </div>
        ${markerHTML}
      </div>
    `;
    },

    // YES/NO pill with FAST tooltip via data-sg-tip (NOT title)
    _renderYesNoPillHTML(value, tooltipText) {
        const v = String(value ?? "").trim().toLowerCase();

        const tipAttr = tooltipText
            ? ` data-sg-tip="${this._escapeHTML(tooltipText)}"`
            : "";

        if (v === "yes" || v === "y" || v === "true") {
            return `<span class="sg-pill sg-pill-yes"${tipAttr}>YES</span>`;
        }

        if (v === "no" || v === "n" || v === "false") {
            return `<span class="sg-pill sg-pill-no"${tipAttr}>NO</span>`;
        }

        return null;
    },

    // resolves tooltip spec that can be:
    // - string literal
    // - string field reference (hidden field is OK)
    // - object: { field: "view.hidden_field" } or { text: "literal" }
    _resolveTooltipFromSpec({spec, row, getRendered, getRaw}) {
        if (spec === null || spec === undefined) return "";

        if (typeof spec === "object" && !Array.isArray(spec)) {
            const fieldRef = (typeof spec.field === "string") ? spec.field.trim() : "";
            if (fieldRef && row && row[fieldRef]) {
                const rendered = getRendered(row, fieldRef);
                if (rendered !== null && rendered !== undefined && String(rendered).trim() !== "") return String(rendered);
                const raw = getRaw(row, fieldRef);
                if (raw !== null && raw !== undefined && String(raw).trim() !== "") return String(raw);
                return "";
            }
            if (typeof spec.text === "string") return spec.text;
            return "";
        }

        if (typeof spec === "string") {
            const s = spec.trim();
            if (!s) return "";
            if (row && row[s]) {
                const rendered = getRendered(row, s);
                if (rendered !== null && rendered !== undefined && String(rendered).trim() !== "") return String(rendered);
                const raw = getRaw(row, s);
                if (raw !== null && raw !== undefined && String(raw).trim() !== "") return String(raw);
                return "";
            }
            return s;
        }

        return "";
    },

    // Pill tooltips: supports string or {yes/no}
    _resolvePillTooltip({tooltipsObj, colIndex, fieldName, rawValue, row, getRendered, getRaw}) {
        if (!tooltipsObj) return "";

        const byIndex = tooltipsObj[String(colIndex)];
        const byField = tooltipsObj[fieldName];
        const chosen = (byIndex !== undefined) ? byIndex : byField;

        if (chosen === undefined || chosen === null) return "";

        // string = literal tooltip OR field reference
        if (typeof chosen === "string") {
            const s = chosen.trim();
            if (!s) return "";
            if (row && row[s]) {
                const rendered = getRendered(row, s);
                if (rendered !== null && rendered !== undefined && String(rendered).trim() !== "") return String(rendered);
                const raw = getRaw(row, s);
                if (raw !== null && raw !== undefined && String(raw).trim() !== "") return String(raw);
                return "";
            }
            return s; // literal
        }

        // object forms:
        if (typeof chosen === "object" && !Array.isArray(chosen)) {
            // NEW: { field: "view.hidden_field" } or { text: "literal" }
            if (typeof chosen.field === "string" && chosen.field.trim()) {
                const f = chosen.field.trim();
                if (row && row[f]) {
                    const rendered = getRendered(row, f);
                    if (rendered !== null && rendered !== undefined && String(rendered).trim() !== "") return String(rendered);
                    const raw = getRaw(row, f);
                    if (raw !== null && raw !== undefined && String(raw).trim() !== "") return String(raw);
                }
                return "";
            }
            if (typeof chosen.text === "string") return chosen.text;

            // existing: { yes:"...", no:"..." }
            const v = String(rawValue ?? "").trim().toLowerCase();
            const isYes = (v === "yes" || v === "y" || v === "true");
            const isNo = (v === "no" || v === "n" || v === "false");
            if (isYes) return (typeof chosen.yes === "string") ? chosen.yes : "";
            if (isNo) return (typeof chosen.no === "string") ? chosen.no : "";
        }

        return "";
    },

    // ---------- Tiles ----------
    _parseTilesJson(str) {
        const s = (str || "").trim();
        if (!s) return [];
        try {
            const arr = JSON.parse(s);
            if (!Array.isArray(arr)) return [];
            return arr
                .filter(t => t && typeof t === "object")
                .map(t => ({
                    field: typeof t.field === "string" ? t.field.trim() : "",
                    colIndex: Number.isInteger(t.colIndex) ? t.colIndex : null,
                    condition: (t.condition ?? "").toString(),
                    pre_text: (t.pre_text ?? "").toString(),
                    post_text: (t.post_text ?? "").toString()
                }))
                .filter(t => t.field || (t.colIndex !== null && t.colIndex >= 0));
        } catch (e) {
            return [];
        }
    },

    _computeTileCount(tile, visibleFields, allRowsWithIndex, getRaw) {
        const fieldName = tile.field || (visibleFields[tile.colIndex]?.name);
        if (!fieldName) return {count: 0, fieldName: null};

        const cond = tile.condition;
        if (!cond) return {count: allRowsWithIndex.length, fieldName};

        let count = 0;
        for (const {row} of allRowsWithIndex) {
            const raw = getRaw(row, fieldName);
            if (raw === null || raw === undefined) continue;
            if (String(raw) === cond) count++;
        }
        return {count, fieldName};
    },

    _setLocalFilter(fieldName, valueStr) {
        this._activeLocalFilters.clear();
        this._selectedRowIndex = null;
        this._activeLocalFilters.set(fieldName, String(valueStr));
    },

    _clearLocalFilters() {
        this._activeLocalFilters.clear();
        this._selectedRowIndex = null;
    },

    _renderTiles(tilesEl, tiles, visibleFields, allRowsWithIndex, getRaw) {
        if (!tilesEl) return;
        if (!tiles.length) {
            tilesEl.innerHTML = "";
            return;
        }

        const wrap = document.createElement("div");
        wrap.className = "sg-tiles-wrap";

        tiles.forEach((t) => {
            const {count, fieldName} = this._computeTileCount(t, visibleFields, allRowsWithIndex, getRaw);
            const isClearTile = !t.condition;
            const clickable = isClearTile || (!!fieldName && !!t.condition);

            const tileEl = document.createElement("div");
            tileEl.className = "sg-tile" + (clickable ? " sg-clickable" : "");
            tileEl.innerHTML = `
        <div class="sg-tile-text">
          ${this._escapeHTML(t.pre_text)}
          <span class="sg-tile-number">${this._escapeHTML(count)}</span>
          ${this._escapeHTML(t.post_text)}
        </div>
      `;

            if (clickable) {
                tileEl.addEventListener("click", (e) => {
                    e.stopPropagation();

                    if (isClearTile) {
                        this._clearLocalFilters();
                        this._forceRerender();
                        return;
                    }

                    this._setLocalFilter(fieldName, t.condition);
                    this._forceRerender();
                });
            }

            wrap.appendChild(tileEl);
        });

        tilesEl.innerHTML = "";
        tilesEl.appendChild(wrap);
    },

    // ---------- Main ----------
    async updateAsync(data, element, config, queryResponse, details, done) {
        const container = document.getElementById("simple_grid_container");
        const tilesEl = document.getElementById("sg_tiles");

        this._lastData = data;
        this._lastElement = element;
        this._lastConfig = config;
        this._lastQueryResponse = queryResponse;
        this._lastDetails = details;

        const fields = queryResponse.fields || {};
        const dims = fields.dimension_like || [];
        const meas = fields.measure_like || [];

        // Row click -> dashboard filter field (fallback to first dimension)
        let filterFieldName = (config.click_field || "").trim();
        if (!filterFieldName && dims[0]) filterFieldName = dims[0].name;

        const allFields = [...dims, ...meas];

        if (!allFields.length) {
            tilesEl.innerHTML = "";
            container.innerHTML = "<div style='padding:12px;color:#666'>Add some dimensions/measures, then click <b>Run</b>.</div>";
            done();
            return;
        }

        if (!data || !data.length) {
            tilesEl.innerHTML = "";
            container.innerHTML = "<div style='padding:12px;color:#666'>No data.</div>";
            done();
            return;
        }

        const hiddenSet = this._parseHiddenSet(config.hidden_fields || "");
        let visibleFields = allFields.filter(f => !hiddenSet.has(f.name));

        if (!visibleFields.length) {
            tilesEl.innerHTML = "";
            container.innerHTML = "<div style='padding:12px;color:#666'>All fields are hidden. Show at least one.</div>";
            done();
            return;
        }

        visibleFields = this._applyColumnOrder(visibleFields, config.column_order_json);

        const sliderIndexSet = this._parseIndexSet(config.slider_columns || "");
        const yesNoPillIndexSet = this._parseJsonIndexSet(config.yes_no_pill_columns || "[]");

        const infoIconIndexSet = this._parseJsonIndexSet(config.info_icon_columns || "[]");
        const pillTooltipIndexSet = this._parseJsonIndexSet(config.pill_tooltip_columns || "[]");

        const infoIconTooltipsObj = this._parseJsonObject(config.info_icon_tooltips_json || "{}");
        const pillTooltipsObj = this._parseJsonObject(config.pill_tooltips_json || "{}");

        const getCell = (row, fieldName) => row[fieldName] || {};
        const getRaw = (row, fieldName) => {
            const cell = getCell(row, fieldName);
            return ("value" in cell) ? cell.value : null;
        };
        const getRendered = (row, fieldName) => {
            const cell = getCell(row, fieldName);
            return cell.html ?? cell.rendered ?? cell.value ?? "";
        };

        const allRowsWithIndex = data.map((row, originalIndex) => ({row, originalIndex}));

        // tiles (constant counts)
        const tiles = this._parseTilesJson(config.tiles_json);
        this._renderTiles(tilesEl, tiles, visibleFields, allRowsWithIndex, getRaw);

        // table rows (local filter applies only here)
        let rowsWithIndex = allRowsWithIndex;
        if (this._activeLocalFilters.size) {
            rowsWithIndex = rowsWithIndex.filter(({row}) => {
                for (const [fname, val] of this._activeLocalFilters.entries()) {
                    const raw = getRaw(row, fname);
                    if (raw === null || raw === undefined) return false;
                    if (String(raw) !== val) return false;
                }
                return true;
            });
        }

        // labels
        let labelOverrides = {};
        try {
            labelOverrides = config.column_labels_json ? (JSON.parse(config.column_labels_json) || {}) : {};
        } catch (e) {
            labelOverrides = {};
        }

        // widths
        let widthMap = {};
        try {
            widthMap = config.column_widths_json ? (JSON.parse(config.column_widths_json) || {}) : {};
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

        // init default sort
        if (!this._sortState && config.enable_sorting !== false && config.default_sort_field) {
            const exists = visibleFields.find(f => f.name === config.default_sort_field);
            if (exists) {
                const dir = (config.default_sort_direction || "asc").toLowerCase() === "desc" ? "desc" : "asc";
                this._sortState = {fieldName: exists.name, direction: dir};
            }
        }

        // sorting
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

            rowsWithIndex = [...rowsWithIndex].sort((a, b) => {
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

        // render table
        let html = `<table class="simple-grid"><thead><tr>`;

        for (const f of visibleFields) {
            const override = labelOverrides[f.name];
            let label = override || f.label_short || f.label || f.name;

            if (config.enable_sorting !== false && this._sortState && this._sortState.fieldName === f.name) {
                label += this._sortState.direction === "asc" ? " ▲" : " ▼";
            }

            const cursor = config.enable_sorting === false ? "default" : "pointer";
            const widthStyle = widthStyleFor(f.name);

            html += `
        <th data-sort-field="${this._escapeHTML(f.name)}"
          style="position:sticky;top:0;z-index:4;background:#111a44;color:#fff;
                 padding:6px 10px;border-bottom:1px solid #e0e0e0;text-align:center;
                 white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px;font-weight:600;
                 cursor:${cursor};${widthStyle}">
          ${this._escapeHTML(label)}
        </th>`;
        }
        html += `</tr></thead><tbody>`;

        const highlightColor = (config.highlight_color || "#EB0037").trim() || "#EB0037";

        rowsWithIndex.forEach(({row, originalIndex}) => {
            const isSelected = (originalIndex === this._selectedRowIndex);
            const rowStyle = isSelected ? `background:${this._escapeHTML(highlightColor)};color:#ffffff;` : "";
            html += `<tr style="${rowStyle}">`;

            visibleFields.forEach((field, colIndex) => {
                const raw = getRaw(row, field.name);
                const disp = getRendered(row, field.name);
                const widthStyle = widthStyleFor(field.name);

                let cellInnerHTML = this._escapeHTML(disp);
                let isSliderCell = false;

                // pill rendering + pill tooltip (FAST via data-sg-tip)
                if (yesNoPillIndexSet.has(colIndex)) {
                    const pillTip = pillTooltipIndexSet.has(colIndex)
                        ? this._resolvePillTooltip({
                            tooltipsObj: pillTooltipsObj,
                            colIndex,
                            fieldName: field.name,
                            rawValue: (raw ?? disp),
                            row,
                            getRendered,
                            getRaw
                        })
                        : "";

                    const pill = this._renderYesNoPillHTML(raw ?? disp, pillTip);
                    if (pill) cellInnerHTML = pill;
                }

                // slider rendering
                if (sliderIndexSet.has(colIndex)) {
                    const n = this._toNumberMaybe(raw ?? disp);
                    if (n !== null && n >= 0 && n <= 100) {
                        cellInnerHTML = this._renderSliderHTML(Math.round(n));
                        isSliderCell = true;
                    }
                }

                // info icon rendering + tooltip from hidden field OR literal (FAST via data-sg-tip)
                if (infoIconIndexSet.has(colIndex)) {
                    const spec =
                        (infoIconTooltipsObj[String(colIndex)] !== undefined)
                            ? infoIconTooltipsObj[String(colIndex)]
                            : infoIconTooltipsObj[field.name];

                    const tip = this._resolveTooltipFromSpec({spec, row, getRendered, getRaw});
                    const tipAttr = tip ? ` data-sg-tip="${this._escapeHTML(tip)}"` : "";

                    cellInnerHTML = `
            <div class="sg-cell-with-addon">
              <span class="sg-cell-value">${cellInnerHTML}</span>
              <span class="sg-info-icon"${tipAttr}>i</span>
            </div>
          `;
                }

                const paddingStyle = isSliderCell ? "padding:12px 10px;" : "padding:6px 10px;";
                const overflowStyle = isSliderCell ? "overflow:visible;" : "overflow:hidden;";

                html += `
          <td data-orig-index="${originalIndex}"
              style="${paddingStyle}border-bottom:1px solid #f0f0f0;cursor:pointer;white-space:nowrap;${overflowStyle}
                     text-overflow:ellipsis;font-size:12px;${widthStyle}">
            ${cellInnerHTML}
          </td>`;
            });

            html += "</tr>";
        });

        html += `</tbody></table>`;
        container.innerHTML = html;

        const viz = this;

        container.onclick = function (evt) {
            const th = evt.target.closest("th[data-sort-field]");
            const cell = evt.target.closest("td");

            // Sorting
            if (th && config.enable_sorting !== false) {
                const fieldName = th.getAttribute("data-sort-field");
                if (fieldName) {
                    if (!viz._sortState || viz._sortState.fieldName !== fieldName) {
                        viz._sortState = { fieldName, direction: "asc" };
                    } else {
                        viz._sortState.direction = viz._sortState.direction === "asc" ? "desc" : "asc";
                    }
                    viz._forceRerender();
                }
                return;
            }

            if (!cell) return;

            const origIndex = Number(cell.getAttribute("data-orig-index"));
            if (!Number.isInteger(origIndex) || origIndex < 0) return;

            // highlight only (does not change rows locally)
            viz._selectedRowIndex = origIndex;

            // Push crossfilter to dashboard (like your older version)
            if (filterFieldName && viz._lastData && viz._lastData[origIndex]) {
                const row = viz._lastData[origIndex];

                // Use the same helpers already in updateAsync scope:
                const rawForFilter = getRaw(row, filterFieldName);
                const displayForFilter = getRendered(row, filterFieldName);

                if (rawForFilter !== null && rawForFilter !== undefined) {
                    viz.trigger("filter", [{
                        field: filterFieldName,
                        value: String(rawForFilter),
                        formatted: String(displayForFilter ?? rawForFilter)
                    }]);
                }
            }

            viz._forceRerender();
        };

        done();
    }
});
