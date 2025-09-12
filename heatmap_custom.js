// --- Load a script once ---
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
  id: "heatmap_flexible_axes",
  label: "Heatmap (flexible axes + gradient)",

  options: {
    // ---- DATA ----
    x_dim: {
      label: "X Dimension",
      type: "string",
      display: "select",
      values: {},
      section: "Data"
    },
    y_dim: {
      label: "Y Dimension",
      type: "string",
      display: "select",
      values: {},
      section: "Data"
    },
    value_measure: {
      label: "Value Measure",
      type: "string",
      display: "select",
      values: {},
      section: "Data"
    },

    // ---- STYLE ----
    x_axis_title: {
      label: "X Axis Title",
      type: "string",
      default: "",
      section: "Style"
    },
    y_axis_title: {
      label: "Y Axis Title",
      type: "string",
      default: "",
      section: "Style"
    },
    heat_start_color: {
      label: "Gradient Start HEX",
      type: "string",
      default: "#E6F2FF",
      section: "Style"
    },
    heat_end_color: {
      label: "Gradient End HEX",
      type: "string",
      default: "#007AFF",
      section: "Style"
    },
    reverse_x_axis: {
      label: "Reverse X Axis",
      type: "boolean",
      default: false,
      section: "Style"
    },
    cell_border_color: {
      label: "Cell Border Color (HEX or 'transparent')",
      type: "string",
      default: "transparent",
      section: "Style"
    },
    cell_border_width: {
      label: "Cell Border Width",
      type: "number",
      default: 0,
      section: "Style"
    },
    show_data_labels: {
      label: "Show values in cells",
      type: "boolean",
      default: true,
      section: "Style"
    },

    // ---- BEHAVIOR ----
    treat_zero_as_null: {
      label: "Treat 0 as empty",
      type: "boolean",
      default: false,
      section: "Behavior"
    }
  },

  create(element) {
    // Fill the available tile space; Looker will set the container height.
    element.innerHTML = "<div id='hm_chart' style='width:100%;height:100%;'></div>";

    // Load Highcharts core + heatmap + accessibility 
    this._hcReady = (async () => {
      await loadScriptOnce("https://code.highcharts.com/highcharts.js");
      await loadScriptOnce("https://code.highcharts.com/modules/heatmap.js");
      await loadScriptOnce("https://code.highcharts.com/modules/accessibility.js");
    })();
  },

  _fieldByName(fields, name) {
    return fields.find(f => f.name === name);
  },

  async update(data, element, config, queryResponse) {
    await this._hcReady;

    const dims = queryResponse.fields.dimension_like || [];
    const meas = queryResponse.fields.measure_like || [];

    // Build select choices
    const dimChoices = {};
    dims.forEach(d => dimChoices[d.name] = d.label_short || d.label || d.name);
    const measChoices = {};
    meas.forEach(m => measChoices[m.name] = m.label_short || m.label || m.name);

    // Defaults
    if (!config.x_dim && dims[0]) config.x_dim = dims[0].name;
    if (!config.y_dim && dims[1]) config.y_dim = dims[1].name || dims[0].name;
    if (!config.value_measure && meas[0]) config.value_measure = meas[0].name;

    // Register/refresh options panel
    this.options.x_dim.values = dimChoices;
    this.options.y_dim.values = dimChoices;
    this.options.value_measure.values = measChoices;
    this.trigger('registerOptions', this.options);

    // Resolve fields
    const xF = this._fieldByName(dims, config.x_dim);
    const yF = this._fieldByName(dims, config.y_dim);
    const vF = this._fieldByName(meas, config.value_measure);

    const container = document.getElementById("hm_chart");
    if (!xF || !yF || !vF) {
      container.innerHTML = "<div style='padding:12px;color:#666'>Select 2 dimensions and 1 measure.</div>";
      return;
    }

    // Helpers
    const getRendered = (row, field) => {
      const cell = row[field.name];
      if (!cell) return null;
      const val = (cell.rendered ?? cell.value);
      return (val === undefined || val === null || val === "") ? null : val;
    };
    const getNumeric = (row, field) => {
      const cell = row[field.name];
      if (!cell || !('value' in cell)) return null;
      const n = Number(cell.value);
      return Number.isFinite(n) ? n : null;
    };

    // Build category arrays (ordered uniques), skipping rows where X or Y is null/blank
    const categoriesX = [];
    const categoriesY = [];
    const filteredRows = [];

    data.forEach(row => {
      const xLabel = getRendered(row, xF);
      const yLabel = getRendered(row, yF);
      if (xLabel == null || yLabel == null) return; // skip rows with null X or Y
      filteredRows.push(row);
      const x = String(xLabel);
      const y = String(yLabel);
      if (!categoriesX.includes(x)) categoriesX.push(x);
      if (!categoriesY.includes(y)) categoriesY.push(y);
    });

    // Map categories to indices
    const xIndex = new Map(categoriesX.map((c, i) => [c, i]));
    const yIndex = new Map(categoriesY.map((c, i) => [c, i]));

    // Build heatmap points: [x, y, value]
    const points = [];
    const zeroIsNull = !!config.treat_zero_as_null;

    filteredRows.forEach(row => {
      const xLabel = String(getRendered(row, xF));
      const yLabel = String(getRendered(row, yF));
      const num = getNumeric(row, vF);
      const value = (zeroIsNull && num === 0) ? null : num;

      const xi = xIndex.get(xLabel);
      const yi = yIndex.get(yLabel);
      if (xi != null && yi != null) points.push([xi, yi, value]);
    });

    // Dynamic sizes
    const containerHeight = element.clientHeight || container.clientHeight || 400;
    const plotPadding = 60; // approximate top/bottom padding inside chart area
    const symbolHeight = Math.max(120, containerHeight - plotPadding); // color bar height

    // Gradient colors
    const start = (config.heat_start_color || "#E6F2FF").trim();
    const end   = (config.heat_end_color   || "#007AFF").trim();

    // Render
    Highcharts.chart("hm_chart", {
      chart: {
        type: "heatmap",
        styledMode: false,         
        spacing: [10,10,10,10],
        height: containerHeight     
      },
      exporting: { enabled: false }, 
      title: { text: null },

      xAxis: {
        categories: categoriesX,
        title: { text: config.x_axis_title || null },
        reversed: !!config.reverse_x_axis
      },
      yAxis: {
        categories: categoriesY,
        title: { text: config.y_axis_title || null },
        reversed: true // like the demo; flip to false if you prefer bottom→top
      },

      colorAxis: {
        min: 0,
        minColor: start,
        maxColor: end
        // (alternatively use stops: [[0,start],[1,end]])
      },

      // Make the color scale (legend) span the full plot height on the right
      legend: {
        align: "right",
        layout: "vertical",
        verticalAlign: "middle",
        symbolHeight: symbolHeight
      },

      tooltip: {
        formatter: function () {
          const xLabel = this.series.xAxis.categories[this.point.x];
          const yLabel = this.series.yAxis.categories[this.point.y];
          const v = this.point.value;
          return `<b>${yLabel}</b><br/>${xLabel}: <b>${(v==null?'–':Highcharts.numberFormat(v,0))}</b>`;
        }
      },

      plotOptions: {
        series: { animation: false }
      },

      series: [{
        name: "Heat",
        borderColor: (config.cell_border_color || "transparent"),
        borderWidth: Number.isFinite(+config.cell_border_width) ? +config.cell_border_width : 0,
        data: points,
        dataLabels: {
          enabled: !!config.show_data_labels,
          formatter: function () {
            const v = this.point.value;
            return (v == null ? "" : Highcharts.numberFormat(v, 0));
          }
        }
      }]
    });
  }
});
