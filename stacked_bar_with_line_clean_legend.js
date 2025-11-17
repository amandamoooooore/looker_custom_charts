looker.plugins.visualizations.add({
  id: "stacked_bar_with_line_svg",
  label: "Stacked Bar + Line (SVG, PDF-safe)",

  // --------------------------------------------------------
  // OPTIONS
  // --------------------------------------------------------
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
      section: "Style"
    },
    yaxis_right_title: {
      label: "Y Axis (Right) Title",
      type: "string",
      section: "Style"
    }
  },

  // --------------------------------------------------------
  // CREATE
  // --------------------------------------------------------
  create(element) {
    element.innerHTML = `
      <style>
        .svg-chart-root { position: relative; width: 100%; height: 100%; font-family: Arial, sans-serif; }
        .svg-tooltip {
          position:absolute;
          pointer-events:none;
          background:white;
          border:1px solid #ccc;
          padding:4px 8px;
          font-size:11px;
          border-radius:3px;
          display:none;
          z-index:10;
          white-space:nowrap;
        }
        .legend-item {
          display:flex;
          align-items:center;
          margin-right:12px;
          font-size:12px;
          cursor:default;
        }
        .legend-swatch {
          width:12px;
          height:12px;
          margin-right:4px;
        }
      </style>

      <div class="svg-chart-root">
        <div class="svg-tooltip"></div>
        <div class="legend" style="display:flex;flex-wrap:wrap;margin-bottom:4px;"></div>
        <svg class="chart-svg" width="100%" height="100%"></svg>
      </div>
    `;

    this._svg = element.querySelector(".chart-svg");
    this._legend = element.querySelector(".legend");
    this._tooltip = element.querySelector(".svg-tooltip");
  },

  // --------------------------------------------------------
  // HELPER: Get field by name
  // --------------------------------------------------------
  _fieldByName(fields, name) {
    return fields.find(f => f.name === name);
  },

  // --------------------------------------------------------
  // UPDATE
  // --------------------------------------------------------
  updateAsync(data, element, config, queryResponse, details, done) {
    const svg = this._svg;
    const legend = this._legend;
    const tooltip = this._tooltip;

    svg.innerHTML = "";
    legend.innerHTML = "";

    const dims = queryResponse.fields.dimension_like;
    const meas = queryResponse.fields.measure_like;

    // Build dropdowns
    const dimChoices = {};
    dims.forEach(d => dimChoices[d.name] = d.label_short || d.label);

    const measChoices = {};
    meas.forEach(m => measChoices[m.name] = m.label_short || m.label);

    this.options.x_dim.values = dimChoices;
    this.options.line_measure.values = measChoices;
    this.options.stacked_measures.values = measChoices;
    this.trigger("registerOptions", this.options);

    // Defaults
    if (!config.x_dim && dims[0]) config.x_dim = dims[0].name;
    if (!config.line_measure && meas[0]) config.line_measure = meas[0].name;
    if (!config.stacked_measures || config.stacked_measures.length === 0)
      config.stacked_measures = meas.filter(m => m.name !== config.line_measure).map(m => m.name);

    
    // ---- Colors
    const defaultPaletteString =
      (this.options.custom_colors && this.options.custom_colors.default) ||
      "#7e8080,#5170D2,#9EE9E8,#252B5B,#161A3C,#38687D,#C5CFF1,#62D4D1,#161A3A";
    
    const paletteString = (config && config.custom_colors) ? config.custom_colors : defaultPaletteString;
    
    const palette = paletteString
      .split(",")
      .map(c => c.trim())
      .filter(Boolean);


    

    // Label map
    let labelMap = {};
    try { labelMap = JSON.parse(config.series_labels || "{}"); } catch(e){}

    const labelFor = (field) => {
      const def = field.label_short || field.label;
      return labelMap[def] || def;
    };

    // Categories
    const xField = this._fieldByName(dims, config.x_dim);
    const categories = data.map(r => (r[xField.name].rendered || r[xField.name].value || ""));

    // Build stacked series data
    const stackedFields = config.stacked_measures.map(n => this._fieldByName(meas, n)).filter(Boolean);
    const stackedSeries = stackedFields.map(f => ({
      field: f,
      name: labelFor(f),
      data: data.map(r => Number(r[f.name].value) || 0)
    }));

    // Optional line series
    const lineField = this._fieldByName(meas, config.line_measure);
    const lineSeries = lineField
      ? {
          field: lineField,
          name: labelFor(lineField),
          data: data.map(r => Number(r[lineField.name].value) || 0)
        }
      : null;

    // Hide fully-empty series
    const treatZero = !!config.treat_zero_as_empty;
    const isEmpty = arr => !arr.some(v => v != null && (!treatZero ? true : v !== 0));
    const visibleStacked = stackedSeries.filter(s => !isEmpty(s.data));

    // --------------------------------------------------------
    // LEGEND
    // --------------------------------------------------------
    const allSeries = visibleStacked.concat(lineSeries ? [lineSeries] : []);
    allSeries.forEach((s, idx) => {
      const color = idx < palette.length ? palette[idx] : "#999";
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `<div class="legend-swatch" style="background:${color}"></div>${s.name}`;
      legend.appendChild(item);
    });

    // --------------------------------------------------------
    // SVG RENDERING
    // --------------------------------------------------------
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const margin = { top: 20, right: 45, bottom: 40, left: 45 };

    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    // Axis max for stacked bars
    const stackTotals = data.map((_, i) =>
      visibleStacked.reduce((sum, s) => sum + s.data[i], 0)
    );
    const maxStack = Math.max(...stackTotals, 1);

    // Axis max for line (auto)
    const maxLine = lineSeries ? Math.max(...lineSeries.data, 1) : 1;

    const xStep = chartW / categories.length;

    // Draw axes
    const axisGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    axisGroup.setAttribute("transform", `translate(${margin.left},${margin.top})`);
    svg.appendChild(axisGroup);

    // Left y axis
    const leftAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
    leftAxis.textContent = config.yaxis_left_title;
    leftAxis.setAttribute("x", -margin.left + 5);
    leftAxis.setAttribute("y", -5);
    leftAxis.setAttribute("font-size", "12");
    axisGroup.appendChild(leftAxis);

    // Right y axis
    const rightAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
    rightAxis.textContent = config.yaxis_right_title;
    rightAxis.setAttribute("x", chartW + 10);
    rightAxis.setAttribute("y", -5);
    rightAxis.setAttribute("font-size", "12");
    axisGroup.appendChild(rightAxis);

    // Category labels
    categories.forEach((cat, i) => {
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.textContent = cat;
      txt.setAttribute("x", margin.left + i * xStep + xStep / 2);
      txt.setAttribute("y", height - 5);
      txt.setAttribute("text-anchor", "middle");
      txt.setAttribute("font-size", "12");
      svg.appendChild(txt);
    });

    // --------------------------------------------------------
    // DRAW STACKED BARS
    // --------------------------------------------------------
    visibleStacked.forEach((series, sIdx) => {
      const color = palette[sIdx % palette.length];

      series.data.forEach((val, i) => {
        const stackBelow = visibleStacked
          .slice(0, sIdx)
          .reduce((sum, s) => sum + s.data[i], 0);

        const y0 = chartH - (stackBelow / maxStack) * chartH;
        const y1 = (val / maxStack) * chartH;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", margin.left + i * xStep + xStep * 0.1);
        rect.setAttribute("y", margin.top + (chartH - y0));
        rect.setAttribute("width", xStep * 0.8);
        rect.setAttribute("height", y1);
        rect.setAttribute("fill", color);
        rect.style.cursor = "pointer";

        // Tooltip
        rect.addEventListener("mousemove", evt => {
          tooltip.style.display = "block";
          tooltip.style.left = evt.pageX + 10 + "px";
          tooltip.style.top = evt.pageY + 10 + "px";
          tooltip.innerHTML = `<strong>${series.name}</strong><br>${val}`;
        });
        rect.addEventListener("mouseleave", () => {
          tooltip.style.display = "none";
        });

        svg.appendChild(rect);
      });
    });

    // --------------------------------------------------------
    // STACK TOTALS
    // --------------------------------------------------------
    if (config.show_stack_totals) {
      stackTotals.forEach((total, i) => {
        const y = margin.top + chartH - (total / maxStack) * chartH;
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.textContent = total;
        txt.setAttribute("x", margin.left + i * xStep + xStep / 2);
        txt.setAttribute("y", y - 3);
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("font-size", "11");
        txt.setAttribute("fill", "#333");
        svg.appendChild(txt);
      });
    }

    // --------------------------------------------------------
    // DRAW LINE SERIES
    // --------------------------------------------------------
    if (lineSeries) {
      const points = lineSeries.data.map((v, i) => {
        const px = margin.left + i * xStep + xStep / 2;
        const py = margin.top + chartH - (v / maxLine) * chartH;
        return { x: px, y: py, value: v };
      });

      // Polyline
      const pl = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      pl.setAttribute(
        "points",
        points.map(p => `${p.x},${p.y}`).join(" ")
      );
      pl.setAttribute("fill", "none");
      pl.setAttribute("stroke", "#7e8080");
      pl.setAttribute("stroke-width", "2");
      svg.appendChild(pl);

      // Points + tooltips
      points.forEach(p => {
        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circ.setAttribute("cx", p.x);
        circ.setAttribute("cy", p.y);
        circ.setAttribute("r", 4);
        circ.setAttribute("fill", "#7e8080");
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

        svg.appendChild(circ);
      });
    }

    done();
  }
});
