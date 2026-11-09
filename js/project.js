/* Detail page: project.html?id=<entry id> renders that entry's blocks */
(function () {
  "use strict";
  const S = window.SITE, P = S.profile;
  const { $, esc, icon, visibleEntries } = window.UI;
  const main = $("#main");
  const id = new URLSearchParams(location.search).get("id");
  const entry = S.entries.find((e) => e.id === id && !e.hidden);

  if (!entry) {
    document.title = `Not found | ${P.name}`;
    main.innerHTML = `<section class="notfound blueprint"><div><p class="label">404</p><h1>Page not found</h1><p>That project doesn't exist, or it has moved.</p><a class="btn btn-primary" href="index.html#projects">${icon("back")} All projects</a></div></section>`;
    return;
  }

  const section = (S.sections || []).find((s) => s.id === entry.section) || { title: "Projects", id: "projects" };
  document.title = `${entry.title} | ${P.name}`;
  const setMeta = (sel, attr, val) => { const m = document.querySelector(sel); if (m && val) m.setAttribute(attr, val); };
  setMeta('meta[name="description"]', "content", entry.summary.replace(/<[^>]+>/g, ""));
  setMeta('meta[property="og:title"]', "content", entry.title);
  setMeta('meta[property="og:description"]', "content", entry.summary.replace(/<[^>]+>/g, ""));

  let fig = 0;
  const figure = (src, caption, alt) => {
    fig += 1;
    return `<figure class="reveal"><img src="${esc(src)}" alt="${esc(alt || caption || "")}" data-caption="${esc(caption || "")}" data-zoom loading="lazy">${caption ? `<figcaption data-fig="${fig}">${esc(caption)}</figcaption>` : ""}</figure>`;
  };
  const paras = (body) => (Array.isArray(body) ? body : body ? [body] : []).map((p) => `<p>${p}</p>`).join("");
  let n = 0;
  const h2 = (t) => (t ? `<h2 data-n="${String(++n).padStart(2, "0")}">${esc(t)}</h2>` : "");
  let splitCount = 0;

  const docsBlock = (b, bi) => {
    const files = b.groups.flatMap((g) => g.files);
    if (!files.length) return "";
    const first = files[0];
    return `${h2(b.heading)}
      <div class="docs reveal" data-docs="${bi}">
        <div class="doc-list">
          ${b.groups.map((g) => `<div class="doc-group"><h3>${esc(g.title)}</h3>
            ${g.files.map((f) => `<button class="doc-btn" data-href="${esc(f.href)}" data-label="${esc(f.label)}" aria-current="${f === first}">${icon("file")}${esc(f.label)}</button>`).join("")}
          </div>`).join("")}
        </div>
        <div class="doc-view">
          <div class="doc-bar"><span class="doc-title">${esc(first.label)}</span><a class="doc-open" href="${esc(first.href)}" target="_blank" rel="noopener">Open / download ${icon("external")}</a></div>
          <div class="doc-frame"></div>
        </div>
      </div>`;
  };

  const render = {
    stats: (b) => `${h2(b.heading)}<div class="stats">${b.items.map((s) => `<div class="stat reveal"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("")}</div>`,
    text: (b) => `${h2(b.heading)}<div class="reveal">${paras(b.body)}</div>`,
    list: (b) => `${h2(b.heading)}${b.intro ? `<p>${b.intro}</p>` : ""}<ul class="points reveal">${b.items.map((i) => `<li>${i}</li>`).join("")}</ul>`,
    image: (b) => `${h2(b.heading)}${figure(b.src, b.caption, b.alt)}`,
    split: (b) => `<div class="split${splitCount++ % 2 ? " flip" : ""}">${figure(b.src, b.caption, b.alt)}<div class="reveal">${h2(b.heading)}${paras(b.body)}</div></div>`,
    gallery: (b) => `${h2(b.heading)}<div class="gallery">${b.images.map((im) => figure(im.src, im.caption, im.alt)).join("")}</div>`,
    table: (b) => `${h2(b.heading)}<div class="table-wrap reveal"><table><thead><tr>${b.columns.map((c) => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
    video: (b) => `${h2(b.heading)}<div class="video reveal">${b.youtube
      ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(b.youtube)}" title="${esc(b.caption || entry.title)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
      : `<video src="${esc(b.src)}" controls preload="metadata" ${b.poster ? `poster="${esc(b.poster)}"` : ""}></video>`}</div>${b.caption ? `<figcaption data-fig="${++fig}">${esc(b.caption)}</figcaption>` : ""}`,
    docs: docsBlock
  };

  const meta = [
    entry.date && `<span>${icon("calendar")} ${esc(entry.date)}</span>`,
    entry.role && `<span>${icon("user")} ${esc(entry.role)}</span>`,
    entry.location && `<span>${icon("pin")} ${esc(entry.location)}</span>`
  ].filter(Boolean).join("");

  const heroTitle = entry.company ? entry.company : entry.title;
  const heroSub = entry.company ? entry.title : entry.subtitle;

  const blocksHTML = (entry.blocks || []).map((b, i) => {
    const fn = render[b.type];
    return fn ? `<div class="block block-${b.type}">${fn(b, i)}</div>` : "";
  }).join("");

  // previous / next within the same section
  const siblings = visibleEntries(entry.section).filter((e) => !e.link);
  const k = siblings.indexOf(entry);
  const prev = siblings[k - 1], next = siblings[k + 1];

  main.innerHTML = `
    <section class="detail-hero blueprint${entry.cover ? "" : " no-cover"}">
      <div class="inner">
        <div>
          <a class="back" href="index.html#${esc(section.id)}">${icon("back")} ${esc(section.title)}</a>
          <h1>${esc(heroTitle)}</h1>
          ${heroSub ? `<p class="sub">${esc(heroSub)}</p>` : ""}
          <div class="detail-meta">${meta}</div>
          ${(entry.awards || []).map((a) => `<span class="award">${icon("award")} ${esc(a)}</span> `).join("")}
          ${entry.tags ? `<div class="tags">${entry.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
        </div>
        ${entry.cover ? `<div class="detail-cover carousel-frame"><span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span><img src="${esc(entry.cover)}" alt="${esc(entry.title)}" data-caption="${esc(entry.title)}" data-zoom fetchpriority="high"></div>` : ""}
      </div>
    </section>
    <article class="detail-body">
      ${blocksHTML || `<div class="block"><p>${entry.summary}</p></div>`}
    </article>
    ${prev || next ? `<nav class="pager" aria-label="More ${esc(section.title)}">
      ${prev ? `<a class="prev" href="project.html?id=${esc(prev.id)}"><small>← Previous</small><span>${esc(prev.company || prev.title)}</span></a>` : ""}
      ${next ? `<a class="next" href="project.html?id=${esc(next.id)}"><small>Next →</small><span>${esc(next.company || next.title)}</span></a>` : ""}
    </nav>` : ""}`;

  /* ---------- document viewer ---------- */
  const isPdf = (href) => /\.pdf($|[?#])/i.test(href);
  // Phones and tablets mostly can't show PDFs inline, so they get an "open" button instead
  const canInlinePdf = !!navigator.pdfViewerEnabled || (!/Mobi|Android|iPad|iPhone/i.test(navigator.userAgent) && navigator.pdfViewerEnabled !== false);
  const showDoc = (box, btn) => {
    const href = btn.dataset.href, label = btn.dataset.label;
    box.querySelectorAll(".doc-btn").forEach((b) => b.setAttribute("aria-current", String(b === btn)));
    $(".doc-title", box).textContent = label;
    $(".doc-open", box).href = href;
    const frame = $(".doc-frame", box);
    frame.style.display = "contents";
    if (isPdf(href) && canInlinePdf) {
      frame.innerHTML = `<iframe src="${esc(href)}#view=FitH" title="${esc(label)}" loading="lazy"></iframe>`;
    } else {
      frame.innerHTML = `<div class="doc-fallback"><div><p>${isPdf(href) ? "Tap below to view this document." : "This file type can't be previewed in the browser."}</p><p><a class="btn btn-primary" href="${esc(href)}" target="_blank" rel="noopener" ${isPdf(href) ? "" : "download"}>${icon(isPdf(href) ? "external" : "download")} ${isPdf(href) ? "Open" : "Download"} ${esc(label)}</a></p></div></div>`;
    }
  };
  document.querySelectorAll("[data-docs]").forEach((box) => {
    showDoc(box, box.querySelector(".doc-btn"));
    box.addEventListener("click", (ev) => { const b = ev.target.closest(".doc-btn"); if (b) showDoc(box, b); });
  });

  window.UI.observeReveal();
  window.UI.refreshNav();
  window.UI.makeZoomable();
})();
