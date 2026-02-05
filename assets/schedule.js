(function(){
  const EMAIL = "healthywaterandair.business@gmail.com";

  function $(id){ return document.getElementById(id); }
  function safe(s){ return String(s || "").trim(); }

  function getCartSummary(){
    try{
      const items = (window.HWA_CART && typeof window.HWA_CART.load === "function") ? window.HWA_CART.load() : [];
      const prod = window.HWA_PRODUCTS || {};
      if (!items || !items.length) return { lines: [], totalCount: 0 };

      const lines = [];
      let totalCount = 0;

      items.forEach(it=>{
        const id = it && it.id;
        const qty = Number(it && it.qty || 0) || 0;
        if (!id || qty <= 0) return;

        totalCount += qty;

        const p = prod[id] || {};
        const name = p.name || id;

        let priceTxt = "";
        if (p.price && typeof p.price === "object"){
          const mn = Number(p.price.min || 0);
          const mx = Number(p.price.max || 0);
          if (mn && mx && mn !== mx) priceTxt = `$${mn.toLocaleString()} - $${mx.toLocaleString()}`;
          else if (mn || mx) priceTxt = `$${Number(mn||mx).toLocaleString()}`;
        } else if (typeof p.price === "number"){
          priceTxt = `$${Number(p.price).toLocaleString()}`;
        }

        lines.push(`- ${qty} x ${name}${priceTxt ? " ("+priceTxt+")" : ""}`);
      });

      return { lines, totalCount };
    }catch(e){
      return { lines: [], totalCount: 0 };
    }
  }

  function buildMailto(){
    const name = safe($("name") && $("name").value);
    const phone = safe($("phone") && $("phone").value);
    const zip = safe($("zip") && $("zip").value);
    const need = safe($("need") && $("need").value);
    const time = safe($("time") && $("time").value);
    const notes = safe($("notes") && $("notes").value);

    const missing = [];
    if (!name) missing.push("Name");
    if (!phone) missing.push("Phone");
    if (!zip) missing.push("Zip");

    const status = $("scheduleStatus");
    if (missing.length){
      if (status) status.textContent = "Required: " + missing.join(", ");
    } else {
      if (status) status.textContent = "";
    }

    const cart = getCartSummary();

    const subject = "Schedule a Free Water & Air Check";
    const bodyLines = [
      "Schedule Request",
      "",
      `Name: ${name || "-"}`,
      `Phone: ${phone || "-"}`,
      `Zip: ${zip || "-"}`,
      `Need: ${need || "-"}`,
      `Preferred time: ${time || "-"}`,
      notes ? "" : "",
      notes ? "Notes:" : "",
      notes ? notes : "",
    ].filter(Boolean);

    if (cart.lines.length){
      bodyLines.push("");
      bodyLines.push("Selections:");
      bodyLines.push(...cart.lines);
    }

    const href = `mailto:${encodeURIComponent(EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    const link = $("scheduleEmailLink");
    if (link) link.setAttribute("href", href);
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    // Update mailto link live
    ["name","phone","zip","need","time","notes"].forEach(id=>{
      const el = $(id);
      if (!el) return;
      el.addEventListener("input", buildMailto);
      el.addEventListener("change", buildMailto);
    });

    buildMailto();
  });
})();