
looker.plugins.visualizations.add({
  id: 'grouped_header_grid_fixedheader',
  label: 'Grouped Header Grid (Fixed Header)',

  options: {
    // Columns JSON: [{ field, key, label, group?, align?, bold?, heat?, header_bg?, header_color? }, ...]
    columns_json: { type: 'string', label: 'Columns JSON', display: 'text', default: '' },
    // Group Colors JSON: { "Group Name": "#hex" }
    group_colors_json: { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    // Layout
    table_height: { type: 'number', label: 'Max table height (px, 0 = auto)', default: 450 },
    center_group_titles: { type: 'boolean', label: 'Center group titles', default: true },

    // Sorting
    enable_sorting: { type: 'boolean', label: 'Enable sorting (click headers)', default: true },
    default_sort_column: { type: 'string', label: 'Default sort column (key or label)', display: 'text', default: '' },
    default_sort_direction: { type: 'string', label: 'Default sort direction (asc/desc)', display: 'text', default: 'asc' },

    // Click-to-filter
    enable_click_filter: { type: 'boolean', label: 'Enable click-to-filter', default: true },
    click_filter_column: { type: 'string', label: 'Click filter column (key or label)', display: 'text', default: '' },
    click_filter_field:   { type: 'string', label: 'Click filter field (optional Looker field)', display: 'text', default: '' }
  },

  create (element) {
    // Root
    const root = document.createElement('div');
    root.style.position = 'relative';
    root.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    root.style.fontSize = '13px';
    root.style.color = '#1a1f36';
    root.style.width = '100%';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    element.appendChild(root);
    this.root = root;

    // Fixed header wrappers
    const groupHeaderWrap = document.createElement('div');
    groupHeaderWrap.style.position = 'sticky';
    groupHeaderWrap.style.top = '0';
    groupHeaderWrap.style.zIndex = '10';
    groupHeaderWrap.style.background = '#fff';
    groupHeaderWrap.style.overflow = 'hidden';
    this.root.appendChild(groupHeaderWrap);
    this.groupHeaderWrap = groupHeaderWrap;

    const colHeaderWrap = document.createElement('div');
    colHeaderWrap.style.position = 'sticky';
    colHeaderWrap.style.top = '44px';
    colHeaderWrap.style.zIndex = '9';
    colHeaderWrap.style.background = '#fff';
    colHeaderWrap.style.overflow = 'hidden';
    this.root.appendChild(colHeaderWrap);
    this.colHeaderWrap = colHeaderWrap;

    // Scrollable body
    const scroller = document.createElement('div');
    scroller.style.overflow = 'auto';
    scroller.style.position = 'relative';
    scroller.style.width = '100%';
    scroller.style.flex = '1 1 auto';
    this.root.appendChild(scroller);
    this.scroller = scroller;

    this.sortState = { key: null, dir: 'asc' };

    // Recalc widths on resize
    this._resizeObserver = new ResizeObserver(() => this._syncWidths && this._syncWidths());
    this._resizeObserver.observe(scroller);
  },

  updateAsync (data, element, config, queryResponse, details, done) {
    // Clear
    this.groupHeaderWrap.innerHTML = '';
    this.colHeaderWrap.innerHTML = '';
    this.scroller.innerHTML = '';

    const parseJSON = (txt, fb) => { try { return JSON.parse(txt || ''); } catch { return fb; } };
    const cols = parseJSON(config.columns_json, []);
    const groupColors = parseJSON(config.group_colors_json, {});
    if (!Array.isArray(cols) || cols.length === 0) {
      const msg = document.createElement('div');
      msg.style.padding = '16px';
      msg.innerHTML = '<b>Columns not configured</b>';
      this.scroller.appendChild(msg); done(); return;
    }
    if (Number(config.table_height) > 0) this.scroller.style.maxHeight = `${config.table_height}px`;

    // Field resolver
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

    // Data extraction
    const rawVal = (row, key) => key && row[key] ? row[key].value : null;
    let rows = data.map(r => {
      const o = {}; resolvedCols.forEach(c => o[c.key] = rawVal(r, c._rowKey)); return o;
    });

    // Helpers
    const parseForSort = (v) => {
      if (v == null) return null;
      if (typeof v === 'number') return v;
      if (typeof v === 'boolean') return v ? 1 : 0;
      const s = String(v).trim().replace(/[, ]+/g, '').replace(/[%£$€]/g, '');
      const n = Number(s);
      return Number.isNaN(n) ? String(v).toLowerCase() : n;
    };

    // Heatmap scales
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

    // Header color resolver
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

    // Factories
    const makeTable = () => {
      const t = document.createElement('table');
      t.style.width = '100%';
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
      th.style.textAlign = opts.align || 'left';
      th.style.borderBottom = '1px solid #e6e8ee';
      th.style.background = opts.bg ?? '#0b2557';
      th.style.color = opts.color ?? (opts.bg === '#0b2557' ? '#ffffff' : '#0b1020');
      th.style.whiteSpace = 'nowrap';
      th.style.verticalAlign = 'middle';
      th.style.height = '44px';
      th.style.boxSizing = 'border-box';
      if (opts.isGroup && config.center_group_titles) th.style.textAlign = 'center';
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

    // ----- Build header tables
    const groupTable = makeTable();
    const groupRow  = document.createElement('tr');

    const colTable  = makeTable();
    const colRow    = document.createElement('tr');
    const leafThByKey = {};

    let i = 0;
    while (i < resolvedCols.length) {
      const first = resolvedCols[i];
      const g = first.group;

      if (!g) {
        const spacer = makeTh('', { isGroup: true, bg: '#fff', color: '#fff' });
        groupRow.appendChild(spacer);

        const { bg, color } = resolveLeafHeaderColors(first, groupColors);
        const th = makeTh(first.label, { bg, color });
        th.dataset.key = first.key;
        th.style.textAlign = first.align || 'left';
        colRow.appendChild(th);
        leafThByKey[first.key] = th;

        i++; continue;
      }

      let j = i; while (j < resolvedCols.length && resolvedCols[j].group === g) j++;
      const thg = makeTh(g, { bg: groupColors[g] || '#d9e3f8', color: '#0b1020', isGroup: true });
      thg.colSpan = j - i;
      groupRow.appendChild(thg);

      for (let k = i; k < j; k++) {
        const col = resolvedCols[k];
        const { bg, color } = resolveLeafHeaderColors(col, groupColors);
        const th = makeTh(col.label, { bg, color });
        th.dataset.key = col.key;
        th.style.textAlign = col.align || 'left';
        colRow.appendChild(th);
        leafThByKey[col.key] = th;
      }
      i = j;
    }
    groupTable.appendChild(groupRow);
    colTable.appendChild(colRow);
    this.groupHeaderWrap.appendChild(groupTable);
    this.colHeaderWrap.appendChild(colTable);

    // ----- Body table
    const bodyTable = makeTable();
    const tbody = document.createElement('tbody');

    const fmt = v => (v == null ? '' : (v.toLocaleString?.() ?? String(v)));

    const findKeyByLabelOrKey = (val) => {
      if (!val) return null;
      const low = String(val).toLowerCase();
      const byKey = resolvedCols.find(c => String(c.key).toLowerCase() === low);
      if (byKey) return byKey.key;
      const byLabel = resolvedCols.find(c => String(c.label).toLowerCase() === low);
      return byLabel ? byLabel.key : null;
    };

    // Click-to-filter column and field
    const clickKey = config.enable_click_filter ? (findKeyByLabelOrKey(config.click_filter_column) || null) : null;
    const clickFieldFallback = (() => {
      if (!clickKey) return null;
      const col = resolvedCols.find(c => c.key === clickKey);
      return col?._rowKey || null;
    })();
    const clickFieldName = (config.click_filter_field || clickFieldFallback || '').trim();

    const renderBody = (rowsIn) => {
      tbody.innerHTML = '';
      rowsIn.forEach(r => {
        const tr = document.createElement('tr');
        resolvedCols.forEach(c => {
          const td = makeTd();
          const v = r[c.key];
          td.textContent = fmt(v);
          td.style.textAlign = c.align || 'left';
          td.style.fontWeight = c.bold ? '700' : '400';
          if (c.heat) td.style.background = shade(c.key, v);

          if (clickKey && clickFieldName && c.key === clickKey && v != null && v !== '') {
            td.style.cursor = 'pointer';
            td.style.textDecoration = 'underline';
            td.title = `Filter: ${clickFieldName} = ${v}`;
            td.addEventListener('click', () => {
              this.trigger('dashboard:filter', { field: clickFieldName, value: String(v) });
            });
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    };

    // Sorting
    const sortRows = (arr, key, dir) => {
      const copy = arr.slice();
      copy.sort((a, b) => {
        const va = parseForSort(a[key]), vb = parseForSort(b[key]);
        const na = (va == null || va === ''), nb = (vb == null || vb === '');
        if (na && nb) return 0; if (na) return 1; if (nb) return -1;
        if (typeof va === 'number' && typeof vb === 'number') return dir === 'asc' ? va - vb : vb - va;
        return dir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
      });
      return copy;
    };

    if (!this.sortState.key) {
      const defKey = findKeyByLabelOrKey(config.default_sort_column);
      if (defKey) this.sortState = { key: defKey, dir: (String(config.default_sort_direction).toLowerCase() === 'desc' ? 'desc' : 'asc') };
    }

    const clearIndicators = () => {
      Array.from(colRow.children).forEach(th => th.innerText = th.innerText.replace(/\s*[▲▼]$/, ''));
    };
    const applyIndicator = () => {
      if (!this.sortState.key) return;
      const th = Array.from(colRow.children).find(el => el.dataset.key === this.sortState.key);
      if (th) th.innerText = `${th.innerText.replace(/\s*[▲▼]$/, '')} ${this.sortState.dir === 'asc' ? '▲' : '▼'}`;
    };
    if (config.enable_sorting) {
      Array.from(colRow.children).forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
          const key = th.dataset.key;
          if (!key) return;
          if (this.sortState.key === key) this.sortState.dir = this.sortState.dir === 'asc' ? 'desc' : 'asc';
          else this.sortState = { key, dir: 'asc' };
          clearIndicators(); applyIndicator();
          renderBody(sortRows(rows, this.sortState.key, this.sortState.dir));
          this._syncWidths(); // re-sync widths after sort (row content may change)
        });
      });
    }

    clearIndicators(); if (config.enable_sorting && this.sortState.key) applyIndicator();
    const initialRows = this.sortState.key ? sortRows(rows, this.sortState.key, this.sortState.dir) : rows;
    renderBody(initialRows);

    bodyTable.appendChild(tbody);
    this.scroller.appendChild(bodyTable);

    // ---------- Column width sync (measure body, set header widths & group spans)
    this._syncWidths = () => {
      // Ensure at least one row exists to measure
      const firstRow = tbody.rows[0];
      const colCount = resolvedCols.length;

      // Measure widths (fallback to equal widths if no rows)
      let widths = new Array(colCount).fill(0);
      if (firstRow) {
        for (let c = 0; c < colCount; c++) {
          const cell = firstRow.cells[c];
          if (!cell) continue;
          // Include cell width; if you want to include more rows, take max over a few
          widths[c] = Math.max(80, Math.ceil(cell.getBoundingClientRect().width)); // min 80px
        }
      } else {
        const eq = Math.max(100, Math.floor(this.scroller.clientWidth / colCount));
        widths = widths.map(() => eq);
      }

      // Set explicit width on each header TH (leaf row)
      const leafTHs = Array.from(colRow.children);
      leafTHs.forEach((th, idx) => {
        th.style.width = widths[idx] + 'px';
        th.style.minWidth = widths[idx] + 'px';
        th.style.maxWidth = widths[idx] + 'px';
      });

      // Size each group TH to sum of its children
      let cursor = 0;
      let gIdx = 0;
      const groupTHs = Array.from(groupRow.children);
      groupTHs.forEach(thg => {
        const span = Number(thg.colSpan || 1);
        const total = widths.slice(cursor, cursor + span).reduce((a, b) => a + b, 0);
        thg.style.width = total + 'px';
        thg.style.minWidth = total + 'px';
        thg.style.maxWidth = total + 'px';
        cursor += span;
        gIdx++;
      });

      // Match header table widths to body scroll width
      const totalW = widths.reduce((a,b)=>a+b,0);
      groupTable.style.width = totalW + 'px';
      colTable.style.width   = totalW + 'px';
      bodyTable.style.width  = totalW + 'px';
    };

    // Initial sync (after the DOM paints)
    requestAnimationFrame(() => this._syncWidths());

    // Sync header scroll with body
    this.scroller.onscroll = () => {
      const left = this.scroller.scrollLeft;
      this.groupHeaderWrap.scrollLeft = left;
      this.colHeaderWrap.scrollLeft = left;
    };

    done();
  }
});
