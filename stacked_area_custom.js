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

    // --- PRICE FLAGS (by column number) ---
    show_price_flags: { label: "Show Price Change Flags", type: "boolean", default: true, section: "Price Flags" },
    price_change_flag_col: { label: "Price Change Flag Column (1-based)", type: "number", default: 4, section: "Price Flags" },
    price_change_tooltip_col: { label: "Price Change Tooltip Column (1-based)", type: "number", default: 10, section: "Price Flags" },
    show_price_flag_lines: { label: "Show Vertical Flag Lines", type: "boolean", default: true, section: "Price Flags" },
    price_flag_icon: { label: "Flag Icon Text", type: "string", default: "£", section: "Price Flags" },

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
    legend_sort_alpha: { label: "Sort Legend A→Z", type: "boolean", default: false, section: "Legend" },
    legend_deselected_values: { label: "Auto-deselect Series (comma/newline)", type: "string", default: "", section: "Legend" }
  },

  create(element) {
    element.innerHTML = "<div id='area_chart' style='width:100%;height:100%;'></div>";

    if (!document.getElementById("sa_area_css")) {
      const css = document.createElement("style");
      css.id = "sa_area_css";
      css.textContent = `
        .highcharts-tooltip.sa-tooltip > span {
          background: #fff !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 6px !important;
          padding: 6px 10px !important;
          color: #000 !important;
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
    const lines = String(str).split(/\n|,/);
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

    const dimChoices  = (dims || []).map(d => d && d.name).filter(Boolean);
    const measChoices = (meas || []).map(m => m && m.name).filter(Boolean);

    if (!config.x_dim && dimChoices[0])                         config.x_dim = dimChoices[0];
    if (!config.series_dim && (dimChoices[1] || dimChoices[0]))  config.series_dim = dimChoices[1] || dimChoices[0];
    if (!config.value_measure && measChoices[0])                config.value_measure = measChoices[0];

    this.options.x_dim.values         = dimChoices;
    this.options.series_dim.values    = dimChoices;
    this.options.value_measure.values = measChoices;
    this.trigger("registerOptions", this.options);

    const xF = this._resolveField(dims, config.x_dim);
    const sF = this._resolveField(dims, config.series_dim);
    const vF = this._resolveField(meas, config.value_measure);
    const tooltipF = config.use_tooltip_field ? (meas[1] || null) : null;

    const orderedFields = [...dims, ...meas];
    const fieldByCol = (col1Based) => {
      const idx = Math.floor(Number(col1Based)) - 1;
      if (!Number.isFinite(idx) || idx < 0 || idx >= orderedFields.length) return null;
      return orderedFields[idx];
    };

    const flagF = fieldByCol(config.price_change_flag_col);
    const flagTipF = fieldByCol(config.price_change_tooltip_col);

    const container = document.getElementById("area_chart");
    if (!xF || !sF || !vF) {
      container.innerHTML = "<div style='padding:12px;color:#666'>Select 2 dimensions and 1 measure, then click <b>Run</b>.</div>";
      return;
    }
    if (!data || data.length === 0) {
      this._showNoData(container, config.no_data_message);
      return;
    }

    const getCell = (row, f) => (row && f && row[f.name]) ? row[f.name] : null;
    const getRendered = (row, f) => {
      const c = getCell(row, f);
      if (!c) return null;
      return c.html ?? c.rendered ?? c.value ?? null;
    };
    const getRaw = (row, f) => {
      const c = getCell(row, f);
      if (!c) return null;
      if ("value" in c) return c.value;
      return null;
    };
    const getNum = (row, f) => {
      const c = getCell(row, f);
      const v = Number(c?.value);
      return Number.isFinite(v) ? v : null;
    };

    const isTruthy = (v) => {
      if (v === true) return true;
      if (v === false || v == null) return false;
      if (typeof v === "number") return v === 1;
      const s = String(v).trim().toLowerCase();
      return s === "yes" || s === "true" || s === "1" || s === "y" || s === "t";
    };

    // GBP formatter + replace logic (applied to price-flag tooltip text only)
    const gbpFormatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0
    });

    // updated
    const formatGBPInText = (text) => {
      if (text == null) return null;
    
      return String(text).replace(
        /(?<![£\d,])(-?\d{1,3}(?:,\d{3})*|\d+)(?![\d.%])/g,
        (match) => {
          const numeric = Number(match.replace(/,/g, ""));
          if (!Number.isFinite(numeric)) return match;
          return gbpFormatter.format(numeric);
        }
      );
    };

    const normalizeTooltip = (val) => {
      if (val == null) return null;
      if (typeof val === "object") {
        try { return formatGBPInText(JSON.stringify(val)); } catch { return formatGBPInText(String(val)); }
      }
      return formatGBPInText(String(val));
    };

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
    const seriesMap = new Map();
    const priceChangeByX = new Map();

    data.forEach(row => {
      const xLabel = String(getRendered(row, xF));
      const sLabel = String(getRendered(row, sF));
      const y = getNum(row, vF);
      if (xLabel == null || sLabel == null || y == null) return;

      if (!usingForcedX) categoriesSet.add(xLabel);

      if (config.show_price_flags && flagF) {
        const flagVal = getRaw(row, flagF) ?? getRendered(row, flagF);
        const changed = isTruthy(flagVal);

        if (changed && !priceChangeByX.has(xLabel)) {
          const tipVal = flagTipF ? (getRendered(row, flagTipF) ?? getRaw(row, flagTipF)) : null;
          priceChangeByX.set(xLabel, { changed: true, tip: normalizeTooltip(tipVal) });
        }
      }

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

    const colorMap = this._parseColorMap(config.series_color_map);
    const deselectSet = this._parseListToSet(config.legend_deselected_values);

    function buildSeriesDataWithDrops(categories, byX) {
      const arr = categories.map(cat => {
        const p = byX.get(String(cat));
        if (!p) return null;
        if (p.y == null || p.y <= 0) return null;
        return { y: p.y, custom: { html: p.html, raw: p.raw } };
      });

      const isActive = (idx) => (arr[idx] && typeof arr[idx].y === "number" && arr[idx].y > 0);

      let i = 0;
      while (i < arr.length) {
        if (!isActive(i)) { i++; continue; }

        const start = i;
        while (i + 1 < arr.length && isActive(i + 1)) i++;
        const end = i;

        if (start - 1 >= 0 && arr[start - 1] == null) arr[start - 1] = { y: 0, custom: { isDropZero: true } };
        if (end + 1 < arr.length && arr[end + 1] == null) arr[end + 1] = { y: 0, custom: { isDropZero: true } };

        i++;
      }

      for (let k = 0; k < arr.length; k++) {
        if (!isActive(k)) continue;
        const leftY = (k - 1 >= 0 && arr[k - 1]) ? arr[k - 1].y : null;
        const rightY = (k + 1 < arr.length && arr[k + 1]) ? arr[k + 1].y : null;

        if (leftY === 0 && rightY === 0) {
          arr[k].marker = { enabled: true, radius: 4 };
        }
      }

      return arr;
    }

    let series = [];
    for (const [name, points] of seriesMap.entries()) {
      const byX = new Map(points.map(p => [String(p.xLabel), p]));
      const dataArr = buildSeriesDataWithDrops(categories, byX);

      series.push({
        type: "area",
        name,
        data: dataArr,
        color: colorMap.get(name),
        visible: !deselectSet.has(name),
        connectNulls: false,
        lineWidth: 2
      });
    }

    if (config.legend_sort_alpha) {
      series.sort((a, b) => a.name.localeCompare(b.name));
    }

    const totals = categories.map((_, idx) =>
      series.reduce((sum, s) => sum + (s.data?.[idx]?.y || 0), 0)
    );
    const maxTotal = Math.max(...totals, 0);

    const markerRadius = 18;
    const circleStrokeWidth = 3;
    const lineStrokeWidth = 3;

    const flagPoints = [];
    if (config.show_price_flags && priceChangeByX.size > 0) {
      categories.forEach((cat, idx) => {
        const info = priceChangeByX.get(String(cat));
        if (info?.changed) {
          flagPoints.push({
            x: idx,
            y: maxTotal || 0,
            custom: { isPriceFlag: true, tip: info.tip }
          });
        }
      });
    }

    if (flagPoints.length) {
      series.push({
        id: "price-change-flags",
        type: "scatter",
        name: "Price change",
        showInLegend: false,
        data: flagPoints,
        marker: {
          symbol: "circle",
          radius: markerRadius,
          fillColor: "rgba(255,255,255,1)",
          lineColor: "#0b1020",
          lineWidth: circleStrokeWidth
        },
        dataLabels: {
          enabled: true,
          allowOverlap: true,
          crop: false,
          overflow: "allow",
          align: "center",
          verticalAlign: "middle",
          formatter: function () { return (config.price_flag_icon || "£"); },
          style: {
            fontSize: "18px",
            fontWeight: "800",
            color: "#0b1020",
            textOutline: "none"
          }
        },
        zIndex: 10,
        enableMouseTracking: true,
        clip: false
      });
    }

    const viz = this;

    Highcharts.chart("area_chart", {
      chart: {
        type: "area",
        spacing: [10,10,10,10],
        height: element.clientHeight || 360,

        events: {
          render: function () {
            const chart = this;

            if (chart._priceFlagLinesGroup) {
              chart._priceFlagLinesGroup.destroy();
              chart._priceFlagLinesGroup = null;
            }
            if (chart._customXAxisLine) {
              chart._customXAxisLine.destroy();
              chart._customXAxisLine = null;
            }

            const plotBottomPix = Math.round(chart.plotTop + chart.plotHeight + 1);

            chart._customXAxisLine = chart.renderer
              .path(["M", chart.plotLeft, plotBottomPix, "L", chart.plotLeft + chart.plotWidth, plotBottomPix])
              .attr({
                stroke: "#000000",
                "stroke-width": 2,
                "stroke-linecap": "square",
                zIndex: 100
              })
              .add();

            if (!config.show_price_flag_lines) return;

            const flagSeries = chart.get("price-change-flags");
            if (!flagSeries || !flagSeries.points || !flagSeries.points.length) return;

            chart._priceFlagLinesGroup = chart.renderer
              .g("price-flag-lines")
              .attr({ zIndex: 90 })
              .add();

            flagSeries.points.forEach((pt) => {
              if (pt.isNull || pt.plotX == null || pt.plotY == null) return;

              const xPix = chart.plotLeft + pt.plotX;
              const yCenterPix = chart.plotTop + pt.plotY;

              const yEndPix = Math.min(
                yCenterPix + markerRadius + (circleStrokeWidth / 2),
                plotBottomPix
              );

              chart.renderer
                .path(["M", xPix, plotBottomPix, "L", xPix, yEndPix])
                .attr({
                  stroke: "#0b1020",
                  "stroke-width": lineStrokeWidth,
                  "stroke-linecap": "square",
                  zIndex: 90
                })
                .add(chart._priceFlagLinesGroup);
            });
          }
        }
      },

      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },

      xAxis: {
        categories,
        reversed: !!config.reverse_x_axis,
        title: { text: config.x_axis_title || null },
        tickmarkPlacement: "on",
        labels: {
          step: Number.isFinite(+config.x_label_step) && +config.x_label_step > 0 ? +config.x_label_step : 1
        },
        lineWidth: 0
      },

      yAxis: {
        min: 0,
        title: {
          text: (config.y_axis_title && config.y_axis_title.trim())
            ? config.y_axis_title.trim()
            : (vF.label_short || vF.label)
        }
      },

      legend: { align: "center", verticalAlign: "bottom" },

      plotOptions: {
        series: { clip: false },
        area: {
          stacking: "normal",
          connectNulls: false,
          marker: { enabled: !!config.show_markers, radius: 3 },
          opacity: Math.max(0, Math.min(1, +config.area_opacity || 0.6)),
          cursor: "pointer",
          point: {
            events: {
              click: function () {
                if (this.custom?.isPriceFlag) return;
                if (this.y == null || this.y === 0) return;
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
        },
        scatter: {
          cursor: "pointer",
          states: { hover: { enabled: true } }
        }
      },

      tooltip: {
        useHTML: true,
        className: "sa-tooltip",
        outside: true,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        shadow: false,
        shape: "callout",
        padding: 6,
        style: { color: "#000", whiteSpace: "nowrap" },

        formatter: function () {
          if (this.point?.custom?.isDropZero) return false;
          if (this.point && (this.point.y == null || this.point.y === 0) && !this.point.custom?.isPriceFlag) {
            return false;
          }

          const wrap = (html) => `<div class="sa-tip-inner">${html}</div>`;

          if (this.point?.custom?.isPriceFlag) {
            const tip = this.point.custom.tip ? formatGBPInText(this.point.custom.tip) : null;
            if (tip && /<[^>]+>/.test(tip)) return wrap(tip);
            if (tip) return wrap(viz._escapeHTML(tip));
            return wrap("<b>Price changed</b>");
          }

          if (config.use_tooltip_field && this.point?.custom?.html) {
            return wrap(this.point.custom.html);
          }

          return wrap(
            `<b>${viz._escapeHTML(this.series.name)}</b><br/>` +
            `${viz._escapeHTML(this.x)}: <b>${Highcharts.numberFormat(this.y, 4)}</b>`
          );
        }
      },

      series
    });
  }
});
