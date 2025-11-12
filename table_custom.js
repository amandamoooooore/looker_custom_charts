
looker.plugins.visualizations.add({
  id: 'hc_grouped_grid',
  label: 'Highcharts Grid — Grouped Header',
  supports: { crossfilter: true, selection: true },

  options: {
    columns_json:       { type: 'string', label: 'Columns JSON', display: 'text', default: '' },
    group_colors_json:  { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    table_height:       { type: 'number', label: 'Max table height (px, 0=auto)', default: 450 },
    center_group_titles:{ type: 'boolean', label: 'Center group titles', default: true },

    enable_sorting:     { type: 'boolean', label: 'Enable sorting (header click)', default: true },
    default_sort_column:{ type: 'string', label: 'Default sort column (key or label)', display: 'text', default: '' },
    default_sort_direction:{ type: 'string', label: 'Default sort direction (asc/desc)', display: 'text', default: 'asc' },

    enable_click_filter:{ type: 'boolean', label: 'Enable click-to-filter', default: true },
    click_filter_column:{ type: 'string', label: 'Click filter column (key or label)', display: 'text', default: '' },
    click_filter_field: { type: 'string', label: 'Click filter field (fully qualified Looker field)', display: 'text', default: '' },
    click_filter_value_mode: {
      type: 'string', label: 'Filter value mode (Explore)', display: 'select',
      values: [
        {'Both (raw then formatted)': 'both'},
        {'Raw only': 'raw'},
        {'Formatted only': 'formatted'}
      ],
      default: 'both'
    },

    prefer_highcharts_grid: { type: 'boolean', label: 'Prefer Highcharts Grid', default: true },
    show_debug_banner:      { type: 'boolean', label: 'Show debug banner (filter hints)', default: true }
  },

  create (element) {
    const root = document.createElement('div');
    root.style.position = 'relative';
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

    // HC container
    const hcContainer = document.createElement('div');
    hcContainer.id = 'hcgrid-' + Math.random().toString(36).slice(2);
    hcContainer.style.width = '100%';
    hcContainer.style.height = '100%';
    this.root.appendChild(hcContainer);
    this.hcContainer = hcContainer;

    // Fallback wrappers
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

    // loaders
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
    // reset DOM
    this.banner.style.display = 'none';
    this.banner.innerHTML = '';
    this.hcContainer.innerHTML = '';
    this.fallbackWrap.style.display = 'none';
    this.hcContainer.style.display = 'block';
    this.groupHeaderWrap.innerHTML = '';
    this.colHeaderWrap.innerHTML = '';
    this.scroller.innerHTML = '';

    // parse options
    const parseJSON = (txt, fb) => { try { return JSON.parse(txt || ''); } catch { return fb; } };
    const cols = parseJSON(config.columns_json, []);
    const groupColors = parseJSON(config.group_colors_json, {});
    if (!Array.isArray(cols) || cols.length === 0) {
      this.hcContainer.innerHTML = '<div style="padding:12px"><b>Columns not configured</b></div>';
      done(); return;
    }
    if (Number(config.table_height) > 0) this.scroller.style.maxHeight = `${config.table_height}px`;

    // resolve fields
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

    // pull data (keep raw + formatted)
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

    // which column is clickable + which field to filter
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

    // --- show a banner if Explore is likely to ignore us ---
    const clickFieldInQuery = !!(clickFieldName && fieldByName[clickFieldName]);
    if (config.show_debug_banner && config.enable_click_filter && clickKey && clickFieldName && !clickFieldInQuery) {
      this.banner.style.display = 'block';
      this.banner.innerHTML = `🔎 <b>Tip:</b> Add <code>${clickFieldName}</code> to your Explore's selected fields (you can hide it in the table).
      Explore tends to ignore filter events on fields that aren’t part of the query.`;
    }

    // Robust emitter for STRING fields (Explore + Dashboards)
    const emitFilter = (field, rawValue, formattedValue) => {
      // Coerce to strings
      const vRaw = (rawValue == null) ? '' : String(rawValue);
      const vFmt = (formattedValue == null) ? vRaw : String(formattedValue);
    
      // Escape quotes for quoted payload
      const esc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const rawQuoted = `"${esc(vRaw)}"`;
      const fmtQuoted = `"${esc(vFmt)}"`;
    
      // Decide which base to prefer from the config, but we will try both styles
      const mode = (config.click_filter_value_mode || 'both').toLowerCase();
      const chooseBases = () => {
        if (mode === 'raw') return [vRaw, rawQuoted];
        if (mode === 'formatted') return [vFmt, fmtQuoted];
        // both: try raw (unquoted), then formatted (quoted) as fallback
        return [vRaw, fmtQuoted, vFmt, rawQuoted];
      };
    
      const sendOne = (value) => {
        // Explore (3 shapes)
        this.trigger('filter', { field, value, run: true });
        this.trigger('filter', { filters: [{ field, value }], run: true });
        this.trigger('filter', { fields: [field], values: [value], run: true });
        // Dashboards
        this.trigger('dashboard:filter', { field, value });
        this.trigger('dashboard:run');
      };
    
      // Try multiple string payload shapes/quoting
      const bases = chooseBases();
      bases.forEach((val, idx) => setTimeout(() => sendOne(val), idx * 0));
    
      try { console.log('[Grouped Grid] string filter emit →', { field, tries: bases }); } catch (e) {}
    };

    // try Highcharts Grid first
    const wantHC = config.prefer_highcharts_grid !== false;
    let renderedWithHC = false;

    if (wantHC) {
      try {
        await this._loadCSS('https://cdn.jsdelivr.net/npm/@highcharts/grid-lite/css/grid-lite.css');
        await this._loadScript('https://cdn.jsdelivr.net/npm/@highcharts/grid-lite/grid-lite.js');

        if (typeof Grid === 'undefined' || !Grid.grid) throw new Error('Highcharts Grid not available');

        // DataTable columns
        const dataTable = { columns: {} };
        resolvedCols.forEach(c => { dataTable.columns[c.key] = rows.map(r => r[c.key]); });

        // columns config
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
              style: { background: bg, color, textAlign: 'center', verticalAlign: 'middle', height: '44px' }
            },
            cells: {
              className: `hc-cell-${c.key}`,
              style: { textAlign: align, fontWeight: c.bold ? '700' : '400' }
            },
            sorting: { sortable: defaultSortable, order: (defKey && defKey === c.key) ? dir : undefined }
          };
        });

        // grouped header (top row)
        const headerRows = [];
        const topCells = [];
        let i = 0;
        while (i < resolvedCols.length) {
          const start = resolvedCols[i];
          const g = start.group;
          if (!g) {
            const leafCol = columns.find(cc => cc.id === start.key);
            topCells.push({
              colSpan: 1,
              format: '',
              style: { background: leafCol.header.style.background, borderBottom: 'none' }
            });
            i++; continue;
          }
          let j = i + 1; while (j < resolvedCols.length && resolvedCols[j].group === g) j++;
          const span = j - i;
          topCells.push({
            colSpan: span,
            format: g,
            style: {
              background: groupColors[g] || '#d9e3f8',
              color: '#0b1020',
              textAlign: config.center_group_titles ? 'center' : 'left',
              fontWeight: 600
            }
          });
          i = j;
        }
        headerRows.push({ cells: topCells });

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
        Grid.grid(this.hcContainer.id, gridOptions);

        // click-to-filter (delegate)
        if (config.enable_click_filter && clickKey && clickFieldName) {
          this.hcContainer.addEventListener('click', (ev) => {
            const cell = ev.target.closest('td,th'); if (!cell) return;
            const cls = Array.from(cell.classList).find(cn => cn.startsWith('hc-cell-')); if (!cls) return;
            const colId = cls.replace('hc-cell-', ''); if (colId !== clickKey) return;
            const tr = ev.target.closest('tr'); if (!tr) return;
            let idx = Array.from(tr.parentElement.children).indexOf(tr);
            if (idx < 0) return;

            const raw = rows[idx]?.[clickKey];
            const formatted = rows[idx]?.['__fmt__' + clickKey] ?? String(raw);
            if (raw == null || raw === '') return;

            emitFilter(clickFieldName, raw, formatted);
            cell.style.outline = '2px solid rgba(63,131,248,.6)'; setTimeout(() => (cell.style.outline = ''), 250);
          });
        }

        renderedWithHC = true;
      } catch (e) {
        console.warn('[HC Grid] Falling back to internal table:', e?.message || e);
      }
    }

    // fallback HTML table
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

      const groupTable = makeTable(), colTable = makeTable(), bodyTable = makeTable();
      const groupRow = document.createElement('tr'), colRow = document.createElement('tr');

      // headers
      let i = 0;
      while (i < resolvedCols.length) {
        const c0 = resolvedCols[i];
        const g = c0.group;
        if (!g) {
          let bg = c0.header_bg;
          if ((bg === 'group' || bg === 'GROUP') && c0.group) bg = groupColors[c0.group] || '#d9e3f8';
          if (!bg) bg = '#0b2557';
          const spacer = makeTh('', { bg, color: '#fff' });
          spacer.style.borderBottom = 'none';
          groupRow.appendChild(spacer);

          const leaf = makeTh(c0.label, colorForLeaf(c0));
          leaf.dataset.key = c0.key;
          colRow.appendChild(leaf);
          i++; continue;
        }
        let j = i + 1; while (j < resolvedCols.length && resolvedCols[j].group === g) j++;
        const thg = makeTh(g, { bg: groupColors[g] || '#d9e3f8', color: '#0b1020' });
        thg.colSpan = j - i;
        groupRow.appendChild(thg);
        for (let k = i; k < j; k++) {
          const leaf = makeTh(resolvedCols[k].label, colorForLeaf(resolvedCols[k]));
          leaf.dataset.key = resolvedCols[k].key;
          colRow.appendChild(leaf);
        }
        i = j;
      }
      function colorForLeaf(col) {
        let bg = col.header_bg, color = col.header_color;
        if ((bg === 'group' || bg === 'GROUP') && col.group) bg = groupColors[col.group] || '#d9e3f8';
        if (!bg) bg = '#0b2557';
        if (!color) color = (String(bg).toLowerCase() === '#0b2557') ? '#ffffff' : '#0b1020';
        return { bg, color };
      }

      groupTable.appendChild(groupRow);
      colTable.appendChild(colRow);
      this.groupHeaderWrap.appendChild(groupTable);
      this.colHeaderWrap.appendChild(colTable);

      // body
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

          // click-to-filter
          if (config.enable_click_filter && clickKey && clickFieldName && c.key === clickKey && vRaw != null && vRaw !== '') {
            td.style.cursor = 'pointer';
            td.style.textDecoration = 'underline';
            td.title = `Filter: ${clickFieldName} = ${vFmt ?? vRaw}`;
            td.addEventListener('click', () => {
              const mode = (config.click_filter_value_mode || 'both').toLowerCase();
              const sendAll = (value) => {
                this.trigger('filter', { field: clickFieldName, value, run: true });
                this.trigger('filter', { filters: [{ field: clickFieldName, value }], run: true });
                this.trigger('filter', { fields: [clickFieldName], values: [value], run: true });
                this.trigger('dashboard:filter', { field: clickFieldName, value });
                this.trigger('dashboard:run');
              };
              if (mode === 'raw') sendAll(vRaw);
              else if (mode === 'formatted') sendAll(vFmt ?? String(vRaw));
              else { sendAll(vRaw); setTimeout(() => sendAll(vFmt ?? String(vRaw)), 0); }

              td.style.outline = '2px solid rgba(63,131,248,.6)'; setTimeout(() => (td.style.outline = ''), 250);
            });
          }

          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      bodyTable.appendChild(tbody);
      this.scroller.appendChild(bodyTable);

      // width sync
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
