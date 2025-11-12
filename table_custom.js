
looker.plugins.visualizations.add({
  id: 'grouped_header_grid',
  label: 'Grouped Header Grid',

  options: {
    // Paste minified JSON array: [{ field, key, label, group?, align?, bold?, heat? }, ...]
    columns_json: { type: 'string', label: 'Columns JSON', display: 'text', default: '' },
    // Optional map: { "Group Name": "#color" }
    group_colors_json: { type: 'string', label: 'Group Colors JSON (optional)', display: 'text', default: '' },

    table_height: { type: 'number', label: 'Max table height (px, 0 = auto)', default: 0 },
    center_group_titles: { type: 'boolean', label: 'Center group titles', default: true },
    debug_fields: { type: 'boolean', label: 'Show field debug header', default: false }
  },

  create (element) {
    const wrap = document.createElement('div');
    wrap.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    wrap.style.fontSize = '13px';
    wrap.style.color = '#1a1f36';
    element.appendChild(wrap);
    this.wrap = wrap;
  },

  updateAsync (data, element, config, queryResponse, details, done) {
    this.wrap.innerHTML = '';

    // ---- Parse options
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

    // ---- Field resolver
    const allFieldDefs = [
      ...(queryResponse.fields?.dimension_like || []),
      ...(queryResponse.fields?.measure_like || []),
      ...(queryResponse.fields?.table_calculations || [])
    ];
    const fieldKeys = allFieldDefs.map(f => f.name);
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
      if (fieldKeys.includes(spec)) return spec;
      const ends = fieldKeys.find(k => k.endsWith('.' + spec));
      if (ends) return ends;
      const byLabel = labelToFull[String(spec).toLowerCase()];
      if (byLabel) return byLabel;
      if (shortToFull[spec]) return shortToFull[spec];
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

    // ---- Data rows
    const getVal = (row, key) => key && row[key] ? row[key].value : null;
    const rows = data.map(r => {
      const obj = {};
      resolvedCols.forEach(c => { obj[c.key] = getVal(r, c._rowKey); });
      return obj;
    });

    // ---- Container / scroll
    const scroller = document.createElement('div');
    scroller.style.overflow = 'auto';
    if (Number(config.table_height) > 0) scroller.style.maxHeight = `${config.table_height}px`;

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'separate';
    table.style.borderSpacing = '0';
    table.style.tableLayout = 'fixed';

    // ---- Header cell factory
    const makeTh = (txt, opts = {}) => {
      const th = document.createElement('th');
      th.textContent = txt;
      th.style.padding = '12px 10px';
      th.style.fontWeight = opts.bold ? '700' : '600';
      th.style.fontSize = '13px';
      th.style.textAlign = opts.align || 'left';
      th.style.borderBottom = '1px solid #e6e8ee';
      th.style.background = opts.bg ?? '#0b2557';  // navy default
      th.style.color = opts.color ?? (opts.bg ? '#0b1020' : '#ffffff');
      th.style.position = 'sticky';
      th.style.top = '0';
      th.style.verticalAlign = 'middle';
      th.style.height = '44px';
      th.style.lineHeight = '1.3em';

      if (opts.isGroup && config.center_group_titles) {
        th.style.textAlign = 'center';
      }
      return th;
    };

    // ---- Build header (two rows; ALL labels in row 2)
    const thead = document.createElement('thead');
    const r1 = document.createElement('tr');
    const r2 = document.createElement('tr');

    let i = 0;
    while (i < resolvedCols.length) {
      const g = resolvedCols[i].group;

      if (!g) {
        // Spacer cell in the top row (keeps heights consistent)
        const spacer = makeTh('', { align: 'left' }); // navy background by default
        spacer.style.borderBottom = 'none';
        r1.appendChild(spacer);

        // Actual label in the second row
        const th = makeTh(resolvedCols[i].label, { align: 'left' });
        r2.appendChild(th);

        i++;
        continue;
      }

      // Grouped block
      let j = i;
      while (j < resolvedCols.length && resolvedCols[j].group === g) j++;

      const thg = makeTh(g, { bg: groupColors[g] || '#d9e3f8', color: '#0b1020', isGroup: true });
      thg.colSpan = j - i;
      r1.appendChild(thg);

      for (let k = i; k < j; k++) {
        const th = makeTh(resolvedCols[k].label, { align: 'left' });
        r2.appendChild(th);
      }
      i = j;
    }

    thead.appendChild(r1);
    thead.appendChild(r2);

    // ---- Body (heatmap per-column if "heat": true in Columns JSON)
    const tbody = document.createElement('tbody');

    const heatCols = resolvedCols.filter(c => c.heat);
    const mins = {}, maxs = {};
    heatCols.forEach(c => {
      const vals = rows.map(r => Number(r[c.key])).filter(Number.isFinite);
      if (vals.length) { mins[c.key] = Math.min(...vals); maxs[c.key] = Math.max(...vals); }
    });
    const shade = (key, v) => {
      if (!Number.isFinite(v)) return '';
      const min = mins[key], max = maxs[key];
      if (max === min) return 'rgba(63,131,248,0.15)';
      const t = (v - min) / (max - min);
      return `rgba(63,131,248,${0.12 + 0.28*t})`;
    };

    if (unresolved.length > 0) {
      const trWarn = document.createElement('tr');
      const tdWarn = document.createElement('td');
      tdWarn.colSpan = resolvedCols.length;
      tdWarn.style.padding = '10px';
      tdWarn.style.background = '#fff8e1';
      tdWarn.style.borderBottom = '1px solid #ffe08a';
      tdWarn.innerHTML = `⚠️ Unresolved fields: ${unresolved.map(u => `<code>${u.field}</code>`).join(', ')}. Use fully-qualified names (e.g., <code>view.field</code>) or toggle “Show field debug header”.`;
      trWarn.appendChild(tdWarn);
      tbody.appendChild(trWarn);
    }

    rows.forEach(r => {
      const tr = document.createElement('tr');
      resolvedCols.forEach(c => {
        const td = document.createElement('td');
        const v = r[c.key];
        td.textContent = v == null ? '' : (v.toLocaleString?.() ?? String(v));
        td.style.padding = '10px';
        td.style.borderBottom = '1px solid #eef1f6';
        td.style.textAlign = c.align || 'left';
        td.style.fontWeight = c.bold ? '700' : '400';
        td.style.whiteSpace = 'nowrap';
        td.style.overflow = 'hidden';
        td.style.textOverflow = 'ellipsis';
        if (c.heat) td.style.background = shade(c.key, Number(v));
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'separate';
    table.style.borderSpacing = '0';
    table.style.tableLayout = 'fixed';

    table.appendChild(thead);
    table.appendChild(tbody);

    scroller.appendChild(table);
    this.wrap.appendChild(scroller);

    done();
  }
});
