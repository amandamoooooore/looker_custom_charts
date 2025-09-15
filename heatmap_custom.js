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
    x_dim: { label: "X Dimension", type: "string", display: "select", values: {}, section: "Data" },
    y_dim: { label: "Y Dimension", type: "string", display: "select", values: {}, section: "Data" },
    value_measure: { label: "Value Measure", type: "string", display: "select", values: {}, section: "Data" },

    // ---- STYLE ----
    x_axis_title: { label: "X Axis Title", type: "string", default: "", section: "Style" },
    y_axis_title: { label: "Y Axis Title", type: "string", default: "", section: "Style" },

    // Base gradient (when keyword gradients OFF, and as START color always)
    heat_start_color: { label: "Gradient Start HEX", type: "string", default: "#E6F2FF", section: "Style" },
    heat_end_color:   { label: "Gradient End HEX (when keyword gradients OFF)", type: "string", default: "#007AFF", section: "Style" },

    reverse_x_axis:   { label: "Reverse X Axis", type: "boolean", default: false, section: "Style" },
    cell_border_color:{ label: "Cell Border Color (HEX or 'transparent')", type: "string", default: "transparent", section: "Style" },
    cell_border_width:{ label: "Cell Border Width", type: "number", default: 0, section: "Style" },
    show_data_labels: { label: "Show values in cells", type: "boolean", default: true, section: "Style" },
    row_height:       { label: "Row Height (px)", type: "number", default: 32, section: "Style" },
    max_visible_rows: { label: "Max Visible Rows (scroll if more)", type: "number", default: 15, section: "Style" },

    // --- Keyword gradient options ---
    use_keyword_gradients: { label: "Use keyword-based gradient ends", type: "boolean", default: false, section: "Style" },
    kw1_text:   { label: "Keyword 1 (in Y label)", type: "string", default: "", section: "Style" },
    kw1_end:    { label: "Keyword 1 Gradient END", type: "string", default: "#1f77b4", section: "Style" },
    kw2_text:   { label: "Keyword 2 (in Y label)", type: "string", default: "", section: "Style" },
    kw2_end:    { label: "Keyword 2 Gradient END", type: "string", default: "#d62728", section: "Style" },
    def_end:    { label: "Default Gradient END (no match)", type: "string", default: "#7f8c8d", section: "Style" },

    // ---- BEHAVIOR ----
    treat_zero_as_null: { label: "Treat 0 as empty", type: "boolean", default: false, section: "Behavior" }
  },

  create(element) {
    element.innerHTML = "<div id='hm_chart' style='width:100%;height:100%;'></div>";
    // Load Highcharts core + heatmap + accessibility 
    this._hcReady = (async () => {
      await loadScriptOnce("https://code.highcharts.com/highcharts.js");
      await loadScriptOnce("https://code.highcharts.com/modules/heatmap.js");
      await loadScriptOnce("https://code.highcharts.com/modules/accessibility.js");
    })();
  },

  _fieldByName(fields, name) { return fields.find(f => f.name === name); },

  // Helper: bucket assignment for Y labels
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

    // Build select choices
    const dimChoices = {}; dims.forEach(d => dimChoices[d.name] = d.label_short || d.label || d.name);
    const measChoices = {}; meas.forEach(m => measChoices[m.name] = m.label_short || m.label || m.name);

    // Defaults
    if (!config.x_dim && dims[0]) config.x_dim = dims[0].name;
    if (!config.y_dim && (dims[1] || dims[0])) config.y_dim = (dims[1] ? dims[1].name : dims[0].name);
    if (!config.value_measure && meas[0]) config.value_measure = meas[0].name;

    // Register/refresh options panel
    this.options.x_dim.values = dimChoices;
    this.options.y_dim.values = dimChoices;
    this.options.value_measure.values = measChoices;
    this.trigger('registerOptions', this.options);

    // Resolve fields
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

    // Build categories & points, skipping rows where X or Y is null/blank
    const categoriesX = [];
    const categoriesY = [];
    const rowsFiltered = [];

    data.forEach(row => {
      const xLabel = getRendered(row, xF);
      const yLabel = getRendered(row, yF);
      if (xLabel == null || yLabel == null) return;
      rowsFiltered.push(row);
      const xs = String(xLabel);
      const ys = String(yLabel);
      if (!categoriesX.includes(xs)) categoriesX.push(xs);
      if (!categoriesY.includes(ys)) categoriesY.push(ys);
    });

    // Index maps
    const xIndex = new Map(categoriesX.map((c, i) => [c, i]));
    const yIndex = new Map(categoriesY.map((c, i) => [c, i]));

    const treatZero = !!config.treat_zero_as_null;

    // --- Layout sizing ---
    const totalRows = categoriesY.length;
    const rowH = Number.isFinite(+config.row_height) && +config.row_height > 0 ? +config.row_height : 32;
    const maxVisible = Math.max(1, Number.isFinite(+config.max_visible_rows) ? +config.max_visible_rows : 15);

    const V_PAD = 120; // vertical padding for titles/labels
    const visiblePlotHeight = Math.min(totalRows, maxVisible) * rowH;
    const totalPlotHeight   = Math.max(visiblePlotHeight, totalRows * rowH);

    const chartHeight = visiblePlotHeight + V_PAD;
    const legendSymbolHeight = visiblePlotHeight;

    // Base colors
    const start = (config.heat_start_color || "#E6F2FF").trim();
    const end   = (config.heat_end_color   || "#007AFF").trim();

    const kw1End = (config.kw1_end || "#1f77b4").trim();
    const kw2End = (config.kw2_end || "#d62728").trim();
    const defEnd = (config.def_end || "#7f8c8d").trim();

    const useKW = !!config.use_keyword_gradients;

    // ------------------------
    // CASE 1: Normal gradient
    // ------------------------
    if (!useKW) {
      const points = [];
      rowsFiltered.forEach(row => {
        const xLabel = String(getRendered(row, xF));
        const yLabel = String(getRendered(row, yF));
        const num    = getNumeric(row, vF);
        const value  = (treatZero && num === 0) ? null : num;
        const xi = xIndex.get(xLabel);
        const yi = yIndex.get(yLabel);
        if (xi != null && yi != null) points.push([xi, yi, value]);
      });

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
        xAxis: { categories: categoriesX, title: { text: config.x_axis_title || null }, reversed: !!config.reverse_x_axis },
        yAxis: { categories: categoriesY, title: { text: config.y_axis_title || null }, reversed: true, tickInterval: 1, labels: { step: 1 } },
        colorAxis: { min: 0, minColor: start, maxColor: end, crosshair: { color: '#666', width: 1 } }, // NEW: crosshair in normal mode
        legend: { align: "right", layout: "vertical", verticalAlign: "middle", symbolHeight: legendSymbolHeight },
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
          data: points,
          dataLabels: { enabled: !!config.show_data_labels,
            formatter: function () { const v = this.point.value; return (v == null ? "" : Highcharts.numberFormat(v, 0)); } }
        }]
      });

    // ------------------------
    // CASE 2: Keyword gradients
    // ------------------------
    } else {
      const ptsKW1 = [], ptsKW2 = [], ptsDEF = [];

      rowsFiltered.forEach(row => {
        const xLabel = String(getRendered(row, xF));
        const yLabel = String(getRendered(row, yF));
        const num    = getNumeric(row, vF);
        const value  = (treatZero && num === 0) ? null : num;
        const xi = xIndex.get(xLabel);
        const yi = yIndex.get(yLabel);
        if (xi == null || yi == null) return;

        const bucket = this._bucketForY(yLabel, config);
        const point = [xi, yi, value];
        if (bucket === "kw1") ptsKW1.push(point);
        else if (bucket === "kw2") ptsKW2.push(point);
        else ptsDEF.push(point);
      });

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
        xAxis: { categories: categoriesX, title: { text: config.x_axis_title || null }, reversed: !!config.reverse_x_axis },
        yAxis: { categories: categoriesY, title: { text: config.y_axis_title || null }, reversed: true, tickInterval: 1, labels: { step: 1 } },

        // Three axes, but only default is shown in legend (and used for the hover indicator)
        colorAxis: [
          { id: "kw1Axis", min: 0, minColor: start, maxColor: kw1End, showInLegend: false, labels: { enabled: false } },
          { id: "kw2Axis", min: 0, minColor: start, maxColor: kw2End, showInLegend: false, labels: { enabled: false } },
          { id: "defAxis", min: 0, minColor: start, maxColor: defEnd, showInLegend: true,  labels: { enabled: true }, crosshair: { color: '#666', width: 1 } } // NEW: crosshair enabled
        ],

        legend: { enabled: true, align: "right", layout: "vertical", verticalAlign: "middle", symbolHeight: legendSymbolHeight },

        tooltip: {
          formatter: function () {
            const xLabel = this.series.xAxis.categories[this.point.x];
            const yLabel = this.series.yAxis.categories[this.point.y];
            const v = this.point.value;
            return `<b>${yLabel}</b><br/>${xLabel}: <b>${(v==null?'–':Highcharts.numberFormat(v,0))}</b>`;
          }
        },

        plotOptions: { series: { animation: false } },

        // Three heatmap series bound to different color axes
        series: [
          {
            name: (config.kw1_text || "Keyword 1"),
            type: "heatmap",
            colorAxis: 0,                    // kw1Axis
            borderColor: (config.cell_border_color || "transparent"),
            borderWidth: Number.isFinite(+config.cell_border_width) ? +config.cell_border_width : 0,
            data: ptsKW1,
            dataLabels: {
              enabled: !!config.show_data_labels,
              formatter: function () {
                const v = this.point.value;
                return (v == null ? "" : Highcharts.numberFormat(v, 0));
              }
            },
            showInLegend: false,
            // NEW: hover crosshair on default legend
            point: {
              events: {
                mouseOver: function () {
                  const axes = this.series.chart.colorAxis || [];
                  const defAxis = axes[2] || axes[0];
                  if (defAxis && defAxis.drawCrosshair) {
                    defAxis.drawCrosshair(null, { value: this.value });
                  }
                },
                mouseOut: function () {
                  const axes = this.series.chart.colorAxis || [];
                  const defAxis = axes[2] || axes[0];
                  if (defAxis && defAxis.hideCrosshair) {
                    defAxis.hideCrosshair();
                  }
                }
              }
            }
          },
          {
            name: (config.kw2_text || "Keyword 2"),
            type: "heatmap",
            colorAxis: 1,                    // kw2Axis
            borderColor: (config.cell_border_color || "transparent"),
            borderWidth: Number.isFinite(+config.cell_border_width) ? +config.cell_border_width : 0,
            data: ptsKW2,
            dataLabels: {
              enabled: !!config.show_data_labels,
              formatter: function () {
                const v = this.point.value;
                return (v == null ? "" : Highcharts.numberFormat(v, 0));
              }
            },
            showInLegend: false,
            // NEW: hover crosshair on default legend
            point: {
              events: {
                mouseOver: function () {
                  const axes = this.series.chart.colorAxis || [];
                  const defAxis = axes[2] || axes[0];
                  if (defAxis && defAxis.drawCrosshair) {
                    defAxis.drawCrosshair(null, { value: this.value });
                  }
                },
                mouseOut: function () {
                  const axes = this.series.chart.colorAxis || [];
                  const defAxis = axes[2] || axes[0];
                  if (defAxis && defAxis.hideCrosshair) {
                    defAxis.hideCrosshair();
                  }
                }
              }
            }
          },
          {
            name: "Other",
            type: "heatmap",
            colorAxis: 2,                    // defAxis
            borderColor: (config.cell_border_color || "transparent"),
            borderWidth: Number.isFinite(+config.cell_border_width) ? +config.cell_border_width : 0,
            data: ptsDEF,
            dataLabels: {
              enabled: !!config.show_data_labels,
              formatter: function () {
                const v = this.point.value;
                return (v == null ? "" : Highcharts.numberFormat(v, 0));
              }
            },
            showInLegend: false,
            // for completeness, default series will use native legend crosshair
            point: {
              events: {
                mouseOver: function () {
                  const axes = this.series.chart.colorAxis || [];
                  const defAxis = axes[2] || axes[0];
                  if (defAxis && defAxis.drawCrosshair) {
                    defAxis.drawCrosshair(null, { value: this.value });
                  }
                },
                mouseOut: function () {
                  const axes = this.series.chart.colorAxis || [];
                  const defAxis = axes[2] || axes[0];
                  if (defAxis && defAxis.hideCrosshair) {
                    defAxis.hideCrosshair();
                  }
                }
              }
            }
          }
        ]
      });
    }
  }
});
