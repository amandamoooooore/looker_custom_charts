looker.plugins.visualizations.add({
  id: "stacked_bar_with_line_svg",
  label: "Stacked Bar + Line (SVG, PDF-safe)",

  options: {
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
    use_first_measure_as_line: {
      label: "Use first stacked measure as line",
      type: "boolean",
      default: false,
      section: "Data"
    },
    stacked_measures: {
      label: "Stacked Measures",
      type: "array",
      display: "select",
      values: {},
      section: "Data"
    },

    treat_zero_as_empty: {
      label: "Hide series that are all 0",
      type: "boolean",
      default: true,
      section: "Behavior"
    },
    show_stack_totals: {
      label: "Show total label",
      type: "boolean",
      default: true,
      section: "Behavior"
    },

    custom_colors: {
      label: "Custom Color Palette (comma-separated HEX codes)",
      type: "string",
      default: "#7e8080,#5170D2,#9EE9E8,#252B5B,#161A3C,#38687D,#C5CFF1,#62D4D1,#161A3A",
      section: "Style"
    },
    series_labels: {
      label: "Custom Series Labels (JSON mapping)",
      type: "string",
      placeholder: "{\"Calls\":\"Phone Calls\",\"Emails\":\"Outbound Emails\"}",
      section: "Style"
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

  create(element) {
    element.innerHTML = `
      <style>
        .svg-chart-root {
          position: relative;
          width: 100%;
          height: 100%;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden; /* avoid scrollbars */
        }
        .svg-tooltip {
          position: absolute;
          pointer-events: none;
          background: white;
          border: 1px solid #ccc;
          padding: 4px 8px;
          font-size: 11px;
          border-radius: 3px;
          display: none;
          z-index: 10;
          white-space: nowrap;
        }
        .chart-svg {
          flex: 1 1 auto;
          width: 100%;
        }
        .legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 6px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          margin: 0 24px 4px 24px;
          font-size: 12px;
          cursor: default;
        }
        .legend-swatch {
          width: 12px;
          height: 12px;
          margin-right: 6px;
        }
      </style>

      <div class="svg-chart-root">
        <div class="svg-tooltip"></div>
        <svg class="chart-svg"></svg>
        <div class="legend"></div>
      </div>
    `;

    this._svg = element.querySelector(".chart-svg");
    this._legend = element.querySelector(".legend");
    this._tooltip = element.querySelector(".svg-tooltip");

    const root = element.querySelector(".svg-chart-root");

    if (window.ResizeObserver) {
      this._resizeObserver = new ResizeObserver(() => {
        if (this._lastArgs) {
          this._render.apply(this, this._lastArgs);
        }
      });
      this._resizeObserver.observe(root);
    }
  },

  _fieldByName(fields, name) {
    return fields.find(f => f.name === name);
  },

  _niceScale(min, max, maxTicks) {
    if (max === min) max = min + 1;
    const range = max - min;

    const niceNum = (rng, round) => {
      const exponent = Math.floor(Math.log10(rng));
      const fraction = rng / Math.pow(10, exponent);
      let niceFraction;
      if (round) {
        if (fraction < 1.5) niceFraction = 1;
        else if (fraction < 3) niceFraction = 2;
        else if (fraction < 7) niceFraction = 5;
        else niceFraction = 10;
      } else {
        if (fraction <= 1) niceFraction = 1;
        else if (fraction <= 2) niceFraction = 2;
        else if (fraction <= 5) niceFraction = 5;
        else niceFraction = 10;
      }
      return niceFraction * Math.pow(10, exponent);
    };

    const niceRange = niceNum(range, false);
    const tickSpacing = niceNum(niceRange / (maxTicks - 1), true);
    const niceMin = Math.floor(min / tickSpacing) * tickSpacing;
    const niceMax = Math.ceil(max / tickSpacing) * tickSpacing;

    return { niceMin, niceMax, tickSpacing };
  },

  updateAsync(data, element, config, queryResponse, details, done) {
    this._lastArgs = [data, element, config, queryResponse];
    try {
      this._render(data, element, config, queryResponse);
    } finally {
      if (done) done();
    }
  },

  _render(data, element, config, queryResponse) {
    const svg = this._svg;
    const legend = this._legend;
    const tooltip = this._tooltip;
    if (!svg || !legend || !tooltip) return;

    svg.innerHTML = "";
    legend.innerHTML = "";

    const dims = queryResponse.fields.dimension_like || [];
    const meas = queryResponse.fields.measure_like || [];

    const dimChoices = {};
    dims.forEach(d => dimChoices[d.name] = d.label_short || d.label || d.name);

    const measChoices = {};
    meas.forEach(m => measChoices[m.name] = m.label_short || m.label || m.name);

    this.options.x_dim.values = dimChoices;
    this.options.line_measure.values = measChoices;
    this.options.stacked_measures.values = measChoices;
    this.trigger("registerOptions", this.options);

    if (!config.x_dim && dims[0]) config.x_dim = dims[0].name;

    if (!config.stacked_measures || config.stacked_measures.length === 0) {
      config.stacked_measures = meas.map(m => m.name);
    }

    const defaultPaletteString =
      (this.options.custom_colors && this.options.custom_colors.default) ||
      "#7e8080,#5170D2,#9EE9E8,#252B5B,#161A3C,#38687D,#C5CFF1,#62D4D1,#161A3A";

    const paletteString = (config && config.custom_colors)
      ? config.custom_colors
      : defaultPaletteString;

    const palette = paletteString
      .split(",")
      .map(c => c.trim())
      .filter(Boolean);

    let labelMap = {};
    try { labelMap = JSON.parse(config.series_labels || "{}"); } catch (e) {}
    const labelFor = (field) => {
      const def = field.label_short || field.label || field.name;
      return labelMap[def] || def;
    };

    const xField = this._fieldByName(dims, config.x_dim);
    const categories = data.map(r =>
      (r[xField.name].rendered || r[xField.name].value || "")
    );

    const width = svg.clientWidth || svg.parentNode.clientWidth || 600;
    const height = svg.clientHeight || svg.parentNode.clientHeight || 400;

    // ----------------- dynamic bottom margin based on VERTICAL labels ------------
    const MAX_LABEL_CHARS = 24;
    const xLabelFontSize = 12;

    const truncatedLabels = categories.map(cat => {
      const full = String(cat || "");
      if (full.length <= MAX_LABEL_CHARS) return full;
      return full.slice(0, MAX_LABEL_CHARS - 1) + "…"; // truncate at END
    });

    let marginBottom = 80; // fallback

    if (truncatedLabels.length > 0) {
      // use the longest truncated label
      const longest = truncatedLabels.reduce((a, c) =>
        (c || "").length > (a || "").length ? c : a
      );

      const tempText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      tempText.textContent = longest;
      tempText.setAttribute("font-size", String(xLabelFontSize));
      tempText.setAttribute("text-anchor", "end");

      // baseline at very bottom of svg, same as we'll use later
      const baselineY = height - 5;
      tempText.setAttribute("transform", `translate(0,${baselineY}) rotate(-90)`);
      svg.appendChild(tempText);

      const bbox = tempText.getBBox();
      svg.removeChild(tempText);

      // bbox.y is top of the rotated text in SVG coords.
      // Amount of vertical band the label occupies:
      const labelBand = baselineY - bbox.y;
      const padding = 10;

      const desiredBottom = labelBand + padding;
      const minBottom = 70;
      const maxBottom = Math.max(minBottom, height - 80); // keep at least ~80px chart

      marginBottom = Math.max(minBottom, Math.min(maxBottom, desiredBottom));
    }

    const margin = { top: 30, right: 60, bottom: marginBottom, left: 60 };

    const chartW = Math.max(width - margin.left - margin.right, 10);
    const chartH = Math.max(height - margin.top - margin.bottom, 10);

    const xCount = Math.max(categories.length, 1);
    const xStep = chartW / xCount;

    // ----------------- series setup ---------------------------------------------
    let stackedFields = (config.stacked_measures || [])
      .map(n => this._fieldByName(meas, n))
      .filter(Boolean);

    let lineField = null;

    if (config.use_first_measure_as_line && stackedFields.length > 0) {
      lineField = stackedFields[0];
      stackedFields = stackedFields.slice(1);
    } else if (config.line_measure) {
      lineField = this._fieldByName(meas, config.line_measure);
      if (lineField) {
        stackedFields = stackedFields.filter(f => f.name !== lineField.name);
      }
    }

    const stackedSeries = stackedFields.map((f, idx) => ({
      field: f,
      name: labelFor(f),
      data: data.map(r => Number(r[f.name].value) || 0),
      colorIndex: idx,
      color: palette[idx % palette.length] || "#999"
    }));

    const lineSeries = lineField
      ? {
          field: lineField,
          name: labelFor(lineField),
          data: data.map(r => Number(r[lineField.name].value) || 0),
          colorIndex: stackedSeries.length,
          color: "#EB0037"
        }
      : null;

    const treatZero = !!config.treat_zero_as_empty;
    const isEmpty = arr =>
      !arr.some(v => v != null && (!treatZero ? true : v !== 0));
    const visibleStacked = stackedSeries.filter(s => !isEmpty(s.data));

    // ----------------- legend ----------------------------------------------------
    const legendSeries = visibleStacked.concat(lineSeries ? [lineSeries] : []);
    legendSeries.forEach(s => {
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `<div class="legend-swatch" style="background:${s.color}"></div>${s.name}`;
      legend.appendChild(item);
    });

    // ----------------- scales ----------------------------------------------------
    const stackTotals = data.map((_, i) =>
      visibleStacked.reduce((sum, s) => sum + (s.data[i] || 0), 0)
    );
    const rawMaxStack = Math.max(...stackTotals, 1);
    const leftScale = this._niceScale(0, rawMaxStack, 6);
    const maxStack = leftScale.niceMax;

    let maxLine = 1;
    if (lineSeries) {
      maxLine = Math.max(...lineSeries.data, 0);
      if (maxLine === 0) maxLine = 1;
    }
    const rightScale = this._niceScale(0, maxLine, 6);

    const rootG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    rootG.setAttribute("transform", `translate(${margin.left},${margin.top})`);
    svg.appendChild(rootG);

    const formatNumber = v => Math.round(v).toLocaleString();

    // ----------------- left Y + grid --------------------------------------------
    for (
      let v = leftScale.niceMin;
      v <= leftScale.niceMax + leftScale.tickSpacing / 2;
      v += leftScale.tickSpacing
    ) {
      const y =
        chartH -
        ((v - leftScale.niceMin) /
          (leftScale.niceMax - leftScale.niceMin)) *
          chartH;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", 0);
      line.setAttribute("x2", chartW);
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", v === 0 ? "#666" : "#eee");
      line.setAttribute("stroke-width", v === 0 ? "1.5" : "1");
      rootG.appendChild(line);

      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.textContent = formatNumber(v);
      txt.setAttribute("x", -8);
      txt.setAttribute("y", y + 4);
      txt.setAttribute("text-anchor", "end");
      txt.setAttribute("font-size", "12");
      txt.setAttribute("fill", "#666");
      txt.setAttribute("class", "y-left-tick");
      rootG.appendChild(txt);
    }

    // ----------------- right Y ---------------------------------------------------
    if (lineSeries) {
      for (
        let v = rightScale.niceMin;
        v <= rightScale.niceMax + rightScale.tickSpacing / 2;
        v += rightScale.tickSpacing
      ) {
        const y =
          chartH -
          ((v - rightScale.niceMin) /
            (rightScale.niceMax - rightScale.niceMin)) *
            chartH;

        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.textContent = Math.round(v);
        txt.setAttribute("x", chartW + 8);
        txt.setAttribute("y", y + 4);
        txt.setAttribute("text-anchor", "start");
        txt.setAttribute("font-size", "12");
        txt.setAttribute("fill", "#666");
        txt.setAttribute("class", "y-right-tick");
        rootG.appendChild(txt);
      }
    }

    // ----------------- axis titles ----------------------------------------------
    if (config.yaxis_left_title) {
      let maxTickWidth = 0;
      svg.querySelectorAll(".y-left-tick").forEach(t => {
        const bbox = t.getBBox();
        if (bbox && bbox.width > maxTickWidth) maxTickWidth = bbox.width;
      });

      const leftAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
      leftAxis.textContent = config.yaxis_left_title;
      leftAxis.setAttribute("font-size", "12");
      leftAxis.setAttribute("text-anchor", "middle");

      const leftX = -(maxTickWidth + 20);
      leftAxis.setAttribute(
        "transform",
        `translate(${leftX},${chartH / 2}) rotate(-90)`
      );
      rootG.appendChild(leftAxis);
    }

    if (lineSeries && config.yaxis_right_title) {
      let maxTickWidth = 0;
      svg.querySelectorAll(".y-right-tick").forEach(t => {
        const bbox = t.getBBox();
        if (bbox && bbox.width > maxTickWidth) maxTickWidth = bbox.width;
      });

      const rightAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
      rightAxis.textContent = config.yaxis_right_title;
      rightAxis.setAttribute("font-size", "12");
      rightAxis.setAttribute("text-anchor", "middle");

      const rightX = chartW + maxTickWidth + 20;
      rightAxis.setAttribute(
        "transform",
        `translate(${rightX},${chartH / 2}) rotate(90)`
      );
      rootG.appendChild(rightAxis);
    }

    // ----------------- X labels: vertical, truncated at END, full on hover -------
    const baselineY = height - 5; // same as measurement

    categories.forEach((cat, i) => {
      const fullLabel = String(cat || "");
      let displayLabel = fullLabel;
      if (displayLabel.length > MAX_LABEL_CHARS) {
        displayLabel = displayLabel.slice(0, MAX_LABEL_CHARS - 1) + "…";
      }

      const xCenter = margin.left + i * xStep + xStep / 2;

      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.textContent = displayLabel;
      txt.setAttribute("font-size", String(xLabelFontSize));
      txt.setAttribute("text-anchor", "end");
      txt.setAttribute(
        "transform",
        `translate(${xCenter},${baselineY}) rotate(-90)`
      );
      txt.setAttribute("fill", "#333");

      txt.addEventListener("mousemove", evt => {
        tooltip.style.display = "block";
        tooltip.style.left = evt.pageX + 10 + "px";
        tooltip.style.top = evt.pageY + 10 + "px";
        tooltip.innerHTML = fullLabel;
      });
      txt.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      svg.appendChild(txt);
    });

    // ----------------- stacked bars ---------------------------------------------
    const stackedOrder = [...visibleStacked].reverse();

    for (let i = 0; i < categories.length; i++) {
      let yBottom = chartH;

      stackedOrder.forEach(series => {
        const val = series.data[i] || 0;
        if (val === 0 && treatZero) return;

        const barHeight = (val / maxStack) * chartH;
        const yTop = yBottom - barHeight;
        const x = i * xStep + xStep * 0.1;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", yTop);
        rect.setAttribute("width", xStep * 0.8);
        rect.setAttribute("height", barHeight);
        rect.setAttribute("fill", series.color);
        rect.style.cursor = "pointer";

        rect.addEventListener("mousemove", evt => {
          tooltip.style.display = "block";
          tooltip.style.left = evt.pageX + 10 + "px";
          tooltip.style.top = evt.pageY + 10 + "px";
          tooltip.innerHTML = `<strong>${series.name}</strong><br>${val}`;
        });
        rect.addEventListener("mouseleave", () => {
          tooltip.style.display = "none";
        });

        rootG.appendChild(rect);
        yBottom = yTop;
      });
    }

    // ----------------- stack totals ---------------------------------------------
    if (config.show_stack_totals) {
      stackTotals.forEach((total, i) => {
        const totalHeight = (total / maxStack) * chartH;
        const y = chartH - totalHeight - 3;

        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.textContent = formatNumber(total);
        txt.setAttribute("x", i * xStep + xStep / 2);
        txt.setAttribute("y", y);
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("font-size", "12");
        txt.setAttribute("fill", "#333");
        rootG.appendChild(txt);
      });
    }

    // ----------------- line series ----------------------------------------------
    if (lineSeries) {
      const points = lineSeries.data.map((v, i) => {
        const px = i * xStep + xStep / 2;
        const py =
          chartH -
          ((v - rightScale.niceMin) /
            (rightScale.niceMax - rightScale.niceMin)) *
            chartH;
        return { x: px, y: py, value: v };
      });

      const pl = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      pl.setAttribute("points", points.map(p => `${p.x},${p.y}`).join(" "));
      pl.setAttribute("fill", "none");
      pl.setAttribute("stroke", lineSeries.color);
      pl.setAttribute("stroke-width", "2");
      rootG.appendChild(pl);

      points.forEach(p => {
        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circ.setAttribute("cx", p.x);
        circ.setAttribute("cy", p.y);
        circ.setAttribute("r", 4);
        circ.setAttribute("fill", lineSeries.color);
        circ.style.cursor = "pointer";

        circ.addEventListener("mousemove", evt => {
          tooltip.style.display = "block";
          tooltip.style.left = evt.pageX + 10 + "px";
          tooltip.style.top = evt.pageY + 10 + "px";
          tooltip.innerHTML = `<strong>${lineSeries.name}</strong><br>${p.value}`;
        });
        circ.addEventListener("mouseleave", () => {
          tooltip.style.display = "none";
        });

        rootG.appendChild(circ);
      });
    }
  }
});
