// --- Load script once ---
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
  id: "stacked_area_custom",
  label: "Stacked Area (custom)",
  supports: { crossfilter: true },

  options: {
    // --- DATA ---
    x_dim:         { label: "X Dimension", type: "string", display: "select", values: [], section: "Data" },
    series_dim:    { label: "Series Dimension", type: "string", display: "select", values: [], section: "Data" },
    value_measure: { label: "Value Measure", type: "string", display: "select", values: [], section: "Data" },
    use_tooltip_field: { label: "Use 2nd measure for HTML tooltip", type: "boolean", default: false, section: "Data" },
    no_data_message: {
      label: "No-data Message",
      type: "string",
      default: "No data to display",
      section: "Behaviour"
    },
    area_opacity: {
      label: "Area Opacity (0–1)",
      type: "number",
      default: 0.6,
      section: "Appearance"
    },
    show_markers: {
      label: "Show Point Markers",
      type: "boolean",
      default: false,
      section: "Appearance"
    }
  },

  create(element) {
    element.innerHTML = "<div id='area_chart' style='width:100%;height:100%;'></div>";
    this._hcReady = (async () => {
      await loadScriptOnce("https://code.highcharts.com/highcharts.js");
      await loadScriptOnce("https://code.highcharts.com/modules/accessibility.js");
    })();
  },

  _resolveField(fields, sel) {
    if (!sel) return undefined;
    return fields.find(f => f.name === sel);
  },

  _escapeHTML(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  _showNoData(container, msg) {
    const message = (msg == null ? "" : String(msg)).trim() || "No data";
    container.innerHTML =
      `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;text-align:center;color:#666;font-family:inherit;">
         ${this._escapeHTML(message)}
       </div>`;
  },

  async update(data, element, config, queryResponse) {
    await this._hcReady;
    const fields = queryResponse.fields || {};
    const dims = fields.dimension_like || [];
    const meas = fields.measure_like || [];

    // set default field selections
    const dimChoices = dims.map(d => d.name);
    const measChoices = meas.map(m => m.name);
    if (!config.x_dim && dimChoices[0]) config.x_dim = dimChoices[0];
    if (!config.series_dim && dimChoices[1]) config.series_dim = dimChoices[1] || dimChoices[0];
    if (!config.value_measure && measChoices[0]) config.value_measure = measChoices[0];
    this.options.x_dim.values = dimChoices;
    this.options.series_dim.values = dimChoices;
    this.options.value_measure.values = measChoices;
    this.trigger("registerOptions", this.options);

    const xF = this._resolveField(dims, config.x_dim);
    const sF = this._resolveField(dims, config.series_dim);
    const vF = this._resolveField(meas, config.value_measure);
    const tooltipF = config.use_tooltip_field ? (meas[1] || null) : null;

    const container = document.getElementById("area_chart");
    if (!xF || !sF || !vF) {
      container.innerHTML = "<div style='padding:12px;color:#666'>Select 2 dimensions and 1 measure, then click <b>Run</b>.</div>";
      return;
    }
    if (!data || data.length === 0) {
      this._showNoData(container, config.no_data_message);
      return;
    }

    // --- Helpers ---
    const getRendered = (row, f) => row[f.name]?.rendered ?? row[f.name]?.html ?? row[f.name]?.value ?? null;
    const getRaw = (row, f) => ('value' in (row[f.name] || {})) ? row[f.name].value : null;
    const getNum = (row, f) => {
      const v = Number(row[f.name]?.value);
      return Number.isFinite(v) ? v : null;
    };

    // --- Build structure ---
    const seriesMap = new Map();
    const categoriesSet = new Set();

    data.forEach(row => {
      const xLabel = String(getRendered(row, xF));
      const seriesLabel = String(getRendered(row, sF));
      const val = getNum(row, vF);
      const htmlTip = tooltipF ? getRendered(row, tooltipF) : null;
      if (xLabel == null || seriesLabel == null || val == null) return;
      categoriesSet.add(xLabel);
      if (!seriesMap.has(seriesLabel)) seriesMap.set(seriesLabel, []);
      seriesMap.get(seriesLabel).push({ xLabel, y: val, html: htmlTip, raw: getRaw(row, sF) });
    });

    const categories = Array.from(categoriesSet);
    if (categories.length === 0 || seriesMap.size === 0) {
      this._showNoData(container, config.no_data_message);
      return;
    }

    // --- Build series ---
    const series = [];
    for (const [label, points] of seriesMap.entries()) {
      const dataArr = categories.map(xCat => {
        const p = points.find(p => p.xLabel === xCat);
        return p ? { y: p.y, custom: { html: p.html, raw: p.raw } } : { y: 0 };
      });
      series.push({ name: label, data: dataArr });
    }

    // --- Draw chart ---
    const viz = this;
    Highcharts.chart("area_chart", {
      chart: {
        type: "area",
        spacing: [10,10,10,10],
        height: element.clientHeight || 400
      },
      title: { text: null },
      exporting: { enabled: false },
      xAxis: {
        categories,
        tickmarkPlacement: "on",
        title: { text: xF.label_short || xF.label }
      },
      yAxis: {
        title: { text: vF.label_short || vF.label },
        stackLabels: { enabled: false }
      },
      legend: { align: "center", verticalAlign: "bottom" },
      plotOptions: {
        area: {
          stacking: "normal",
          marker: { enabled: !!config.show_markers, radius: 3 },
          opacity: Math.max(0, Math.min(1, config.area_opacity || 0.6)),
          cursor: "pointer",
          point: {
            events: {
              click: function () {
                const rawVal = this.custom?.raw;
                if (rawVal == null) return;
                viz.trigger("filter", [{
                  field: sF.name,
                  value: String(rawVal),
                  formatted: String(this.series.name)
                }]);
              }
            }
          }
        }
      },
      tooltip: {
        useHTML: !!config.use_tooltip_field,
        backgroundColor: "#fff",
        borderColor: "#9aa0a6",
        borderRadius: 6,
        borderWidth: 1,
        shadow: true,
        style: { color: "#000" },
        formatter: function () {
          if (config.use_tooltip_field && this.point?.custom?.html) {
            return this.point.custom.html;
          }
          return `<b>${this.series.name}</b><br/>${this.x}: <b>${Highcharts.numberFormat(this.y, 4)}</b>`;
        }
      },
      series
    });
  }
});
