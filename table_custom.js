
looker.plugins.visualizations.add({
  id: 'grouped_header_grid',
  label: 'Grouped Header Grid',

  options: {
    // Paste a MINIFIED JSON array of columns (order matters).
    // Each: { field, key, label, group?, align?, bold?, heat? }
    columns_json: { type: 'string', label: 'Columns JSON', display: 'text', default: '' },

    // Optional color map for top group bands: { "Group Name": "#hex" }
    group_colors_json: { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    // Layout / behavior
    table_height: { type: 'number', label: 'Max table height (px, 0 = auto)', default: 0 },
    center_group_titles: { type: 'boolean', label: 'Center group titles', default: true },

    // Sorting
    enable_sorting: { type: 'boolean', label: 'Enable sorting (click headers)', default: true },
    default_sort_column: { type: 'string', label: 'Default sort column (key or label)', display: 'text', default: '' },
    default_sort_direction: { type: 'string', label: 'Default sort direction (asc/desc)', display: 'text', default: 'asc' },

    // Debug helper
    debug_fields: { type: 'boolean', label: 'Show field debug header', default: false }
  },

  create (element) {
    const wrap = document.createElement('div');
    wrap.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    wrap.style.fontSize = '13px';
    wrap.style.color = '#1a1f36';
    element.appendChild(wrap);
    this.wrap = wrap;

    // internal sort state
    this.sortState = { key: null, dir: 'asc' };
  },

  updateAsync (data, element, config, queryResponse, details, done) {
    this.wrap.innerHTML = '';

    // ---------- Parse options safely
    const parseJSON = (txt, fallback) => { try { return JSON.parse(txt || ''); } catch { return fallback; } };
    const cols = parseJSON(config.columns_json, []);
    const groupColors = parseJSON(config.group_colors_json, {});

    if (!Array.isArray(cols) || cols.length === 0) {
      const msg = document.createElement('div');
      msg.style.padding = '16px';
      msg.innerHTML = `<div style="font-weight:600;margin-bottom:8px;">Columns not configured</div>
      <div style="opacity:.85">Paste a JSON array into <b>Columns JSON</b>. Example (one line):<br/>
      <code>[{"field":"make","key":"make","label":"Make","align":"left"},{"field":"model","key":"model","label":"Model","align":"left"},{"field":"body_type","key":"body_type","label":"Body","align":"left"},{"field":"fuel_type","key":"fuel_type","label":"Fuel","align":"left"},{"field":"ad_views","key":"ad_views","label":"Ad Views","group":"Activity on the Advert","heat":true,"align":"right"},{"field":"interactions","key":"interactions","label":"Interactions","group":"Activity on the Advert","heat":true,"align":"right"},{"field":"total_activity","key":"total_activity","label":"Total Activity","group":"Activity on the Advert","heat":true,"align":"right"},{"field":"total_time_on_ad","key":"total_time_on_ad","label":"Total Time on Ad","group":"Time on the Advert","align":"right"},{"field":"avg_time_on_ad","key":"avg_time_on_ad","label":"Average Time on Ad","group":"Time on the Advert","align":"right"},{"field":"total_engagement","key":"total_engagement","label":"Total Engagement","group":"Combined Engagement","bold":true,"align":"right"}]</code></div>`;
      this.wrap.appendChild(msg);
      done(); return;
    }

    // ---------- Build field resolver from the query
    const allFieldDefs = [
      ...(queryResponse.fields?.dimension_like || []),
      ...(queryResponse.fields?.measure_like || []),
      ...(queryResponse.fields?.table_calculations || [])
    ];
    const fieldKeys = allFieldDefs.map(f => f.name); // e.g. "view.field"
    const shortToFull = {};
    const labelToFull = {};
    allFieldDefs.forEach(f => {
      const short = f.name.split('.').pop();
      if (!shortToFull[short]) shortToFull[short] = f.name;
      if (f.label_short) {
        const k = String(f.label_short).toLowerCase();
        if (!labelToFull[k]) labelToFull[k] = f.name;
      }
    });
    const resolveField = (spec) => {
      if (!spec) return null;
      if (fieldKeys.includes(spec)) return spec;                       // exact
      const ends = fieldKeys.find(k => k.endsWith('.' + spec));        // endsWith
      if (ends) return ends;
      const byLabel = labelToFull[String(spec).toLowerCase()];         // label_short
      if (byLabel) return byLabel;
      if (shortToFull[spec]) return shortToFull[spec];                 // short map
      return null;
    };

    if (config.debug_fields) {
      const dbg = document.createElement('div');
      dbg.style.padding = '8px 12px';
      dbg.style.marginBottom = '8px';
      dbg.style.background = '#fff8e1';
      dbg.style.border = '1px solid #ffe08a';
      dbg.style.borderRadius = '8px';
      dbg.style.fontSize = '12px';
      dbg.innerHTML = `<b>Available fields</b>: ${fieldKeys.join(', ')}`;
      this.wrap.appendChild(dbg);
    }

    const unresolved = [];
    const resolvedCols = cols.map(c => {
      const resolved = resolveField(c.field);
      if (!resolved) unresolved.push(c);
      return { ...c, _rowKey: resolved };
    });

    // ---------- Extract row values
    const rawVal = (row, key) => key && row[key] ? row[key].value : null;
    let rows = data.map(r => {
      const obj = {};
      resolvedCols.forEach(c => { obj[c.key] = rawVal(r, c._rowKey); });
      return obj;
    });

    // ---------- Heatmap scales (precomputed for stability during sorting)
    const heatCols = resolvedCols.filter(c => c.heat);
    const mins = {}, maxs = {};
    heatCols.forEach(c => {
      const vals = rows.map(r => Number(parseForSort(r[c.key]))).filter(Number.isFinite);
      if (vals.length) { mins[c.key] = Math.min(...vals); maxs[c.key] = Math.max(...vals); }
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

    // ---------- Container / scroll
    const scroller = document.createElement('div');
    scroller.style.overflow = 'auto';
    if (Number(config.table_height) > 0) scroller.style.maxHeight = `${config.table_height}px`;

    // Create the table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'separate';
    table.style.borderSpacing = '0';
    table.style.tableLayout = 'fixed';

    // Header sizing (used for stacked sticky)
    const groupRowH = 44;   // px
    const leafRowH  = 44;   // px

    // ---------- Header cell factory
    const makeTh = (txt, opts = {}) => {
      const th = document.createElement('th');
      th.textContent = txt;
      th.style.padding = '12px 10px';
      th.style.fontWeight = opts.bold ? '700' : '600';
      th.style.fontSize = '13px';
      th.style.textAlign = opts.align || 'left';
      th.style.borderBottom = '1px solid #e6e8ee';
      th.style.background = opts.bg ?? '#0b2557';   // navy by default
      th.style.color = opts.color ?? (opts.bg ? '#0b1020' : '#ffffff');
      th.style.position = 'sticky';
      th.style.verticalAlign = 'middle';
      th.style.height = (opts.isGroup ? groupRowH : leafRowH) + 'px';
      th.style.lineHeight = '1.3em';
      if (opts.isGroup && config.center_group_titles) th.style.textAlign = 'center';
      return th;
    };

    // ---------- Build header (two rows; ALL labels in row 2; stacked sticky)
    const thead = document.createElement('thead');
    const r1 = document.createElement('tr'); // group row (sticky top: 0)
    const r2 = document.createElement('tr'); // leaf row (sticky top: groupRowH)

    let i = 0;
    const leafThByKey = {};

    while (i < resolvedCols.length) {
      const g = resolvedCols[i].group;

      if (!g) {
        // Spacer in top row to align with grouped sections
        const spacer = makeTh('', { align: 'left', isGroup: true });
        spacer.style.borderBottom = 'none';
        spacer.style.top = '0px';
        r1.appendChild(spacer);

        // Actual leaf header
        const th = makeTh(resolvedCols[i].label, { align: 'left' });
        th.style.top = groupRowH + 'px';
        th.dataset.key = resolvedCols[i].key;
        r2.appendChild(th);
        leafThByKey[resolvedCols[i].key] = th;

        i++;
        continue;
      }

      // Group block
      let j = i;
      while (j < resolvedCols.length && resolvedCols[j].group === g) j++;

      const thg = makeTh(g, { bg: groupColors[g] || '#d9e3f8', color: '#0b1020', isGroup: true });
      thg.colSpan = j - i;
      thg.style.top = '0px';
      r1.appendChild(thg);

      for (let k = i; k < j; k++) {
        const th = makeTh(resolvedCols[k].label, { align: 'left' });
        th.style.top = groupRowH + 'px';
        th.dataset.key = resolvedCols[k].key;
        r2.appendChild(th);
        leafThByKey[resolvedCols[k].key] = th;
      }
      i = j;
    }

    thead.appendChild(r1);
    thead.appendChild(r2);

    // Subtle shadow under the frozen header
    thead.style.boxShadow = '0 2px 0 rgba(0,0,0,0.04)';

    // ---------- Body
    const tbody = document.createElement('tbody');
    const fmt = v => (v == null ? '' : (v.toLocaleString?.() ?? String(v)));

    // ---------- Sorting utilities
    function parseForSort(v) {
      if (v == null) return null;
      if (typeof v === 'number') return v;
      if (typeof v === 'boolean') return v ? 1 : 0;
      // Try numeric parse (strip currency/commas/%/spaces)
      const s = String(v).trim().replace(/[, ]+/g, '').replace(/[%£$€]/g, '');
      const num = Number(s);
      if (!Number.isNaN(num)) return num;
      return String(v).toLowerCase();
    }

    const sortRows = (rowsInput, key, dir) => {
      const copy = rowsInput.slice();
      copy.sort((a, b) => {
        const va = parseForSort(a[key]);
        const vb = parseForSort(b[key]);
        const na = (va === null || va === undefined || va === '');
        const nb = (vb === null || vb === undefined || vb === '');
        if (na && nb) return 0;
        if (na) return 1;
        if (nb) return -1;
        if (typeof va === 'number' && typeof vb === 'number') {
          return dir === 'asc' ? va - vb : vb - va;
        }
        return dir === 'asc'
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      });
      return copy;
    };

    const renderBody = (sortedRows) => {
      tbody.innerHTML = '';
      if (unresolved.length > 0) {
        const trWarn = document.createElement('tr');
        const tdWarn = document.createElement('td');
        tdWarn.colSpan = resolvedCols.length;
        tdWarn.style.padding = '10px';
        tdWarn.style.background = '#fff8e1';
        tdWarn.style.borderBottom = '1px solid #ffe08a';
        tdWarn.innerHTML = `⚠️ Unresolved fields: ${unresolved.map(u => `<code>${u.field}</code>`).join(', ')}. Check field names.`;
        trWarn.appendChild(tdWarn);
        tbody.appendChild(trWarn);
      }
      sortedRows.forEach(r => {
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

    // ---------- Default sort (applied once on initial render or when options change)
    const findKeyByLabelOrKey = (val) => {
      if (!val) return null;
      const lower = String(val).toLowerCase();
      const byKey = resolvedCols.find(c => String(c.key).toLowerCase() === lower);
      if (byKey) return byKey.key;
      const byLabel = resolvedCols.find(c => String(c.label).toLowerCase() === lower);
      return byLabel ? byLabel.key : null;
    };

    // If no active sort yet, try to set it from config defaults
    if (!this.sortState.key) {
      const defKey = findKeyByLabelOrKey(config.default_sort_column);
      if (defKey) {
        const dir = (String(config.default_sort_direction || 'asc').toLowerCase() === 'desc') ? 'desc' : 'asc';
        this.sortState = { key: defKey, dir };
      }
    }

    // ---------- Bind click-to-sort if enabled
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
      if (!th) return;
      th.innerText = `${th.innerText.replace(/\s*[▲▼]$/, '')} ${this.sortState.dir === 'asc' ? '▲' : '▼'}`;
    };

    if (config.enable_sorting) {
      Object.entries(leafThByKey).forEach(([key, th]) => {
        th.style.cursor = 'pointer';
        th.title = 'Click to sort';
        th.addEventListener('click', () => {
          if (this.sortState.key === key) {
            this.sortState.dir = this.sortState.dir === 'asc' ? 'desc' : 'asc';
          } else {
            this.sortState.key = key;
            this.sortState.dir = 'asc';
          }
          clearIndicators();
          applyIndicator();
          const sorted = this.sortState.key ? sortRows(rows, this.sortState.key, this.sortState.dir) : rows;
          renderBody(sorted);
        });
      });
    }

    // ---------- Initial render (honor default sort if set)
    clearIndicators();
    if (config.enable_sorting && this.sortState.key) applyIndicator();
    const initialRows = (this.sortState.key) ? sortRows(rows, this.sortState.key, this.sortState.dir) : rows;
    renderBody(initialRows);

    // ---------- Assemble
    table.appendChild(thead);
    table.appendChild(tbody);
    scroller.appendChild(table);
    this.wrap.appendChild(scroller);

    done();
  }
});
