
looker.plugins.visualizations.add({
  id: 'grouped_header_grid',
  label: 'Grouped Header Grid',

  options: {
    // Columns JSON (minified). Items can include:
    // { field, key, label, group?, align?, bold?, heat?, header_bg?, header_color? }
    // header_bg can be "#hex" or "group" to inherit the group's color.
    columns_json: { type: 'string', label: 'Columns JSON', display: 'text', default: '' },

    // Group Colors JSON: { "Group Name": "#hex" }
    group_colors_json: { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    // Layout / behavior
    table_height: { type: 'number', label: 'Max table height (px, 0 = auto)', default: 0 },
    center_group_titles: { type: 'boolean', label: 'Center group titles', default: true },

    // Sorting
    enable_sorting: { type: 'boolean', label: 'Enable sorting (click headers)', default: true },
    default_sort_column: { type: 'string', label: 'Default sort column (key or label)', display: 'text', default: '' },
    default_sort_direction: { type: 'string', label: 'Default sort direction (asc/desc)', display: 'text', default: 'asc' },

    // Debug
    debug_fields: { type: 'boolean', label: 'Show field debug header', default: false }
  },

  create (element) {
    const wrap = document.createElement('div');
    wrap.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    wrap.style.fontSize  = '13px';
    wrap.style.color     = '#1a1f36';
    element.appendChild(wrap);
    this.wrap = wrap;

    this.sortState = { key: null, dir: 'asc' };
  },

  updateAsync (data, element, config, queryResponse, details, done) {
    this.wrap.innerHTML = '';

    // ---------- Parse options safely
    const parseJSON = (txt, fb) => { try { return JSON.parse(txt || ''); } catch { return fb; } };
    const cols = parseJSON(config.columns_json, []);
    const groupColors = parseJSON(config.group_colors_json, {});
    if (!Array.isArray(cols) || cols.length === 0) {
      const m = document.createElement('div');
      m.style.padding = '16px';
      m.innerHTML = `<b>Columns not configured</b>
        <div style="opacity:.85;margin-top:8px">Paste your minified array into <i>Columns JSON</i>.</div>`;
      this.wrap.appendChild(m); done(); return;
    }

    // ---------- Field resolver from the query
    const allFieldDefs = [
      ...(queryResponse.fields?.dimension_like || []),
      ...(queryResponse.fields?.measure_like || []),
      ...(queryResponse.fields?.table_calculations || [])
    ];
    const fieldKeys = allFieldDefs.map(f => f.name); // "view.field"
    const shortToFull = {}; const labelToFull = {};
    allFieldDefs.forEach(f => {
      const short = f.name.split('.').pop();
      if (!shortToFull[short]) shortToFull[short] = f.name;
      if (f.label_short) labelToFull[String(f.label_short).toLowerCase()] = f.name;
    });
    const resolveField = (s) => {
      if (!s) return null;
      if (fieldKeys.includes(s)) return s;                                 // exact
      const end = fieldKeys.find(k => k.endsWith('.' + s)); if (end) return end; // endsWith
      const lab = labelToFull[String(s).toLowerCase()]; if (lab) return lab;     // label_short
      if (shortToFull[s]) return shortToFull[s];                             // short map
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

    // ---------- Helpers: sort parsing & heatmap scaling
    const parseForSort = (v) => {
      if (v == null) return null;
      if (typeof v === 'number') return v;
      if (typeof v === 'boolean') return v ? 1 : 0;
      const s = String(v).trim().replace(/[, ]+/g, '').replace(/[%£$€]/g, '');
      const n = Number(s);
      return Number.isNaN(n) ? String(v).toLowerCase() : n;
    };

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

    // ---------- Scroll container (sticky ancestor)
    const scroller = document.createElement('div');
    scroller.style.overflow  = 'auto';
    scroller.style.position  = 'relative'; // needed for sticky
    if (Number(config.table_height) > 0) scroller.style.maxHeight = `${config.table_height}px`;

    // ---------- Table shell
    const table = document.createElement('table');
    table.style.width          = '100%';
    table.style.borderCollapse = 'separate';
    table.style.borderSpacing  = '0';
    table.style.tableLayout    = 'fixed';

    // Header sizing/z-index
    const groupRowH = 44, leafRowH = 44;
    const zGroup = 3, zLeaf = 2;

    // Resolve per-column leaf header colors (supports header_bg: "group")
    const resolveLeafHeaderColors = (col, groupColors) => {
      let bg = col.header_bg;
      let color = col.header_color;

      if ((bg === 'group' || bg === 'GROUP') && col.group) {
        const gcol = groupColors[col.group];
        bg = gcol || '#d9e3f8'; // safe fallback
      }

      if (!bg) bg = '#0b2557'; // default navy
      if (!color) color = (bg.toLowerCase() === '#0b2557') ? '#ffffff' : '#0b1020';

      return { bg, color };
    };

    // Header cell factory (sets both background and backgroundColor)
    const makeTh = (txt, opts = {}) => {
      const th = document.createElement('th');
      th.textContent = txt;
      th.style.padding      = '12px 10px';
      th.style.fontWeight   = opts.bold ? '700' : '600';
      th.style.fontSize     = '13px';
      th.style.textAlign    = opts.align || 'left';
      th.style.borderBottom = '1px solid #e6e8ee';

      const bg = opts.bg ?? '#0b2557';
      th.style.background      = bg;
      th.style.backgroundColor = bg;
      th.style.color           = opts.color ?? (bg === '#0b2557' ? '#ffffff' : '#0b1020');

      th.style.position       = 'sticky';
      th.style.verticalAlign  = 'middle';
      th.style.height         = (opts.isGroup ? groupRowH : leafRowH) + 'px';
      th.style.lineHeight     = '1.3em';
      th.style.backgroundClip = 'padding-box';
      th.style.zIndex         = opts.isGroup ? zGroup : zLeaf;

      if (opts.isGroup && config.center_group_titles) th.style.textAlign = 'center';
      return th;
    };

    // ---------- Build header (two rows; ALL labels in row 2; stacked sticky)
    const thead = document.createElement('thead');
    const r1 = document.createElement('tr'); // group row
    const r2 = document.createElement('tr'); // leaf row
    const leafThByKey = {};

    let i = 0;
    while (i < resolvedCols.length) {
      const first = resolvedCols[i];
      const g = first.group;

      if (!g) {
        // Spacer in group row
        const spacer = makeTh('', { isGroup: true, align: 'left', bg: '#0b2557', color: '#ffffff' });
        spacer.style.borderBottom = 'none';
        spacer.style.top = '0px';
        r1.appendChild(spacer);

        // Leaf header with per-column color
        const { bg, color } = resolveLeafHeaderColors(first, groupColors);
        const th = makeTh(first.label, { align: 'left', bg, color });
        th.style.top = groupRowH + 'px';
        th.dataset.key = first.key;
        r2.appendChild(th);
        leafThByKey[first.key] = th;

        i++; continue;
      }

      // Group block
      let j = i;
      while (j < resolvedCols.length && resolvedCols[j].group === g) j++;

      const thg = makeTh(g, { bg: groupColors[g] || '#d9e3f8', color: '#0b1020', isGroup: true });
      thg.colSpan = j - i;
      thg.style.top = '0px';
      r1.appendChild(thg);

      for (let k = i; k < j; k++) {
        const col = resolvedCols[k];
        const { bg, color } = resolveLeafHeaderColors(col, groupColors);
        const th = makeTh(col.label, { align: 'left', bg, color });
        th.style.top = groupRowH + 'px';
        th.dataset.key = col.key;
        r2.appendChild(th);
        leafThByKey[col.key] = th;
      }
      i = j;
    }
    thead.appendChild(r1); thead.appendChild(r2);
    thead.style.boxShadow = '0 2px 0 rgba(0,0,0,0.04)';

    // ---------- Body render
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

    const clearIndicators = () => {
      Object.values(leafThByKey).forEach(th => {
        th.style.cursor = config.enable_sorting ? 'pointer' : 'default';
        th.title = config.enable_sorting ? 'Click to sort' : '';
        th.innerText = th.innerText.replace(/\s*[▲▼]$/, '');
        th.style.zIndex = zLeaf;
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

    // Initial render (honor default sort if set)
    clearIndicators(); if (config.enable_sorting && this.sortState.key) applyIndicator();
    const initialRows = this.sortState.key ? sortRows(rows, this.sortState.key, this.sortState.dir) : rows;
    renderBody(initialRows);

    // ---------- Assemble
    table.appendChild(thead); table.appendChild(tbody);
    scroller.appendChild(table);
    this.wrap.appendChild(scroller);

    done();
  }
});
