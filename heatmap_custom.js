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
  id: "heatmap_custom",
  label: "Heatmap (custom)",

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
      default: "#FFFFFF",
      section: "Style"
    },
    heat_end_color: {
      label: "Gradient End HEX",
      type: "string",
      default: "#092552",
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
    element.innerHTML = "<div id='hm_chart' style='width:100%;height:100%;'></div>";
    // Load Highcharts + heatmap module (exporting intentionally NOT loaded to avoid hamburger)
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

    if (!xF || !yF || !vF) {
      document.getElementById("hm_chart").innerHTML = "<div style='padding:12px;color:#666'>Select 2 dimensions and 1 measure.</div>";
      return;
    }

    // Build category arrays (unique ordered labels as they appear in the result)
    const categoriesX = [];
    const categoriesY = [];

    const getRendered = (row, field) => {
      const cell = row[field.name];
      return cell ? (cell.rendered ?? cell.value ?? "") : "";
    };

    data.forEach(row => {
      const xLabel = String(getRendered(row, xF));
      const yLabel = String(getRendered(row, yF));
      if (!categoriesX.includes(xLabel)) categoriesX.push(xLabel);
      if (!categoriesY.includes(yLabel)) categoriesY.push(yLabel);
    });

    // Map categories to indices
    const xIndex = new Map(categoriesX.map((c, i) => [c, i]));
    const yIndex = new Map(categoriesY.map((c, i) => [c, i]));

    // Build heatmap data: [x, y, value]
    const points = [];
    const zeroIsNull = !!config.treat_zero_as_null;

    data.forEach(row => {
      const xLabel = String(getRendered(row, xF));
      const yLabel = String(getRendered(row, yF));
      const vCell = row[vF.name];
      const raw = vCell && ('value' in vCell) ? vCell.value : null;
      const num = raw == null ? null : Number(raw);
      const value = (zeroIsNull && num === 0) ? null : num;

      const xi = xIndex.get(xLabel);
      const yi = yIndex.get(yLabel);
      if (xi != null && yi != null) points.push([xi, yi, value]);
    });

    // Color gradient stops
    const start = (config.heat_start_color || "#FFFFFF").trim();
    const end   = (config.heat_end_color   || "#092552").trim();
    const colorStops = [
      [0, start],
      [1, end]
    ];

    Highcharts.chart("hm_chart", {
      chart: { type: "heatmap", styledMode: false, spacing: [10,10,10,10] },
      exporting: { enabled: false }, 
      title: { text: null },

      xAxis: {
        categories: categoriesX,
        title: { text: config.x_axis_title || null }
      },
      yAxis: {
        categories: categoriesY,
        title: { text: config.y_axis_title || null },
        reversed: true 
      },

      colorAxis: {
        stops: colorStops,
        min: 0
      },

      legend: {
        align: "right",
        layout: "vertical",
        verticalAlign: "middle"
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
        borderWidth: 1,
        data: points,
        dataLabels: {
          enabled: !!config.show_data_labels,
          formatter: function(){ return (this.point.value==null ? "" : Highcharts.numberFormat(this.point.value, 0)); }
        }
      }]
    });
  }
});
