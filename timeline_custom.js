//fix for no data

looker.plugins.visualizations.add({
  id: "custom_timeline",
  label: "Custom Timeline (Highcharts)",

  options: {
    boxCount: {
      type: "number",
      label: "Number of boxes",
      default: 5,
      min: 1,
      section: "Chart"
    },
    showTooltipHeader: {
      type: "boolean",
      label: "Show tooltip header",
      default: true,
      section: "Tooltip"
    },
    showSummary: {
      type: "boolean",
      label: "Show summary text",
      default: false,
      section: "Summary"
    },
    summaryText: {
      type: "string",
      label: "Summary text",
      default: "",
      section: "Summary"
    },
    startColor: {
      type: "string",
      label: "Gradient start color (hex)",
      default: "#2AA7FF",
      section: "Colors"
    },
    endColor: {
      type: "string",
      label: "Gradient end color (hex)",
      default: "#1D3B8B",
      section: "Colors"
    }
  },

  create: function (element) {
    const uid = "hc_timeline_" + Math.random().toString(16).slice(2);
    this._uid = uid;

    element.innerHTML =
      '<style>' +
        '.hc-timeline-wrap { width: 100%; height: 100%; }' +
        '.hc-timeline-empty { padding:12px; font: 12px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; color:#444; }' +
        '#' + uid + ' .highcharts-tooltip {' +
          'background:#ffffff !important;' +
          'opacity:1 !important;' +
          'filter:none !important;' +
          'box-shadow:0 2px 10px rgba(0,0,0,0.25) !important;' +
          'border-radius:4px !important;' +
        '}' +
        '#' + uid + ' .highcharts-tooltip span {' +
          'background:#ffffff !important;' +
          'opacity:1 !important;' +
          'display:block !important;' +
          'margin:0 !important;' +
          'padding:0 !important;' +
          'border-radius:4px !important;' +
        '}' +
      '</style>' +
      '<div id="' + uid + '" class="hc-timeline-wrap"></div>';

    this._container = element.querySelector("#" + uid);
    this._chart = null;
  },

  _destroyChart: function () {
    // Destroy existing Highcharts chart safely and reset container
    try {
      if (this._chart && typeof this._chart.destroy === "function") {
        this._chart.destroy();
      }
    } catch (e) {
      // swallow – we just want a clean slate
    } finally {
      this._chart = null;
    }

    if (this._container) {
      // remove any Highcharts marker attribute to avoid stale references
      try {
        this._container.removeAttribute("data-highcharts-chart");
      } catch (e) {}

      // clear DOM
      this._container.innerHTML = "";
    }
  },

  // -------- Gradient helpers --------
  _normalizeHex: function (hex) {
    if (!hex) return null;
    let h = String(hex).trim();
    if (!h.startsWith("#")) h = "#" + h;
    if (h.length === 4) h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
    return /^#[0-9a-fA-F]{6}$/.test(h) ? h : null;
  },

  _hexToRgb: function (hex) {
    const h = hex.replace("#", "");
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16)
    };
  },

  _rgbToHex: function (rgb) {
    const to2 = (n) =>
      Math.max(0, Math.min(255, Math.round(n)))
        .toString(16)
        .padStart(2, "0");
    return "#" + to2(rgb.r) + to2(rgb.g) + to2(rgb.b);
  },

  _lerpColor: function (startHex, endHex, t) {
    const a = this._hexToRgb(startHex);
    const b = this._hexToRgb(endHex);
    return this._rgbToHex({
      r: a.r + (b.r - a.r) * t,
      g: a.g + (b.g - a.g) * t,
      b: a.b + (b.b - a.b) * t
    });
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    const finish = () => typeof done === "function" && done();

    try {
      const Highcharts =
        (typeof window !== "undefined" && window.Highcharts) ||
        (typeof globalThis !== "undefined" && globalThis.Highcharts);

      if (!Highcharts) {
        this._destroyChart();
        this._container.innerHTML = '<div class="hc-timeline-empty">Highcharts is not available globally.</div>';
        finish();
        return;
      }

      if (
        !queryResponse ||
        !queryResponse.fields ||
        !queryResponse.fields.dimension_like ||
        !queryResponse.fields.dimension_like.length
      ) {
        this._destroyChart();
        this._container.innerHTML = '<div class="hc-timeline-empty">No dimension fields found.</div>';
        finish();
        return;
      }

      if (!data || !data.length) {
        // IMPORTANT: destroy any existing chart before showing message
        this._destroyChart();
        this._container.innerHTML = '<div class="hc-timeline-empty">No data returned.</div>';
        finish();
        return;
      }

      const dims = queryResponse.fields.dimension_like;
      const row = data[0];

      const readValue = (fieldName) => {
        const v = row[fieldName];
        if (v == null) return "";
        if (typeof v === "object") {
          return v.rendered != null ? v.rendered : (v.value != null ? v.value : "");
        }
        return v;
      };

      // ---------- robust tile/tooltip selection ----------
      const isIdLike = (d) => {
        const n = String(d.name || "").toLowerCase();
        const l = String(d.label || "").toLowerCase();
        return (
          n.indexOf("id") !== -1 ||
          l.indexOf("id") !== -1 ||
          n.indexOf("stock_item") !== -1 ||
          l.indexOf("stock item") !== -1
        );
      };

      const dimsToUse = dims.slice();
      if (dimsToUse.length && isIdLike(dimsToUse[0])) {
        dimsToUse.shift();
      }

      const isTooltipField = (d) => {
        const n = String(d.name || "").toLowerCase();
        const l = String(d.label || "").toLowerCase();
        return n.indexOf("tooltip") !== -1 || l.indexOf("tooltip") !== -1;
      };

      const tileFields = [];
      const tooltipFields = [];

      for (let i = 0; i < dimsToUse.length; i++) {
        const d = dimsToUse[i];
        if (isTooltipField(d)) tooltipFields.push(d.name);
        else tileFields.push(d.name);
      }

      if (!tooltipFields.length && tileFields.length > 1) {
        const altTiles = [];
        const altTips = [];
        for (let i = 0; i < dimsToUse.length; i += 2) {
          altTiles.push(dimsToUse[i].name);
          if (dimsToUse[i + 1]) altTips.push(dimsToUse[i + 1].name);
        }
        if (altTiles.length < tileFields.length) {
          tileFields.length = 0;
          tooltipFields.length = 0;
          for (let i = 0; i < altTiles.length; i++) tileFields.push(altTiles[i]);
          for (let i = 0; i < altTips.length; i++) tooltipFields.push(altTips[i]);
        }
      }

      if (!tileFields.length) {
        this._destroyChart();
        this._container.innerHTML =
          '<div class="hc-timeline-empty">No tile fields found.</div>';
        finish();
        return;
      }

      const count = Math.max(
        1,
        Math.min(tileFields.length, Number(config.boxCount) || tileFields.length)
      );
      const chosenTileFields = tileFields.slice(0, count);

      const startHex = this._normalizeHex(config.startColor) || "#2AA7FF";
      const endHex = this._normalizeHex(config.endColor) || "#1D3B8B";

      const total = chosenTileFields.length;
      const denom = Math.max(1, total - 1);

      const points = [];
      for (let idx = 0; idx < chosenTileFields.length; idx++) {
        const tileFieldName = chosenTileFields[idx];
        const tooltipFieldName = tooltipFields[idx] || "";

        const t = idx / denom;
        const accentColor = this._lerpColor(startHex, endHex, t);

        points.push({
          x: idx,
          name: String(readValue(tileFieldName) || ""),
          custom: {
            tooltipText: tooltipFieldName ? String(readValue(tooltipFieldName) || "") : ""
          },

          color: accentColor,
          marker: { fillColor: accentColor, lineColor: accentColor },

          connectorWidth: 0,

          dataLabels: { backgroundColor: "#FFFFFF", borderColor: accentColor }
        });
      }
      // ---------- END selection ----------

      const showSummary = !!config.showSummary;
      const showTooltipHeader = config.showTooltipHeader !== false;

      const chartOptions = {
        chart: {
          type: "timeline",
          spacingBottom: showSummary ? 60 : 20,
          animation: false
        },

        title: { text: null },
        subtitle: { text: null },

        caption: showSummary
          ? {
              text: config.summaryText || "",
              align: "center",
              verticalAlign: "bottom",
              style: { fontSize: "12px" }
            }
          : { text: null },

        exporting: { enabled: false },
        credits: { enabled: false },
        legend: { enabled: false },

        xAxis: {
          visible: false,
          minPadding: 0.1,
          maxPadding: 0.1
        },
        yAxis: { visible: false },

        tooltip: {
          useHTML: true,
          padding: 0,
          borderWidth: 3.5,
          shadow: true,
          style: { color: "#222" },
          formatter: function () {
            const fullHeader = (this.point && this.point.name) ? this.point.name : "";
            const body = (this.point && this.point.custom && this.point.custom.tooltipText)
              ? this.point.custom.tooltipText
              : "";

            if (!showTooltipHeader) {
              return '<div style="padding:12px">' + body + "</div>";
            }

            const idx = fullHeader.indexOf(":");
            let formattedHeader = fullHeader;

            if (idx !== -1) {
              const left = fullHeader.substring(0, idx);
              const right = fullHeader.substring(idx);
              formattedHeader = "<strong>" + left + "</strong>" + right;
            }

            return '<div style="padding:12px">' + formattedHeader + "<br><br>" + body + "</div>";
          }
        },

        plotOptions: {
          series: {
            lineWidth: 16,
            lineColor: null,
            borderWidth: 4,
            borderColor: "#ffffff",
            linecap: "square",

            dataLabels: {
              allowOverlap: true,
              alternate: true,
              borderRadius: 6,
              borderWidth: 2,
              padding: 10,
              useHTML: true,
              formatter: function () {
                const text = (this.point && this.point.name) ? this.point.name : "";
                const idx = text.indexOf(":");
                if (idx === -1) return text;

                const left = text.substring(0, idx + 1);
                const right = text.substring(idx + 1);
                return "<strong>" + left + "</strong>" + right;
              },
              style: {
                textOutline: "none",
                color: "#222"
              }
            },

            marker: {
              enabled: true,
              radius: 6
            }
          }
        },

        series: [{ data: points }]
      };

      // Ensure container is clean before (re)render
      // (especially after showing "No data" messages previously)
      if (!this._chart) {
        this._container.innerHTML = "";
      }

      if (this._chart) {
        this._chart.update(chartOptions, true, true, false);
      } else {
        this._chart = Highcharts.chart(this._container, chartOptions);
      }

      finish();
    } catch (err) {
      // If Highcharts gets into a bad state, destroy and show error (prevents cascade failures)
      this._destroyChart();
      this._container.innerHTML =
        '<div class="hc-timeline-empty">Error: ' +
        (err && err.message ? err.message : String(err)) +
        "</div>";
      finish();
    }
  }
});            section: "Colors"
        },
        endColor: {
            type: "string",
            label: "Gradient end color (hex)",
            default: "#1D3B8B",
            section: "Colors"
        }
    },

    create: function (element) {
        const uid = "hc_timeline_" + Math.random().toString(16).slice(2);
        this._uid = uid;

        element.innerHTML =
            '<style>' +
            '.hc-timeline-wrap { width: 100%; height: 100%; }' +
            '#' + uid + ' .highcharts-tooltip {' +
            'background:#ffffff !important;' +
            'opacity:1 !important;' +
            'filter:none !important;' +
            'box-shadow:0 2px 10px rgba(0,0,0,0.25) !important;' +
            'border-radius:4px !important;' +
            '}' +
            '#' + uid + ' .highcharts-tooltip span {' +
            'background:#ffffff !important;' +
            'opacity:1 !important;' +
            'display:block !important;' +
            'margin:0 !important;' +
            'padding:0 !important;' +
            'border-radius:4px !important;' +
            '}' +
            '</style>' +
            '<div id="' + uid + '" class="hc-timeline-wrap"></div>';

        this._container = element.querySelector("#" + uid);
        this._chart = null;
    },

    // -------- Gradient helpers --------
    _normalizeHex: function (hex) {
        if (!hex) return null;
        let h = String(hex).trim();
        if (!h.startsWith("#")) h = "#" + h;
        if (h.length === 4) h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
        return /^#[0-9a-fA-F]{6}$/.test(h) ? h : null;
    },

    _hexToRgb: function (hex) {
        const h = hex.replace("#", "");
        return {
            r: parseInt(h.slice(0, 2), 16),
            g: parseInt(h.slice(2, 4), 16),
            b: parseInt(h.slice(4, 6), 16)
        };
    },

    _rgbToHex: function (rgb) {
        const to2 = (n) =>
            Math.max(0, Math.min(255, Math.round(n)))
                .toString(16)
                .padStart(2, "0");
        return "#" + to2(rgb.r) + to2(rgb.g) + to2(rgb.b);
    },

    _lerpColor: function (startHex, endHex, t) {
        const a = this._hexToRgb(startHex);
        const b = this._hexToRgb(endHex);
        return this._rgbToHex({
            r: a.r + (b.r - a.r) * t,
            g: a.g + (b.g - a.g) * t,
            b: a.b + (b.b - a.b) * t
        });
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        const finish = () => typeof done === "function" && done();

        try {
            const Highcharts = (typeof window !== "undefined" && window.Highcharts) || (typeof globalThis !== "undefined" && globalThis.Highcharts);

            if (!Highcharts) {
                this._container.innerHTML = "Highcharts is not available globally.";
                finish();
                return;
            }

            if (!queryResponse || !queryResponse.fields || !queryResponse.fields.dimension_like || !queryResponse.fields.dimension_like.length) {
                this._container.innerHTML = "No dimension fields found.";
                finish();
                return;
            }

            if (!data || !data.length) {
                this._container.innerHTML = "No data returned.";
                finish();
                return;
            }

            const dims = queryResponse.fields.dimension_like;
            const row = data[0];

            const readValue = (fieldName) => {
                const v = row[fieldName];
                if (v == null) return "";
                if (typeof v === "object") return v.rendered != null ? v.rendered : (v.value != null ? v.value : "");
                return v;
            };

            // ---------- NEW: robust tile/tooltip selection ----------
            // 1) optionally skip an ID-like first field
            const isIdLike = (d) => {
                const n = String(d.name || "").toLowerCase();
                const l = String(d.label || "").toLowerCase();
                return n.indexOf("id") !== -1 || l.indexOf("id") !== -1 || n.indexOf("stock_item") !== -1 || l.indexOf("stock item") !== -1;
            };

            const dimsToUse = dims.slice(); // copy
            if (dimsToUse.length && isIdLike(dimsToUse[0])) {
                dimsToUse.shift();
            }

            const isTooltipField = (d) => {
                const n = String(d.name || "").toLowerCase();
                const l = String(d.label || "").toLowerCase();
                return n.indexOf("tooltip") !== -1 || l.indexOf("tooltip") !== -1;
            };

            const tileFields = [];
            const tooltipFields = [];

            for (let i = 0; i < dimsToUse.length; i++) {
                const d = dimsToUse[i];
                if (isTooltipField(d)) tooltipFields.push(d.name);
                else tileFields.push(d.name);
            }

            // Fallback: if everything got classified as tile (no tooltip fields),
            // attempt pairing by adjacent fields: [tile, tooltip, tile, tooltip...]
            if (!tooltipFields.length && tileFields.length > 1) {
                // if labels/names don't include tooltip, treat odd/even as pairs
                const altTiles = [];
                const altTips = [];
                for (let i = 0; i < dimsToUse.length; i += 2) {
                    altTiles.push(dimsToUse[i].name);
                    if (dimsToUse[i + 1]) altTips.push(dimsToUse[i + 1].name);
                }
                // only use this if it actually reduces tiles (i.e. looks like pairs)
                if (altTiles.length < tileFields.length) {
                    tileFields.length = 0;
                    tooltipFields.length = 0;
                    for (let i = 0; i < altTiles.length; i++) tileFields.push(altTiles[i]);
                    for (let i = 0; i < altTips.length; i++) tooltipFields.push(altTips[i]);
                }
            }

            if (!tileFields.length) {
                this._container.innerHTML =
                    "No tile fields found. Dimension names are:<br><pre style='white-space:pre-wrap'>" +
                    dims.map((d) => d.name).join("\n") +
                    "</pre>";
                finish();
                return;
            }

            const count = Math.max(1, Math.min(tileFields.length, Number(config.boxCount) || tileFields.length));
            const chosenTileFields = tileFields.slice(0, count);

            const startHex = this._normalizeHex(config.startColor) || "#2AA7FF";
            const endHex = this._normalizeHex(config.endColor) || "#1D3B8B";

            const total = chosenTileFields.length;
            const denom = Math.max(1, total - 1);

            const points = [];
            for (let idx = 0; idx < chosenTileFields.length; idx++) {
                const tileFieldName = chosenTileFields[idx];
                const tooltipFieldName = tooltipFields[idx] || ""; // positional pairing

                const t = idx / denom;
                const accentColor = this._lerpColor(startHex, endHex, t);

                points.push({
                    x: idx,
                    name: String(readValue(tileFieldName) || ""),
                    custom: { tooltipText: tooltipFieldName ? String(readValue(tooltipFieldName) || "") : "" },

                    color: accentColor,
                    marker: { fillColor: accentColor, lineColor: accentColor },

                    connectorWidth: 0,

                    dataLabels: { backgroundColor: "#FFFFFF", borderColor: accentColor }
                });
            }
            // ---------- END NEW selection ----------
            const showSummary = !!config.showSummary;
            const showTooltipHeader = config.showTooltipHeader !== false;

            const chartOptions = {
                chart: {
                    type: "timeline",
                    spacingBottom: showSummary ? 60 : 20,
                    animation: false
                },

                title: { text: null },
                subtitle: { text: null },

                caption: showSummary
                    ? {
                        text: config.summaryText || "",
                        align: "center",
                        verticalAlign: "bottom",
                        style: { fontSize: "12px" }
                    }
                    : { text: null },

                exporting: { enabled: false },
                credits: { enabled: false },
                legend: { enabled: false },

                xAxis: {
                    visible: false,
                    minPadding: 0.1,
                    maxPadding: 0.1
                },
                yAxis: { visible: false },

                tooltip: {
                    useHTML: true,
                    padding: 0,
                    borderWidth: 3.5,
                    shadow: true,
                    style: { color: "#222" },
                    formatter: function () {
                        const fullHeader = (this.point && this.point.name) ? this.point.name : "";
                        const body = (this.point && this.point.custom && this.point.custom.tooltipText) ? this.point.custom.tooltipText : "";

                        if (!showTooltipHeader) {
                            return '<div style="padding:12px">' + body + "</div>";
                        }

                        const idx = fullHeader.indexOf(":");
                        let formattedHeader = fullHeader;

                        if (idx !== -1) {
                            const left = fullHeader.substring(0, idx);
                            const right = fullHeader.substring(idx);
                            formattedHeader = "<strong>" + left + "</strong>" + right;
                        }

                        return '<div style="padding:12px">' + formattedHeader + "<br><br>" + body + "</div>";
                    }
                },

                plotOptions: {
                    series: {
                        lineWidth: 16,
                        lineColor: null,
                        borderWidth: 4,
                        borderColor: "#ffffff",
                        linecap: "square",

                        dataLabels: {
                            allowOverlap: true,
                            alternate: true,
                            borderRadius: 6,
                            borderWidth: 2,
                            padding: 10,
                            useHTML: true,
                            formatter: function () {
                                const text = (this.point && this.point.name) ? this.point.name : "";
                                const idx = text.indexOf(":");
                                if (idx === -1) return text;

                                const left = text.substring(0, idx + 1);
                                const right = text.substring(idx + 1);
                                return "<strong>" + left + "</strong>" + right;
                            },
                            style: {
                                textOutline: "none",
                                color: "#222"
                            }
                        },

                        marker: {
                            enabled: true,
                            radius: 6
                        }
                    }
                },

                series: [{ data: points }]
            };

            if (this._chart) {
                this._chart.update(chartOptions, true, true, false);
            } else {
                this._chart = Highcharts.chart(this._container, chartOptions);
            }

            finish();
        } catch (err) {
            this._container.innerHTML = "Error: " + (err && err.message ? err.message : String(err));
            finish();
        }
    }
});
