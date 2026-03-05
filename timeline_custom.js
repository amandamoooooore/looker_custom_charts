//fix for missing renders again

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
    var uid = "hc_timeline_" + Math.random().toString(16).slice(2);
    this._uid = uid;

    element.innerHTML =
      '<style>' +
        '.hc-timeline-wrap { width: 100%; height: 100%; position: relative; }' +
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

    // message element (never replace container.innerHTML after Highcharts runs)
    this._messageEl = document.createElement("div");
    this._messageEl.className = "hc-timeline-empty";
    this._messageEl.style.display = "none";
    this._container.appendChild(this._messageEl);
  },

  _showMessage: function (text) {
    this._destroyChart();
    if (this._messageEl) {
      this._messageEl.innerHTML = String(text || "");
      this._messageEl.style.display = "block";
    }
  },

  _hideMessage: function () {
    if (this._messageEl) {
      this._messageEl.style.display = "none";
      this._messageEl.innerHTML = "";
    }
  },

  _destroyChart: function () {
    try {
      if (this._chart && typeof this._chart.destroy === "function") {
        this._chart.destroy();
      }
    } catch (e) {}
    this._chart = null;

    if (!this._container) return;

    // remove stale marker if present
    try {
      this._container.removeAttribute("data-highcharts-chart");
    } catch (e) {}

    // remove all Highcharts-generated DOM nodes, but keep the message element
    var nodes = this._container.childNodes;
    for (var i = nodes.length - 1; i >= 0; i--) {
      var node = nodes[i];
      if (node === this._messageEl) continue;
      try {
        this._container.removeChild(node);
      } catch (e) {}
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
      var v = Math.max(0, Math.min(255, Math.round(n)));
      var s = v.toString(16);
      return s.length === 1 ? "0" + s : s;
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

      // we have data
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

      // fallback pairing by adjacent fields
      if (!tooltipFields.length && tileFields.length > 1) {
        var altTiles = [];
        var altTips = [];
        for (var j = 0; j < dimsToUse.length; j += 2) {
          altTiles.push(dimsToUse[j].name);
          if (dimsToUse[j + 1]) altTips.push(dimsToUse[j + 1].name);
        }
        if (altTiles.length < tileFields.length) {
          tileFields = altTiles;
          tooltipFields = altTips;
        }
      }

      if (!tileFields.length) {
        this._showMessage("No tile fields found.");
        finish();
        return;
      }

      var count = Math.max(1, Math.min(tileFields.length, Number(config.boxCount) || tileFields.length));
      var chosenTileFields = tileFields.slice(0, count);

      var startHex = this._normalizeHex(config.startColor) || "#2AA7FF";
      var endHex = this._normalizeHex(config.endColor) || "#1D3B8B";

      var total = chosenTileFields.length;
      var denom = Math.max(1, total - 1);

      var points = [];
      for (var idx = 0; idx < chosenTileFields.length; idx++) {
        var tileFieldName = chosenTileFields[idx];
        var tooltipFieldName = tooltipFields[idx] || "";

        var tt = idx / denom;
        var accentColor = this._lerpColor(startHex, endHex, tt);

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
        xAxis: { visible: false, minPadding: 0.1, maxPadding: 0.1 },
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
              style: { textOutline: "none", color: "#222" }
            },
            marker: { enabled: true, radius: 6 }
          }
        },

        series: [{ data: points }]
      };

      // Always recreate the chart cleanly (avoids stale DOM refs after "no data" states)
      this._destroyChart();
      this._chart = Highcharts.chart(this._container, chartOptions);

      finish();
    } catch (err) {
      var msg = (err && err.message) ? err.message : String(err);
      this._showMessage("Error: " + msg);
      finish();
    }
  }
});
