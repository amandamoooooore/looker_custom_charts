// -----------------------------------------------------------------------------
// Looker Custom Visualization: Grouped Header Grid (dynamic via JSON options)
// -----------------------------------------------------------------------------
looker.plugins.visualizations.add({
  id: 'grouped_header_grid',
  label: 'Grouped Header Grid',

  // ---- Visualization options (edit in the Looker UI) ------------------------
  options: {
    columns_json: {
      type: 'string',
      label: 'Columns JSON',
      display: 'text',  // use 'textarea' if your Looker shows it correctly
      default: ''       // leave empty so the control always renders
    },

    // Optional map of group name -> color (for the top group band).
    group_colors_json: {
      type: 'string',
      label: 'Group Colors JSON (optional)',
      display: 'text',
      default: ''       // leave empty so the control always renders
    },

    showHeatmap: {
      type: 'boolean',
      label: 'Heatmap activity columns',
      default: true
    },

    table_height: {
      type: 'number',
      label: 'Max table height (px, 0 = auto)',
      default: 0
    }
  },

  // ---- Lifecycle: create -----------------------------------------------------
  create (element) {
    const wrap = document.createElement('div');
    wrap.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    wrap.style.fontSize = '13px';
    wrap.style.color = '#1a1f36';
    element.appendChild(wrap);
    this.wrap = wrap;
  },

  // ---- Lifecycle: update -----------------------------------------------------
  updateAsync (data, element, config, queryResponse, details, done) {
    this.wrap.innerHTML = '';

    // --- Helpers --------------------------------------------------------------
    const parseJSON = (txt, fallback) => {
      try { return JSON.parse(txt || ''); } catch { return fallback; }
    };

    const cols = parseJSON(config.columns_json, []);
    const groupColors = parseJSON(config.group_colors_json, {});

    if (!Array.isArray(cols) || cols.length === 0) {
      const empty = document.createElement('div');
      empty.style.padding = '16px';
      empty.innerHTML = `
        <div style="font-weight:600;margin-bottom:8px;">Columns not configured</div>
        <div style="opacity:0.8">
          Paste a JSON array into <b>Columns JSON</b>. Example (minified):
          <pre style="white-space:pre-wrap;background:#f7f8fb;border:1px solid #e6e8ee;border-radius:6px;padding:10px;margin-top:8px;">
[{"field":"make","key":"make","label":"Make","align":"left"},{"field":"model","key":"model","label":"Model","align":"left"},{"field":"body_type","key":"body_type","label":"Body","align":"left"},{"field":"fuel_type","key":"fuel_type","label":"Fuel","align":"left"},{"field":"ad_views","key":"ad_views","label":"Ad Views","group":"Activity on the Advert","heat":true,"align":"right"},{"field":"interactions","key":"interactions","label":"Interactions","group":"Activity on the Advert","heat":true,"align":"right"},{"field":"total_activity","key":"total_activity","label":"Total Activity","group":"Activity on the Advert","heat":true,"align":"right"},{"field":"total_time_on_ad","key":"total_time_on_ad","label":"Total Time on Ad","group":"Time on the Advert","align":"right"},{"field":"avg_time_on_ad","key":"avg_time_on_ad","label":"Average Time on Ad","group":"Time on the Advert","align":"right"},{"field":"total_engagement","key":"total_engagement","label":"Total Engagement","group":"Combined Engagement","bold":true,"align":"right"}]
          </pre>
        </div>`;
      this.wrap.appendChild(empty);
      done();
      return;
    }

    // Pull values from each Looker row by "field" path
    const val = (row, field) => {
      // Accept either fully-qualified "view.field" or plain "field"
      // The row object keys are the Looker field names from the query.
      return row[field]?.value ?? null;
    };

    // Build a plain list of row objects keyed by our column keys
    const rows = data.map(r => {
      const obj = {};
      cols.forEach(c => { obj[c.key] = val(r, c.field); });
      return obj;
    });

    // --- Containers / scrolling ----------------------------------------------
    const scroller = document.createElement('div');
    scroller.style.overflow = 'auto';
    if (Number(config.table_height) > 0) {
      scroller.style.maxHeight = `${config.table_height}px`;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'separate';
    table.style.borderSpacing = '0';
    table.style.tableLayout = 'fixed';

    // --- Header building ------------------------------------------------------
    const makeTh = (txt, opts = {}) => {
      const th = document.createElement('th');
      th.textContent = txt;
      th.style.padding = '12px 10px';
      th.style.fontWeight = opts.bold ? '700' : '600';
      th.style.fontSize = '13px';
      th.style.textAlign = opts.align || 'left';
      th.style.borderBottom = '1px solid #e6e8ee';
      th.style.background = opts.bg ?? '#0b2557';
      th.style.color = opts.color ?? (opts.bg ? '#0b1020' : '#ffffff');
      th.style.position = 'sticky';
      th.style.top = '0';
      return th;
    };

    const thead = document.createElement('thead');
    const r1 = document.createElement('tr');
    const r2 = document.createElement('tr');

    let i = 0;
    while (i < cols.length) {
      const g = cols[i].group;
      if (!g) {
        const th = makeTh(cols[i].label, { align: 'left' });
        th.rowSpan = 2;
        r1.appendChild(th);
        i++;
        continue;
      }
      // find contiguous span for this group
      let j = i;
      while (j < cols.length && cols[j].group === g) j++;
      const thg = makeTh(g, { bg: groupColors[g] || '#d9e3f8', color: '#0b1020' });
      thg.colSpan = j - i;
      r1.appendChild(thg);
      for (let k = i; k < j; k++) {
        const th = makeTh(cols[k].label, { align: 'left' });
        r2.appendChild(th);
      }
      i = j;
    }

    thead.appendChild(r1);
    thead.appendChild(r2);

    // --- Body + optional heatmap ---------------------------------------------
    const tbody = document.createElement('tbody');

    const heatCols = cols.filter(c => c.heat);
    const mins = {}, maxs = {};
    heatCols.forEach(c => {
      const vals = rows.map(r => Number(r[c.key])).filter(Number.isFinite);
      if (vals.length) {
        mins[c.key] = Math.min(...vals);
        maxs[c.key] = Math.max(...vals);
      }
    });

    const shade = (key, v) => {
      if (!Number.isFinite(v)) return '';
      const min = mins[key], max = maxs[key];
      if (max === min) return 'rgba(63,131,248,0.15)';
      const t = (v - min) / (max - min); // 0..1
      return `rgba(63,131,248,${0.12 + 0.28*t})`;
    };

    rows.forEach(r => {
      const tr = document.createElement('tr');
      cols.forEach(c => {
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
        if (config.showHeatmap && c.heat) {
          td.style.background = shade(c.key, Number(v));
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    scroller.appendChild(table);
    this.wrap.appendChild(scroller);

    done();
  }
});
