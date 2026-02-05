(function(){
  const KEY = "hwa_cart_v1";

  function load(){
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch(e){ return []; }
  }
  function save(items){
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadge();
  }
  function count(){
    return load().reduce((n,i)=> n + (i.qty||1), 0);
  }
  function updateBadge(){
    document.querySelectorAll("[data-cart-count]").forEach(el=>{
      el.textContent = String(count());
    });
  }
  function add(productId, qty=1, meta=null){
    const items = load();
    const existing = items.find(i=> i.productId===productId && JSON.stringify(i.meta||null)===JSON.stringify(meta||null));
    if (existing) existing.qty = (existing.qty||1) + qty;
    else items.push({productId, qty, meta});
    save(items);
  }
  function removeAt(idx){
    const items = load();
    items.splice(idx,1);
    save(items);
  }
  function setQty(idx, qty){
    const items = load();
    if (!items[idx]) return;
    items[idx].qty = Math.max(1, qty|0);
    save(items);
  }
  function clear(){
    save([]);
  }
  function priceRange(v){
    if (v == null) return {min:0,max:0};
    if (typeof v === "object") return {min:Number(v.min||0), max:Number(v.max||v.min||0)};
    const n = Number(v)||0;
    return {min:n, max:n};
  }

  function money(n){
    if (n == null) return "";
    if (typeof n === "object"){
      const mn = Number(n.min||0);
      const mx = Number(n.max||0);
      if (!mn && !mx) return "Included / Quote";
      if (mn && mx && mn !== mx) return money(mn) + " - " + money(mx);
      return money(mn||mx);
    }
    const num = Number(n)||0;
    return num === 0 ? "Included / Quote" : ("$" + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  function renderCart(){
    const root = document.getElementById("cartRoot");
    if (!root) return;
    const items = load();
    const catalog = window.HWA_PRODUCTS || {};
    let subtotalMin = 0;
    let subtotalMax = 0;

    const rows = items.map((it, idx)=>{
      const p = catalog[it.productId] || {name: it.productId, price: 0, desc:""};
      const pr = (p.price != null) ? p.price : ((p.priceMin!=null||p.priceMax!=null)?{min:p.priceMin||0,max:p.priceMax||0}:0);
      const qty = (it.qty||1);
      const mn = (typeof pr==="object") ? Number(pr.min||0) : Number(pr||0);
      const mx = (typeof pr==="object") ? Number(pr.max||mn) : Number(pr||0);
      const lineMin = mn * qty;
      const lineMax = mx * qty;
      subtotalMin += lineMin;
      subtotalMax += lineMax;

      return `
        <div class="card pad" style="margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
            <div style="min-width:240px;">
              <div style="font-weight:900; font-size:16px;">${p.name}</div>
              <div class="tiny">${p.desc || ""}</div>
              ${it.meta ? `<div class="tiny" style="margin-top:6px;">${Object.entries(it.meta).map(([k,v])=>`${k}: ${v}`).join(" • ")}</div>` : ""}
            </div>

            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-weight:900; color:var(--primary);">${money(pr)}</div>
              <input aria-label="Quantity" type="number" min="1" value="${it.qty||1}" data-qty="${idx}" style="width:92px;" />
              <button class="btn" data-remove="${idx}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const summary = `
      <div class="card pad">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
          <div>
            <div style="font-weight:900;">Subtotal</div>
            <div class="tiny">Quote items show as Included / Quote until we confirm your system and sizing.</div>
          </div>
          <div style="font-weight:900; font-size:20px;">${(subtotalMin===subtotalMax) ? money(subtotalMin) : (money(subtotalMin) + " - " + money(subtotalMax))}</div>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
          <a class="btn primary" href="schedule.html">Schedule to Confirm</a>
          <button class="btn secondary" id="clearCartBtn" type="button">Clear Cart</button>
        </div>
      </div>
    `;

    root.innerHTML = rows || `<div class="card pad"><div style="font-weight:900;">Your cart is empty.</div><div class="tiny" style="margin-top:6px;">Go to Self Check to build a bundle.</div><div style="margin-top:12px;"><a class="btn primary" href="start.html">Start Self Check</a></div></div>`;
    const summaryEl = document.getElementById("cartSummary");
    if (summaryEl) summaryEl.innerHTML = items.length ? summary : "";

    // bind
    root.querySelectorAll("[data-remove]").forEach(btn=>{
      btn.addEventListener("click", ()=>{ removeAt(parseInt(btn.getAttribute("data-remove"))); renderCart(); });
    });
    root.querySelectorAll("input[data-qty]").forEach(inp=>{
      inp.addEventListener("change", ()=>{
        const idx = parseInt(inp.getAttribute("data-qty"));
        const q = parseInt(inp.value || "1");
        setQty(idx, q);
        renderCart();
      });
    });
    const clearBtn = document.getElementById("clearCartBtn");
    if (clearBtn) clearBtn.addEventListener("click", ()=>{ clear(); renderCart(); });
  }

  // expose
  window.HWA_CART = {load, save, add, clear, count, renderCart, updateBadge};

  document.addEventListener("DOMContentLoaded", ()=>{
    updateBadge();
    renderCart();

    // bind add-to-cart buttons
    document.querySelectorAll("[data-add-to-cart]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const pid = btn.getAttribute("data-add-to-cart");
        if (!pid) return;
        add(pid, 1);
        btn.textContent = "Added";
        setTimeout(()=>{ btn.textContent = "Add to Cart"; }, 900);
      });
    });

    // bind add-bundle buttons (data-bundle)
    document.querySelectorAll("[data-add-bundle]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const issue = btn.getAttribute("data-add-bundle");
        const b = (window.HWA_BUNDLES||{})[issue];
        if (!b) return;
        (b.items||[]).forEach(pid=> add(pid, 1, {bundle: b.title}));
        btn.textContent = "Bundle Added";
        setTimeout(()=>{ btn.textContent = "Add Bundle to Cart"; }, 1100);
      });
    });
  });
})();