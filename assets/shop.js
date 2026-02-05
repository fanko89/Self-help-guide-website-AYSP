(function(){
  function lc(s){ return String(s||"").toLowerCase().trim(); }

  function moneyRange(p){
    if (!p) return "";
    const price = p.price;
    if (price && typeof price === "object"){
      const mn = Number(price.min||0);
      const mx = Number(price.max||0);
      if (mn && mx && mn !== mx) return `$${mn.toLocaleString()} - $${mx.toLocaleString()}`;
      const v = (mx||mn);
      return v ? `$${v.toLocaleString()}` : "";
    }
    if (typeof price === "number"){
      return `$${Number(price).toLocaleString()}`;
    }
    return "";
  }

  function getProducts(){
    const src = window.HWA_PRODUCTS || {};
    // supports both object map and array
    if (Array.isArray(src)) return src.map((p,i)=> ({ id: p.id || String(i), ...p }));
    return Object.entries(src).map(([id,p])=> ({ id, ...p }));
  }

  function guideLink(cat){
    const c = lc(cat);
    if (c.includes("water")) return { href: "water-guide.html", label: "Water guide" };
    if (c.includes("air")) return { href: "air-guide.html", label: "Air guide" };
    if (c.includes("hvac")) return { href: "hvac-guide.html", label: "HVAC guide" };
    return { href: "home-guide.html", label: "Home guide" };
  }

  function renderCard(p){
    const img = p.image ? `<img class="prod-img" src="${p.image}" alt="${escapeHtml(p.name||"")}" loading="lazy" />` : "";
    const cat = escapeHtml(p.category||"");
    const sub = escapeHtml(p.subcategory||"");
    const price = moneyRange(p) || (p.unit ? escapeHtml(p.unit) : "Price TBD");
    const guide = guideLink(p.category||"");

    const addBtn = (window.HWA_CART && typeof window.HWA_CART.add === "function")
      ? `<button class="btn btn-sm" data-add="${escapeHtml(p.id)}">Add</button>`
      : "";

    return `
      <div class="card pad prod" data-cat="${escapeHtml(cat)}" data-sub="${escapeHtml(sub)}">
        <div class="prod-top">
          <div class="prod-meta">
            <div class="tiny">${cat}${sub ? " - " + sub : ""}</div>
            <div class="h3">${escapeHtml(p.name||"")}</div>
          </div>
          ${img}
        </div>
        <div class="muted" style="margin-top:8px;">${escapeHtml(p.short || p.desc || "")}</div>
        <div class="prod-bottom">
          <div class="price">${escapeHtml(price)}</div>
          <div style="display:flex; gap:8px; align-items:center;">
            <a class="btn btn-sm btn-ghost" href="${guide.href}">Learn</a>
            ${addBtn}
          </div>
        </div>
      </div>
    `;
  }

  function escapeHtml(s){
    return String(s ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function ensureShopCSS(){
    // Minimal CSS injected only if your stylesheet doesn't already include these classes.
    if (document.getElementById("hwa-shop-css")) return;
    const style = document.createElement("style");
    style.id = "hwa-shop-css";
    style.textContent = `
      .prod-top{display:flex; gap:14px; justify-content:space-between; align-items:flex-start}
      .prod-img{width:86px; height:86px; object-fit:cover; border-radius:14px; border:1px solid var(--stroke); background:rgba(255,255,255,.02)}
      .prod-bottom{display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:12px}
      .price{font-weight:800; color:var(--text)}
      .h3{font-weight:800; font-size:16px; margin-top:4px}
    `;
    document.head.appendChild(style);
  }

  function mount(){
    const grid = document.getElementById("shop-grid");
    const search = document.getElementById("shop-search");
    const subSelect = document.getElementById("shop-subcat");
    const catBtns = Array.from(document.querySelectorAll("[data-filter]"));

    if (!grid) return;

    ensureShopCSS();

    const all = getProducts();

    let activeCat = "All";

    function refreshSubcategories(){
      if (!subSelect) return;
      const currentCat = lc(activeCat);
      const subs = new Set();
      all.forEach(p=>{
        const pc = lc(p.category);
        if (currentCat !== "all" && pc !== lc(activeCat)) return;
        if (p.subcategory) subs.add(String(p.subcategory));
      });
      const currentVal = subSelect.value || "All";
      const options = ["All", ...Array.from(subs).sort((a,b)=> a.localeCompare(b))];

      subSelect.innerHTML = options.map(v=> `<option value="${escapeHtml(v)}">${escapeHtml(v === "All" ? "All subcategories" : v)}</option>`).join("");
      // preserve selection if still present
      if (options.includes(currentVal)) subSelect.value = currentVal;
      else subSelect.value = "All";
    }

    function apply(){
      const q = lc(search && search.value);
      const sub = lc(subSelect && subSelect.value);
      const cat = lc(activeCat);

      const filtered = all.filter(p=>{
        const pc = lc(p.category);
        const ps = lc(p.subcategory);
        const text = lc((p.name||"") + " " + (p.short||"") + " " + (p.desc||""));

        const okCat = (cat === "all") ? true : pc === cat;
        const okSub = (!subSelect || sub === "all") ? true : ps === sub;
        const okQ = !q ? true : text.includes(q);

        return okCat && okSub && okQ;
      });

      grid.innerHTML = filtered.length
        ? filtered.map(renderCard).join("")
        : `<div class="card pad"><div class="muted">No products match that filter.</div></div>`;

      // bind add-to-cart
      grid.querySelectorAll("[data-add]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          const id = btn.getAttribute("data-add");
          try{
            window.HWA_CART.add(id, 1);
            btn.textContent = "Added";
            setTimeout(()=>{ btn.textContent = "Add"; }, 900);
          }catch(e){}
        });
      });
    }

    // Category buttons
    catBtns.forEach(btn=>{
      btn.addEventListener("click", ()=>{
        catBtns.forEach(b=> b.classList.remove("active"));
        btn.classList.add("active");
        activeCat = btn.getAttribute("data-filter") || "All";
        refreshSubcategories();
        apply();
      });
    });

    if (search) search.addEventListener("input", apply);
    if (subSelect) subSelect.addEventListener("change", apply);

    // initial state
    const firstActive = catBtns.find(b=> b.classList.contains("active")) || catBtns[0];
    if (firstActive){
      activeCat = firstActive.getAttribute("data-filter") || "All";
    }
    refreshSubcategories();
    apply();
  }

  document.addEventListener("DOMContentLoaded", mount);
})();
