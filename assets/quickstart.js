(function(){
  function $(sel, root){ return (root||document).querySelector(sel); }
  function $all(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  const ROUTES = {
    home: "home-guide.html",
    water: "water-guide.html",
    air: "air-guide.html",
    hvac: "hvac-guide.html"
  };

  function getSelectedPath(){
    const el = document.querySelector('#qs-choices a.is-selected');
    return el ? el.getAttribute('data-path') : 'home';
  }

  function setSelected(a){
    $all('#qs-choices a').forEach(x => x.classList.remove('is-selected'));
    a.classList.add('is-selected');
  }

  document.addEventListener('DOMContentLoaded', () => {
    $all('#qs-choices a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        setSelected(a);
      });
    });

    const startBtn = $('#qs-start');
    if (startBtn){
      startBtn.addEventListener('click', () => {
        const p = getSelectedPath();
        const url = ROUTES[p] || ROUTES.home;
        window.location.href = url;
      });
    }

    // default selection
    const first = $('#qs-choices a[data-path="home"]');
    if (first) setSelected(first);
  });
})();
