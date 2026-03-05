//fix for missing renders

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
    // In Looker, create() can be called once but updateAsync many times.
    // Keep a stable container element; don’t replace it later.
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
    this._messageEl = null; // created on-demand
  },

  _ensureMessageEl: function () {
    if (!this._container) return null;
    if (this._messageEl && this._messageEl.parentNode) return this._messageEl;

    var el = document.createElement("div");
    el.className = "hc-timeline-empty";
    el.style.display = "none";
    this._container.appendChild(el);
    this._messageEl = el;
    return el;
  },

  _showMessage: function (html) {
    // Don’t replace the container’s HTML once Highcharts has ever rendered into it.
    // Instead, destroy the chart and show a message overlay inside the same container.
    this._destroyChart();

    var msgEl = this._ensureMessageEl();
    if (!msgEl) return;

    msgEl.innerHTML = html;
    msgEl.style.display = "block";
  },

  _hideMessage: function () {
    if (this._messageEl) {
      this._messageEl.style.display = "none";
      this._messageEl.innerHTML = "";
    }
  },

  _destroyChart: function () {
    // Destroy existing Highcharts chart safely and reset container (but keep message node)
    try {
      if (this._chart && typeof this._chart.destroy === "function") {
        this._chart.destroy();
      }
    } catch (e) {
    } finally {
      this._chart = null;
    }

    if (this._container) {
      try {
        this._container.removeAttribute("data-highcharts-chart");
      } catch (e) {}

      // Remove any leftover Highcharts DOM nodes, but keep the message element if present
      var kids = this._container.childNodes;
      for (var i = kids.length - 1; i >= 0; i--) {
        var node = kids[i];
        if (node === this._messageEl) continue;
        try {
          this._container.removeChild(node);
        } catch (e) {}
      }
    }
  },

  // -------- Gradient helpers --------
  _normalizeHex: function (hex) {
    if (!hex) return null;
    var h = String(hex).trim();
    if (h.charAt(0) !== "#") h = "#" + h;
    if (h.length === 4) h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
    return /^#[0-9a-fA-F]{6}$/.test(h) ? h : null;
  },

  _hexToRgb: function (hex) {
    var h = hex.replace("#", "");
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16)
    };
  },

  _rgbToHex: function (rgb) {
    var to2 = function (n) {
      return Math.max(0, Math.min(255, Math.round(n)))
        .toString(16)
        .padStart(2, "0");
    };
    return "#" + to2(rgb.r) + to2(rgb.g) + to2(rgb.b);
  },

  _lerpColor: function (startHex, endHex, t) {
    var a = this._hexToRgb(startHex);
    var b = this._hexToRgb(endHex);
    return this._rgbToHex({
      r: a.r + (b.r - a.r) * t,
      g: a.g + (b.g - a.g) * t,
      b: a.b + (b.b - a.b) * t
    });
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    var finish = function () {
      if (typeof done === "function") done();
    };

    try {
      var Highcharts =
        (typeof window !== "undefined" && window.Highcharts) ||
        (typeof globalThis !== "undefined" && globalThis.Highcharts);

      if (!Highcharts) {
        this._showMessage("Highcharts is not available globally.");
        finish();
        return;
      }

      if (
        !queryResponse ||
        !queryResponse.fields ||
        !queryResponse.fields.dimension_like ||
        !queryResponse.fields.dimension_like.length
      ) {
        this._showMessage("No dimension fields found.");
        finish();
        return;
      }

      if (!data || !data.length) {
        this._showMessage("No data returned.");
        finish();
        return;
      }

      // We have data — ensure message is hidden and container is ready for Highcharts
      this._hideMessage();

      var dims = queryResponse.fields.dimension_like;
      var row = data[0];

      var readValue = function (fieldName) {
        var v = row[fieldName];
        if (v == null) return "";
        if (typeof v === "object") {
          return v.rendered != null ? v.rendered : (v.value != null ? v.value : "");
        }
        return v;
      };

      // ---------- robust tile/tooltip selection ----------
      var isIdLike = function (d) {
        var n = String(d.name || "").toLowerCase();
        var l = String(d.label || "").toLowerCase();
        return (
          n.indexOf("id") !== -1 ||
          l.indexOf("id") !== -1 ||
          n.indexOf("stock_item") !== -1 ||
          l.indexOf("stock item") !== -1
        );
      };

      var dimsToUse = dims.slice();
      if (dimsToUse.length && isIdLike(dimsToUse[0])) {
        dimsToUse.shift();
      }

      var isTooltipField = function (d) {
        var n = String(d.name || "").toLowerCase();
        var l = String(d.label || "").toLowerCase();
        return n.indexOf("tooltip") !== -1 || l.indexOf("tooltip") !== -1;
      };

      var tileFields = [];
      var tooltipFields = [];

      for (var i = 0; i < dimsToUse.length; i++) {
        var d = dimsToUse[i];
        if (isTooltipField(d)) tooltipFields.push(d.name);
        else tileFields.push(d.name);
      }

      if (!tooltipFields.length && tileFields.length > 1) {
        var altTiles = [];
        var altTips = [];
        for (var j = 0; j < dimsToUse.length; j += 2) {
          altTiles.push(dimsToUse[j].name);
          if (dimsToUse[j + 1]) altTips.push(dimsToUse[j + 1].name);
        }
        if (altTiles.length < tileFields.length) {
          tileFields.length = 0;
          tooltipFields.length = 0;
          for (var k = 0; k < altTiles.length; k++) tileFields.push(altTiles[k]);
          for (var m = 0; m < altTips.length; m++) tooltipFields.push(altTips[m]);
        }
      }

      if (!tileFields.length) {
        this._showMessage("No tile fields found.");
        finish();
        return;
      }

      var count = Math.max(
        1,
        Math.min(tileFields.length, Number(config.boxCount) || tileFields.length)
      );
      var chosenTileFields = tileFields.slice(0, count);

      var startHex = this._normalizeHex(config.startColor) || "#2AA7FF";
      var endHex = this._normalizeHex(config.endColor) || "#1D3B8B";

      var total = chosenTileFields.length;
      var denom = Math.max(1, total - 1);

      var points = [];
      for (var idx = 0; idx < chosenTileFields.length; idx++) {
        var tileFieldName = chosenTileFields[idx];
        var tooltipFieldName = tooltipFields[idx] || "";

        var t = idx / denom;
        var accentColor = this._lerpColor(startHex, endHex, t);

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

      var showSummary = !!config.showSummary;
      var showTooltipHeader = config.showTooltipHeader !== false;

      var chartOptions = {
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
            var fullHeader = (this.point && this.point.name) ? this.point.name : "";
            var body =
              (this.point && this.point.custom && this.point.custom.tooltipText)
                ? this.point.custom.tooltipText
                : "";

            if (!showTooltipHeader) {
              return '<div style="padding:12px">' + body + "</div>";
            }

            var p = fullHeader.indexOf(":");
            var formattedHeader = fullHeader;

            if (p !== -1) {
              var left = fullHeader.substring(0, p);
              var right = fullHeader.substring(p);
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
                var text = (this.point && this.point.name) ? this.point.name : "";
                var p = text.indexOf(":");
                if (p === -1) return text;

                var left = text.substring(0, p + 1);
                var right = text.substring(p + 1);
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

      // If we previously showed a message, Highcharts DOM might not exist.
      // Ensure the container only contains the message element (if any) before rendering.
      this._destroyChart();

      this._chart = Highcharts.chart(this._container, chartOptions);

      finish();
    } catch (err) {
      // Hard reset and show error. Avoid leaving a half-initialized Highcharts instance around.
      try {
        this._destroyChart();
      } catch (e) {}

      var msg = (err && err.message) ? err.message : String(err);
      this._showMessage("Error: " + msg);
      finish();
    }
  }
});      section: "Colors"
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
