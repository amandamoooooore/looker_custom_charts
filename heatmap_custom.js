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

  options: {
    // ---- DATA ----
    x_dim:         { label: "X Dimension", type: "string", display: "select", values: {}, section: "Data" },
    y_dim:         { label: "Y Dimension", type: "string", display: "select", values: {}, section: "Data" },
    value_measure: { label: "Value Measure", type: "string", display: "select", values: {}, section: "Data" },

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

    // ---- OTHER ----
    show_data_labels: { label: "Show values in cells", type: "boolean", default: true, section: "Other" },
    treat_zero_as_null: { label: "Treat 0 as empty", type: "boolean", default: false, section: "Other" }
  },

  create(element) {
    element.innerHTML = "<div id='hm_chart' style='width:100%;height:100%;'></div>";
    this._hcReady = (async () => {
      await loadScriptOnce("https://code.highcharts.com/highcharts.js");
      await loadScriptOnce("https://code.highcharts.com/modules/heatmap.js");
      await loadScriptOnce("https://code.highcharts.com/modules/accessibility.js");
    })();
  },

  _fieldByName(fields, name) { return fields.find(f => f.name === name); },

  // colour blending utils
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

  async update(data, element, config, queryResponse) {
    await this._hcReady;

    const dims = queryResponse.fields.dimension_like || [];
    const meas = queryResponse.fields.measure_like || [];

    // Build select choices + defaults
    const dimChoices = {}; dims.forEach(d => dimChoices[d.name] = d.label_short || d.label || d.name);
    const measChoices = {}; meas.forEach(m => measChoices[m.name] = m.label_short || m.label || m.name);

    if (!config.x_dim && dims[0]) config.x_dim = dims[0].name;
    if (!config.y_dim && (dims[1] || dims[0])) config.y_dim = (dims[1] ? dims[1].name : dims[0].name);
    if (!config.value_measure && meas[0]) config.value_measure = meas[0].name;

    this.options.x_dim.values = dimChoices;
    this.options.y_dim.values = dimChoices;
    this.options.value_measure.values = measChoices;
    this.trigger('registerOptions', this.options);

    const xF = this._fieldByName(dims, config.x_dim);
    const yF = this._fieldByName(dims, config.y_dim);
    const vF = this._fieldByName(meas, config.value_measure);

    const container = document.getElementById("hm_chart");
    if (!xF || !yF || !vF) {
      container.innerHTML = "<div style='padding:12px;color:#666'>Select 2 dimensions and 1 measure.</div>";
      return;
    }

    // Helpers
    const getRendered = (row, field) => {
      const cell = row[field.name];
      if (!cell) return null;
      const val = (cell.rendered ?? cell.value);
      return (val === undefined || val === null || String(val).trim() === "") ? null : val;
    };
    const getNumeric = (row, field) => {
      const cell = row[field.name];
      if (!cell || !('value' in cell)) return null;
      const n = Number(cell.value);
      return Number.isFinite(n) ? n : null;
    };

    // --- Build X & Y categories + keep rows (skip rows with null X/Y) ---
    const categoriesX = [];
    const categoriesY = [];
    const rows = [];

    const usingForcedX =
      !!config.force_x_range &&
      Number.isFinite(+config.x_min) &&
      Number.isFinite(+config.x_max) &&
      Number.isFinite(+config.x_step) &&
      +config.x_step !== 0;

    const buildRange = (min, max, step) => {
      const s = Math.abs(step) || 1;
      const out = [];
      if (max >= min) for (let v=min; v<=max; v+=s) out.push(String(v));
      else            for (let v=min; v>=max; v-=s) out.push(String(v));
      return out;
    };

    if (usingForcedX) {
      const rng = buildRange(+config.x_min, +config.x_max, +config.x_step);
      categoriesX.push(...rng);

      data.forEach(row => {
        const xLabel = getRendered(row, xF);
        const yLabel = getRendered(row, yF);
        if (xLabel == null || yLabel == null) return;
        rows.push(row);
        const ys = String(yLabel);
        if (!categoriesY.includes(ys)) categoriesY.push(ys);
      });
    } else {
      data.forEach(row => {
        const xLabel = getRendered(row, xF);
        const yLabel = getRendered(row, yF);
        if (xLabel == null || yLabel == null) return;
        rows.push(row);
        const xs = String(xLabel), ys = String(yLabel);
        if (!categoriesX.includes(xs)) categoriesX.push(xs);
        if (!categoriesY.includes(ys)) categoriesY.push(ys);
      });
    }

    // Index maps (labels are strings)
    const xIndex = new Map(categoriesX.map((c, i) => [c, i]));
    const yIndex = new Map(categoriesY.map((c, i) => [c, i]));

    // Value range for legend (single colorAxis)
    const values = rows.map(r => getNumeric(r, vF)).filter(v => v != null && isFinite(v));
    const minV = values.length ? Math.min(...values) : 0;
    const maxV = values.length ? Math.max(...values) : 1;
    const span = Math.max(1e-9, maxV - minV);

    const treatZero = !!config.treat_zero_as_null;

    // --- Layout sizing ---
    const totalRows = categoriesY.length;
    const rowH = Number.isFinite(+config.row_height) && +config.row_height > 0 ? +config.row_height : 32;
    const maxVisible = Math.max(1, Number.isFinite(+config.max_visible_rows) ? +config.max_visible_rows : 15);
    const V_PAD = 120;
    const visiblePlotHeight = Math.min(totalRows, maxVisible) * rowH;
    const totalPlotHeight   = Math.max(visiblePlotHeight, totalRows * rowH);
    const chartHeight = visiblePlotHeight + V_PAD;

    // Colours
    const startC = (config.heat_start_color || "#E6F2FF").trim();
    const legendEnd = (config.heat_end_color || "#007AFF").trim();
    const kw1End = (config.kw1_end || "#1f77b4").trim();
    const kw2End = (config.kw2_end || "#d62728").trim();
    const defEnd = (config.def_end || "#7f8c8d").trim();

    // Build single-series points with per-point colours
    const points = rows.map(row => {
      const xLabel = String(getRendered(row, xF));
      const yLabel = String(getRendered(row, yF));
      const num    = getNumeric(row, vF);
      const value  = (treatZero && num === 0) ? null : num;

      const xi = xIndex.get(xLabel);
      const yi = yIndex.get(yLabel);
      if (xi == null || yi == null) return null;

      const bucket = this._bucketForY(yLabel, config);
      const endC = bucket === "kw1" ? kw1End : bucket === "kw2" ? kw2End : defEnd;

      const t = value == null ? 0 : (value - minV) / span;
      const color = this._mixHex(startC, endC, Math.max(0, Math.min(1, t)));

      return { x: xi, y: yi, value, color };
    }).filter(Boolean);

    // Force a tick for EVERY category index: 0..N-1
    const tickPositionsX = categoriesX.map((_, i) => i);

    Highcharts.chart("hm_chart", {
      chart: {
        type: "heatmap",
        styledMode: false,
        spacing: [10,10,10,10],
        height: chartHeight,
        scrollablePlotArea: { minHeight: totalPlotHeight + V_PAD, scrollPositionY: 0 }
      },
      exporting: { enabled: false },
      title: { text: null },

      xAxis: {
        categories: categoriesX,
        title: { text: config.x_axis_title || null },
        reversed: !!config.reverse_x_axis,

        // ensure full forced range shows with all labels
        min: 0,
        max: categoriesX.length - 1,
        tickPositions: tickPositionsX,
        tickmarkPlacement: 'on',
        startOnTick: true,
        endOnTick: true,
        showFirstLabel: true,
        showLastLabel: true,
        labels: {
          step: Number.isFinite(+config.x_label_step) && +config.x_label_step > 0 ? +config.x_label_step : 1,
          autoRotation: false,
          allowOverlap: true
        }
      },
      yAxis: {
        categories: categoriesY,
        title: { text: config.y_axis_title || null },
        reversed: true,
        tickInterval: 1,
        labels: { step: 1 }
      },

      // Single colorAxis drives the legend bar + built-in hover indicator
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
        formatter: function () {
          const xLabel = this.series.xAxis.categories[this.point.x];
          const yLabel = this.series.yAxis.categories[this.point.y];
          const v = this.point.value;
          return `<b>${yLabel}</b><br/>${xLabel}: <b>${(v==null?'–':Highcharts.numberFormat(v,0))}</b>`;
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
            return (v == null ? "" : Highcharts.numberFormat(v, 0));
          }
        }
      }]
    });
  }
});
