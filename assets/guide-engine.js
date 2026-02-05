/* v22 Guide Engine - data-driven conditional logic + education + video blocks */
(function(){
  const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));
  const $ = (sel, root=document)=>root.querySelector(sel);

  const money = (n)=>{
    if (n === null || n === undefined) return '';
    if (typeof n === 'object'){
      const mn = Number(n.min||0);
      const mx = Number(n.max||0);
      if (!mn && !mx) return 'Included / Quote';
      if (mn && mx && mn !== mx) return `${money(mn)} - ${money(mx)}`;
      return money(mn||mx);
    }
    const num = Number(n)||0;
    if (num === 0) return 'Included / Quote';
    try{
      return num.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0});
    }catch(e){
      return '$' + Math.round(num);
    }
  };

  const deepGet = (obj, path)=>{
    try{
      return path.split('.').reduce((a,k)=>a && a[k], obj);
    }catch(e){ return undefined; }
  };

  const evalShowIf = (showIf, answers)=>{
    if (!showIf) return true;
    try{
      // showIf can be function(answers) or object shorthand.
      if (typeof showIf === 'function') return !!showIf(answers);
      if (typeof showIf === 'string') return !!deepGet(answers, showIf);
      if (typeof showIf === 'object'){
        // { any: [{q:'x', eq:'y'}, ...] } / { all: [...] }
        const test = (t)=>{
          const v = deepGet(answers, t.q);
          if (t.has !== undefined) return Array.isArray(v) && v.includes(t.has);
          if (t.eq !== undefined) return v === t.eq;
          if (t.neq !== undefined) return v !== t.neq;
          if (t.in !== undefined) return Array.isArray(t.in) ? t.in.includes(v) : false;
          if (t.truthy) return !!v;
          if (t.falsy) return !v;
          if (t.gt !== undefined) return Number(v) > Number(t.gt);
          if (t.gte !== undefined) return Number(v) >= Number(t.gte);
          if (t.lt !== undefined) return Number(v) < Number(t.lt);
          if (t.lte !== undefined) return Number(v) <= Number(t.lte);
          return false;
        };
        if (showIf.all) return showIf.all.every(test);
        if (showIf.any) return showIf.any.some(test);
        return true;
      }
    }catch(e){}
    return true;
  };

  const storageKey = (flowId)=>`hwa_flow_${flowId}_answers_v22`;

  function compute(flow, answers){
    const out = {
      tags: new Set(),
      products: [],
      // products can be string ids or {id, qty}

      quoteOnly: new Set(),
      notes: [],
      explainers: [],
      confidenceHints: []
    };

    const addProduct = (entry)=>{
      if (!entry) return;
      const id = (typeof entry === 'string') ? entry : (entry && entry.id);
      if (!id) return;
      const qty = (typeof entry === 'object' && entry && entry.qty != null) ? Number(entry.qty) : 1;

      // Merge qty for same id (prefer storing as an object when qty matters)
      for (let i=0; i<out.products.length; i++){
        const cur = out.products[i];
        const curId = (typeof cur==='string') ? cur : (cur && cur.id);
        if (curId !== id) continue;
        const add = (isFinite(qty) && qty>0) ? qty : 1;
        if (typeof cur === 'object'){
          const base = Number(cur.qty)||1;
          out.products[i] = { id, qty: base + add };
          return;
        }
        // existing was a string id, upgrade to qty object if qty != 1
        if (add !== 1){
          out.products[i] = { id, qty: 1 + add };
          return;
        }
        return;
      }

      if (isFinite(qty) && qty !== 1) out.products.push({ id, qty: qty>0?qty:1 });
      else out.products.push(id);
    };

    const addExplainer = (x)=>{
      if (!x) return;
      out.explainers.push(x);
    };

    const addNote = (x)=>{
      if (!x) return;
      out.notes.push(x);
    };

    const addConfidence = (x)=>{
      if (!x) return;
      out.confidenceHints.push(x);
    };

    // Step-level contributions (based on answered fields)
    (flow.rules || []).forEach(rule=>{
      try{
        const ok = evalShowIf(rule.when, answers);
        if (!ok) return;
        (rule.addTags||[]).forEach(t=>out.tags.add(t));
        (rule.addProducts||[]).forEach(addProduct);
        (rule.addQuoteOnly||[]).forEach(p=>out.quoteOnly.add(p));
        (rule.addNotes||[]).forEach(addNote);
        (rule.addExplainers||[]).forEach(addExplainer);
        (rule.addConfidenceHints||[]).forEach(addConfidence);
      }catch(e){}
    });

    // Map tags -> bundles
    (flow.tagBundles || []).forEach(tb=>{
      if (out.tags.has(tb.tag)){
        (tb.products||[]).forEach(addProduct);
        if (tb.note) addNote(tb.note);
        if (tb.explainer) addExplainer(tb.explainer);
      }
    });

    
    // Step compute hooks (optional): allows steps to return { include:[id or {id,qty}], quoteOnly:[id], notes:[], explainers:[] }
    const visibleSteps = (flow.steps||[]).filter(s=>evalShowIf(s.showIf, answers));
    visibleSteps.forEach(s=>{
      if (typeof s.compute !== 'function') return;
      try{
        const r = s.compute(answers) || {};
        (r.include||[]).forEach(addProduct);
        (r.quoteOnly||[]).forEach(p=>out.quoteOnly.add(p));
        (r.notes||[]).forEach(addNote);
        (r.explainers||[]).forEach(addExplainer);
      }catch(e){}
    });

// De-dupe explainers by id if present
    const seen = new Set();
    out.explainers = out.explainers.filter(x=>{
      const key = x.id || x.title || JSON.stringify(x).slice(0,60);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return out;
  }

  function getProductById(id){
    const src = (window.HWA_PRODUCTS || []);
    if (Array.isArray(src)) return src.find(p=>p.id===id) || null;
    const obj = src[id];
    if (!obj) return null;
    return {
      id,
      name: obj.name,
      price: obj.price,
      category: obj.category || obj.cat || obj.type || "",
      subcategory: obj.subcategory || obj.subcat || "",
      image: obj.image || "",
      short: obj.short || obj.desc || obj.description || ""
    };
  }

  function sumProducts(items){
    let totalMin = 0;
    let totalMax = 0;
    const lines = [];
    (items||[]).forEach(entry=>{
      const id = (typeof entry === 'string') ? entry : (entry && entry.id);
      const qty = (typeof entry === 'object' && entry && entry.qty) ? Number(entry.qty) : 1;
      if (!id) return;
      const p = getProductById(id);
      if (!p) return;
      const pr = (p.price != null) ? p.price : ((p.priceMin!=null||p.priceMax!=null)?{min:p.priceMin||0,max:p.priceMax||0}:0);
      const mn = (typeof pr==='object') ? Number(pr.min||0) : Number(pr||0);
      const mx = (typeof pr==='object') ? Number(pr.max||mn) : Number(pr||0);
      const lineMin = mn * (qty||1);
      const lineMax = mx * (qty||1);
      totalMin += lineMin;
      totalMax += lineMax;
      lines.push({ id, qty: qty||1, name: p.name, image: p.image, short: p.short||p.desc||'', price: pr, linePrice: {min: lineMin, max: lineMax} });
    });
    return { total: {min: totalMin, max: totalMax}, lines };
  }

  function mount(mountEl, flow){
    if (!mountEl) return;

    const saved = (()=>{ try{return JSON.parse(localStorage.getItem(storageKey(flow.id))||'{}');}catch(e){return {};}})();
    let answers = saved && typeof saved==='object' ? saved : {};
    let stepIndex = 0;

    const getVisibleSteps = ()=>{
      return (flow.steps||[]).filter(s=>evalShowIf(s.showIf, answers));
    };

    const save = ()=>{
      try{ localStorage.setItem(storageKey(flow.id), JSON.stringify(answers)); }catch(e){}
    };

    const setAnswer = (key, value)=>{
      answers[key] = value;
      save();
    };

    const ensureStepInRange = ()=>{
      const steps = getVisibleSteps();
      if (stepIndex < 0) stepIndex = 0;
      if (stepIndex > steps.length-1) stepIndex = steps.length-1;
      return steps;
    };

    const renderBlocks = (blocks)=>{
      if (!blocks || !blocks.length) return '';
      return blocks.map(b=>{
        if (!evalShowIf(b.showIf, answers)) return '';
        if (b.type === 'callout'){
          const tone = b.tone ? ` ${b.tone}` : '';
          return `<div class="callout${tone}"><strong>${b.title||''}</strong><p>${b.body||''}</p></div>`;
        }
        const highlight = b.highlightIf && evalShowIf(b.highlightIf, answers) ? ' is-highlighted' : '';
        if (b.type === 'explain'){
          return `<div class="edu-block${highlight}">
            <h4>${b.title||'Plain-language explanation'}</h4>
            <p>${b.body||''}</p>
          </div>`;
        }
        if (b.type === 'videoModule'){
          const thumb = b.thumb || 'assets/img/thumb-generic.png';
          const href = b.href || '#';
          return `<div class="video-module">
            <div class="video-meta">
              <div class="h3">${b.title||'Video'}</div>
              <div class="tiny">${b.caption||'Short explainer (30-90 seconds).'}</div>
              <a class="btn btn-secondary btn-small" href="${href}">Watch video</a>
            </div>
            <div class="video-thumb">
              <img src="${thumb}" alt="${b.alt||'Video placeholder'}">
            </div>
          </div>`;
        }
        if (b.type === 'visual'){
          const media = b.media || {};
          const visual = (media.kind === 'video')
            ? `<div class="video">
                <iframe title="${(media.title||b.title||'Video')}" width="100%" height="315" src="${media.embedUrl||'https://www.youtube.com/embed/VIDEO_ID'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <div class="cap"><strong>${media.title||b.title||'Video'}</strong> <span class="tiny">- ${media.caption||'Replace VIDEO_ID with your video.'}</span></div>
              </div>`
            : `<div class="edu-visual"><img src="${media.src||''}" alt="${media.alt||''}"></div>`;
          return `<div class="edu-block${highlight}">
            <h4>${b.title||'Visual explanation'}</h4>
            <p>${b.body||''}</p>
            ${visual}
            ${b.caption ? `<div class="caption">${b.caption}</div>`:''}
          </div>`;
        }
        if (b.type === 'evidence'){
          const items = (b.items||[]).filter(it=>evalShowIf(it.showIf, answers)).map(it=>`
            <div class="evidence-item">
              <div style="font-weight:900;">${it.title||''}</div>
              <div class="tiny">${it.summary||''}</div>
              ${it.url ? `<div class="tiny" style="margin-top:6px;"><a href="${it.url}" target="_blank" rel="noopener">${it.org||'Source'}</a></div>`:''}
            </div>
          `).join('');
          const chart = b.chart ? `
            <div class="chart">
              <div style="font-weight:900;">${b.chart.title||'Chart'}</div>
              ${(b.chart.rows||[]).filter(r=>evalShowIf(r.showIf, answers)).map(r=>`
                <div class="chart-bar">
                  <div class="label">${r.label||''}</div>
                  <div class="bar" style="width:${Math.min(100, Math.max(8, Number(r.value)||0))}%;"></div>
                </div>
              `).join('')}
              ${b.chart.caption ? `<div class="caption">${b.chart.caption}</div>`:''}
            </div>
          ` : '';
          return `<div class="edu-block${highlight}">
            <h4>${b.title||'Evidence-based data'}</h4>
            <p>${b.body||''}</p>
            <div class="evidence-list">${items}</div>
            ${chart}
          </div>`;
        }
        if (b.type === 'chart'){
          const rows = (b.rows||[]).filter(r=>evalShowIf(r.showIf, answers)).map(r=>`
            <div class="chart-bar">
              <div class="label">${r.label||''}</div>
              <div class="bar" style="width:${Math.min(100, Math.max(8, Number(r.value)||0))}%;"></div>
            </div>
          `).join('');
          return `<div class="edu-block${highlight}">
            <h4>${b.title||'Visual / Chart'}</h4>
            <p>${b.body||''}</p>
            <div class="chart">
              <div style="font-weight:900;">${b.chartTitle||'Chart placeholder'}</div>
              ${rows}
              ${b.caption ? `<div class="caption">${b.caption}</div>`:''}
            </div>
          </div>`;
        }
        if (b.type === 'evidenceAccordion'){
          const items = (b.items||[]).filter(it=>evalShowIf(it.showIf, answers)).map(it=>`
            <li><a href="${it.url||'#'}" target="_blank" rel="noopener">${it.label||it.title||'Source'}</a></li>
          `).join('');
          return `<div class="edu-block${highlight}">
            <h4>${b.title||'Evidence & Sources'}</h4>
            <div class="accordion">
              <details>
                <summary>${b.summary||'Open sources'}</summary>
                <div class="body">
                  <ul class="bullets">${items}</ul>
                </div>
              </details>
            </div>
          </div>`;
        }
        if (b.type === 'implications'){
          const scenarios = (b.scenarios||[]).filter(s=>evalShowIf(s.showIf, answers)).map(s=>`
            <div class="scenario">
              <strong>${s.title||''}</strong>
              <p>${s.body||''}</p>
            </div>
          `).join('');
          return `<div class="edu-block${highlight}">
            <h4>${b.title||'What this means for your home'}</h4>
            <p>${b.body||''}</p>
            ${scenarios}
          </div>`;
        }
        if (b.type === 'products'){
          const items = (b.items||[]).filter(it=>evalShowIf(it.showIf, answers)).map(it=>`
            <div class="product-implication">
              <strong>${it.title||''}</strong>
              <div class="tiny">Solves: ${it.solves||''}</div>
              <div class="tiny bad">Does not solve: ${it.not||''}</div>
              <div class="tiny" style="margin-top:6px;">Right for: ${it.for||''}</div>
              <div class="tiny">Not right for: ${it.notFor||''}</div>
              ${it.link ? `<div style="margin-top:8px;"><a class="btn btn-ghost btn-small" href="${it.link}">View in shop</a></div>`:''}
            </div>
          `).join('');
          return `<div class="edu-block${highlight}">
            <h4>${b.title||'Product implications'}</h4>
            <p>${b.body||''}</p>
            <div class="product-implications">${items}</div>
          </div>`;
        }
        if (b.type === 'deepdive'){
          const inner = (b.items||[]).map(it=>`
            <details>
              <summary class="go-deeper">${it.q||'Go deeper'}</summary>
              <div class="body">${it.a||''}</div>
            </details>
          `).join('');
          return `<div class="edu-block${highlight}">
            <h4>${b.title||'Optional advanced deep dive'}</h4>
            <div class="accordion">${inner}</div>
          </div>`;
        }
        if (b.type === 'text'){
          return `<div class="muted" style="font-size:14px;">${b.html||''}</div>`;
        }
        if (b.type === 'checklist'){
          const items = (b.items||[]).map(x=>`<li>${x}</li>`).join('');
          return `<div class="card pad" style="box-shadow:none;"><div class="h3">${b.title||''}</div><ul class="muted" style="margin:10px 0 0; padding-left:18px;">${items}</ul></div>`;
        }
        if (b.type === 'video'){
          const url = b.embedUrl || 'https://www.youtube.com/embed/VIDEO_ID';
          return `<div class="video">
            <iframe title="${(b.title||'Video')}" width="100%" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div class="cap"><strong>${b.title||'Video'}</strong> <span class="tiny">- ${b.caption||'Replace VIDEO_ID with your video.'}</span></div>
          </div>`;
        }
        if (b.type === 'accordion'){
          const inner = (b.items||[]).map(it=>`
            <details>
              <summary>${it.q||''}</summary>
              <div class="body">${it.a||''}</div>
            </details>
          `).join('');
          return `<div class="accordion">${inner}</div>`;
        }
        return '';
      }).join('<div style="height:12px;"></div>');
    };

    const renderQuestion = (q)=>{
      if (!evalShowIf(q.showIf, answers)) return '';
      const key = q.key;
      const val = answers[key];

      const head = `
        <div class="q" data-q="${key}">
          <h4>${q.title||''}</h4>
          ${q.help ? `<p class="help">${q.help}</p>`:''}
      `;

      if (q.type === 'single' || q.type === 'multi'){
        const opts = (q.options||[]).map(opt=>{
          const id = `${key}__${opt.value}`;
          const checked = q.type==='single' ? (val===opt.value) : (Array.isArray(val) && val.includes(opt.value));
          const inputType = q.type==='single' ? 'radio' : 'checkbox';
          return `
            <label class="opt" for="${id}">
              <input id="${id}" type="${inputType}" name="${key}" value="${opt.value}" ${checked?'checked':''} />
              <span>
                <strong>${opt.label||opt.value}</strong>
                ${opt.meta ? `<span class="meta">${opt.meta}</span>`:''}
              </span>
            </label>
          `;
        }).join('');
        return head + `<div class="opts">${opts}</div></div>`;
      }

      if (q.type === 'number'){
        const min = (q.min!==undefined)?`min="${q.min}"`:'';
        const max = (q.max!==undefined)?`max="${q.max}"`:'';
        const step = (q.step!==undefined)?`step="${q.step}"`:'step="1"';
        return head + `<input class="input" type="number" ${min} ${max} ${step} value="${val!==undefined?String(val):''}" placeholder="${q.placeholder||''}" /></div>`;
      }

      if (q.type === 'text'){
        return head + `<input class="input" type="text" value="${val!==undefined?String(val):''}" placeholder="${q.placeholder||''}" /></div>`;
      }

      if (q.type === 'textarea'){
        return head + `<textarea>${val!==undefined?String(val):''}</textarea></div>`;
      }

      if (q.type === 'slider'){
        const min = q.min ?? 0;
        const max = q.max ?? 10;
        const step = q.step ?? 1;
        const v = (val!==undefined)?val:q.default ?? Math.round((min+max)/2);
        return head + `
          <div style="display:grid; gap:10px;">
            <input type="range" min="${min}" max="${max}" step="${step}" value="${v}" />
            <div class="tiny">Selected: <span class="price">${v}</span> ${q.suffix||''}</div>
          </div>
        </div>`;
      }

      return '';
    };

    const bindQuestionEvents = ()=>{
      $$('.q', mountEl).forEach(qEl=>{
        const key = qEl.getAttribute('data-q');
        const qDef = (getVisibleSteps()[stepIndex]?.questions||[]).find(x=>x.key===key);
        if (!qDef) return;

        if (qDef.type==='single'){
          $$('input[type="radio"]', qEl).forEach(inp=>{
            inp.addEventListener('change', ()=>{
              setAnswer(key, inp.value);
              rerender();
            });
          });
        } else if (qDef.type==='multi'){
          $$('input[type="checkbox"]', qEl).forEach(inp=>{
            inp.addEventListener('change', ()=>{
              const cur = Array.isArray(answers[key]) ? answers[key].slice() : [];
              if (inp.checked && !cur.includes(inp.value)) cur.push(inp.value);
              if (!inp.checked) {
                const idx = cur.indexOf(inp.value);
                if (idx>=0) cur.splice(idx,1);
              }
              setAnswer(key, cur);
              rerender();
            });
          });
        } else if (qDef.type==='number' || qDef.type==='text'){
          const inp = $('input', qEl);
          inp.addEventListener('input', ()=>{
            const v = qDef.type==='number' ? (inp.value===''?undefined:Number(inp.value)) : inp.value;
            setAnswer(key, v);
          });
          inp.addEventListener('change', ()=>{ rerender(); });
        } else if (qDef.type==='textarea'){
          const ta = $('textarea', qEl);
          ta.addEventListener('input', ()=>{
            setAnswer(key, ta.value);
          });
          ta.addEventListener('change', ()=>{ rerender(); });
        } else if (qDef.type==='slider'){
          const r = $('input[type="range"]', qEl);
          r.addEventListener('input', ()=>{
            setAnswer(key, Number(r.value));
            rerender();
          });
        }
      });
    };

    const rerender = ()=>{
      const steps = ensureStepInRange();
      const step = steps[stepIndex];

      const computed = compute(flow, answers);

      // Itemized quote from products
      const productEntries = (computed.products||[]);
      const getId = (e)=> (typeof e==='string')?e:(e&&e.id);
      const productIds = productEntries.map(getId).filter(Boolean);

      const excludedSet = new Set((answers && answers.__excluded) ? answers.__excluded : []);
      const includedEntries = productEntries.filter(e=>!excludedSet.has(getId(e)));
      const includedIds = includedEntries.map(getId);

      const { total: allTotal, lines } = sumProducts(productEntries);

      const { total, lines: includedLines } = sumProducts(includedEntries);


      const quoteOnlyLines = Array.from(computed.quoteOnly).map(id=>{
        const p = getProductById(id);
        return { id, name: p ? p.name : id, price: 0, quoteOnly:true };
      });

      // Progress dots
      const dots = steps.map((s, i)=>{
        const cls = i===stepIndex ? 'active' : (i<stepIndex ? 'done' : '');
        return `<div class="step-dot ${cls}">${i+1}</div>`;
      }).join('');

      const stepTitle = step?.title || flow.title || 'Guide';
      const stepLead = step?.lead || '';

      const blocks = renderBlocks(step?.blocks || []);

      const questionsHtml = (step?.questions || []).map(renderQuestion).join('');

      const explainerHtml = (()=> {
        const list = (step?.side || computed.explainers || []).slice(0, 6);
        if (!list.length) return `<div class="tiny">As you answer, your recommended bundle and education will update here.</div>`;
        return list.map(x=>{
          if (x.type === 'accordion') {
            return `<div style="margin-top:12px;">${renderBlocks([x])}</div>`;
          }
          const title = x.title || 'Why this matters';
          const body = x.body || x.html || '';
          return `<div class="tile">
            <strong>${title}</strong>
            <p>${body}</p>
            ${x.video ? `<div style="margin-top:10px;">${renderBlocks([{type:'video', ...x.video}])}</div>`:''}
          </div>`;
        }).join('<div style="height:10px;"></div>');
      })();

      const quoteLinesHtml = (()=> {
        if (!lines.length && !quoteOnlyLines.length) return `<div class="tiny">No items selected yet. Answer a few questions to generate your bundle.</div>`;
        const showToggle = !!(step && step.isReview);
  const renderLine = (l)=>{
    const excluded = excludedSet.has(l.id);
    const nameHtml = `${l.name||""}`;
    const imgSrc = (l.image || "").trim() || "assets/img/thumb-generic.png";
    const imgHtml = `<div class="line-thumb"><img alt="" src="${imgSrc}"/></div>`;
    // qtyHtml must be initialized before being used in metaHtml (avoids TDZ ReferenceError)
    const qty = Number(l.qty||1);
    const qtyHtml = (qty && qty>1) ? `<span class="badge">x${qty}</span>` : '';
    const metaHtml = l.quoteOnly
      ? `<div class="tiny"><span class="badge">Quote</span> ${qtyHtml} We'll verify sizing/install details for this item.</div>`
      : (l.short ? `<div class="tiny">${qtyHtml} ${l.short}</div>` : (excluded ? `<div class="tiny"><span class="badge">Removed</span> Not included in total.</div>` : ''));
    const toggleHtml = (showToggle && !l.quoteOnly)
      ? `<button type="button" class="chip" data-toggle-item="${l.id}">${excluded ? 'Add back' : 'Remove'}</button>`
      : '';
    const priceHtml = l.quoteOnly ? '-' : money(l.price);
    return `
      <div class="line ${excluded ? 'excluded' : ''}">
        ${imgHtml}
        <div style="min-width:0;">
          <div style="font-weight:900; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${nameHtml}</div>
          ${metaHtml}
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          ${toggleHtml}
          <div class="price">${priceHtml}</div>
        </div>
      </div>
    `;
  };
  return [...lines.map(renderLine), ...quoteOnlyLines.map(renderLine)].join('');
})();

      const notesHtml = computed.notes.length ? `
        <div style="margin-top:14px;">
          <div class="h3">Notes for your home</div>
          <ul class="muted" style="margin:8px 0 0; padding-left:18px;">
            ${computed.notes.slice(0,6).map(n=>`<li>${n}</li>`).join('')}
          </ul>
        </div>
      ` : '';

      const buttons = `
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;">
          <button class="btn btn-ghost" data-prev ${stepIndex===0?'disabled':''}>Back</button>
          <button class="btn btn-secondary" data-next ${stepIndex===steps.length-1?'disabled':''}>Next</button>
          ${step?.isReview ? `<button class="btn btn-primary" data-add>Add recommended to cart</button>`:''}
          <button class="btn btn-secondary" data-reset>Reset</button>
        </div>
      `;

      // Only show the recommended bundle at the end of the guide (review step)
      const showBundle = !!step?.isReview;
      const showLearnAsYouGo = !!step?.isReview;

      const bundleCardHtml = showBundle ? `
        <div class="card pad">
          <div class="h3">Your recommended bundle</div>
          <div class="tiny">Shown at the end so you can focus on learning first.</div>
          <div style="margin-top:12px;">${quoteLinesHtml}</div>
          <hr/>
          <div class="line">
            <div style="font-weight:900;">Estimated total</div>
            <div class="price">${money(total)}</div>
          </div>
          <div class="tiny" style="margin-top:8px;">Some items may require an in-home assessment. Use Schedule if you want a technician to confirm sizing and install details.</div>
          ${notesHtml}
        </div>
      ` : '';

      mountEl.innerHTML = `
        <div class="wizard ${showLearnAsYouGo || showBundle ? '' : 'wizard-single'}">
          <div>
            <div class="card pad-lg">
              <div class="wizard-top">
                <div>
                  <div class="eyebrow">${flow.badge || 'Self-help guide'} - <span class="tiny">${flow.subtitle||''}</span></div>
                  <div class="h2" style="margin-top:10px;">${stepTitle}</div>
                  ${stepLead ? `<div class="lead">${stepLead}</div>` : ''}
                </div>
                <div class="progress" aria-label="Progress">
                  ${dots}
                </div>
              </div>

              ${blocks ? `<div style="display:grid; gap:12px;">${blocks}</div>`:''}

              ${questionsHtml ? `<div style="margin-top:14px; display:grid; gap:12px;">${questionsHtml}</div>`:''}

              ${buttons}
              ${step?.footnote ? `<div class="tiny" style="margin-top:10px;">${step.footnote}</div>`:''}
            </div>
          </div>

          <aside class="quote">
            ${showBundle ? bundleCardHtml : ''}
            ${showBundle ? '<div style="height:14px;"></div>' : ''}

            ${showLearnAsYouGo ? `
              <div class="card pad">
                <div class="h3">Learn as you go</div>
                <div class="tiny">Short explanations tied to your answers.</div>
                <div style="margin-top:12px; display:grid; gap:10px;">
                  ${explainerHtml}
                </div>
              </div>
            ` : ''}
          </aside>
        </div>
      `;

      // Bind navigation buttons
      const prev = $('[data-prev]', mountEl);
      const next = $('[data-next]', mountEl);
      const reset = $('[data-reset]', mountEl);
      prev && prev.addEventListener('click', ()=>{
        stepIndex--;
        rerender();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      next && next.addEventListener('click', ()=>{
        stepIndex++;
        rerender();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      reset && reset.addEventListener('click', ()=>{
        answers = {};
        stepIndex = 0;
        save();
        rerender();
      });

      // Add to cart
      const add = $('[data-add]', mountEl);
      add && add.addEventListener('click', ()=>{
        const linesToAdd = lines.filter(l=>!excludedSet.has(l.id)).map(l=>({id:l.id, qty: Number(l.qty||1)}));
        if (!linesToAdd.length) return alert('Answer a few questions first so we can build your bundle.');
        if (!window.HWA_CART || typeof window.HWA_CART.add !== 'function') {
          return alert('Cart is not available on this page.');
        }
        linesToAdd.forEach(x=>{ window.HWA_CART.add(x.id, x.qty || 1); });
        alert('Recommended items added to your cart.');
        rerender();
      });


// Toggle include/exclude (review step)
$$('[data-toggle-item]', mountEl).forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-toggle-item');
    const set = new Set((answers && answers.__excluded) ? answers.__excluded : []);
    if (set.has(id)) set.delete(id); else set.add(id);
    answers.__excluded = Array.from(set);
    save();
    rerender();
  });
});
      bindQuestionEvents();
};

    rerender();
  }

  window.HWA_GUIDE_ENGINE = { mount };
})();
