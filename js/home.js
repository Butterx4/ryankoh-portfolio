/* Home page: builds every section from data/site.js */
(function () {
  "use strict";
  const S = window.SITE, P = S.profile;
  const { $, $$, esc, icon, brand, visibleEntries, entryUrl } = window.UI;
  const main = $("#main");

  /* ---------- HERO ---------- */
  const photos = (S.heroPhotos || []).filter((p) => p && p.src);
  const heroHTML = `
  <section class="hero blueprint" id="top">
    <div class="hero-inner">
      <p class="hero-eyebrow">${esc(P.eyebrow)}</p>
      <h1>${esc(P.firstName)}<br><span class="accent">${esc(P.lastName)}</span></h1>
      <p class="dim" aria-hidden="true"><span>${esc(P.location.toUpperCase())}</span></p>
      <p class="hero-tagline">${esc(P.tagline)}</p>
      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary">View my work ${icon("arrow")}</a>
        <a href="${esc(P.resume)}" class="btn btn-ghost" target="_blank" rel="noopener">${icon("download")} Resume</a>
      </div>
    </div>
    ${photos.length ? `
    <div class="carousel-frame">
      <span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>
      <div class="carousel" aria-roledescription="carousel" aria-label="Photos">
        ${photos.map((p, i) => `<div class="slide${i === 0 ? " on" : ""}${p.scale ? " framed" : ""}" aria-hidden="${i !== 0}">
            ${p.scale
              ? `<img class="slide-fg" src="${esc(p.src)}" alt="${esc(p.alt || "")}" style="width:${Number(p.scale)}%" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>`
              : `<img src="${esc(p.src)}" alt="${esc(p.alt || "")}" style="${p.position ? `object-position:${esc(p.position)}` : ""}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>`}
          </div>`).join("")}
        ${photos.length > 1 ? `
        <div class="carousel-ui">
          <button class="carousel-btn" data-act="toggle" aria-label="Pause slideshow">${icon("pause")}</button>
          <span class="carousel-caption" aria-live="polite">${esc(photos[0].alt || "")}</span>
          <div class="dots">${photos.map((p, i) => `<button class="dot${i === 0 ? " on" : ""}" aria-label="Show photo ${i + 1}"></button>`).join("")}</div>
        </div>` : ""}
      </div>
    </div>` : ""}
    <a href="#about" class="scroll-cue">Scroll</a>
  </section>`;

  /* ---------- ABOUT ---------- */
  const aboutHTML = `
  <section id="about" class="about">
    <div class="wrap">
      <div class="about-grid">
        <div class="about-photo reveal"><img src="${esc(P.headshot)}" alt="Portrait of ${esc(P.name)}" loading="lazy"></div>
        <div>
          <p class="label reveal">About me</p>
          <h2 class="reveal">I'm <span class="rot-wrap"><span class="rot-word">${esc(P.rotatingWords[0])}</span></span></h2>
          ${P.about.map((t) => `<p class="reveal">${t}</p>`).join("")}
          ${P.now ? `<div class="now reveal"><span class="now-label">${esc(P.now.label)}</span><strong>${esc(P.now.title)}</strong><p>${P.now.body}</p></div>` : ""}
          ${P.facts && P.facts.length ? `<div class="facts reveal">${P.facts.map((f) => `<div class="fact"><b>${esc(f.value)}</b><span>${esc(f.label)}</span></div>`).join("")}</div>` : ""}
        </div>
      </div>
    </div>
  </section>`;

  /* ---------- cards ---------- */
  const awardsHTML = (e) => (e.awards || []).map((a) => `<span class="award">${icon("award")} ${esc(a)}</span>`).join("");
  const tagsHTML = (e, n = 4) => e.tags && e.tags.length ? `<div class="tags">${e.tags.slice(0, n).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : "";
  const ext = (e) => e.link ? ` target="_blank" rel="noopener"` : "";

  const card = (e, i) => `
    <a href="${esc(entryUrl(e))}" class="card reveal${e.featured ? " featured" : ""}" data-tags="${esc((e.tags || []).join("|"))}"${ext(e)}>
      ${e.cover ? `<div class="card-img"><span class="card-num">${String(i + 1).padStart(2, "0")}</span><img src="${esc(e.cover)}" alt="" loading="lazy" style="${e.coverPosition ? `object-position:${esc(e.coverPosition)}` : ""}"></div>` : ""}
      <div class="card-body">
        <p class="card-meta">${esc(e.date)}${e.role ? ` · ${esc(e.role)}` : ""}</p>
        <h3>${esc(e.title)}</h3>
        <p>${e.summary}</p>
        ${awardsHTML(e)}
        ${tagsHTML(e)}
        <span class="card-more">${e.link ? "Open" : "Read more"} ${icon(e.link ? "external" : "arrow")}</span>
      </div>
    </a>`;

  const xp = (e) => `
    <div class="xp reveal${e.current ? " current" : ""}">
      <a class="xp-card" href="${esc(entryUrl(e))}"${ext(e)}>
        <div>
          <div class="xp-company">${esc(e.company || e.title)}${e.current ? '<span class="badge-now">Current</span>' : ""}</div>
          <div class="xp-role">${esc(e.company ? e.title : e.subtitle || "")}</div>
        </div>
        <div><div class="xp-date">${esc(e.date)}</div>${e.location ? `<div class="xp-loc">${esc(e.location)}</div>` : ""}</div>
        <p>${e.summary}</p>
        ${awardsHTML(e)}
        ${tagsHTML(e, 5)}
        ${e.blocks && e.blocks.length ? `<span class="card-more">Details ${icon("arrow")}</span>` : ""}
      </a>
    </div>`;

  const paper = (e) => `
    <a class="paper reveal" href="${esc(entryUrl(e))}"${ext(e)}>
      <span class="paper-icon">${e.link && /\.pdf$/i.test(e.link) ? "PDF" : "DOC"}</span>
      <span><p class="card-meta">${esc(e.date)}</p><h3>${esc(e.title)}</h3><p>${e.summary || ""}</p></span>
      <span class="paper-arrow">${icon(e.link ? "external" : "arrow")}</span>
    </a>`;

  /* ---------- content sections ---------- */
  let alt = true; // About is white, so the first content section is tinted
  const sectionsHTML = (S.sections || []).map((sec) => {
    const items = visibleEntries(sec.id);
    if (!items.length) return "";
    const layout = sec.layout || (sec.id === "experience" ? "timeline" : sec.id === "research" ? "list" : "cards");
    let inner, chips = "";
    if (layout === "timeline") {
      inner = `<div class="timeline">${items.map(xp).join("")}</div>`;
    } else if (layout === "list") {
      inner = `<div class="papers">${items.map(paper).join("")}</div>`;
    } else {
      // Up to two `featured: true` entries get a wide row on top
      const featured = items.filter((e) => e.featured).slice(0, 2);
      const useFeatured = featured.length === 2 && items.length !== 3; // a lone card under the wide row looks odd
      const rest = useFeatured ? items.filter((e) => !featured.includes(e)) : items;
      inner = (useFeatured ? `<div class="featured-row">${featured.map((e, i) => card(e, i)).join("")}</div>` : "") +
        (rest.length ? `<div class="grid">${rest.map((e, i) => card(e, i + (useFeatured ? 2 : 0))).join("")}</div>` : "");
      // Filter chips appear automatically once a section has 6+ entries
      const tags = [...new Set(items.flatMap((e) => e.tags || []))];
      if (items.length >= 6 && tags.length > 1) {
        chips = `<div class="filters" role="group" aria-label="Filter ${esc(sec.title)}"><button class="chip" aria-pressed="true" data-tag="">All</button>${tags.slice(0, 8).map((t) => `<button class="chip" aria-pressed="false" data-tag="${esc(t)}">${esc(t)}</button>`).join("")}</div>`;
      }
    }
    alt = !alt;
    return `
    <section id="${esc(sec.id)}" class="${alt ? "" : "alt"}">
      <div class="wrap">
        <div class="sec-head">
          <div><p class="label reveal">${esc(sec.label || "")}</p><h2 class="sec-title reveal">${esc(sec.title)}</h2></div>
          ${chips}
        </div>
        ${inner}
      </div>
    </section>`;
  }).join("");

  /* ---------- skills ---------- */
  const skillsHTML = S.skills && S.skills.length ? `
  <section id="skills" class="blueprint">
    <div class="wrap">
      <p class="label reveal">Toolkit</p>
      <h2 class="sec-title reveal">Skills</h2>
      <div class="skills">${S.skills.map((g) => `<div class="skill-group reveal"><h3>${esc(g.group)}</h3><ul>${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>`).join("")}</div>
    </div>
  </section>` : "";

  /* ---------- contact ---------- */
  const heading = esc(P.contactHeading).replace("{word}", `<span class="rot-wrap"><span class="rot-word contact-word">${esc(P.contactWords[0])}</span></span>`);
  const contactHTML = `
  <section id="contact" class="contact contact-band">
    <div class="wrap">
      <p class="label reveal">Contact</p>
      <h2 class="reveal">${heading}</h2>
      <p class="reveal">${esc(P.contactBlurb)}</p>
      <div class="contact-actions reveal">
        <a class="btn btn-primary" href="mailto:${esc(P.email)}">${icon("mail")} ${esc(P.email)}</a>
        <a class="btn btn-ghost" href="${esc(P.resume)}" target="_blank" rel="noopener">${icon("download")} Resume</a>
        <a class="btn btn-ghost btn-icon" href="${esc(P.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${brand.linkedin}</a>
        ${P.github ? `<a class="btn btn-ghost btn-icon" href="${esc(P.github)}" target="_blank" rel="noopener" aria-label="GitHub">${brand.github}</a>` : ""}
      </div>
    </div>
  </section>`;

  main.innerHTML = heroHTML + aboutHTML + sectionsHTML + skillsHTML + contactHTML;

  /* ---------- behaviours ---------- */
  window.UI.observeReveal();
  window.UI.refreshNav();
  window.UI.rotate($(".about .rot-word"), P.rotatingWords);
  window.UI.rotate($(".contact-word"), P.contactWords, 2800);

  // filter chips
  $$(".filters").forEach((group) => group.addEventListener("click", (ev) => {
    const chip = ev.target.closest(".chip"); if (!chip) return;
    $$(".chip", group).forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    const tag = chip.dataset.tag;
    $$(".card", group.closest("section")).forEach((c) => { c.hidden = tag && !c.dataset.tags.split("|").includes(tag); });
  }));

  // highlight current section in nav
  const navLinks = $$(".nav-links a");
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.dataset.sec === en.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => so.observe(s));
  }

  /* ---------- hero carousel (wipe transition) ---------- */
  const slides = $$(".slide");
  if (slides.length > 1) {
    const dots = $$(".dot"), cap = $(".carousel-caption"), toggle = $('[data-act="toggle"]');
    let cur = 0, busy = false, timer = null;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const go = (n) => {
      n = (n + slides.length) % slides.length;
      if (busy || n === cur) return;
      busy = true;
      const prev = slides[cur], next = slides[n];
      next.classList.add("entering");
      const done = () => {
        next.classList.remove("entering"); next.classList.add("on"); next.setAttribute("aria-hidden", "false");
        prev.classList.remove("on"); prev.setAttribute("aria-hidden", "true");
        busy = false;
      };
      if (reduce) done(); else next.addEventListener("animationend", done, { once: true });
      cur = n;
      dots.forEach((d, i) => d.classList.toggle("on", i === n));
      cap.textContent = photos[n].alt || "";
    };
    const start = () => { stop(); timer = setInterval(() => go(cur + 1), 4200); toggle.innerHTML = icon("pause"); toggle.setAttribute("aria-label", "Pause slideshow"); };
    const stop = () => { clearInterval(timer); timer = null; toggle.innerHTML = icon("play"); toggle.setAttribute("aria-label", "Play slideshow"); };
    dots.forEach((d, i) => d.addEventListener("click", () => { go(i); if (timer) start(); }));
    toggle.addEventListener("click", () => (timer ? stop() : start()));
    // swipe on touch screens
    let x0 = null;
    const car = $(".carousel");
    car.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    car.addEventListener("touchend", (e) => {
      if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); if (timer) start(); }
    });
    document.addEventListener("visibilitychange", () => { if (document.hidden && timer) { clearInterval(timer); timer = "paused"; } else if (timer === "paused") start(); });
    if (!reduce) start(); else stop();
  }
})();
