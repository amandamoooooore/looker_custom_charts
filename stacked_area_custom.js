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
  id: "stacked_area_flexible",
  label: "Stacked Area (custom)",
  supports: { crossfilter: true },

  options: {
    // --- DATA ---
    x_dim:         { label: "X Dimension", type: "string", display: "select", values: [], section: "Data" },
    series_dim:    { label: "Series Dimension", type: "string", display: "select", values: [], section: "Data" },
    value_measure: { label: "Value Measure", type: "string", display: "select", values: [], section: "Data" },

    // --- X AXIS ---
    x_axis_title:  { label: "X Axis Title", type: "string", default: "", section: "X Axis" },
    reverse_x_axis:{ label: "Reverse", type: "boolean", default: false, section: "X Axis" },
    x_label_step:  { label: "Label Step", type: "number", default: 1, section: "X Axis" },
    force_x_range: { label: "Use Custom Min/Max/Step", type: "boolean", default: true, section: "X Axis" },
    x_min:         { label: "Min (numeric)", type: "number",  default: 1,  section: "X Axis" },
    x_max:         { label: "Max (numeric)", type: "number",  default: 30, section: "X Axis" },
    x_step:        { label: "Step",          type: "number",  default: 1,  section: "X Axis" },

    // --- Y AXIS ---
    y_axis_title:  { label: "Y Axis Title (override)", type: "string", default: "", section: "Y Axis" },

    // --- APPEARANCE/BEHAVIOUR ---
    area_opacity:  { label: "Area Opacity (0–1)", type: "number", default: 0.6, section: "Appearance" },
    show_markers:  { label: "Show Point Markers", type: "boolean", default: false, section: "Appearance" },
    use_tooltip_field: { label: "Use 2nd measure for HTML tooltip", type: "boolean", default: false, section: "Behaviour" },
    no_data_message:   { label: "No-data Message", type: "string", default: "No data to display", section: "Behaviour" },

    // --- COLOURS ---
    series_color_map: {
      label: "Series → HEX (one per line: Name = #HEX)",
      type: "string",
      default: "",
      section: "Colours"
    },

    // --- LEGEND ---
    legend_sort_alpha: {
      label: "Sort Legend A→Z",
      type: "boolean",
      default: false,
      section: "Legend"
    },
    legend_deselected_values: {
      label: "Auto-deselect Series (comma/newline)",
      type: "string",
      default: "",
      section: "Legend"
    }
  },

  create(element) {
    element.innerHTML = "<div id='area_chart' style='width:100%;height:100%;'></div>";

    // CSS for opaque HTML tooltips that auto-size
    if (!document.getElementById("sa_area_css")) {
      const css = document.createElement("style");
      css.id = "sa_area_css";
      css.textContent = `
        .highcharts-tooltip.sa-tooltip > span{
          background: transparent !important; border: 0 !important; padding: 0 !important;
          white-space: nowrap !important; display: inline-block !important;
        }
        .highcharts-tooltip.sa-tooltip .sa-tip-inner{
          display: inline-block; background:#fff; border:1px solid #9aa0a6; border-radius:6px;
          padding:8px 10px; box-shadow:0 2px 8px rgba(0,0,0,.15); color:#000; white-space:nowrap;
        }
      `;
      document.head.appendChild(css);
    }

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

  _parseColorMap(str) {
    const map = new Map();
    if (!str) return map;
    const lines = String(str).split(/\n|,/); // allow newline or comma
    lines.forEach(line => {
      const m = line.split(/=|:/);
      if (m.length >= 2) {
        const key = m[0].trim();
        const val = m.slice(1).join(":").trim();
        if (key && /^#?[0-9a-f]{6}$/i.test(val.replace('#',''))) {
          map.set(key, val.startsWith('#') ? val : ('#' + val));
        }
      }
    });
    return map;
  },

  _parseListToSet(str) {
    const set = new Set();
    if (!str) return set;
    String(str).split(/\n|,/).forEach(v => {
      const t = v.trim();
      if (t) set.add(t);
    });
    return set;
  },

  async update(data, element, config, queryResponse) {
    await this._hcReady;
    const fields = queryResponse.fields || {};
    const dims = fields.dimension_like || [];
    const meas = fields.measure_like || [];

    // defaults
    const dimChoices  = dims.map(d => d.name);
    const measChoices = meas.map(m => m.name);
    if (!config.x_dim && dimChoices[0])                        config.x_dim = dimChoices[0];
    if (!config.series_dim && (dimChoices[1] || dimChoices[0])) config.series_dim = dimChoices[1] || dimChoices[0];
    if (!config.value_measure && measChoices[0])               config.value_measure = measChoices[0];

    this.options.x_dim.values         = dimChoices;
    this.options.series_dim.values    = dimChoices;
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

    // helpers
    const getRendered = (row, f) => row[f.name]?.html ?? row[f.name]?.rendered ?? row[f.name]?.value ?? null;
    const getRaw = (row, f) => ('value' in (row[f.name] || {})) ? row[f.name].value : null;
    const getNum = (row, f) => {
      const v = Number(row[f.name]?.value);
      return Number.isFinite(v) ? v : null;
    };

    // Build the X categories
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

    const categoriesSet = new Set();
    const seriesMap = new Map(); // name -> [{xLabel, y, html, raw}]

    data.forEach(row => {
      const xLabel = String(getRendered(row, xF));
      const sLabel = String(getRendered(row, sF));
      const y = getNum(row, vF);
      if (xLabel == null || sLabel == null || y == null) return;

      if (!usingForcedX) categoriesSet.add(xLabel);
      if (!seriesMap.has(sLabel)) seriesMap.set(sLabel, []);
      seriesMap.get(sLabel).push({
        xLabel,
        y,
        html: tooltipF ? getRendered(row, tooltipF) : null,
        raw: getRaw(row, sF)
      });
    });

    const categories = usingForcedX
      ? buildRange(+config.x_min, +config.x_max, +config.x_step)
      : Array.from(categoriesSet);

    if (categories.length === 0 || seriesMap.size === 0) {
      this._showNoData(container, config.no_data_message);
      return;
    }

    // parse colour map and deselection list
    const colorMap = this._parseColorMap(config.series_color_map);
    const deselectSet = this._parseListToSet(config.legend_deselected_values);

    // build series over full category range (fill gaps with 0)
    let series = [];
    for (const [name, points] of seriesMap.entries()) {
      const byX = new Map(points.map(p => [String(p.xLabel), p]));
      const dataArr = categories.map(cat => {
        const p = byX.get(String(cat));
        return p
          ? { y: p.y, custom: { html: p.html, raw: p.raw } }
          : { y: 0 };
      });
      series.push({
        name,
        data: dataArr,
        color: colorMap.get(name),
        visible: !deselectSet.has(name)
      });
    }

    // sort legend (and stacking order) alphabetically if required
    if (config.legend_sort_alpha) {
      series.sort((a, b) => a.name.localeCompare(b.name));
    }

    const viz = this;

    Highcharts.chart("area_chart", {
      chart: {
        type: "area",
        spacing: [10,10,10,10],
        height: element.clientHeight || 360
      },
      title: { text: null },
      exporting: { enabled: false },

      xAxis: {
        categories,
        reversed: !!config.reverse_x_axis,
        title: { text: config.x_axis_title || null },
        tickmarkPlacement: "on",
        labels: {
          step: Number.isFinite(+config.x_label_step) && +config.x_label_step > 0 ? +config.x_label_step : 1
        }
      },

      yAxis: {
        min: 0,
        title: { text: (config.y_axis_title && config.y_axis_title.trim()) ? config.y_axis_title.trim() : (vF.label_short || vF.label) }
      },

      legend: {
        align: "center",
        verticalAlign: "bottom"
      },

      plotOptions: {
        area: {
          stacking: "normal",
          marker: { enabled: !!config.show_markers, radius: 3 },
          opacity: Math.max(0, Math.min(1, +config.area_opacity || 0.6)),
          cursor: "pointer",
          point: {
            events: {
              click: function () {
                const raw = this.custom?.raw;
                if (raw == null) return;
                viz.trigger("filter", [{
                  field: sF.name,
                  value: String(raw),
                  formatted: String(this.series.name)
                }]);
              }
            }
          }
        }
      },

      tooltip: {
        useHTML: !!config.use_tooltip_field,
        className: "sa-tooltip",
        outside: true,
        style: { color: "#000", whiteSpace: "nowrap" },
        formatter: function () {
          const wrap = (html) => `<span class="sa-tip-inner">${html}</span>`;
          if (config.use_tooltip_field && this.point?.custom?.html) {
            return wrap(this.point.custom.html);
          }
          return wrap(`<b>${this.series.name}</b><br/>${this.x}: <b>${Highcharts.numberFormat(this.y, 4)}</b>`);
        }
      },

      series
    });
  }
});
