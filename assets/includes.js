
(function(){
  const path = (window.location.pathname || '').replace(/\\/g,'/');
  const inBlog = path.includes('/blog/');
  const BASE = inBlog ? '../' : '';

  const HEADER_URL = BASE + 'header.html';
  const FOOTER_URL = BASE + 'footer.html';

  const HEADER_FALLBACK = `<header class="siteHeader">
  <div class="container headerRow">
    <div class="brand">
      <a href="index.html" class="brandLink">
        <div class="logoBox"></div>
        <div>
          <div class="brandName">Healthy Water &amp; Air</div>
          <div class="brandTag">Better water and cleaner air</div>
        </div>
      </a>
    </div>

    <nav>
      <ul>
        <li><a href="index.html" data-nav="index">Home</a></li>
        <li><a href="index.html#water" data-nav="water">Water</a></li>
        <li><a href="index.html#air" data-nav="air">Air</a></li>
        <li><a href="blog/index.html" data-nav="blog">Blog</a></li>
        <li><a href="cart.html" data-nav="cart">Cart (<span data-cart-count>0</span>)</a></li>
        <li><a href="schedule.html" data-nav="schedule">Schedule</a></li>
      </ul>
    </nav>

    <div class="actions">
      <a class="btn primary" href="start.html">Start Self Check</a>
    </div>
  </div>
</header>
`;
  const FOOTER_FALLBACK = `<footer class="footer">
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
        <a class="btn primary" href="start.html">Start Self Check</a>
        <a class="btn secondary" href="schedule.html">Schedule</a>
      </div>
    </div>

    <div>
      <h4>Quick Links</h4>
      <a href="start.html">Self Check</a>
      <a href="index.html#water">Water quality</a>
      <a href="index.html#air">Air quality</a>
      <a href="blog/index.html">Blog</a>
      <a href="cart.html">Cart</a>
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

  function setHTML(selector, html) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = html.replaceAll('{BASE}', BASE);
  }

  function fetchText(url) {
    return fetch(url, {cache:'no-store'}).then(r=>{ if(!r.ok) throw new Error('bad'); return r.text(); });
  }

  function loadWithFallback(selector, url, fallback) {
    return fetchText(url).then(t=>{ setHTML(selector, t); return true; })
      .catch(()=>{ setHTML(selector, fallback); return false; });
  }

  Promise.all([
    loadWithFallback('#header-placeholder', HEADER_URL, HEADER_FALLBACK),
    loadWithFallback('#footer-placeholder', FOOTER_URL, FOOTER_FALLBACK),
  ]).then(()=>{
<<<<<<< HEAD
    // Page-load animations with stagger
    try{
      const items = document.querySelectorAll('.section-block, .card, .video-block, .video-module, .visual-lg, .edu-block, .media-card, .callout, .choice, .pillar-card, .hero, .hero-illus, .hero-illus-wrap img');
      items.forEach((el, i)=>{
        el.style.setProperty('--delay', `${Math.min(i * 60, 900)}ms`);
      });
      document.body.classList.add('page-loaded');
    }catch(_){}

=======
>>>>>>> 0cc71d0db7923aa57f0e856b294560be55804413
    // Load nav script once (header is injected dynamically)
    const ensureScript = (src) => new Promise((resolve) => {
      try {
        if (document.querySelector(`script[data-src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.defer = true;
        s.setAttribute('data-src', src);
        s.onload = () => resolve();
        s.onerror = () => resolve();
        document.head.appendChild(s);
      } catch (_) { resolve(); }
    });

    // year
    const y=document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // cart count
    if (window.HWA_CART && window.HWA_CART.updateCount) window.HWA_CART.updateCount();

    // footer posts (may be defined by app.js; retry a few times)
    let tries=0;
    const tick=()=>{
      tries++;
      if (window.HWA_RENDER_FOOTER_POSTS) {
        window.HWA_RENDER_FOOTER_POSTS();
      } else if (tries < 10) {
        setTimeout(tick, 80);
      }
    };
    tick();

    // Init mobile nav
    ensureScript(BASE + 'assets/nav.js').then(()=>{
      if (window.HWA_INIT_NAV) window.HWA_INIT_NAV();
    });

    // Card click routing for elements with data-href
    document.querySelectorAll('[data-href]').forEach(el=>{
      if (el.getAttribute('role') === null) el.setAttribute('role','link');
      el.addEventListener('click', (e)=>{
        if (e.target && e.target.closest && e.target.closest('a, button, input, select, textarea')) return;
        const href = el.getAttribute('data-href');
        if (href) window.location.href = href;
      });
      el.addEventListener('keydown', (e)=>{
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const href = el.getAttribute('data-href');
          if (href) window.location.href = href;
        }
      });
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    });

    // Scroll reveal for education blocks/cards
    try{
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        const targets = document.querySelectorAll('.card, .edu-block, .media-card, .pillar-card, .video, .visual-lg');
        targets.forEach(el=>el.classList.add('reveal'));
        const io = new IntersectionObserver((entries)=>{
          entries.forEach(entry=>{
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        targets.forEach(el=>io.observe(el));
      }
    }catch(_){}
  });
})();
