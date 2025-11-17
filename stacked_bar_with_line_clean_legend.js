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
        .legend {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          margin-right: 12px;
          font-size: 12px;
          cursor: default;
        }
        .legend-swatch {
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }
      </style>

      <div class="svg-chart-root">
        <div class="svg-tooltip"></div>
        <div class="legend"></div>
        <svg class="chart-svg" width="100%" height="100%"></svg>
      </div>
    `;

    this._svg = element.querySelector(".chart-svg");
    this._legend = element.querySelector(".legend");
    this._tooltip = element.querySelector(".svg-tooltip");
  },

  _fieldByName(fields, name) {
    return fields.find(f => f.name === name);
  },

  updateAsync(data, element, config, queryResponse, details, done) {
    const svg = this._svg;
    const legend = this._legend;
    const tooltip = this._tooltip;

    svg.innerHTML = "";
    legend.innerHTML = "";

    const dims = queryResponse.fields.dimension_like || [];
    const meas = queryResponse.fields.measure_like || [];

    // ---- Build dropdown choices
    const dimChoices = {};
    dims.forEach(d => dimChoices[d.name] = d.label_short || d.label || d.name);

    const measChoices = {};
    meas.forEach(m => measChoices[m.name] = m.label_short || m.label || m.name);

    this.options.x_dim.values = dimChoices;
    this.options.line_measure.values = measChoices;
    this.options.stacked_measures.values = measChoices;
    this.trigger("registerOptions", this.options);

    // ---- Defaults
    if (!config.x_dim && dims[0]) config.x_dim = dims[0].name;
    if (!config.line_measure && meas[0]) config.line_measure = meas[0].name;
    if (!config.stacked_measures || config.stacked_measures.length === 0) {
      config.stacked_measures = meas
        .filter(m => m.name !== config.line_measure)
        .map(m => m.name);
    }

    // ---- Colors (safe)
    const defaultPaletteString =
      (this.options.custom_colors && this.options.custom_colors.default) ||
      "#7e8080,#5170D2,#9EE9E8,#252B5B,#161A3C,#38687D,#C5CFF1,#62D4D1,#161A3A";

    const paletteString = (config && config.custom_colors) ?
      config.custom_colors : defaultPaletteString;

    const palette = paletteString
      .split(",")
      .map(c => c.trim())
      .filter(Boolean);

    // ---- Label map
    let labelMap = {};
    try { labelMap = JSON.parse(config.series_labels || "{}"); } catch (e) {}
    const labelFor = (field) => {
      const def = field.label_short || field.label || field.name;
      return labelMap[def] || def;
    };

    // ---- Categories
    const xField = this._fieldByName(dims, config.x_dim);
    const categories = data.map(r =>
      (r[xField.name].rendered || r[xField.name].value || "")
    );

    // ---- Stacked series data (with fixed color index)
    const stackedFields = (config.stacked_measures || [])
      .map(n => this._fieldByName(meas, n))
      .filter(Boolean);

    const stackedSeries = stackedFields.map((f, idx) => ({
      field: f,
      name: labelFor(f),
      data: data.map(r => Number(r[f.name].value) || 0),
      colorIndex: idx
    }));

    // ---- Line series
    const lineField = this._fieldByName(meas, config.line_measure);
    const lineSeries = lineField
      ? {
          field: lineField,
          name: labelFor(lineField),
          data: data.map(r => Number(r[lineField.name].value) || 0),
          colorIndex: stackedSeries.length   // next color in palette
        }
      : null;

    // ---- Hide fully-empty stacked series
    const treatZero = !!config.treat_zero_as_empty;
    const isEmpty = arr => !arr.some(v => v != null && (!treatZero ? true : v !== 0));
    const visibleStacked = stackedSeries.filter(s => !isEmpty(s.data));

    // --------------------------------------------------------
    // LEGEND – keep original order, colors bound to series.colorIndex
    // --------------------------------------------------------
    const legendSeries = visibleStacked.concat(lineSeries ? [lineSeries] : []);
    legendSeries.forEach(s => {
      const color = palette[s.colorIndex % palette.length] || "#999";
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `<div class="legend-swatch" style="background:${color}"></div>${s.name}`;
      legend.appendChild(item);
    });

    // --------------------------------------------------------
    // SVG LAYOUT
    // --------------------------------------------------------
    const width = svg.clientWidth || svg.parentNode.clientWidth || 600;
    const height = svg.clientHeight || svg.parentNode.clientHeight || 400;
    const margin = { top: 30, right: 55, bottom: 55, left: 55 };

    const chartW = Math.max(width - margin.left - margin.right, 10);
    const chartH = Math.max(height - margin.top - margin.bottom, 10);

    const xCount = Math.max(categories.length, 1);
    const xStep = chartW / xCount;

    // ---- Stack totals & axis max
    const stackTotals = data.map((_, i) =>
      visibleStacked.reduce((sum, s) => sum + (s.data[i] || 0), 0)
    );
    const maxStack = Math.max(...stackTotals, 1);

    const maxLine = lineSeries ? Math.max(...lineSeries.data, 1) : 1;

    // Root group (chart area)
    const rootG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    rootG.setAttribute("transform", `translate(${margin.left},${margin.top})`);
    svg.appendChild(rootG);

    // --------------------------------------------------------
    // Y AXIS GRID + LABELS
    // --------------------------------------------------------
    const yTicks = 5;
    for (let t = 0; t <= yTicks; t++) {
      const value = (maxStack * t) / yTicks;
      const y = chartH - (value / maxStack) * chartH;

      // gridline
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", 0);
      line.setAttribute("x2", chartW);
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", t === 0 ? "#444" : "#eee");
      line.setAttribute("stroke-width", t === 0 ? "1.5" : "1");
      rootG.appendChild(line);

      // label
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.textContent = Math.round(value);
      txt.setAttribute("x", -6);
      txt.setAttribute("y", y + 4);
      txt.setAttribute("text-anchor", "end");
      txt.setAttribute("font-size", "10");
      txt.setAttribute("fill", "#666");
      rootG.appendChild(txt);
    }

    // Axis titles
    if (config.yaxis_left_title) {
      const leftAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
      leftAxis.textContent = config.yaxis_left_title;
      leftAxis.setAttribute("x", -margin.left + 5);
      leftAxis.setAttribute("y", -10);
      leftAxis.setAttribute("font-size", "12");
      rootG.appendChild(leftAxis);
    }

    if (config.yaxis_right_title) {
      const rightAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
      rightAxis.textContent = config.yaxis_right_title;
      rightAxis.setAttribute("x", chartW + 10);
      rightAxis.setAttribute("y", -10);
      rightAxis.setAttribute("font-size", "12");
      rootG.appendChild(rightAxis);
    }

    // --------------------------------------------------------
    // X-AXIS LABELS (ROTATED TO AVOID OVERLAP)
    // --------------------------------------------------------
    categories.forEach((cat, i) => {
      const x = margin.left + i * xStep + xStep / 2;
      const y = height - 5;

      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.textContent = cat;
      txt.setAttribute("font-size", "10");
      txt.setAttribute("text-anchor", "end");
      txt.setAttribute("transform", `translate(${x},${y}) rotate(-45)`);
      svg.appendChild(txt);
    });

    // --------------------------------------------------------
    // DRAW STACKED BARS – bottom-up like Highcharts, but legend colors kept
    // --------------------------------------------------------
    for (let i = 0; i < categories.length; i++) {
      let yBottom = chartH; // bottom of plotting area

      // reverse order so last stacked series ends up at the bottom
      const stackedOrder = [...visibleStacked].reverse();

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
        rect.setAttribute("fill", palette[series.colorIndex % palette.length] || "#999");
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

    // --------------------------------------------------------
    // STACK TOTALS (TOP OF EACH BAR)
    // --------------------------------------------------------
    if (config.show_stack_totals) {
      stackTotals.forEach((total, i) => {
        const totalHeight = (total / maxStack) * chartH;
        const y = chartH - totalHeight - 3;

        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.textContent = total;
        txt.setAttribute("x", i * xStep + xStep / 2);
        txt.setAttribute("y", y);
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("font-size", "11");
        txt.setAttribute("fill", "#333");
        rootG.appendChild(txt);
      });
    }

    // --------------------------------------------------------
    // LINE SERIES
    // --------------------------------------------------------
    if (lineSeries) {
      const lineColor = "#7e8080"; // you can tie this to palette if you like

      const points = lineSeries.data.map((v, i) => {
        const px = i * xStep + xStep / 2;
        const py = chartH - (v / maxLine) * chartH;
        return { x: px, y: py, value: v };
      });

      const pl = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      pl.setAttribute("points", points.map(p => `${p.x},${p.y}`).join(" "));
      pl.setAttribute("fill", "none");
      pl.setAttribute("stroke", lineColor);
      pl.setAttribute("stroke-width", "2");
      rootG.appendChild(pl);

      points.forEach(p => {
        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circ.setAttribute("cx", p.x);
        circ.setAttribute("cy", p.y);
        circ.setAttribute("r", 4);
        circ.setAttribute("fill", lineColor);
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

    done();
  }
});
