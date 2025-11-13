// --- Load a script once 
function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

looker.plugins.visualizations.add({
  id: "simple_hc_column_crossfilter",
  label: "Simple Highcharts Column (Cross-filter)",
  supports: { crossfilter: true },

  options: {
    x_dim: {
      label: "X Dimension",
      type: "string",
      display: "select",
      values: []
    },
    value_measure: {
      label: "Value Measure",
      type: "string",
      display: "select",
      values: []
    },
    click_filter_field: {
      label: "Field to filter on (optional, defaults to X dimension)",
      type: "string",
      default: ""
    }
  },

  // one-time Highcharts loader
  _hcReady: null,

  create(element) {
    element.innerHTML = "<div id='simple_hc_container' style='width:100%;height:100%;'></div>";

    this._hcReady = (async () => {
      await loadScriptOnce("https://code.highcharts.com/highcharts.js");
    })();
  },

  _resolveField(fields, name) {
    if (!name) return undefined;
    return (fields || []).find(f => f.name === name);
  },

  async updateAsync(data, element, config, queryResponse, details, done) {
    await this._hcReady;

    const fields = queryResponse.fields || {};
    const dims  = fields.dimension_like || [];
    const meas  = fields.measure_like || [];

    // Build choices based on actual query fields
    const dimChoices  = dims.map(d => d.name);
    const measChoices = meas.map(m => m.name);

    // Set defaults if not chosen yet
    if (!config.x_dim && dimChoices[0])           config.x_dim = dimChoices[0];
    if (!config.value_measure && measChoices[0])  config.value_measure = measChoices[0];

    this.options.x_dim.values         = dimChoices;
    this.options.value_measure.values = measChoices;
    this.trigger("registerOptions", this.options);

    const xField = this._resolveField(dims, config.x_dim);
    const vField = this._resolveField(meas, config.value_measure);

    const container = document.getElementById("simple_hc_container");
    if (!xField || !vField) {
      container.innerHTML = "<div style='padding:12px;color:#666'>Select 1 dimension and 1 measure, then click <b>Run</b>.</div>";
      done();
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = "<div style='padding:12px;color:#666'>No data.</div>";
      done();
      return;
    }

    // Helpers
    const getRaw = (row, field) => {
      const cell = row[field.name];
      if (!cell) return null;
      return ('value' in cell) ? cell.value : null;
    };
    const getRendered = (row, field) => {
      const cell = row[field.name];
      if (!cell) return null;
      return cell.rendered ?? cell.value ?? null;
    };
    const getNum = (row, field) => {
      const cell = row[field.name];
      if (!cell || !('value' in cell)) return null;
      const n = Number(cell.value);
      return Number.isFinite(n) ? n : null;
    };

    // Build categories and series data
    const categories = [];
    const seriesData = [];

    data.forEach(row => {
      const rawX = getRaw(row, xField);
      const labelX = getRendered(row, xField);
      const y = getNum(row, vField);
      if (labelX == null || y == null) return;

      categories.push(String(labelX));
      seriesData.push({
        y,
        custom: {
          rawX,
          labelX
        }
      });
    });

    if (!categories.length) {
      container.innerHTML = "<div style='padding:12px;color:#666'>No valid data points.</div>";
      done();
      return;
    }

    const viz = this;

    // Decide which field to filter on when clicking
    const clickFieldName = (config.click_filter_field || xField.name || "").trim();

    Highcharts.chart("simple_hc_container", {
      chart: {
        type: "column",
        spacing: [10, 10, 10, 10],
        height: element.clientHeight || 360
      },
      title: { text: null },
      credits: { enabled: false },
      exporting: { enabled: false },

      xAxis: {
        categories,
        title: { text: xField.label_short || xField.label || null }
      },
      yAxis: {
        title: { text: vField.label_short || vField.label || null },
        min: 0
      },

      tooltip: {
        pointFormat: `<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>`,
        shared: true
      },

      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          cursor: config.enable_click_filter ? "pointer" : "default",
          point: {
            events: {
              click: function () {
                if (!clickFieldName) return;
                const raw = this.custom?.rawX;
                const lbl = this.custom?.labelX;
                if (raw == null) return;

                // Cross-filter event (Explore + Dashboards)
                viz.trigger("filter", [{
                  field: clickFieldName,
                  value: String(raw),
                  formatted: String(lbl)
                }]);
              }
            }
          }
        }
      },

      series: [{
        name: vField.label_short || vField.label || vField.name,
        data: seriesData
      }]
    });

    done();
  }
});
