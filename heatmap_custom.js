// --- Load a script once ---
function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

looker.plugins.visualizations.add({
  id: "heatmap_flexible_axes",
  label: "Heatmap (flexible axes + gradient)",
  supports: { crossfilter: true },

  options: {
    // ---- DATA ----
    x_dim:         { label: "X Dimension", type: "string", display: "select", values: [], section: "Data" },
    y_dim:         { label: "Y Dimension", type: "string", display: "select", values: [], section: "Data" },
    value_measure: { label: "Value Measure", type: "string", display: "select", values: [], section: "Data" },

    // ---- X AXIS ----
    x_axis_title:  { label: "Title", type: "string", default: "", section: "X Axis" },
    reverse_x_axis:{ label: "Reverse", type: "boolean", default: false, section: "X Axis" },
    x_label_step:  { label: "Label Step", type: "number", default: 1, section: "X Axis" },
    force_x_range: { label: "Use Custom Min/Max/Step", type: "boolean", default: false, section: "X Axis" },
    x_min:         { label: "Min (numeric)", type: "number",  default: 1,  section: "X Axis" },
    x_max:         { label: "Max (numeric)", type: "number",  default: 30, section: "X Axis" },
    x_step:        { label: "Step",          type: "number",  default: 1,  section: "X Axis" },

    // ---- Y AXIS ----
    y_axis_title:  { label: "Title", type: "string", default: "", section: "Y Axis" },
    row_height:    { label: "Row Height (px)", type: "number", default: 32, section: "Y Axis" },
    max_visible_rows: { label: "Max Visible Rows (scroll if more)", type: "number", default: 15, section: "Y Axis" },

    // ---- COLOURS ----
    heat_start_color: { label: "Gradient Start HEX", type: "string", default: "#E6F2FF", section: "Colours" },
    heat_end_color:   { label: "Gradient End HEX (legend)", type: "string", default: "#007AFF", section: "Colours" },
    kw1_text: { label: "Keyword 1 (in Y label)", type: "string", default: "", section: "Colours" },
    kw1_end:  { label: "Keyword 1 End HEX", type: "string", default: "#1f77b4", section: "Colours" },
    kw2_text: { label: "Keyword 2 (in Y label)", type: "string", default: "", section: "Colours" },
    kw2_end:  { label: "Keyword 2 End HEX", type: "string", default: "#d62728", section: "Colours" },
    def_end:  { label: "Default End HEX (no match)", type: "string", default: "#7f8c8d", section: "Colours" },
    cell_border_color:{ label: "Cell Border Color (HEX or 'transparent')", type: "string", default: "transparent", section: "Colours" },
    cell_border_width:{ label: "Cell Border Width", type: "number", default: 0, section: "Colours" },

    // ---- BEHAVIOUR ----
    show_data_labels: { label: "Show values in cells", type: "boolean", default: true, section: "Behaviour" },
    treat_zero_as_null: { label: "Treat 0 as empty", type: "boolean", default: false, section: "Behaviour" },
    use_second_measure_tooltip: {
      label: "Use 2nd measure as HTML tooltip",
      type: "boolean",
      default: false,
      section: "Behaviour"
    },
    decimal_places: {
      label: "Decimal Places",
      type: "number",
      default: 0,
      section: "Behaviour"
    }
  },

  create(element) {
    element.innerHTML = "<div id='hm_chart' style='width:100%;height:100%;'></div>";
    this._hcReady = (async () => {
      await loadScriptOnce("https://code.highcharts.com/highcharts.js");
      await loadScriptOnce("https://code.highcharts.com/modules/heatmap.js");
      await loadScriptOnce("https://code.highcharts.com/modules/accessibility.js");
    })();
  },

  // Resolve by NAME (the selects now store field names)
  _resolveField(fields, sel) {
    if (!sel) return undefined;
    return fields.find(f => f.name === sel);
  },

  // Colour helpers
  _hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex||"").trim());
    if (!m) return { r: 0, g: 0, b: 0 };
    return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
  },
  _rgbToHex({ r, g, b }) {
    const h = (n)=>{ const s=Math.max(0,Math.min(255,Math.round(n))).toString(16); return s.length===1?"0"+s:s; };
    return "#"+h(r)+h(g)+h(b);
  },
  _lerp(a,b,t){ return a+(b-a)*t; },
  _mixHex(aHex,bHex,t){
    const a=this._hexToRgb(aHex), b=this._hexToRgb(bHex);
    return this._rgbToHex({ r:this._lerp(a.r,b.r,t), g:this._lerp(a.g,b.g,t), b:this._lerp(a.b,b.b,t) });
  },
  _bucketForY(yLabel, cfg) {
    const s  = (yLabel || "").toString().toLowerCase();
    const k1 = (cfg.kw1_text || "").toLowerCase().trim();
    const k2 = (cfg.kw2_text || "").toLowerCase().trim();
    if (k1 && s.includes(k1)) return "kw1";
    if (k2 && s.includes(k2)) return "kw2";
    return "def";
  },

  // basic HTML escape for useHTML labels
  _escapeHTML(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  async update(data, element, config, queryResponse) {
    await this._hcReady;

    const fields = (queryResponse.fields || {});
    const dims = fields.dimension_like || [];
    const meas = fields.measure_like || [];

    // ---- Build choices — use field NAMES as values ----
    const dimChoices  = (dims || []).map(d => d.name);
    const measChoices = (meas || []).map(m => m.name);

    if (!config.x_dim && dimChoices[0])                      config.x_dim = dimChoices[0];
    if (!config.y_dim && (dimChoices[1] || dimChoices[0]))   config.y_dim = dimChoices[1] || dimChoices[0];
    if (!config.value_measure && measChoices[0])             config.value_measure = measChoices[0];

    this.options.x_dim.values         = dimChoices;
    this.options.y_dim.values         = dimChoices;
    this.options.value_measure.values = measChoices;
    this.trigger('registerOptions', this.options);

    const xF = this._resolveField(dims, config.x_dim);
    const yF = this._resolveField(dims, config.y_dim);
    const vF = this._resolveField(meas, config.value_measure);

    const container = document.getElementById("hm_chart");
    if (!xF || !yF || !vF) {
      container.innerHTML = "<div style='padding:12px;color:#666'>Add 2 dimensions and 1 measure, then click <b>Run</b>.</div>";
      return;
    }

    // Keep a reference for cross-filter triggers
    const viz = this;
    const yFieldName = yF.name;

    // Helpers
    const getRendered = (row, field) => {
      const cell = row[field.name];
      if (!cell) return null;
      return (cell.html ?? cell.rendered ?? cell.value) || null;
    };
    const getRaw = (row, field) => {
      const cell = row[field.name];
      if (!cell) return null;
      return ('value' in cell) ? cell.value : null; // raw (for filtering)
    };
    const getNumeric = (row, field) => {
      const cell = row[field.name];
      if (!cell || !('value' in cell)) return null;
      const n = Number(cell.value);
      return Number.isFinite(n) ? n : null;
    };

    // Optional 2nd measure for HTML tooltip
    const htmlF = config.use_second_measure_tooltip ? (meas[1] || null) : null;
    const sanitize = (s) => s == null ? null : String(s).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

    // ---- Build categories and rows, and keep RAW Y values aligned ----
    const categoriesX = [];
    const categoriesY = [];
    const yRaw = []; // raw values aligned with categoriesY
    const rows = [];

    const usingForcedX =
      !!config.force_x_range && Number.isFinite(+config.x_min) &&
      Number.isFinite(+config.x_max) && Number.isFinite(+config.x_step) &&
      +config.x_step !== 0;

    const buildRange = (min, max, step) => {
      const s = Math.abs(step) || 1;
      const out = [];
      if (max >= min) for (let v=min; v<=max; v+=s) out.push(String(v));
      else            for (let v=min; v>=max; v-=s) out.push(String(v));
      return out;
    };

    const pushYIfNew = (label, raw) => {
      const sLabel = String(label);
      if (!categoriesY.includes(sLabel)) {
        categoriesY.push(sLabel);
        yRaw.push(raw);
      }
    };

    if (usingForcedX) {
      const rng = buildRange(+config.x_min, +config.x_max, +config.x_step);
      categoriesX.push(...rng);
      data.forEach(row => {
        const xLabel = getRendered(row, xF);
        const yLabel = getRendered(row, yF);
        const yValueRaw = getRaw(row, yF);
        if (xLabel == null || yLabel == null) return;
        rows.push(row);
        pushYIfNew(yLabel, yValueRaw);
      });
    } else {
      data.forEach(row => {
        const xLabel = getRendered(row, xF);
        const yLabel = getRendered(row, yF);
        const yValueRaw = getRaw(row, yF);
        if (xLabel == null || yLabel == null) return;
        rows.push(row);
        if (!categoriesX.includes(String(xLabel))) categoriesX.push(String(xLabel));
        pushYIfNew(yLabel, yValueRaw);
      });
    }

    const xIndex = new Map(categoriesX.map((c, i) => [c, i]));
    const yIndex = new Map(categoriesY.map((c, i) => [c, i]));

    const values = rows.map(r => getNumeric(r, vF)).filter(v => v != null && isFinite(v));
    const minV = values.length ? Math.min(...values) : 0;
    const maxV = values.length ? Math.max(...values) : 1;
    const span = Math.max(1e-9, maxV - minV);
    const treatZero = !!config.treat_zero_as_null;

    const totalRows = categoriesY.length;
    const rowH = Number.isFinite(+config.row_height) && +config.row_height > 0 ? +config.row_height : 32;
    const maxVisible = Math.max(1, Number.isFinite(+config.max_visible_rows) ? +config.max_visible_rows : 15);
    const V_PAD = 120;
    const visiblePlotHeight = Math.min(totalRows, maxVisible) * rowH;
    const totalPlotHeight   = Math.max(visiblePlotHeight, totalRows * rowH);
    const chartHeight = visiblePlotHeight + V_PAD;

    const startC = (config.heat_start_color || "#E6F2FF").trim();
    const legendEnd = (config.heat_end_color || "#007AFF").trim();
    const kw1End = (config.kw1_end || "#1f77b4").trim();
    const kw2End = (config.kw2_end || "#d62728").trim();
    const defEnd = (config.def_end || "#7f8c8d").trim();

    const points = rows.map(row => {
      const xLabel = String(getRendered(row, xF));
      const yLabel = String(getRendered(row, yF));
      const num    = getNumeric(row, vF);
      const value  = (treatZero && num === 0) ? null : num;

      const xi = xIndex.get(xLabel);
      const yi = yIndex.get(String(yLabel));
      if (xi == null || yi == null) return null;

      const bucket = this._bucketForY(yLabel, config);
      const endC = bucket === "kw1" ? kw1End : bucket === "kw2" ? kw2End : defEnd;

      const t = value == null ? 0 : (value - minV) / span;
      const color = this._mixHex(startC, endC, Math.max(0, Math.min(1, t)));

      const html = htmlF ? sanitize(getRendered(row, htmlF)) : null;

      return { x: xi, y: yi, value, color, custom: { html } };
    }).filter(Boolean);

    const tickPositionsX = categoriesX.map((_, i) => i);

    // Decimal places (safe fallback)
    const dp = Number.isFinite(+config.decimal_places) ? Math.max(0, +config.decimal_places) : 0;

    Highcharts.chart("hm_chart", {
      chart: {
        type: "heatmap",
        styledMode: false,
        spacing: [10,10,10,10],
        height: chartHeight,
        scrollablePlotArea: { minHeight: totalPlotHeight + V_PAD, scrollPositionY: 0 },
        events: {
          // Bind click handlers to Y labels each render
          render: function () {
            const root = this.container;
            root.querySelectorAll('.hm-y-label').forEach(el => {
              if (el._hmBound) return;
              el._hmBound = true;
              el.addEventListener('click', () => {
                const idxAttr = el.getAttribute('data-yi');
                const yi = Number(idxAttr);
                const raw = Number.isFinite(yi) ? yRaw[yi] : undefined;
                const valueToFilter = (raw !== undefined && raw !== null)
                  ? String(raw)
                  : String(el.textContent || "");
                viz.trigger('filter', [{ field: yFieldName, value: valueToFilter }]);
              });
            });
          }
        }
      },
      exporting: { enabled: false },
      title: { text: null },

      xAxis: {
        categories: categoriesX,
        title: { text: config.x_axis_title || null },
        reversed: !!config.reverse_x_axis,
        min: 0,
        max: categoriesX.length - 1,
        tickPositions: tickPositionsX,
        labels: { step: Number.isFinite(+config.x_label_step) && +config.x_label_step > 0 ? +config.x_label_step : 1 }
      },
      yAxis: {
        categories: categoriesY,
        title: { text: config.y_axis_title || null },
        reversed: true,
        tickInterval: 1,
        labels: {
          step: 1,
          useHTML: true,
          formatter: function () {
            const txt = viz._escapeHTML(this.value);
            // Encode the category index so we can look up RAW value on click
            return `<span class="hm-y-label" data-yi="${this.pos}" style="cursor:pointer;text-decoration:underline;">${txt}</span>`;
          }
        }
      },

      colorAxis: {
        min: minV,
        max: maxV,
        minColor: startC,
        maxColor: legendEnd,
        crosshair: { color: '#666', width: 1 }
      },

      legend: {
        align: "right",
        layout: "vertical",
        verticalAlign: "middle",
        symbolHeight: visiblePlotHeight
      },

      tooltip: {
        useHTML: !!config.use_second_measure_tooltip,
        formatter: function () {
          if (config.use_second_measure_tooltip && this.point && this.point.custom && this.point.custom.html) {
            return this.point.custom.html;
          }
          const xLabel = this.series.xAxis.categories[this.point.x];
          const yLabel = this.series.yAxis.categories[this.point.y];
          const v = this.point.value;
          return `<b>${yLabel}</b><br/>${xLabel}: <b>${(v==null?'–':Highcharts.numberFormat(v, dp))}</b>`;
        }
      },

      plotOptions: { series: { animation: false } },

      series: [{
        name: "Heat",
        borderColor: (config.cell_border_color || "transparent"),
        borderWidth: Number.isFinite(+config.cell_border_width) ? +config.cell_border_width : 0,
        colorAxis: 0,
        data: points,
        dataLabels: {
          enabled: !!config.show_data_labels,
          formatter: function () {
            const v = this.point.value;
            return (v == null ? "" : Highcharts.numberFormat(v, dp));
          }
        }
      }]
    });
  }
});
