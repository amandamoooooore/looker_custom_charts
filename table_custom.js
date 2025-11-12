// -----------------------------------------------------------------------------
// Grid-like Heatmap (with on-screen debug + Explore-safe point clicks)
// - Shows a yellow banner if Highcharts can't load (CSP) or on any runtime error
// - Renders a tiny "hello" heatmap first, then your grid-like heatmap
// - Click-to-filter uses viz.trigger(...) from plugin scope (Explore-compatible)
// -----------------------------------------------------------------------------
looker.plugins.visualizations.add({
  id: 'grid_like_heatmap_debug',
  label: 'Grid-like Heatmap (Debug)',
  supports: { crossfilter: true },

  options: {
    columns_json: { type: 'string', label: 'Columns JSON', display: 'text', default: '' },
    group_colors_json: { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    table_height: { type: 'number', label: 'Max table height (px, 0=auto)', default: 450 },
    col_min_width: { type: 'number', label: 'Min column width (px)', default: 120 },
    center_group_titles: { type: 'boolean', label: 'Center group titles', default: true },

    enable_sorting: { type: 'boolean', label: 'Enable sorting (click leaf headers)', default: true },
    default_sort_column: { type: 'string', label: 'Default sort column (key or label)', default: '' },
    default_sort_direction: { type: 'string', label: 'Default sort direction (asc/desc)', default: 'asc' },

    enable_click_filter: { type: 'boolean', label: 'Enable click-to-filter', default: true },
    click_filter_column: { type: 'string', label: 'Click filter column (key or label)', default: '' },
    click_filter_field:  { type: 'string', label: 'Click filter field (fully qualified Looker field)', default: '' },

    // Debug helpers
    load_highcharts_from_cdn: { type: 'boolean', label: 'Load Highcharts from CDN', default: true },
    show_debug_banner: { type: 'boolean', label: 'Show debug banner', default: true }
  },

  // --- loader ---
  _ensureHC: null,
  _loadScriptOnce (src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  },

  create (element) {
    // Root
    const root = document.createElement('div');
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.width = '100%';
    root.style.height = '100%';
    root.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    element.appendChild(root);
    this.root = root;

    // Debug banner
    const banner = document.createElement('div');
    banner.style.display = 'none';
    banner.style.padding = '8px 10px';
    banner.style.background = '#fff7d6';
    banner.style.border = '1px solid #f3d37a';
    banner.style.color = '#6b5400';
    banner.style.fontSize = '12px';
    banner.style.marginBottom = '6px';
    banner.style.borderRadius = '6px';
    this.root.appendChild(banner);
    this.banner = banner;

    // Headers (two rows)
    const headerWrap = document.createElement('div');
    headerWrap.style.position = 'sticky';
    headerWrap.style.top = '0';
    headerWrap.style.zIndex = '10';
    headerWrap.style.background = '#fff';
    headerWrap.style.overflow = 'hidden';
    headerWrap.style.borderBottom = '1px solid #e6e8ee';

    const groupRow = document.createElement('div');
    const leafRow  = document.createElement('div');
    [groupRow, leafRow].forEach(r => {
      r.style.display = 'grid';
      r.style.gridAutoFlow = 'column';
      r.style.alignItems = 'center';
      r.style.height = '44px';
      r.style.boxSizing = 'border-box';
    });
    groupRow.style.borderBottom = '1px solid #e6e8ee';
    headerWrap.appendChild(groupRow);
    headerWrap.appendChild(leafRow);
    this.root.appendChild(headerWrap);
    this.groupRow = groupRow;
    this.leafRow  = leafRow;

    // Scroller & inner
    const scroller = document.createElement('div');
    scroller.style.flex = '1 1 auto';
    scroller.style.overflow = 'auto';
    scroller.style.position = 'relative';
    this.root.appendChild(scroller);
    this.scroller = scroller;

    const inner = document.createElement('div');
    inner.style.position = 'relative';
    inner.style.height = '100%';
    scroller.appendChild(inner);
    this.inner = inner;

    // Chart container
    const chartDiv = document.createElement('div');
    chartDiv.style.width = '100%';
    chartDiv.style.height = '100%';
    inner.appendChild(chartDiv);
    this.chartDiv = chartDiv;

    // Sync scroll
    scroller.addEventListener('scroll', () => { headerWrap.scrollLeft = scroller.scrollLeft; });

    // Resize watcher
    this._resizeObserver = new ResizeObserver(() => {
      if (this._redrawHeaders) this._redrawHeaders();
    });
    this._resizeObserver.observe(scroller);
  },

  async updateAsync (data, element, config, queryResponse, details, done) {
    const showBanner = (msg) => {
      if (!config.show_debug_banner) return;
      this.banner.innerHTML = '⚠️ ' + msg;
      this.banner.style.display = 'block';
    };
    const hideBanner = () => { this.banner.style.display = 'none'; this.banner.innerHTML = ''; };

    try {
      hideBanner();

      // Ensure Highcharts
      if (!this._ensureHC) {
        this._ensureHC = (async () => {
          if (config.load_highcharts_from_cdn) {
            await this._loadScriptOnce('https://code.highcharts.com/highcharts.js');
            await this._loadScriptOnce('https://code.highcharts.com/modules/heatmap.js');
            await this._loadScriptOnce('https://code.highcharts.com/modules/accessibility.js');
          }
        })();
      }
      await this._ensureHC;

      if (typeof Highcharts === 'undefined' || !Highcharts.chart) {
        showBanner('Highcharts failed to load (likely blocked by CSP). Allow code.highcharts.com or set "Load Highcharts from CDN" to Off if your environment pre-loads Highcharts.');
        done(); return;
      }

      // Clear
      this.groupRow.innerHTML = '';
      this.leafRow.innerHTML  = '';
      this.chartDiv.innerHTML = '';

      // Quick "hello" chart (so you see *something* even if Columns JSON is wrong)
      if (!data || data.length === 0) {
        Highcharts.chart(this.chartDiv, {
          chart: { type: 'heatmap', height: 220, spacing: [0,0,0,0] },
          title: { text: null }, credits: { enabled: false }, legend: { enabled: false }, exporting: { enabled: false },
          xAxis: { visible: false }, yAxis: { visible: false },
          colorAxis: { min: 0, max: 1, stops: [[0, '#ffffff'], [1, '#ffffff']] },
          tooltip: { enabled: false },
          series: [{ data: [{x:0,y:0,value:1,color:'#ffffff',borderColor:'#e6e8ee',borderWidth:1, dataLabels:{enabled:true,useHTML:true,formatter(){return '<div style="width:100%;text-align:center">No data</div>';}, style:{textOutline:'none'}}}] }]
        });
        done(); return;
      }

      // Parse options
      const parseJSON = (txt, fb) => { try { return JSON.parse(txt || ''); } catch { return fb; } };
      const cols = parseJSON(config.columns_json, []);
      const groupColors = parseJSON(config.group_colors_json, {});
      if (!Array.isArray(cols) || cols.length === 0) {
        showBanner('Configure Columns JSON to render the grid-like table. Showing a tiny placeholder chart.');
        Highcharts.chart(this.chartDiv, {
          chart: { type: 'heatmap', height: 220, spacing: [0,0,0,0] },
          title: { text: null }, credits: { enabled: false }, legend: { enabled: false }, exporting: { enabled: false },
          xAxis: { visible: false }, yAxis: { visible: false },
          colorAxis: { min: 0, max: 1, stops: [[0, '#ffffff'], [1, '#ffffff']] },
          tooltip: { enabled: false },
          series: [{ data: [{x:0,y:0,value:1,color:'#ffffff',borderColor:'#e6e8ee',borderWidth:1, dataLabels:{enabled:true,useHTML:true,formatter(){return '<div style="width:100%;text-align:center">Add Columns JSON</div>';}, style:{textOutline:'none'}}}] }]
        });
        done(); return;
      }

      const colMinW = Math.max(60, Number(config.col_min_width) || 120);
      if (Number(config.table_height) > 0) this.scroller.style.maxHeight = `${config.table_height}px`;

      // Resolve fields
      const allFieldDefs = [
        ...(queryResponse.fields?.dimension_like || []),
        ...(queryResponse.fields?.measure_like || []),
        ...(queryResponse.fields?.table_calculations || [])
      ];
      const byName = {}; const labelToName = {}; const shortToName = {};
      allFieldDefs.forEach(f => {
        byName[f.name] = f;
        if (f.label_short) labelToName[String(f.label_short).toLowerCase()] = f.name;
        shortToName[f.name.split('.').pop()] = f.name;
      });
      const resolveField = (s) => {
        if (!s) return null;
        if (byName[s]) return s;
        const end = Object.keys(byName).find(n => n.endsWith('.' + s)); if (end) return end;
        const lbl = labelToName[String(s).toLowerCase()]; if (lbl) return lbl;
        if (shortToName[s]) return shortToName[s];
        return null;
      };
      const resolvedCols = cols.map(c => ({ ...c, _rowKey: resolveField(c.field) }));

      // If nothing resolved, show why
      if (resolvedCols.every(c => !c._rowKey)) {
        showBanner('None of the column fields in Columns JSON could be resolved to query fields. Make sure each item’s "field" matches a field in this Explore (fully-qualified or resolvable).');
        done(); return;
      }

      // Pull values
      const rawVal = (row, key) => key && row[key] ? row[key].value : null;
      const fmtVal = (row, key) => key && row[key] ? (row[key].rendered ?? row[key].value) : null;

      let rows = data.map(r => {
        const o = {};
        resolvedCols.forEach(c => {
          o[c.key] = rawVal(r, c._rowKey);
          o['__fmt__' + c.key] = fmtVal(r, c._rowKey);
        });
        return o;
      });

      // Sorting
      const findKeyByLabelOrKey = (val) => {
        if (!val) return null;
        const low = String(val).toLowerCase();
        const byKey = resolvedCols.find(c => String(c.key).toLowerCase() === low);
        if (byKey) return byKey.key;
        const byLabel = resolvedCols.find(c => String(c.label).toLowerCase() === low);
        return byLabel ? byLabel.key : null;
      };
      if (!this._sortState) {
        const defKey = findKeyByLabelOrKey(config.default_sort_column);
        const dir = (String(config.default_sort_direction || 'asc').toLowerCase() === 'desc') ? 'desc' : 'asc';
        if (defKey) this._sortState = { key: defKey, dir };
      }
      const parseForSort = (v) => {
        if (v == null) return null;
        if (typeof v === 'number') return v;
        const s = String(v).trim().replace(/[, ]+/g, '').replace(/[%£$€]/g, '');
        const n = Number(s);
        return Number.isNaN(n) ? String(v).toLowerCase() : n;
      };
      const applySort = () => {
        if (!this._sortState?.key) return;
        const key = this._sortState.key, dir = this._sortState.dir;
        rows = rows.slice().sort((a, b) => {
          const va = parseForSort(a[key]), vb = parseForSort(b[key]);
          const na = (va == null || va === ''), nb = (vb == null || vb === '');
          if (na && nb) return 0; if (na) return 1; if (nb) return -1;
          if (typeof va === 'number' && typeof vb === 'number') return dir === 'asc' ? va - vb : vb - va;
          return dir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
        });
      };
      applySort();

      // Column widths & total width
      const colWidths = resolvedCols.map(c => Math.max(colMinW, Number(c.width) || colMinW));
      const totalWidth = colWidths.reduce((a,b)=>a+b, 0);

      // Build headers (HTML)
      const makeDiv = (txt, opts={}) => {
        const d = document.createElement('div');
        d.textContent = txt || '';
        d.style.display = 'flex';
        d.style.alignItems = 'center';
        d.style.justifyContent = opts.center ? 'center' : 'flex-start';
        d.style.fontWeight = opts.bold ? '700' : '600';
        d.style.fontSize = '13px';
        d.style.height = '44px';
        d.style.padding = '0 10px';
        d.style.boxSizing = 'border-box';
        d.style.borderRight = '1px solid #e6e8ee';
        d.style.whiteSpace = 'nowrap';
        d.style.background = opts.bg || '#d9e3f8';
        d.style.color = opts.color || '#0b1020';
        return d;
      };

      this.groupRow.style.gridTemplateColumns = colWidths.map(w => `${w}px`).join(' ');
      this.leafRow.style.gridTemplateColumns  = colWidths.map(w => `${w}px`).join(' ');

      for (let i=0;i<resolvedCols.length;) {
        const first = resolvedCols[i];
        if (!first.group) {
          let bg = first.header_bg;
          if ((bg === 'group' || bg === 'GROUP') && first.group) bg = groupColors[first.group] || '#d9e3f8';
          if (!bg) bg = '#0b2557';
          const spacer = makeDiv('', { bg, color: '#fff', center: true, bold: true });
          spacer.style.borderBottom = '1px solid #e6e8ee';
          spacer.style.gridColumn = `${i+1} / ${i+2}`;
          this.groupRow.appendChild(spacer);
          i++; continue;
        }
        let j=i+1; while (j<resolvedCols.length && resolvedCols[j].group===first.group) j++;
        const span = j - i;
        const gDiv = makeDiv(first.group, {
          bg: groupColors[first.group] || '#d9e3f8',
          color: '#0b1020',
          center: !!config.center_group_titles,
          bold: true
        });
        gDiv.style.borderBottom = '1px solid #e6e8ee';
        gDiv.style.gridColumn = `${i+1} / ${j+1}`;
        this.groupRow.appendChild(gDiv);
        i = j;
      }

      resolvedCols.forEach((col, idx) => {
        let bg = col.header_bg, color = col.header_color;
        if ((bg === 'group' || bg === 'GROUP') && col.group) bg = groupColors[col.group] || '#d9e3f8';
        if (!bg) bg = '#0b2557';
        if (!color) color = (String(bg).toLowerCase() === '#0b2557') ? '#ffffff' : '#0b1020';

        const leaf = makeDiv(col.label, { bg, color, center: true, bold: true });
        leaf.style.cursor = config.enable_sorting ? 'pointer' : 'default';
        leaf.title = config.enable_sorting ? 'Click to sort rows by this column' : '';
        leaf.dataset.key = col.key;
        leaf.style.gridColumn = `${idx+1} / ${idx+2}`;
        this.leafRow.appendChild(leaf);

        if (config.enable_sorting) {
          leaf.addEventListener('click', () => {
            if (!this._sortState || this._sortState.key !== col.key) this._sortState = { key: col.key, dir: 'asc' };
            else this._sortState.dir = (this._sortState.dir === 'asc') ? 'desc' : 'asc';
            this.updateAsync(data, element, config, queryResponse, details, done);
          });
        }
      });

      // Build the heatmap points (single series)
      const xCount = resolvedCols.length;
      const yCount = rows.length;
      const dataPoints = [];
      for (let y=0; y<yCount; y++) {
        for (let x=0; x<xCount; x++) {
          const col = resolvedCols[x];
          const raw = rows[y][col.key];
          const fmt = rows[y]['__fmt__' + col.key];
          const align = (col.align || 'left').toLowerCase();

          // numeric (not used for color yet; here to keep Highcharts happy)
          const n = Number(String(raw).replace(/[, ]+/g, '').replace(/[%£$€]/g, ''));
          const value = Number.isFinite(n) ? n : 0;

          dataPoints.push({
            x, y, value,
            color: '#ffffff',
            borderColor: '#e6e8ee',
            borderWidth: 1,
            custom: { raw, fmt, colKey: col.key, align },
            dataLabels: {
              enabled: true,
              useHTML: true,
              formatter: function () {
                const t = (fmt == null ? '' : String(fmt));
                const just =
                  this.point.custom.align === 'right' ? 'flex-end' :
                  this.point.custom.align === 'center' ? 'center' : 'flex-start';
                return '<div style="display:flex;justify-content:'+just+';width:100%"><span>'+Highcharts.escapeHTML(t)+'</span></div>';
              },
              style: { textOutline: 'none', color: '#0b1020', fontWeight: col.bold ? '700' : '400', fontSize: '12px' },
              crop: false, overflow: 'none'
            }
          });
        }
      }

      // Width & height
      this.inner.style.width = `${colWidths.reduce((a,b)=>a+b,0)}px`;
      this.groupRow.style.width = this.inner.style.width;
      this.leafRow.style.width  = this.inner.style.width;
      const headerH = 88;
      const maxH = Number(config.table_height) > 0 ? Number(config.table_height) : this.root.clientHeight || 480;
      const chartH = Math.max(200, maxH - headerH);
      this.chartDiv.style.height = `${chartH}px`;

      // Hidden axes categories
      const xCategories = resolvedCols.map(c => c.label);
      const yCategories = rows.map((_, i) => String(i+1));

      // Click-to-filter config
      const clickKey = config.enable_click_filter ? (findKeyByLabelOrKey(config.click_filter_column) || null) : null;
      const clickFieldFallback = (() => {
        if (!clickKey) return null;
        const col = resolvedCols.find(c => c.key === clickKey);
        return col?._rowKey || null;
      })();
      const clickFieldName = (config.click_filter_field || clickFieldFallback || '').trim();

      // Render chart
      const viz = this; // capture viz scope for triggering
      Highcharts.chart(this.chartDiv, {
        chart: { type: 'heatmap', spacing: [0,0,0,0], animation: false },
        title: { text: null }, credits: { enabled: false }, exporting: { enabled: false }, legend: { enabled: false },
        tooltip: { enabled: false },
        xAxis: { categories: xCategories, visible: false },
        yAxis: { categories: yCategories, visible: false, min: -0.5, max: yCount - 0.5 },
        colorAxis: { min: 0, max: 1, stops: [[0, '#ffffff'], [1, '#ffffff']] },

        plotOptions: {
          series: {
            animation: false,
            borderWidth: 1,
            borderColor: '#e6e8ee',
            dataLabels: { defer: false },
            point: {
              events: {
                click: function () {
                  if (!config.enable_click_filter || !clickKey || !clickFieldName) return;
                  const colKey = this.point?.custom?.colKey;
                  if (colKey !== clickKey) return;
                  const raw = this.point?.custom?.raw;
                  const fmt = this.point?.custom?.fmt ?? (raw == null ? '' : String(raw));
                  if (raw == null || raw === '') return;

                  // Explore-friendly (same as your working area chart)
                  viz.trigger('filter', [{ field: clickFieldName, value: String(raw), formatted: String(fmt) }]);
                  // Dashboards too
                  viz.trigger('dashboard:filter', { field: clickFieldName, value: String(raw) });
                  viz.trigger('dashboard:run');
                }
              }
            }
          }
        },

        series: [{
          type: 'heatmap',
          data: dataPoints,
          colsize: 1,
          rowsize: 1,
          turboThreshold: 0
        }]
      });

      // Sort indicators
      const applySortIndicators = () => {
        if (!config.enable_sorting || !this._sortState?.key) return;
        Array.from(this.leafRow.children).forEach(el => {
          const base = (el.textContent || '').replace(/\s*[▲▼]$/, '');
          el.textContent = base;
        });
        const idx = resolvedCols.findIndex(c => c.key === this._sortState.key);
        if (idx >= 0) {
          const el = this.leafRow.children[idx];
          const tri = (this._sortState.dir === 'asc') ? ' ▲' : ' ▼';
          el.textContent = (el.textContent || '') + tri;
        }
      };
      applySortIndicators();

      this._redrawHeaders = () => { /* widths fixed from colWidths */ };

      done();
    } catch (err) {
      console.error(err);
      // Surface any error to the user so you don't get a blank viz
      this.chartDiv.innerHTML = '';
      if (this.options && this.root) {
        const msg = (err && err.message) ? err.message : String(err);
        const lines = (err && err.stack) ? `<pre style="margin-top:6px;white-space:pre-wrap">${String(err.stack)}</pre>` : '';
        this.banner.innerHTML = `💥 <b>Viz error:</b> ${msg}${lines}`;
        this.banner.style.display = 'block';
      }
      done();
    }
  }
});
