// -----------------------------------------------------------------------------
// Highcharts Grid — Grouped Header (with Explore & Dashboard filtering)
// - supports.crossfilter enabled
// - Tries Highcharts Grid Lite; falls back to internal HTML table if CSP blocks
// - Grouped headers, centered labels, synced widths (fallback), sorting + defaults
// - Click-to-filter in BOTH Explore (filter+run) and Dashboards (dashboard:filter)
// -----------------------------------------------------------------------------
looker.plugins.visualizations.add({
  id: 'hc_grouped_grid',
  label: 'Highcharts Grid — Grouped Header',

  // 👇 This enables Looker crossfilter integrations (Explore/Dashboard)
  supports: { crossfilter: true },

  options: {
    columns_json: { type: 'string', label: 'Columns JSON', display: 'text', default: '' },
    group_colors_json: { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    table_height: { type: 'number', label: 'Max table height (px, 0=auto)', default: 450 },
    center_group_titles: { type: 'boolean', label: 'Center group titles', default: true },

    enable_sorting: { type: 'boolean', label: 'Enable sorting (header click)', default: true },
    default_sort_column: { type: 'string', label: 'Default sort column (key or label)', display: 'text', default: '' },
    default_sort_direction: { type: 'string', label: 'Default sort direction (asc/desc)', display: 'text', default: 'asc' },

    enable_click_filter: { type: 'boolean', label: 'Enable click-to-filter', default: true },
    click_filter_column: { type: 'string', label: 'Click filter column (key or label)', display: 'text', default: '' },
    click_filter_field: { type: 'string', label: 'Click filter field (fully qualified Looker field)', display: 'text', default: '' },
    click_filter_value_mode: {
      type: 'string',
      label: 'Filter value mode (Explore)',
      display: 'select',
      values: [
        {'Both (raw then formatted)': 'both'},
        {'Raw only': 'raw'},
        {'Formatted only': 'formatted'}
      ],
      default: 'both'
    },

    prefer_highcharts_grid: { type: 'boolean', label: 'Prefer Highcharts Grid', default: true }
  },

  create (element) {
    const root = document.createElement('div');
    root.style.position = 'relative';
    root.style.width = '100%';
    root.style.height = '100%';
    root.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    element.appendChild(root);
    this.root = root;

    const hcContainer = document.createElement('div');
    hcContainer.id = 'hcgrid-' + Math.random().toString(36).slice(2);
    hcContainer.style.width = '100%';
    hcContainer.style.height = '100%';
    this.root.appendChild(hcContainer);
    this.hcContainer = hcContainer;

    const fallbackWrap = document.createElement('div');
    fallbackWrap.style.display = 'none';
    fallbackWrap.style.width = '100%';
    fallbackWrap.style.height = '100%';
    fallbackWrap.style.display = 'flex';
    fallbackWrap.style.flexDirection = 'column';
    this.root.appendChild(fallbackWrap);
    this.fallbackWrap = fallbackWrap;

    const groupHeaderWrap = document.createElement('div');
    const colHeaderWrap = document.createElement('div');
    const scroller = document.createElement('div');
    [groupHeaderWrap, colHeaderWrap].forEach(w => {
      w.style.position = 'sticky';
      w.style.zIndex = '10';
      w.style.background = '#fff';
      w.style.overflow = 'hidden';
    });
    groupHeaderWrap.style.top = '0';
    colHeaderWrap.style.top = '44px';
    scroller.style.overflow = 'auto';
    scroller.style.position = 'relative';
    scroller.style.width = '100%';
    scroller.style.flex = '1 1 auto';
    scroller.style.maxHeight = '450px';
    fallbackWrap.appendChild(groupHeaderWrap);
    fallbackWrap.appendChild(colHeaderWrap);
    fallbackWrap.appendChild(scroller);

    this.groupHeaderWrap = groupHeaderWrap;
    this.colHeaderWrap = colHeaderWrap;
    this.scroller = scroller;

    this._loadScript = (src) => new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src; s.async = true; s.onload = resolve; s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
    this._loadCSS = (href) => new Promise((resolve, reject) => {
      if (document.querySelector(`link[href="${href}"]`)) return resolve();
      const l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = href; l.onload = resolve; l.onerror = () => reject(new Error('Failed to load ' + href));
      document.head.appendChild(l);
    });

    this._resizeObserver = new ResizeObserver(() => this._syncWidths && this._syncWidths());
    this._resizeObserver.observe(scroller);
  },

  async updateAsync (data, element, config, queryResponse, details, done) {
    this.hcContainer.innerHTML = '';
    this.fallbackWrap.style.display = 'none';
    this.hcContainer.style.display = 'block';
    this.groupHeaderWrap.innerHTML = '';
    this.colHeaderWrap.innerHTML = '';
    this.scroller.innerHTML = '';

    const parseJSON = (txt, fb) => { try { return JSON.parse(txt || ''); } catch { return fb; } };
    const cols = parseJSON(config.columns_json, []);
    const groupColors = parseJSON(config.group_colors_json, {});
    if (!Array.isArray(cols) || cols.length === 0) {
      this.hcContainer.innerHTML = '<div style="padding:12px"><b>Columns not configured</b></div>';
      done(); return;
    }
    if (Number(config.table_height) > 0) this.scroller.style.maxHeight = `${config.table_height}px`;

    const allFieldDefs = [
      ...(queryResponse.fields?.dimension_like || []),
      ...(queryResponse.fields?.measure_like || []),
      ...(queryResponse.fields?.table_calculations || [])
    ];
    const fieldByName = {};
    const labelToName = {};
    const shortToName = {};
    allFieldDefs.forEach(f => {
      fieldByName[f.name] = f;
      if (f.label_short) labelToName[String(f.label_short).toLowerCase()] = f.name;
      shortToName[f.name.split('.').pop()] = f.name;
    });
    const resolveField = (s) => {
      if (!s) return null;
      if (fieldByName[s]) return s;
      const end = Object.keys(fieldByName).find(n => n.endsWith('.' + s)); if (end) return end;
      const byLabel = labelToName[String(s).toLowerCase()]; if (byLabel) return byLabel;
      if (shortToName[s]) return shortToName[s];
      return null;
    };

    const resolvedCols = cols.map(c => ({ ...c, _rowKey: resolveField(c.field) }));

    const rawVal = (row, key) => key && row[key] ? row[key].value : null;
    const fmtVal = (row, key) => key && row[key] ? (row[key].rendered ?? row[key].value) : null;

    const rows = data.map(r => {
      const out = {};
      resolvedCols.forEach(c => {
        out[c.key] = rawVal(r, c._rowKey);
        out['__fmt__' + c.key] = fmtVal(r, c._rowKey);
      });
      return out;
    });

    const findKeyByLabelOrKey = (val) => {
      if (!val) return null;
      const low = String(val).toLowerCase();
      const byKey = resolvedCols.find(c => String(c.key).toLowerCase() === low);
      if (byKey) return byKey.key;
      const byLabel = resolvedCols.find(c => String(c.label).toLowerCase() === low);
      return byLabel ? byLabel.key : null;
    };
    const clickKey = config.enable_click_filter ? (findKeyByLabelOrKey(config.click_filter_column) || null) : null;
    const clickFieldFallback = (() => {
      if (!clickKey) return null;
      const col = resolvedCols.find(c => c.key === clickKey);
      return col?._rowKey || null;
    })();
    const clickFieldName = (config.click_filter_field || clickFieldFallback || '').trim();

    const emitFilter = (field, raw, formatted) => {
      const mode = (config.click_filter_value_mode || 'both').toLowerCase();
      const send = (value) => {
        this.trigger('filter', { field, value, run: true });     // Explore
        this.trigger('dashboard:filter', { field, value });       // Dashboards
        this.trigger('dashboard:run');
      };
      if (mode === 'raw') send(raw);
      else if (mode === 'formatted') send(formatted);
      else { send(raw); setTimeout(() => send(formatted), 0); }
      try { console.log('[HC Grid] filter click →', { field, raw, formatted, mode }); } catch (e) {}
    };

    const wantHC = config.prefer_highcharts_grid !== false;
    let renderedWithHC = false;

    if (wantHC) {
      try {
        await this._loadCSS('https://cdn.jsdelivr.net/npm/@highcharts/grid-lite/css/grid-lite.css');
        await this._loadScript('https://cdn.jsdelivr.net/npm/@highcharts/grid-lite/grid-lite.js');

        if (typeof Grid === 'undefined' || !Grid.grid) throw new Error('Highcharts Grid not available');

        // Build DataTable
        const dataTable = { columns: {} };
        resolvedCols.forEach(c => {
          dataTable.columns[c.key] = rows.map(r => r[c.key]);
        });

        // Column defs
        const defaultSortable = !!config.enable_sorting;
        const dir = String(config.default_sort_direction || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';
        const defKey = findKeyByLabelOrKey(config.default_sort_column);

        const columns = resolvedCols.map(c => {
          const width = (c.width != null) ? c.width : undefined;
          const align = (c.align || 'left');
          let bg = c.header_bg, color = c.header_color;
          if ((bg === 'group' || bg === 'GROUP') && c.group) bg = groupColors[c.group] || '#d9e3f8';
          if (!bg) bg = '#0b2557';
          if (!color) color = (String(bg).toLowerCase() === '#0b2557') ? '#ffffff' : '#0b1020';
          return {
            id: c.key,
            width,
            header: {
              format: c.label,
              className: `hc-col-${c.key}`,
              style: { background: bg, color, textAlign: 'center' }
            },
            cells: {
              className: `hc-cell-${c.key}`,
              style: { textAlign: align, fontWeight: c.bold ? '700' : '400' }
            },
            sorting: {
              sortable: defaultSortable,
              order: (defKey && defKey === c.key) ? dir : undefined
            }
          };
        });

        // Header rows (groups)
        const headerRows = [];
        const topCells = [];
        let i = 0;
        while (i < resolvedCols.length) {
          const start = resolvedCols[i];
          const groupName = start.group;
          if (!groupName) {
            const leafCol = columns.find(cc => cc.id === start.key);
            topCells.push({
              colSpan: 1,
              format: '',
              style: { background: leafCol.header.style.background, borderBottom: 'none' }
            });
            i++; continue;
          }
          let j = i + 1; while (j < resolvedCols.length && resolvedCols[j].group === groupName) j++;
          const span = j - i;
          topCells.push({
            colSpan: span,
            format: groupName,
            style: {
              background: groupColors[groupName] || '#d9e3f8',
              color: '#0b1020',
              textAlign: config.center_group_titles ? 'center' : 'left',
              fontWeight: 600
            }
          });
          i = j;
        }
        headerRows.push({ cells: topCells });

        // Grid options
        const gridOptions = {
          dataTable,
          columnDefaults: {
            header: { style: { textAlign: 'center', verticalAlign: 'middle', height: '44px' } },
            cells: { style: { height: '36px' } },
            sorting: { sortable: defaultSortable }
          },
          columns,
          header: { rows: headerRows },
          renderTo: this.hcContainer.id
        };

        this.hcContainer.style.maxHeight = (Number(config.table_height) > 0) ? `${config.table_height}px` : 'inherit';
        const grid = Grid.grid(this.hcContainer.id, gridOptions);

        // Click-to-filter delegation
        if (config.enable_click_filter && clickKey && clickFieldName) {
          this.hcContainer.addEventListener('click', (ev) => {
            const cell = ev.target.closest('td,th'); if (!cell) return;
            const cls = Array.from(cell.classList).find(cn => cn.startsWith('hc-cell-')); if (!cls) return;
            const colId = cls.replace('hc-cell-', ''); if (colId !== clickKey) return;

            const tr = ev.target.closest('tr'); if (!tr) return;
            let rowIndex = Array.from(tr.parentElement.children).indexOf(tr);
            if (rowIndex < 0) return;

            const raw = rows[rowIndex]?.[clickKey];
            const formatted = rows[rowIndex]?.['__fmt__' + clickKey] ?? String(raw);
            if (raw == null || raw === '') return;

            emitFilter(clickFieldName, raw, formatted);
            cell.style.outline = '2px solid rgba(63,131,248,.6)'; setTimeout(() => (cell.style.outline = ''), 250);
          });
        }

        renderedWithHC = true;
      } catch (e) {
        console.warn('[HC Grid] Falling back to internal table:', e?.message || e);
        renderedWithHC = false;
      }
    }

    // ---------- Fallback HTML table (with crossfilter events) ----------
    if (!renderedWithHC) {
      this.hcContainer.style.display = 'none';
      this.fallbackWrap.style.display = 'flex';

      const makeTable = () => {
        const t = document.createElement('table');
        t.style.borderCollapse = 'separate';
        t.style.borderSpacing = '0';
        t.style.tableLayout = 'fixed';
        return t;
      };
      const makeTh = (txt, opts = {}) => {
        const th = document.createElement('th');
        th.textContent = txt;
        th.style.padding = '12px 10px';
        th.style.fontWeight = opts.bold ? '700' : '600';
        th.style.fontSize = '13px';
        th.style.textAlign = 'center';
        th.style.borderBottom = '1px solid #e6e8ee';
        th.style.background = opts.bg ?? '#0b2557';
        th.style.color = opts.color ?? (opts.bg === '#0b2557' ? '#ffffff' : '#0b1020');
        th.style.whiteSpace = 'nowrap';
        th.style.verticalAlign = 'middle';
        th.style.height = '44px';
        th.style.boxSizing = 'border-box';
        return th;
      };
      const makeTd = () => {
        const td = document.createElement('td');
        td.style.padding = '10px';
        td.style.borderBottom = '1px solid #eef1f6';
        td.style.whiteSpace = 'nowrap';
        td.style.overflow = 'hidden';
        td.style.textOverflow = 'ellipsis';
        td.style.boxSizing = 'border-box';
        return td;
      };

      const groupTable = makeTable();
      const groupRow = document.createElement('tr');
      const colTable = makeTable();
      const colRow = document.createElement('tr');

      let i = 0;
      while (i < resolvedCols.length) {
        const c0 = resolvedCols[i];
        const group = c0.group;
        if (!group) {
          let bg = c0.header_bg;
          if ((bg === 'group' || bg === 'GROUP') && c0.group) bg = groupColors[c0.group] || '#d9e3f8';
          if (!bg) bg = '#0b2557';
          const spacer = makeTh('', { bg, color: '#fff' });
          spacer.style.borderBottom = 'none';
          groupRow.appendChild(spacer);

          const { bg: lb, color: lc } = (() => {
            let b = c0.header_bg, c = c0.header_color;
            if ((b === 'group' || b === 'GROUP') && c0.group) b = groupColors[c0.group] || '#d9e3f8';
            if (!b) b = '#0b2557';
            if (!c) c = (String(b).toLowerCase() === '#0b2557') ? '#ffffff' : '#0b1020';
            return { bg: b, color: c };
          })();
          const leaf = makeTh(c0.label, { bg: lb, color: lc });
          leaf.dataset.key = c0.key;
          colRow.appendChild(leaf);
          i++; continue;
        }
        let j = i + 1;
        while (j < resolvedCols.length && resolvedCols[j].group === group) j++;
        const thg = makeTh(group, { bg: groupColors[group] || '#d9e3f8', color: '#0b1020' });
        thg.colSpan = j - i;
        groupRow.appendChild(thg);

        for (let k = i; k < j; k++) {
          const c = resolvedCols[k];
          let b = c.header_bg, ccol = c.header_color;
          if ((b === 'group' || b === 'GROUP') && c.group) b = groupColors[c.group] || '#d9e3f8';
          if (!b) b = '#0b2557';
          if (!ccol) ccol = (String(b).toLowerCase() === '#0b2557') ? '#ffffff' : '#0b1020';
          const leaf = makeTh(c.label, { bg: b, color: ccol });
          leaf.dataset.key = c.key;
          colRow.appendChild(leaf);
        }
        i = j;
      }

      groupTable.appendChild(groupRow);
      colTable.appendChild(colRow);
      this.groupHeaderWrap.appendChild(groupTable);
      this.colHeaderWrap.appendChild(colTable);

      const bodyTable = makeTable();
      const tbody = document.createElement('tbody');
      const fmt = (v) => (v == null ? '' : (v.toLocaleString?.() ?? String(v)));

      rows.forEach((r, rowIdx) => {
        const tr = document.createElement('tr');
        resolvedCols.forEach(c => {
          const td = makeTd();
          const vRaw = r[c.key];
          const vFmt = r['__fmt__' + c.key];
          td.textContent = fmt(vRaw);
          td.style.textAlign = c.align || 'left';
          td.style.fontWeight = c.bold ? '700' : '400';

          if (config.enable_click_filter && clickKey && clickFieldName && c.key === clickKey && vRaw != null && vRaw !== '') {
            td.style.cursor = 'pointer';
            td.style.textDecoration = 'underline';
            td.title = `Filter: ${clickFieldName} = ${vFmt ?? vRaw}`;
            td.addEventListener('click', () => {
              const mode = (config.click_filter_value_mode || 'both').toLowerCase();
              // Explore + Dashboard events
              const send = (value) => {
                this.trigger('filter', { field: clickFieldName, value, run: true });
                this.trigger('dashboard:filter', { field: clickFieldName, value });
                this.trigger('dashboard:run');
              };
              if (mode === 'raw') send(vRaw);
              else if (mode === 'formatted') send(vFmt ?? String(vRaw));
              else { send(vRaw); setTimeout(() => send(vFmt ?? String(vRaw)), 0); }

              td.style.outline = '2px solid rgba(63,131,248,.6)';
              setTimeout(() => (td.style.outline = ''), 250);
            });
          }

          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });

      bodyTable.appendChild(tbody);
      this.scroller.appendChild(bodyTable);

      this._syncWidths = () => {
        const firstRow = tbody.rows[0];
        const colCount = resolvedCols.length;
        let widths = new Array(colCount).fill(0);
        if (firstRow) {
          for (let c = 0; c < colCount; c++) {
            const cell = firstRow.cells[c];
            if (!cell) continue;
            widths[c] = Math.max(80, Math.ceil(cell.getBoundingClientRect().width));
          }
        }
        const setWidths = (rowEl) => {
          Array.from(rowEl.children).forEach((th, idx) => {
            const w = widths[idx] || 100;
            th.style.width = w + 'px';
            th.style.minWidth = w + 'px';
            th.style.maxWidth = w + 'px';
          });
        };
        setWidths(colRow);
        let cursor = 0;
        Array.from(groupRow.children).forEach(thg => {
          const span = Number(thg.colSpan || 1);
          const total = widths.slice(cursor, cursor + span).reduce((a, b) => a + b, 0);
          thg.style.width = total + 'px';
          thg.style.minWidth = total + 'px';
          thg.style.maxWidth = total + 'px';
          cursor += span;
        });
        const totalW = widths.reduce((a,b)=>a+b,0);
        [groupTable, colTable, bodyTable].forEach(t => t.style.width = totalW + 'px');
      };
      requestAnimationFrame(() => this._syncWidths());
      this.scroller.onscroll = () => {
        const left = this.scroller.scrollLeft;
        this.groupHeaderWrap.scrollLeft = left;
        this.colHeaderWrap.scrollLeft = left;
      };
    }

    done();
  }
});
