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

    // ---- Build dropdowns
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

    // ---- Colors (safe default if not yet set)
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
      const def = field.label
