(function(){
  "use strict";

  /* ---------- small helpers ---------- */
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $all = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- icons + gradients per category (for pieces with no thumbnail yet) ---------- */
  const CATEGORY_ICONS = {
    "3d": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M12 12l9-5M12 12v10M12 12L3 7"/></svg>',
    environment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 19l6-9 4 5 2-3 6 7H3z"/><circle cx="7" cy="7" r="2"/></svg>',
    character: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
    sketch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 20l3.5-1 11-11-2.5-2.5-11 11L4 20z"/><path d="M13.5 6.5L17 10"/></svg>',
    vehicle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 13l2-5a2 2 0 012-1h10a2 2 0 012 1l2 5"/><path d="M3 13h18v4H3z"/><circle cx="7.5" cy="17.5" r="1.6"/><circle cx="16.5" cy="17.5" r="1.6"/></svg>',
    "2d": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="4" width="18" height="14" rx="1.5"/><path d="M3 15l5-4 4 3 3-3 6 5"/></svg>',
    animation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="5" width="14" height="14" rx="1.5"/><path d="M17 9l4-2v10l-4-2"/></svg>'
  };

  const CATEGORY_GRADIENTS = {
    "3d": "linear-gradient(150deg,#101823,#16202c)",
    environment: "linear-gradient(150deg,#0e1620,#132030)",
    character: "linear-gradient(150deg,#111a26,#182534)",
    sketch: "linear-gradient(150deg,#10161f,#182029)",
    vehicle: "linear-gradient(150deg,#0f1620,#152230)",
    "2d": "linear-gradient(150deg,#101822,#172230)",
    animation: "linear-gradient(150deg,#0e151f,#141f2c)"
  };

  /* ---------- header shrink on scroll ---------- */
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  document.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  /* ---------- mobile nav ---------- */
  const navToggle = $("#navToggle");
  const mainNav = $(".main-nav");
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $all(".main-nav a").forEach(a => a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------- footer year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- hero background crossfade (curated colorful pieces only) ---------- */
  const featured = PROJECTS.filter(p => p.heroFeature && p.image);
  const heroImages = (featured.length ? featured : PROJECTS.filter(p => p.image).slice(0, 6))
    .map(p => p.large || p.image);

  const heroLayers = [
    {
      root: $("#heroLayerA"),
      bg: $("#heroLayerA .hero-layer-bg"),
      fg: $("#heroLayerA .hero-layer-fg")
    },
    {
      root: $("#heroLayerB"),
      bg: $("#heroLayerB .hero-layer-bg"),
      fg: $("#heroLayerB .hero-layer-fg")
    }
  ];
  let activeHero = 0;
  let heroIndex = 0;
  const preloadCache = new Set();

  function preloadImage(url){
    if(preloadCache.has(url)) return Promise.resolve();
    return new Promise(resolve => {
      const img = new Image();
      img.onload = img.onerror = () => { preloadCache.add(url); resolve(); };
      img.src = url;
    });
  }

  function showHeroImage(url){
    const next = heroLayers[1 - activeHero];
    const current = heroLayers[activeHero];
    next.bg.style.backgroundImage = `url("${url}")`;
    next.fg.src = url;
    next.root.classList.add("active");
    current.root.classList.remove("active");
    activeHero = 1 - activeHero;
  }

  if(heroImages.length){
    // show the first piece as soon as it's ready, then quietly preload the
    // rest so later transitions never stall waiting on a network fetch
    preloadImage(heroImages[0]).then(() => showHeroImage(heroImages[0]));
    heroImages.slice(1).forEach(preloadImage);

    if(heroImages.length > 1){
      setInterval(async () => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        const url = heroImages[heroIndex];
        await preloadImage(url);
        showHeroImage(url);
      }, 6000);
    }
  }

  /* ---------- build filter chips from categories actually present ---------- */
  const filtersEl = $("#filters");
  const usedCategories = Array.from(new Set(PROJECTS.map(p => p.category)));
  let activeFilter = "all";

  function renderFilters(){
    const chips = [{ key: "all", label: "All" }, ...usedCategories.map(c => ({ key:c, label: CATEGORY_LABELS[c] || c }))];
    filtersEl.innerHTML = chips.map(c =>
      `<button class="filter-chip${c.key === activeFilter ? " active" : ""}" data-filter="${c.key}" role="tab" aria-selected="${c.key === activeFilter}">${c.label}</button>`
    ).join("");
    $all(".filter-chip", filtersEl).forEach(btn => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter;
        renderFilters();
        applyFilter();
      });
    });
  }

  /* ---------- build gallery ---------- */
  const galleryEl = $("#gallery");

  function cardMediaHTML(p){
    if(p.image){
      return `<img src="${p.image}" alt="${p.title}" loading="lazy">`;
    }
    return `<div class="card-placeholder" style="background:${CATEGORY_GRADIENTS[p.category] || CATEGORY_GRADIENTS["3d"]}">${CATEGORY_ICONS[p.category] || CATEGORY_ICONS["3d"]}</div>`;
  }

  function renderGallery(){
    galleryEl.innerHTML = PROJECTS.map((p, i) => `
      <article class="card" data-category="${p.category}" data-index="${i}" tabindex="0" role="button" aria-label="Open ${p.title}">
        ${cardMediaHTML(p)}
        <div class="card-info">
          <span class="card-cat">${CATEGORY_LABELS[p.category] || p.category}</span>
          <span class="card-title">${p.title}</span>
        </div>
      </article>
    `).join("");

    $all(".card", galleryEl).forEach(card => {
      const open = () => openLightbox(Number(card.dataset.index));
      card.addEventListener("click", open);
      card.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); open(); } });
    });
  }

  function applyFilter(){
    const cards = $all(".card", galleryEl);
    let visible = 0;
    cards.forEach(card => {
      const show = activeFilter === "all" || card.dataset.category === activeFilter;
      card.classList.toggle("hidden", !show);
      if(show) visible++;
    });
    $("#visibleCount").textContent = visible;
  }

  /* ---------- lightbox ---------- */
  const lightbox = $("#lightbox");
  const lbMedia = $("#lightboxMedia");
  const lbTitle = $("#lightboxTitle");
  const lbCategory = $("#lightboxCategory");
  const lbLink = $("#lightboxLink");
  let currentIndex = 0;

  function openLightbox(index){
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function renderLightbox(){
    const p = PROJECTS[currentIndex];
    lbMedia.innerHTML = p.image
      ? `<img src="${p.large || p.image}" alt="${p.title}">`
      : `<div class="card-placeholder" style="background:${CATEGORY_GRADIENTS[p.category] || CATEGORY_GRADIENTS["3d"]}">${CATEGORY_ICONS[p.category] || CATEGORY_ICONS["3d"]}</div>`;
    lbTitle.textContent = p.title;
    lbCategory.textContent = CATEGORY_LABELS[p.category] || p.category;
    lbLink.href = p.url;
  }

  function step(dir){
    currentIndex = (currentIndex + dir + PROJECTS.length) % PROJECTS.length;
    renderLightbox();
  }

  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightboxPrev").addEventListener("click", () => step(-1));
  $("#lightboxNext").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if(!lightbox.classList.contains("open")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowLeft") step(-1);
    if(e.key === "ArrowRight") step(1);
  });

  /* ---------- init ---------- */
  renderFilters();
  renderGallery();
  applyFilter();
  $("#statCount").textContent = PROJECTS.length;

})();
