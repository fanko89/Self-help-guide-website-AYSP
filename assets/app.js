(function(){
  function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

  // Active nav (best-effort)
  const path = (location.pathname || "").toLowerCase();
  $all('nav a[data-nav]').forEach(a=>{
    const key = a.getAttribute('data-nav');
    if (!key) return;
    if (key === 'index' && (path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('index.html'))) a.classList.add('active');
    if (path.includes('/blog/')) {
      if (key === 'blog') a.classList.add('active');
      return;
    }
    if (path.endsWith('/'+key) || path.endsWith('/'+key+'.html')) a.classList.add('active');
    if (key === 'cart' && (path.endsWith('/cart') || path.endsWith('/cart.html') || path.includes('cart.html'))) a.classList.add('active');
  });

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Render recent blogs in footer
  const el = document.getElementById('recentBlogs');
  if (el && window.HWA_BLOGS){
    const items = window.HWA_BLOGS.slice(0,3);
    el.innerHTML = items.map(b=>`
      <a class="blogThumb" href="${b.url}">
        <img src="${b.thumb}" alt="${b.title}">
        <div class="meta">
          <div class="kicker">${b.kicker}</div>
          <div class="title">${b.title}</div>
        </div>
      </a>
    `).join('');
  }

  // Results pages: show block based on ?issue=
  const blocks = $all('[data-issue]');
  if (blocks.length){
    const u = new URL(window.location.href);
    const issue = u.searchParams.get('issue') || '';
    if (issue){
      blocks.forEach(b=>{
        const ok = (b.getAttribute('data-issue') || '').split(',').map(s=>s.trim()).includes(issue);
        b.style.display = ok ? '' : 'none';
      });
    }
    const summary = document.getElementById('resultSummary');
    if (summary){
      const map = {
        water_bad_taste: 'Water - bad taste or smell',
        water_hard: 'Water - hard water and scale',
        water_skin: 'Water - dry skin and hair',
        water_stains: 'Water - staining/rust concerns',
        water_contaminants: 'Water - concern about contaminants',
        air_dust: 'Air - dust builds up fast',
        air_allergies: 'Air - allergies or sneezing indoors',
        air_dry: 'Air - dry air and static',
        air_odors: 'Air - odors or smoke',
        air_pets: 'Air - pet dander',
      };
      summary.textContent = map[issue] || 'Personalized recommendation';
    }
  }

  // Step pages: buttons go to next page with issue param
  $all('[data-go-results]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const issue = btn.getAttribute('data-issue') || '';
      const href = btn.getAttribute('data-href') || '';
      if (!href) return;
      const url = new URL(href, window.location.origin);
      if (issue) url.searchParams.set('issue', issue);
      window.location.href = url.pathname + url.search;
    });
  });
})();




window.HWA_RENDER_FOOTER_POSTS = function(){
  const posts = (window.HWA_BLOG_POSTS || []).slice()
    .sort((a,b)=> (a.date<b.date?1:-1))
    .slice(0,3);
  const slot = document.querySelector('[data-footer-posts]');
  if (!slot) return;
  if (!posts.length) { slot.innerHTML = ''; return; }

  slot.innerHTML = posts.map(p => `
    <a class="miniPost" href="${p.link}">
      <div class="thumb">
        <img src="${p.thumb}" alt="" loading="lazy" />
      </div>
      <div>
        <div class="kicker">${p.category}</div>
        <div class="t">${p.title}</div>
        <div class="tiny">${p.excerpt}</div>
      </div>
    </a>
  `).join('');
};

(function(){ window.HWA_RENDER_FOOTER_POSTS(); })();
