// --- load a script once, correctly waiting for onload ---
const _scriptPromises = {};

function loadScriptOnce(src) {
  // Re-use the same promise for every call to this src
  if (_scriptPromises[src]) return _scriptPromises[src];

  _scriptPromises[src] = new Promise((resolve, reject) => {
    // If a script tag already exists, hook onto its load/error instead of
    // resolving immediately (it might still be loading)
    let existing = document.querySelector('script[src="' + src + '"]');
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
      } else {
        existing.addEventListener("load", () => {
          existing.dataset.loaded = "true";
          resolve();
        });
        existing.addEventListener("error", () => {
          reject(new Error("Failed to load " + src));
        });
      }
      return;
    }

    // Create a new script tag
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => {
      s.dataset.loaded = "true";
      resolve();
    };
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });

  return _scriptPromises[src];
}

looker.plugins.visualizations.add({
  id: "stacked_bar_with_line_clean_legend",
  label: "Stacked Bar + Line (hide empty series)",

  // ---- Options shown in Looker side panel ----
  options: {
    // DATA
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

    // BEHAVIOR
    treat_zero_as_empty: {
      label: "Hide series that are all 0",
      type: "boolean",
      default: true,
      section: "Behavior"
    },
    show_stack_totals: {
      label: "Show total label on top of each stack",
      type: "boolean",
      default: true,
      section: "Behavior"
    },

    // STYLE
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
    },
    yaxis_left_title: {
      label: "Y Axis (Left) Title",
      type: "string",
      section: "Style",
      default: ""
    },
    yaxis_right_title: {
      label: "Y Axis (Right) Title",
      type: "string",
      section: "Style",
      default: ""
    }
  },

  create: function (element, config) {
    // Create a unique container for this instance
    element.innerHTML = "";
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100%";
    // no need for a fixed id; we store the node itself
    element.appendChild(container);

    // Save a reference to this container
    this._container = container;

    // Load Highcharts once
    this._hcReady = Promise.resolve()
      .then(() => loadScriptOnce("https://code.highcharts.com/highcharts.js"))
      .then(() => loadScriptOnce("https://code.highcharts.com/modules/exporting.js"))
      .then(() => loadScriptOnce("https://code.highcharts.com/modules/accessibility.js"))
      .catch(e => {
        console.error("Error loading Highcharts scripts:", e);
      });
  },

  _fieldByName(fields, name) {
    return fields.find(f => f.name === name);
  },

  // Use updateAsync + done so the renderer knows when we're finished
  updateAsync: function (data, element, config, queryResponse, details, done) {
    const self = this;
    const container = this._container;

    if (!container) {
      console.error("No container found for stacked_bar_with_line_clean_legend.");
      if (typeof done === "function") done();
      return;
    }

    if (!this._hcReady) {
      console.error("Highcharts not initialized (_hcReady missing).");
      if (typeof done === "function") done();
      return;
    }

    this._hcReady
      .then(function () {
        try {
          if (typeof Highcharts === "undefined") {
            console.error("Highcharts is undefined even after _hcReady resolved.");
            if (typeof done === "function") done();
            return;
          }

          const dims = queryResponse.fields.dimension_like || [];
          const meas = queryResponse.fields.measure_like || [];

          // ---- Build choice maps for the selects
          const dimChoices = {};
          dims.forEach(d => dimChoices[d.name] = d.label_short || d.label || d.name);

          const measChoices = {};
          meas.forEach(m => measChoices[m.name] = m.label_short || m.label || m.name);

          // ---- Defaults (once)
          if (!config.x_dim && dims[0]) config.x_dim = dims[0].name;
          if (!config.line_measure && meas[0]) config.line_measure = meas[0].name;
          if (!config.stacked_measures || config.stacked_measures.length === 0) {
            config.stacked_measures = meas
              .filter(m => m.name !== config.line_measure)
              .map(m => m.name);
          }

          // ---- Register/refresh the OPTIONS PANEL
          self.options.x_dim.values = dimChoices;
          self.options.line_measure.values = measChoices;
          self.options.stacked_measures.values = measChoices;
          self.trigger("registerOptions", self.options);

          // ---- Parse custom color palette
          const palette = (config.custom_colors || "")
            .split(/\s*,\s*/)
            .map(c => c.replace(/;$/, ""))
            .filter(Boolean);

          // ---- Parse custom legend label map
          let labelMap = {};
          if (typeof config.series_labels === "string" && config.series_labels.trim()) {
            try { labelMap = JSON.parse(config.series_labels); }
            catch (e) { console.warn("Invalid JSON in series_labels:", e); }
          }
          const labelFor = (field) => {
            const def = field.label_short || field.label || field.name;
            return labelMap[def] || def;
          };

          // ---- X Axis categories
          const xField = self._fieldByName(dims, config.x_dim) || dims[0];
          const categories = xField
            ? data.map(r => (r[xField.name] && (r[xField.name].rendered || r[xField.name].value)) || "")
            : data.map((_, i) => String(i + 1));

          // ---- Build stacked column series
          const stackedSeries = (config.stacked_measures || [])
            .map(n => self._fieldByName(meas, n))
            .filter(Boolean)
            .map(m => {
              const vals = data.map(r => {
                const cell = r[m.name];
                const v = cell && (cell.value !== undefined ? cell.value : null);
                return v == null ? null : Number(v);
              });
              return {
                name: labelFor(m),
                type: "column",
                data: vals,
                stacking: "normal"
              };
            });

          // ---- Optional line series
          let lineSeries = null;
          if (config.line_measure) {
            const lm = self._fieldByName(meas, config.line_measure);
            if (lm) {
              const vals = data.map(r => {
                const cell = r[lm.name];
                const v = cell && (cell.value !== undefined ? cell.value : null);
                return v == null ? null : Number(v);
              });
              lineSeries = {
                name: labelFor(lm),
                type: "spline",
                yAxis: 1,
                data: vals,
                marker: { enabled: true },
                color: "#7e8080"
              };
            }
          }

          // ---- Hide empty series (so legend doesn't show them)
          const treatZero = !!config.treat_zero_as_empty;
          const isEmpty = arr => !arr.some(v => v != null && (!treatZero ? true : v !== 0));
          const cleanedStacked = stackedSeries.filter(s => !isEmpty(s.data));
          const finalSeries = (lineSeries ? cleanedStacked.concat([lineSeries]) : cleanedStacked)
            .filter(s => !isEmpty(s.data));

          // ---- Render
          Highcharts.chart(container, {
            chart: {
              spacing: [10, 10, 10, 10],
              styledMode: false
            },
            credits: {
              enabled: false
            },
            exporting: { enabled: false }, // hide hamburger
            colors: palette.length ? palette : undefined,
            title: { text: null },
            xAxis: { categories, tickmarkPlacement: "on" },

            // Y axes with optional titles + stack totals on the primary (left) axis
            yAxis: [
              {
                title: { text: config.yaxis_left_title || null },
                stackLabels: {
                  enabled: !!config.show_stack_totals && cleanedStacked.length > 0,
                  style: { fontWeight: "bold", color: "#666" },
                  // Hide label if the total is 0 or null
                  formatter: function () {
                    const v = this.total;
                    return (v == null || v === 0)
                      ? ""
                      : Highcharts.numberFormat(v, 0);
                  }
                }
              },
              {
                title: { text: config.yaxis_right_title || null },
                opposite: true
              }
            ],

            legend: { enabled: true },
            tooltip: { shared: true },
            plotOptions: {
              column: { stacking: "normal", borderWidth: 0 },
              series: { animation: false }
            },
            series: finalSeries
          });

        } catch (e) {
          console.error("Error rendering stacked_bar_with_line_clean_legend:", e);
        }

        if (typeof done === "function") done();
      })
      .catch(function (e) {
        console.error("Error in _hcReady or rendering:", e);
        if (typeof done === "function") done();
      });
  }
});
