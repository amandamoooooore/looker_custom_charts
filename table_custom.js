// -----------------------------------------------------------------------------
// Grid-look Heatmap (Highcharts points → Explore-friendly crossfilter)
// - Grouped headers (2 rows) rendered as HTML above the chart
// - Column labels centered; body numbers align per column setting
// - Sorting (toggle) + default sort column/direction
// - Click-to-filter column → emits Explore-friendly point-click payload,
//   and also dashboard events. (Works in Explore because it's a point click.)
// - Horizontal scroll with synced sticky headers
// -----------------------------------------------------------------------------
looker.plugins.visualizations.add({
  id: 'grid_like_heatmap',
  label: 'Grid-like Heatmap (Grouped Headers)',
  supports: { crossfilter: true },

  options: {
    // DATA / LAYOUT
    columns_json: { type: 'string', label: 'Columns JSON', display: 'text', default: '' },
    // Example for each column:
    // { "field":"view.dim_or_measure", "key":"make", "label":"Make", "group":"Vehicle",
    //   "align":"left|center|right", "bold":false, "width":120 }

    group_colors_json: { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    table_height: { type: 'number', label: 'Max table height (px, 0 = auto)', default: 450 },
    col_min_width: { type: 'number', label: 'Min column width (px)', default: 120 },
    center_group_titles: { type: 'boolean', label: 'Center group titles', default: true },

    // SORTING
    enable_sorting: { type: 'boolean', label: 'Enable sorting (click leaf headers)', default: true },
    default_sort_column: { type: 'string', label: 'Default sort column (key or label)', default: '' },
    default_sort_direction: { type: 'string', label: 'Default sort direction (asc/desc)', default: 'asc' },

    // CLICK TO FILTER
    enable_click_filter: { type: 'boolean', label: 'Enable click-to-filter', default: true },
    click_filter_column: { type: 'string', label: 'Click filter column (key or label)', default: '' },
    click_filter_field:  { type: 'string', label: 'Click filter field (fully qualified Looker field)', default: '' }
  },

  // --- Load Highcharts once ---
  _ensureHC: null,
  _loadScriptOnce (src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = resolve; s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  },

  create (element) {
    if (!this._ensureHC) {
      this._ensureHC = (async () => {
        await this._loadScriptOnce('https://code.highcharts.com/highcharts.js');
        await this._loadScriptOnce('https://code.highcharts.com/modules/heatmap.js');
        await this._loadScriptOnce('https://code.highcharts.com/modules/accessibility.js');
      })();
    }

    // Root layout
    const root = document.createElement('div');
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.width = '100%';
    root.style.height = '100%';
    root.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    element.appendChild(root);
    this.root = root;

    // Header block (two rows)
    const headerWrap = document.createElement('div');
    headerWrap.style.position = 'sticky';
    headerWrap.style.top = '0';
    headerWrap.style.zIndex = '10';
    headerWrap.style.background = '#fff';
    headerWrap.style.overflow = 'hidden';
    headerWrap.style.borderBottom = '1px solid #e6e8ee';

    const groupRow = document.createElement('div'); // groups
    const leafRow = document.createElement('div');  // leaf labels
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
    root.appendChild(headerWrap);
    this.groupRow = groupRow;
    this.leafRow  = leafRow;

    // Scroll container shared by headers and chart (sync scrollLeft)
    const scroller = document.createElement('div');
    scroller.style.flex = '1 1 auto';
    scroller.style.overflow = 'auto';
    scroller.style.position = 'relative';
    root.appendChild(scroller);
    this.scroller = scroller;

    // Inner content width holder
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

    // Keep scroll in sync with header rows
    scroller.addEventListener('scroll', () => {
      this.groupRow.parentElement.scrollLeft = scroller.scrollLeft;
      this.leafRow.parentElement.scrollLeft  = scroller.scrollLeft;
    });

    // Resize observe to redraw headers
    this._resizeObserver = new ResizeObserver(() => {
      if (this._redrawHeaders) this._redrawHeaders();
    });
    this._resizeObserver.observe(scroller);
  },

  async updateAsync (data, element, config, queryResponse, details, done) {
    await this._ensureHC;

    // Clear previous
    this.groupRow.innerHTML = '';
    this.leafRow.innerHTML  = '';
    this.chartDiv.innerHTML = '';

    // Helpers
    const parseJSON = (txt, fb) => { try { return JSON.parse(txt || ''); } catch { return fb; } };
    const cols = parseJSON(config.columns_json, []);
    const groupColors = parseJSON(config.group_colors_json, {});
    if (!Array.isArray(cols) || cols.length === 0) {
      this.chartDiv.innerHTML = '<div style="padding:12px;color:#666">Configure <b>Columns JSON</b>.</div>';
      done(); return;
    }
    const colMinW = Math.max(60, Number(config.col_min_width) || 120);
    if (Number(config.table_height) > 0) this.scroller.style.maxHeight = `${config.table_height}px`;

    // Resolve Looker fields
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

    // Build rows (object per Looker row), keep raw + formatted
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

    // Sorting utilities
    const findKeyByLabelOrKey = (val) => {
      if (!val) return null;
      const low = String(val).toLowerCase();
      const byKey = resolvedCols.find(c => String(c.key).toLowerCase() === low);
      if (byKey) return byKey.key;
      const byLabel = resolvedCols.find(c => String(c.label).toLowerCase() === low);
      return byLabel ? byLabel.key : null;
    };
    const parseForSort = (v) => {
      if (v == null) return null;
      if (typeof v === 'number') return v;
      const s = String(v).trim().replace(/[, ]+/g, '').replace(/[%£$€]/g, '');
      const n = Number(s);
      return Number.isNaN(n) ? String(v).toLowerCase() : n;
    };
    // Apply default sort once per viz lifecycle
    if (!this._sortState) {
      const defKey = findKeyByLabelOrKey(config.default_sort_column);
      const dir = (String(config.default_sort_direction || 'asc').toLowerCase() === 'desc') ? 'desc' : 'asc';
      if (defKey) this._sortState = { key: defKey, dir };
    }
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

    // Click-to-filter target
    const clickKey = config.enable_click_filter ? (findKeyByLabelOrKey(config.click_filter_column) || null) : null;
    const clickFieldFallback = (() => {
      if (!clickKey) return null;
      const col = resolvedCols.find(c => c.key === clickKey);
      return col?._rowKey || null;
    })();
    const clickFieldName = (config.click_filter_field || clickFieldFallback || '').trim();

    // Build Highcharts heatmap series: one series per column
    // x = column index, y = row index, value = numeric or string-as-NaN (we'll show labels regardless)
    const colCount = resolvedCols.length;
    const rowCount = rows.length;

    // Column widths
    const colWidths = resolvedCols.map(c => Math.max(colMinW, Number(c.width) || colMinW));
    const totalWidth = colWidths.reduce((a,b)=>a+b, 0);

    // Render grouped header rows (HTML)
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

    // Top group row
    this.groupRow.style.gridTemplateColumns = colWidths.map(w => `${w}px`).join(' ');
    this.leafRow.style.gridTemplateColumns  = colWidths.map(w => `${w}px`).join(' ');

    for (let i=0;i<resolvedCols.length;) {
      const first = resolvedCols[i];
      if (!first.group) {
        // Spacer above ungrouped column: match leaf bg
        const bgc = (() => {
          let bg = first.header_bg;
          if ((bg === 'group' || bg === 'GROUP') && first.group) bg = groupColors[first.group] || '#d9e3f8';
          if (!bg) bg = '#0b2557';
          return bg;
        })();
        const spacer = makeDiv('', { bg: bgc, color: '#fff', center: true, bold: true });
        spacer.style.borderBottom = '1px solid #e6e8ee';
        spacer.style.gridColumn = `${i+1} / ${i+2}`;
        this.groupRow.appendChild(spacer);
        i++; continue;
      }
      let j = i+1;
      while (j < resolvedCols.length && resolvedCols[j].group === first.group) j++;
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

    // Leaf row (click to sort)
    const addLeaf = (col, idx) => {
      // Resolve leaf header colors
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
          this.updateAsync(data, element, config, queryResponse, details, done); // re-run with new sort
        });
      }
    };
    resolvedCols.forEach(addLeaf);

    // Prepare the series data
    // We'll show the actual values as dataLabels; keep cell color neutral.
    const series = resolvedCols.map((c, xIdx) => {
      const align = (c.align || 'left').toLowerCase();
      const data = rows.map((r, yIdx) => {
        const raw = r[c.key];
        const fmt = r['__fmt__' + c.key];
        // Heatmap requires numeric "value"; we can use 0 but display label via dataLabels
        // For optional future heat shading, parse numeric; for now keep flat.
        const num = Number(String(raw).replace(/[, ]+/g, '').replace(/[%£$€]/g, ''));
        const numeric = Number.isFinite(num) ? num : 0;
        return {
          x: xIdx,
          y: yIdx,
          value: numeric,
          color: '#ffffff',                 // neutral cell
          borderColor: '#e6e8ee',
          borderWidth: 1,
          dataLabels: {
            enabled: true,
            formatter: function () {
              if (raw == null) return '';
              // simple display; keep alignment using useHTML + a flex wrapper
              return '<div style="display:flex;'+
                (align==='right' ? 'justify-content:flex-end;' : align==='center' ? 'justify-content:center;' : 'justify-content:flex-start;')+
                'width:100%;"><span>'+ (fmt == null ? '' : String(fmt)) +'</span></div>';
            },
            useHTML: true,
            style: { textOutline: 'none', color: '#0b1020', fontWeight: c.bold ? '700' : '400', fontSize: '12px' },
            crop: false,
            overflow: 'none'
          },
          custom: { raw, fmt }
        };
      });

      // Only the click-filter column gets pointer + events
      const clickable = (config.enable_click_filter && clickKey && c.key === clickKey && clickFieldName);
      return {
        type: 'heatmap',
        name: c.label,
        data,
        colsize: 1,
        rowsize: 1,
        turboThreshold: 0,
        enableMouseTracking: clickable, // show hand + tooltip only if clickable
        states: { hover: { enabled: clickable } },
        cursor: clickable ? 'pointer' : 'default',
        point: clickable ? {
          events: {
            click: function () {
              const raw = this.custom?.raw;
              const fmt = this.custom?.fmt ?? (raw == null ? '' : String(raw));
              if (raw == null || raw === '') return;

              // EXPLORE-FRIENDLY payload (same shape as your working area chart)
              // Because this is a real Highcharts "point", Explore will listen.
              const field = clickFieldName;
              const value = String(raw);
              const formatted = String(fmt);
              // 1) Explore legacy array-of-objects
              // (this alone is usually enough when it's a point click)
              // Note: we still fire dashboard events to support dashboard tiles.
              this.series.chart.update({}, false); // no-op to keep chart reference warm
              const viz = window._lookerViz || null;

              // Send events via the viz API
              try {
                // explore
                (viz || this.series.chart).trigger?.('filter', [{ field, value, formatted }]);
                // dashboard
                (viz || this.series.chart).trigger?.('dashboard:filter', { field, value });
                (viz || this.series.chart).trigger?.('dashboard:run');
              } catch (_) {}

              // Fallback using the plugin scope if available
              try {
                const pluginScope = (typeof looker !== 'undefined' && looker.plugins && looker.plugins.visualizations) ? null : null;
                // no reliable fallback; rely on viz scope outside this handler
              } catch (_) {}
            }
          }
        } : undefined
      };
    });

    // Build the chart width = sum of column widths, then make the inner container that wide
    this.inner.style.width = `${totalWidth}px`;
    // Headers need same total width
    this.groupRow.style.width = `${totalWidth}px`;
    this.leafRow.style.width  = `${totalWidth}px`;

    // Chart height: viewport minus two header rows (≈88px)
    const headerH = 88;
    const maxH = Number(config.table_height) > 0 ? Number(config.table_height) : this.root.clientHeight || 480;
    const chartH = Math.max(200, maxH - headerH);
    this.chartDiv.style.height = `${chartH}px`;

    // Build category axes
    // xAxis has a category per column index; we'll hide the default axis entirely.
    const xCategories = resolvedCols.map(c => c.label);
    const yCategories = rows.map((_, i) => String(i + 1)); // simple row index labels (hidden)

    // Render chart
    const hc = Highcharts.chart(this.chartDiv, {
      chart: {
        type: 'heatmap',
        spacing: [0,0,0,0],
        animation: false
      },
      title: { text: null },
      credits: { enabled: false },
      exporting: { enabled: false },
      legend: { enabled: false },

      tooltip: { enabled: false }, // we use data labels; feel free to enable for hover

      xAxis: {
        categories: xCategories,
        visible: false
      },
      yAxis: {
        categories: yCategories,
        reversed: false,
        visible: false,
        min: -0.5,
        max: rowCount - 0.5
      },

      colorAxis: {
        min: 0, max: 1,
        stops: [[0, '#ffffff'], [1, '#ffffff']] // flat white cells
      },

      plotOptions: {
        series: {
          animation: false,
          borderWidth: 1,
          borderColor: '#e6e8ee',
          dataLabels: { defer: false }
        }
      },

      series
    });

    // --- Sorting indicator on leaf headers (▲ ▼)
    const applySortIndicators = () => {
      if (!config.enable_sorting || !this._sortState?.key) return;
      // Remove existing triangles
      Array.from(this.leafRow.children).forEach(el => {
        const base = (el.textContent || '').replace(/\s*[▲▼]$/, '');
        el.textContent = base;
      });
      // Apply to current key
      const idx = resolvedCols.findIndex(c => c.key === this._sortState.key);
      if (idx >= 0) {
        const el = this.leafRow.children[idx];
        const tri = (this._sortState.dir === 'asc') ? ' ▲' : ' ▼';
        el.textContent = (el.textContent || '') + tri;
      }
    };
    applySortIndicators();

    // Expose a header redraw (no-op for now, kept for future width calculations)
    this._redrawHeaders = () => {
      // nothing dynamic to recompute; widths are fixed from col
