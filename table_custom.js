// --- Load a script once ---
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
  id: "simple_highcharts_grid",
  label: "Simple Highcharts Grid (Cross-filter)",
  supports: { crossfilter: true },

  options: {
    click_field: {
      label: "Field to filter on",
      type: "string",
      default: ""
    }
  },

  create(element) {
    element.innerHTML = "<div id='hc_grid_container' style='width:100%;height:100%;'></div>";

    // Load ONLY what we need
    this._hcReady = (async () => {
      await loadScriptOnce("https://code.highcharts.com/highcharts.js");
      await loadScriptOnce("https://code.highcharts.com/modules/heatmap.js");
    })();
  },

  async updateAsync(data, element, config, queryResponse, details, done) {
    await this._hcReady;

    const container = document.getElementById("hc_grid_container");

    const dims  = queryResponse.fields.dimension_like  || [];
    const meas  = queryResponse.fields.measure_like     || [];
    const fields = [...dims, ...meas];

    if (fields.length === 0) {
      container.innerHTML = "Add some fields.";
      done();
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = "No data.";
      done();
      return;
    }

    // Build table structure
    const xCats = fields.map(f => f.label_short || f.label || f.name);
    const yCats = data.map((_, i) => "Row " + (i + 1));

    // Build heatmap points (1 point per cell)
    const points = [];

    data.forEach((row, rowIndex) => {
      fields.forEach((field, colIndex) => {
        const cell = row[field.name];
        let display = cell?.rendered ?? cell?.value ?? "";

        points.push({
          x: colIndex,
          y: rowIndex,
          value: 1,                   // all cells equal — no coloring yet
          custom: {
            raw: cell?.value ?? null,
            fieldName: field.name,
            display: display
          }
        });
      });
    });

    const viz = this;

    Highcharts.chart("hc_grid_container", {
      chart: {
        type: "heatmap",
        inverted: true,
        height: element.clientHeight || 500
      },

      title: { text: null },
      credits: { enabled: false },
      exporting: { enabled: false },

      xAxis: {
        categories: xCats
      },
      yAxis: {
        categories: yCats,
        title: null,
        reversed: true
      },

      legend: { enabled: false },

      tooltip: {
        formatter: function () {
          return this.point.custom.display;
        }
      },

      plotOptions: {
        series: {
          borderWidth: 1,
          borderColor: "#DDD",
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.custom.display;
            },
            style: {
              textOutline: "none",
              color: "#000",
              fontSize: "11px"
            }
          },
          cursor: "pointer",
          point: {
            events: {
              click: function () {
                let fieldToFilter = config.click_field || this.point.custom.fieldName;
                let raw = this.point.custom.raw;

                if (raw == null) return;

                viz.trigger("filter", [{
                  field: fieldToFilter,
                  value: String(raw),
                  formatted: String(raw)
                }]);
              }
            }
          }
        }
      },

      colorAxis: {
        min: 0,
        max: 1,
        stops: [[0, "#ffffff"], [1, "#ffffff"]]  // pure white for all cells
      },

      series: [{
        data: points
      }]
    });

    done();
  }
});
