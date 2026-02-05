
(function(){
  const path = (window.location.pathname || '').replace(/\\/g,'/');
  const inBlog = path.includes('/blog/');
  const BASE = inBlog ? '../' : '';

  const headerSlot = document.getElementById('siteHeader');
  const footerSlot = document.getElementById('siteFooter');

  const EMBED_HEADER = `<header class="siteHeader">
  <div class="container headerRow">
    <div class="brand">
      <a href="{{BASE}}index.html" class="brandLink">
        <div class="logoBox"></div>
        <div>
          <div class="brandName">Healthy Water &amp; Air</div>
          <div class="brandTag">Better water and cleaner air</div>
        </div>
      </a>
    </div>

    <nav>
      <ul>
        <li><a href="{{BASE}}index.html" data-nav="index">Home</a></li>
        <li><a href="{{BASE}}index.html#water" data-nav="water">Water</a></li>
        <li><a href="{{BASE}}index.html#air" data-nav="air">Air</a></li>
        <li><a href="{{BASE}}blog/index.html" data-nav="blog">Blog</a></li>
        <li><a href="{{BASE}}cart.html" data-nav="cart">Cart (<span data-cart-count>0</span>)</a></li>
        <li><a href="{{BASE}}schedule.html" data-nav="schedule">Schedule</a></li>
      </ul>
    </nav>

    <div class="actions">
      <a class="btn primary" href="{{BASE}}start.html">Start Self Check</a>
    </div>
  </div>
</header>
`;
  const EMBED_FOOTER = `<footer class="footer">
  <div class="container footerGrid">
    <div>
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="logo" aria-hidden="true">HWA</div>
        <div>
          <div style="font-weight:900; color:var(--text);">Healthy Water &amp; Air</div>
          <div class="tiny">Clean water and clean air for Utah homes</div>
        </div>
      </div>

      <div class="tiny" style="margin-top:12px; line-height:1.7;">
        Phone: <a href="tel:18016091551">801-609-1551</a><br/>
        Service area: Utah homes
      </div>

      <div style="margin-top:12px;">
        <div style="font-weight:900; margin-bottom:6px;">We service</div>
        <div class="tiny">
          Salt Lake County - Utah County - Davis County - Weber County - Summit County - Tooele County - Wasatch County - Sevier County
        </div>
      </div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <a class="btn primary" href="{{BASE}}start.html">Start Self Check</a>
        <a class="btn secondary" href="{{BASE}}schedule.html">Schedule</a>
      </div>
    </div>

    <div>
      <h4>Quick Links</h4>
      <a href="{{BASE}}start.html">Self Check</a>
      <a href="{{BASE}}index.html#water">Water quality</a>
      <a href="{{BASE}}index.html#air">Air quality</a>
      <a href="{{BASE}}blog/index.html">Blog</a>
      <a href="{{BASE}}cart.html">Cart</a>
    </div>

    <div>
      <h4>Latest posts</h4>
      <div data-footer-posts class="miniPosts"></div>
    </div>
  </div>

  <div class="container" style="margin-top:18px;">
    <div class="tiny">© <span id="year"></span> Healthy Water &amp; Air. All rights reserved.</div>
  </div>
</footer>
`;

  async function loadPartial(url, fallback) {
    try {
      // fetch works when served over http(s); fails on file:// in many browsers
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("bad status");
      return await res.text();
    } catch (e) {
      return fallback;
    }
  }

  Promise.all([
    loadPartial(`${BASE}assets/partials/header.html`, EMBED_HEADER),
    loadPartial(`${BASE}assets/partials/footer.html`, EMBED_FOOTER),
  ]).then(([h,f])=>{
    if (headerSlot) headerSlot.innerHTML = h.replaceAll('{BASE}', BASE);
    if (footerSlot) footerSlot.innerHTML = f.replaceAll('{BASE}', BASE);

    // Active nav
    document.querySelectorAll('a[data-nav]').forEach(a=>a.classList.remove('active'));
    if (path.includes('/blog/')) {
      const el=document.querySelector('a[data-nav="blog"]'); if (el) el.classList.add('active');
    } else {
      const end = path.split('/').pop();
      if (end === '' || end === 'index.html') {
        const el=document.querySelector('a[data-nav="index"]'); if (el) el.classList.add('active');
      }
    }

    // Cart count + year
    if (window.HWA_CART && window.HWA_CART.updateCount) window.HWA_CART.updateCount();
    const year=document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
