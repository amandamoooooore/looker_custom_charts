
looker.plugins.visualizations.add({
  id: 'grouped_header_grid',
  label: 'Grouped Header Grid',

  options: {
    // Columns JSON: [{ field, key, label, group?, align?, bold?, heat?, header_bg?, header_color? }, ...]
    columns_json: { type: 'string', label: 'Columns JSON', display: 'text', default: '' },
    // Group Colors: { "Group Name": "#hex" }
    group_colors_json: { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    // Layout
    table_height: { type: 'number', label: 'Max table height (px, 0 = auto)', default: 450 },
    center_group_titles: { type: 'boolean', label: 'Center group titles', default: true },

    // Sorting
    enable_sorting: { type: 'boolean', label: 'Enable sorting (click headers)', default: true },
    default_sort_column: { type: 'string', label: 'Default sort column (key or label)', display: 'text', default: '' },
    default_sort_direction: { type: 'string', label: 'Default sort direction (asc/desc)', display: 'text', default: 'asc' },

    // Debug
    debug_fields: { type: 'boolean', label: 'Show field debug header', default: false }
  },

  create (element) {
    // Root
    const root = document.createElement('div');
    root.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    root.style.fontSize  = '13px';
    root.style.color     = '#1a1f36';
    root.style.display   = 'flex';
    root.style.flexDirection = 'column';
    element.appendChild(root);
    this.root = root;

    // Sticky header wrapper (outside scroller)
    const headerWrap = document.createElement('div');
    headerWrap.style.position = 'sticky';
    headerWrap.style.top = '0';
    headerWrap.style.zIndex = '5';
    headerWrap.style.background = 'white';
    headerWrap.style.overflow = 'hidden'; // we’ll translate inner for horizontal sync
    this.root.appendChild(headerWrap);
    this.headerWrap = headerWrap;

    // Inner container that we translate horizontally
    const headerInner = document.createElement('div');
    headerWrap.appendChild(headerInner);
    this.headerInner = headerInner;

    // Body scroller
    const scroller = document.createElement('div');
    scroller.style.overflow = 'auto';
    scroller.style.position = 'relative';
    scroller.style.flex = '1 1 auto';
    this.root.appendChild(scroller);
    this.scroller = scroller;

    // Sorting state
    this.sortState = { key: null, dir: 'asc' };
  },

  updateAsync (data, element, config, queryResponse, details, done) {
    // Clear
    this.headerInner.innerHTML = '';
    this.scroller.innerHTML = '';

    // ---------- Parse options
    const parseJSON = (txt, fb) => { try { return JSON.parse(txt || ''); } catch { return fb; } };
    const cols = parseJSON(config.columns_json, []);
    const groupColors = parseJSON(config.group_colors_json, {});
    if (!Array.isArray(cols) || cols.length === 0) {
      const m = document.createElement('div');
      m.style.padding = '16px';
      m.innerHTML = `<b>Columns not configured</b><div style="opacity:.85;margin-top:8px">Paste your minified array into <i>Columns JSON</i>.</div>`;
      this.scroller.appendChild(m); done(); return;
    }
    if (Number(config.table_height) > 0) this.scroller.style.maxHeight = `${config.table_height}px`;

    // ---------- Field resolver
    const allFieldDefs = [
      ...(queryResponse.fields?.dimension_like || []),
      ...(queryResponse.fields?.measure_like || []),
      ...(queryResponse.fields?.table_calculations || [])
    ];
    const fieldKeys = allFieldDefs.map(f => f.name);
    const shortToFull = {}; const labelToFull = {};
    allFieldDefs.forEach(f => {
      const short = f.name.split('.').pop();
      if (!shortToFull[short]) shortToFull[short] = f.name;
      if (f.label_short) labelToFull[String(f.label_short).toLowerCase()] = f.name;
    });
    const resolveField = (s) => {
      if (!s) return null;
      if (fieldKeys.includes(s)) return s;
      const end = fieldKeys.find(k => k.endsWith('.' + s)); if (end) return end;
      const lab = labelToFull[String(s).toLowerCase()]; if (lab) return lab;
      if (shortToFull[s]) return shortToFull[s];
      return null;
    };

    const unresolved = [];
    const resolvedCols = cols.map(c => {
      const rk = resolveField(c.field);
      if (!rk) unresolved.push(c);
      return { ...c, _rowKey: rk };
    });

    // ---------- Data extraction
    const rawVal = (row, key) => key && row[key] ? row[key].value : null;
    let rows = data.map(r => {
      const o = {}; resolvedCols.forEach(c => o[c.key] = rawVal(r, c._rowKey)); return o;
    });

    // ---------- Helpers
    const parseForSort = (v) => {
      if (v == null) return null;
      if (typeof v === 'number') return v;
      if (typeof v === 'boolean') return v ? 1 : 0;
      const s = String(v).trim().replace(/[, ]+/g, '').replace(/[%£$€]/g, '');
      const n = Number(s);
      return Number.isNaN(n) ? String(v).toLowerCase() : n;
    };

    // Heatmap scales (stable across sorting)
    const heatCols = resolvedCols.filter(c => c.heat);
    const mins = {}, maxs = {};
    heatCols.forEach(c => {
      const vs = rows.map(r => Number(parseForSort(r[c.key]))).filter(Number.isFinite);
      if (vs.length) { mins[c.key] = Math.min(...vs); maxs[c.key] = Math.max(...vs); }
    });
    const shade = (key, v) => {
      const n = Number(parseForSort(v));
      if (!Number.isFinite(n)) return '';
      const min = mins[key], max = maxs[key];
      if (max == null || min == null) return '';
      if (max === min) return 'rgba(63,131,248,0.15)';
      const t = (n - min) / (max - min);
      return `rgba(63,131,248,${0.12 + 0.28*t})`;
    };

    // ---------- Shared <colgroup> so header/body columns align
    const makeColGroup = (count) => {
      const cg = document.createElement('colgroup');
      for (let i = 0; i < count; i++) {
        const col = document.createElement('col');
        col.style.width = `${(100 / count)}%`;
        cg.appendChild(col);
      }
      return cg;
    };

    // ---------- Header color resolver
    const resolveLeafHeaderColors = (col, groupColors) => {
      let bg = col.header_bg;
      let color = col.header_color;
      if ((bg === 'group' || bg === 'GROUP') && col.group) {
        const gcol = groupColors[col.group];
        bg = gcol || '#d9e3f8';
      }
      if (!bg) bg = '#0b2557';
      if (!color) color = (bg.toLowerCase() === '#0b2557') ? '#ffffff' : '#0b1020';
      return { bg, color };
    };

    // ---------- Factories
    const makeHeaderTable = () => {
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'separate';
      table.style.borderSpacing = '0';
      table.style.tableLayout = 'fixed';
      table.appendChild(makeColGroup(resolvedCols.length));
      return table;
    };
    const makeBodyTable = () => {
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'separate';
      table.style.borderSpacing = '0';
      table.style.tableLayout = 'fixed';
      table.appendChild(makeColGroup(resolvedCols.length));
      return table;
    };

    const makeTh = (txt, opts = {}) => {
      const th = document.createElement('th');
      th.textContent = txt;
      th.style.padding = '12px 10px';
      th.style.fontWeight = opts.bold ? '700' : '600';
      th.style.fontSize = '13px';
      th.style.textAlign = opts.align || 'left';
      th.style.borderBottom = '1px solid #e6e8ee';

      const bg = opts.bg ?? '#0b2557';
      th.style.background = bg;
      th.style.backgroundColor = bg;
      th.style.color = opts.color ?? (bg === '#0b2557' ? '#ffffff' : '#0b1020');

      th.style.verticalAlign = 'middle';
      th.style.height = (opts.isGroup ? 44 : 44) + 'px';
      th.style.lineHeight = '1.3em';
      if (opts.isGroup && config.center_group_titles) th.style.textAlign = 'center';
      return th;
    };

    // ---------- Build HEADER TABLE (group row + leaf row)
    const headerTable = makeHeaderTable();
    const thead = document.createElement('thead');
    const r1 = document.createElement('tr'); // groups
    const r2 = document.createElement('tr'); // leaf labels
    const leafThByKey = {};

    let i = 0;
    while (i < resolvedCols.length) {
      const c0 = resolvedCols[i];
      const g = c0.group;

      if (!g) {
        // Empty spacer in group row so heights match
        const spacer = makeTh('', { isGroup: true, align: 'left', bg: '#0b2557', color: '#ffffff' });
        spacer.style.borderBottom = 'none';
        r1.appendChild(spacer);

        const { bg, color } = resolveLeafHeaderColors(c0, groupColors);
        const th = makeTh(c0.label, { align: 'left', bg, color });
        th.dataset.key = c0.key;
        r2.appendChild(th);
        leafThByKey[c0.key] = th;

        i++; continue;
      }

      // Group block
      let j = i; while (j < resolvedCols.length && resolvedCols[j].group === g) j++;
      const thg = makeTh(g, { bg: groupColors[g] || '#d9e3f8', color: '#0b1020', isGroup: true });
      thg.colSpan = j - i;
      r1.appendChild(thg);

      for (let k = i; k < j; k++) {
        const col = resolvedCols[k];
        const { bg, color } = resolveLeafHeaderColors(col, groupColors);
        const th = makeTh(col.label, { align: 'left', bg, color });
        th.dataset.key = col.key;
        r2.appendChild(th);
        leafThByKey[col.key] = th;
      }
      i = j;
    }
    thead.appendChild(r1); thead.appendChild(r2);
    thead.style.boxShadow = '0 2px 0 rgba(0,0,0,0.04)';
    headerTable.appendChild(thead);
    this.headerInner.appendChild(headerTable);

    // ---------- Build BODY TABLE (tbody only)
    const bodyTable = makeBodyTable();
    const tbody = document.createElement('tbody');

    const fmt = v => (v == null ? '' : (v.toLocaleString?.() ?? String(v)));

    const renderBody = (rowsIn) => {
      tbody.innerHTML = '';
      if (unresolved.length) {
        const trW = document.createElement('tr');
        const tdW = document.createElement('td');
        tdW.colSpan = resolvedCols.length;
        tdW.style.padding = '10px';
        tdW.style.background = '#fff8e1';
        tdW.style.borderBottom = '1px solid #ffe08a';
        tdW.innerHTML = `⚠️ Unresolved fields: ${unresolved.map(u => `<code>${u.field}</code>`).join(', ')}`;
        trW.appendChild(tdW); tbody.appendChild(trW);
      }
      rowsIn.forEach(r => {
        const tr = document.createElement('tr');
        resolvedCols.forEach(c => {
          const td = document.createElement('td');
          const v = r[c.key];
          td.textContent = fmt(v);
          td.style.padding = '10px';
          td.style.borderBottom = '1px solid #eef1f6';
          td.style.textAlign = c.align || 'left';
          td.style.fontWeight = c.bold ? '700' : '400';
          td.style.whiteSpace = 'nowrap';
          td.style.overflow = 'hidden';
          td.style.textOverflow = 'ellipsis';
          if (c.heat) td.style.background = shade(c.key, v);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    };

    // ---------- Sorting
    const sortRows = (arr, key, dir) => {
      const copy = arr.slice();
      copy.sort((a, b) => {
        const va = parseForSort(a[key]), vb = parseForSort(b[key]);
        const na = (va === null || va === ''), nb = (vb === null || vb === '');
        if (na && nb) return 0; if (na) return 1; if (nb) return -1;
        if (typeof va === 'number' && typeof vb === 'number') return dir === 'asc' ? va - vb : vb - va;
        return dir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
      });
      return copy;
    };

    const findKeyByLabelOrKey = (val) => {
      if (!val) return null;
      const low = String(val).toLowerCase();
      const byKey = resolvedCols.find(c => String(c.key).toLowerCase() === low);
      if (byKey) return byKey.key;
      const byLabel = resolvedCols.find(c => String(c.label).toLowerCase() === low);
      return byLabel ? byLabel.key : null;
    };

    // Default sort (only if none active yet)
    if (!this.sortState.key) {
      const defKey = findKeyByLabelOrKey(config.default_sort_column);
      if (defKey) this.sortState = { key: defKey, dir: (String(config.default_sort_direction).toLowerCase() === 'desc' ? 'desc' : 'asc') };
    }

    // Sort UI (on header leaf cells)
    const clearIndicators = () => {
      Object.values(leafThByKey).forEach(th => {
        th.style.cursor = config.enable_sorting ? 'pointer' : 'default';
        th.title = config.enable_sorting ? 'Click to sort' : '';
        th.innerText = th.innerText.replace(/\s*[▲▼]$/, '');
      });
    };
    const applyIndicator = () => {
      if (!this.sortState.key) return;
      const th = leafThByKey[this.sortState.key];
      if (th) th.innerText = `${th.innerText.replace(/\s*[▲▼]$/, '')} ${this.sortState.dir === 'asc' ? '▲' : '▼'}`;
    };

    if (config.enable_sorting) {
      Object.entries(leafThByKey).forEach(([key, th]) => {
        th.addEventListener('click', () => {
          if (this.sortState.key === key) {
            this.sortState.dir = this.sortState.dir === 'asc' ? 'desc' : 'asc';
          } else {
            this.sortState.key = key;
            this.sortState.dir = 'asc';
          }
          clearIndicators(); applyIndicator();
          renderBody(sortRows(rows, this.sortState.key, this.sortState.dir));
        });
      });
    }

    // Initial render + indicators
    clearIndicators(); if (config.enable_sorting && this.sortState.key) applyIndicator();
    const initialRows = this.sortState.key ? sortRows(rows, this.sortState.key, this.sortState.dir) : rows;
    renderBody(initialRows);

    // Put body table in scroller
    bodyTable.appendChild(tbody);
    this.scroller.appendChild(bodyTable);

    // ---------- Sync horizontal scroll (header follows body)
    const syncHeader = () => {
      this.headerInner.style.transform = `translateX(${-this.scroller.scrollLeft}px)`;
    };
    this.scroller.removeEventListener('_sync', this._syncHandler || (()=>{}));
    this._syncHandler = () => syncHeader();
    this.scroller.addEventListener('scroll', this._syncHandler);
    // ensure correct on initial render
    syncHeader();

    done();
  }
});
