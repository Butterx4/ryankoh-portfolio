/* Shared code for every page: nav, footer, icons, reveal, lightbox. */
(function () {
  "use strict";
  const S = window.SITE;
  const P = S.profile;
  document.documentElement.classList.remove("no-js");

  /* ---------- tiny helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    left: '<path d="M15 18l-6-6 6-6"/>',
    right: '<path d="M9 18l6-6-6-6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    external: '<path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    pin: '<path d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    play: '<path d="M7 4l13 8-13 8z"/>'
  };
  const brand = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.7a1.8 1.8 0 1 1 0-3.5 1.8 1.8 0 0 1 0 3.5zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"/></svg>'
  };

  const visibleEntries = (section) => S.entries.filter((e) => !e.hidden && (!section || e.section === section));
  const entryUrl = (e) => e.link || `project.html?id=${encodeURIComponent(e.id)}`;

  window.UI = { $, $$, esc, icon, brand, visibleEntries, entryUrl };

  /* ---------- NAV ---------- */
  const isHome = document.body.dataset.page === "home";
  const homeHref = isHome ? "" : "index.html";
  // Nav: About, then each non-empty section (its `nav` name, or first word of its title), then Contact
  const navItems = [{ id: "about", title: "About" }]
    .concat((S.sections || []).filter((s) => visibleEntries(s.id).length).map((s) => ({ id: s.id, title: s.nav || s.title.split(/[ &]/)[0] })))
    .concat([{ id: "contact", title: "Contact" }]);
  const shortName = {};

  const navHost = $("#nav");
  if (navHost) {
    navHost.innerHTML = `
      <a href="${homeHref || "#top"}" class="logo" aria-label="${esc(P.name)}, home">
        <span class="logo-mark">${esc(P.firstName[0] + P.lastName[0])}</span><span>${esc(P.name)}</span>
      </a>
      <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
      <ul class="nav-links" id="nav-links">
        ${navItems.map((n) => `<li><a href="${homeHref}#${n.id}" data-sec="${n.id}">${esc(shortName[n.id] || n.title)}</a></li>`).join("")}
      </ul>`;
    const burger = $(".hamburger", navHost);
    const links = $(".nav-links", navHost);
    const setMenu = (open) => {
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      links.classList.toggle("open", open);
      navHost.classList.toggle("menu-open", open);
    };
    burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
    $$("a", links).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") setMenu(false); });
  }

  /* ---------- FOOTER ---------- */
  const footHost = $("#footer");
  if (footHost) {
    footHost.innerHTML = `
      <span>&copy; ${new Date().getFullYear()} ${esc(P.name)} · Designed &amp; built by hand in HTML, CSS &amp; JS</span>
      <span class="footer-links">
        <a href="mailto:${esc(P.email)}">Email</a>
        <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        ${P.github ? `<a href="${esc(P.github)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        <a href="${esc(P.resume)}" target="_blank" rel="noopener">Resume</a>
      </span>`;
  }

  /* ---------- scroll: nav state + progress bar ---------- */
  const bar = document.createElement("div");
  bar.className = "progress";
  document.body.prepend(bar);
  const onScroll = () => {
    const hero = $(".hero, .detail-hero, .notfound"); // looked up each time: pages render it after this script
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    if (navHost) {
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      navHost.classList.toggle("solid", heroBottom <= navHost.offsetHeight + 4);
    }
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();
  window.UI.refreshNav = onScroll;

  /* ---------- reveal on scroll ---------- */
  window.UI.observeReveal = function () {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("visible")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal:not(.visible)").forEach((el) => io.observe(el));
  };

  /* ---------- rotating words ---------- */
  window.UI.rotate = function (el, words, interval = 2600) {
    if (!el || !words || words.length < 2) return;
    const wrap = el.closest(".rot-wrap");
    // lock width to the widest word so text around it doesn't jump
    const lock = () => {
      if (!wrap) return;
      const cur = el.textContent;
      const widths = words.map((w) => { el.textContent = w; return el.getBoundingClientRect().width; });
      el.textContent = cur;
      wrap.style.width = Math.ceil(Math.max(...widths)) + 4 + "px";
    };
    lock();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(lock); // re-measure once web fonts load
    if (wrap) { wrap.style.textAlign = el.closest(".contact") ? "center" : "left"; }
    let i = 0; el.textContent = words[0];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInterval(() => {
      el.style.transform = "translateY(-110%)"; el.style.opacity = "0";
      setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.style.transition = "none"; el.style.transform = "translateY(110%)";
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.transition = ""; el.style.transform = "none"; el.style.opacity = "1";
        }));
      }, 450);
    }, interval);
  };

  /* ---------- lightbox (any img with data-zoom) ---------- */
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Image viewer");
  lb.innerHTML = `<img alt=""><p></p>
    <button class="lb-btn lb-close" aria-label="Close">${icon("close")}</button>
    <button class="lb-btn lb-prev" aria-label="Previous image">${icon("left")}</button>
    <button class="lb-btn lb-next" aria-label="Next image">${icon("right")}</button>`;
  document.body.appendChild(lb);
  let group = [], idx = 0, lastFocus = null;
  const show = () => {
    const img = group[idx];
    $("img", lb).src = img.currentSrc || img.src;
    $("img", lb).alt = img.alt;
    $("p", lb).textContent = img.dataset.caption || img.alt || "";
    const multi = group.length > 1;
    $(".lb-prev", lb).hidden = !multi; $(".lb-next", lb).hidden = !multi;
  };
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
  document.addEventListener("click", (ev) => {
    const img = ev.target.closest("img[data-zoom]");
    if (!img) return;
    group = $$("img[data-zoom]"); idx = group.indexOf(img); lastFocus = img;
    show(); lb.classList.add("open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus();
  });
  lb.addEventListener("click", (ev) => { if (ev.target === lb) close(); });
  $(".lb-close", lb).addEventListener("click", close);
  $(".lb-prev", lb).addEventListener("click", () => { idx = (idx - 1 + group.length) % group.length; show(); });
  $(".lb-next", lb).addEventListener("click", () => { idx = (idx + 1) % group.length; show(); });
  document.addEventListener("keydown", (ev) => {
    if (!lb.classList.contains("open")) return;
    if (ev.key === "Escape") close();
    if (ev.key === "ArrowLeft") $(".lb-prev", lb).click();
    if (ev.key === "ArrowRight") $(".lb-next", lb).click();
  });
  // make zoomable images keyboard-accessible
  window.UI.makeZoomable = () => $$("img[data-zoom]").forEach((img) => {
    img.tabIndex = 0; img.setAttribute("role", "button");
    img.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); img.click(); } });
  });
})();
