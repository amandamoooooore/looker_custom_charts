// Utility: load a script once, return a Promise
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
  id: "stacked_bar_with_line_clean_legend",
  label: "Stacked Bar + Line (hide empty series)",

  options: {
    // ---- DATA ----
    x_dim: {
      label: "X-Axis Dimension",
      type: "string",
      display: "select",
      values: {},                 
      section: "Data"
    },
    line_measure: {
      label: "Line Measure",
      type: "string",
      display: "select",
      values: {},
      section: "Data"
    },
    stacked_measures: {
      label: "Stacked Measures",
      type: "array",
      display: "select",
      values: {},
      section: "Data"
    },

    // ---- BEHAVIOR ----
    treat_zero_as_empty: {
      label: "Hide series that are all 0",
      type: "boolean",
      default: true,
      section: "Behavior"
    },

    // ---- STYLE ----
    custom_colors: {
      label: "Custom Color Palette (comma-separated HEX codes)",
      type: "string",
      default: "#7e8080,#5170D2,#9EE9E8,#252B5B,#161A3C,#38687D,#C5CFF1,#62D4D1,#161A3A",
      section: "Style"
    },
    series_labels: {
      label: "Custom Series Labels (JSON: {\"Field Label\":\"Legend Label\"})",
      type: "string",
      section: "Style",
      placeholder: "{\"Calls\":\"Phone Calls\",\"Emails\":\"Outbound Emails\"}"
    }
  },

  create(element, config) {
    element.innerHTML = "<div id='sbwl_chart' style='width:100%;height:100%;'></div>";
    this._hcReady = (async () => {
      await loadScriptOnce("https://code.highcharts.com/highcharts.js");
      await loadScriptOnce("https://code.highcharts.com/modules/exporting.js");
      await loadScriptOnce("https://code.highcharts.com/modules/accessibility.js");
    })();
  },

  _fieldByName(fields, name) {
    return fields.find(f => f.name === name);
  },

  async update(data, element, config, queryResponse) {
    await this._hcReady;

    const dims = queryResponse.fields.dimension_like || [];
    const meas = queryResponse.fields.measure_like || [];

    // --- Build choice maps for selects
    const dimChoices = {};
    dims.forEach(d => dimChoices[d.name] = d.label_short || d.label || d.name);

    const measChoices = {};
    meas.forEach(m => measChoices[m.name] = m.label_short || m.label || m.name);

    // --- Provide sensible defaults
    if (!config.x_dim && dims[0]) config.x_dim = dims[0].name;
    if (!config.line_measure && meas[0]) config.line_measure = meas[0].name;
    if (!config.stacked_measures || config.stacked_measures.length === 0) {
      config.stacked_measures = meas.filter(m => m.name !== config.line_measure).map(m => m.name);
    }

    // --- Re-register ONLY the select options so the side panel shows Data/Behavior/Style correctly
    this.trigger('registerOptions', {
      options: {
        x_dim:            { values: dimChoices, section: "Data" },
        line_measure:     { values: measChoices, section: "Data" },
        stacked_measures: { values: measChoices, section: "Data" }
        // do NOT include custom_colors or series_labels here, or they'll turn into [object Object]
      }
    });

    // --- Parse custom color palette
    const palette = (config.custom_colors || "")
      .split(/\s*,\s*/)            // split by commas, trim spaces
      .map(c => c.replace(/;$/, "")) // drop trailing semicolons if pasted
      .filter(Boolean);

    // --- Parse custom legend labels map
    let labelMap = {};
    if (typeof config.series_labels === "string" && config.series_labels.trim()) {
      try { labelMap = JSON.parse(config.series_labels); }
      catch (e) { console.warn("Invalid JSON in series_labels:", e); }
    }

    // --- Categories (X axis)
    const xField = this._fieldByName(dims, config.x_dim) || dims[0];
    const categories = xField
      ? data.map(r => (r[xField.name] && (r[xField.name].rendered || r[xField.name].value)) || "")
      : data.map((_, i) => String(i + 1));

    // --- Helper: map field label through overrides
    const displayNameFor = (field) => {
      const def = field.label_short || field.label || field.name;
      return labelMap[def] || def;
    };

    // --- Build stacked column series
    const stackedSeries = (config.stacked_measures || [])
      .map(n => this._fieldByName(meas, n))
      .filter(Boolean)
      .map(m => {
        const vals = data.map(r => {
          const cell = r[m.name];
          const v = cell && (cell.value !== undefined ? cell.value : null);
          return v == null ? null : Number(v);
        });
        return {
          name: displayNameFor(m),
          type: "column",
          data: vals,
          stacking: "normal"
          // no per-series color -> global palette applies
        };
      });

    // --- Optional line series
    let lineSeries = null;
    if (config.line_measure) {
      const lm = this._fieldByName(meas, config.line_measure);
      if (lm) {
        const vals = data.map(r => {
          const cell = r[lm.name];
          const v = cell && (cell.value !== undefined ? cell.value : null);
          return v == null ? null : Number(v);
        });
        lineSeries = {
          name: displayNameFor(lm),
          type: "spline",
          yAxis: 1,
          data: vals,
          marker: { enabled: true }
          // uncomment to force a specific line colour:
          // color: "#111111"
        };
      }
    }

    // --- Filter away empty series so legend doesn't show them
    const treatZero = !!config.treat_zero_as_empty;
    const isEmpty = arr => !arr.some(v => v != null && (!treatZero ? true : v !== 0));

    const cleanedStacked = stackedSeries.filter(s => !isEmpty(s.data));
    const finalSeries = (lineSeries ? cleanedStacked.concat([lineSeries]) : cleanedStacked)
      .filter(s => !isEmpty(s.data));

    // --- Render chart with palette
    Highcharts.chart("sbwl_chart", {
      chart: { spacing: [10,10,10,10] },
      colors: palette.length ? palette : undefined,
      title: { text: null },
      xAxis: { categories, tickmarkPlacement: "on" },
      yAxis: [
        { title: { text: null } },
        { title: { text: null }, opposite: true }
      ],
      legend: { enabled: true },
      tooltip: { shared: true },
      plotOptions: {
        column: { stacking: "normal", borderWidth: 0 },
        series: { animation: false }
      },
      series: finalSeries
    });
  }
});
