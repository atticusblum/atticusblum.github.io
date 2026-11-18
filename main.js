/*
  Builds the whole page from window.CONTENT (content.js).
  You should not need to edit this file to change text, links or images.
*/
(function () {
  "use strict";
  var C = window.CONTENT || {};
  var motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (motion) document.documentElement.classList.add("js-motion");
  var ALL = ["about", "projects", "academics", "personal", "future", "contact"];
  var ORDER = Array.isArray(C.order) && C.order.length ? C.order : ALL;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function list(a) { return Array.isArray(a) ? a.filter(function (x) { return x != null && x !== ""; }) : []; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function num(i) { return (i < 9 ? "0" : "") + (i + 1); }
  function mailto() { return "mailto:" + (C.links && C.links.email || ""); }
  function img(src, alt, focus, cls, extra) {
    return '<img class="' + cls + '" src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async"' +
      ' style="object-position:' + esc(focus || "50% 50%") + '"' + (extra || "") + ">";
  }

  var ICON = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.25H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.6h-4v-4.96c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21H9.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>',
    open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
  };

  /* ---------- which sections have content ---------- */
  // A gallery card (project or photo collection): optional cover image, plus gallery images.
  // gallery entries can be "path" or { image, title }. A card with no images at all is hidden.
  function shotsOf(p) {
    var g = list(p.gallery).map(function (o) { return typeof o === "string" ? { image: o } : o; });
    return (p.image ? [{ image: p.image, title: p.firstTitle }] : []).concat(g);
  }
  function usable(arr) { return list(arr).filter(function (p) { return shotsOf(p).length; }); }
  var has = {
    about: function (s) { return list(s.paragraphs).length || list(s.leadership).length; },
    academics: function (s) { return s.school || list(s.coursework).length || list(s.honors).length; },
    projects: function (s) { return usable(s.items).length; },
    personal: function (s) { return usable(s.items).length; },
    future: function (s) { return list(s.paragraphs).length; },
    contact: function () { return C.links && (C.links.email || C.links.linkedin); },
  };
  var sections = ORDER.filter(function (id) { return C[id] && has[id] && has[id](C[id]); });
  function label(id) { return C[id].nav || C[id].heading || id; }

  /* ---------- head ---------- */
  if (C.site) {
    if (C.site.title) document.title = C.site.title;
    var md = $('meta[name="description"]');
    if (md && C.site.description) md.setAttribute("content", C.site.description);
  }

  /* ---------- top bar + phone menu ---------- */
  var navLinks = sections.map(function (id, i) {
    return '<a href="#' + id + '" data-go="' + id + '"><span>' + num(i) + "</span>" + esc(label(id)) + "</a>";
  }).join("");
  $("#bar").innerHTML =
    '<a class="mono" href="#top" aria-label="Back to top">' + esc(C.monogram || "") + "</a>" +
    '<nav class="nav" aria-label="Sections">' + navLinks + '<span class="nav__pill" aria-hidden="true"></span></nav>' +
    (sections.length ? '<button class="menu-btn" type="button" aria-haspopup="dialog">Menu</button>' : "");
  var menu = $("#menu");
  menu.innerHTML =
    '<button class="icon-btn close" type="button" aria-label="Close menu">' + ICON.close + "</button>" +
    "<ol>" + sections.map(function (id, i) {
      return '<li><a href="#' + id + '" data-go="' + id + '"><span>' + num(i) + "</span> " + esc(label(id)) + "</a></li>";
    }).join("") + "</ol>";

  /* ---------- hero ---------- */
  var L = C.links || {};
  var H = C.hero || {};
  function contactButtons(style) {
    var b = [];
    if (L.linkedin) b.push('<a class="btn ' + style + '" href="' + esc(L.linkedin) + '" target="_blank" rel="noopener">' + ICON.linkedin + "LinkedIn</a>");
    if (L.email) b.push('<a class="btn ' + style + '" href="' + esc(mailto()) + '">' + ICON.mail + "Email</a>");
    if (L.resume) b.push('<button class="btn ' + style + '" type="button" data-resume>' + ICON.file + "Resume</button>");
    return b.length ? '<div class="actions">' + b.join("") + "</div>" : "";
  }
  var arrows = list(C.heroLinks).filter(function (a) { return sections.indexOf(a.to) > -1; }).map(function (a) {
    return '<a class="arrow" href="#' + esc(a.to) + '" data-go="' + esc(a.to) + '">' + esc(a.label) + " <b>&rarr;</b> <em>" + esc(label(a.to)) + "</em></a>";
  }).join("");
  var heroImg = H.image ?
    "<picture>" + (H.webp ? '<source srcset="' + esc(H.webp) + '" type="image/webp">' : "") +
    '<img class="hero__img" src="' + esc(H.image) + '" alt="' + esc(H.alt || "") + '" fetchpriority="high" decoding="async" style="object-position:' + esc(H.focus || "50% 50%") + '">' +
    "</picture>" : "";

  var html = '<section class="hero" id="top">' + heroImg + '<div class="hero__shade"></div>' +
    '<div class="hero__text">' +
    (L.linkedin && H.qr !== false ? '<a class="hero__qr glass" href="' + esc(L.linkedin) + '" target="_blank" rel="noopener" aria-label="Open my LinkedIn"><div id="qr-hero" class="qrbox"></div><span>' + esc(H.qrLabel || "LinkedIn") + "</span></a>" : "") +
    "<h1>" + esc(C.name) + "</h1>" +
    (C.tagline ? '<p class="tagline">' + esc(C.tagline) + "</p>" : "") +
    (C.intro ? '<p class="intro">' + esc(C.intro) + "</p>" : "") +
    contactButtons("glass") +
    (arrows ? '<div class="arrows">' + arrows + "</div>" : "") +
    "</div>" +
    (sections.length ? '<a class="hero__cue" href="#' + sections[0] + '" data-go="' + sections[0] + '" aria-label="Scroll down"><span>Scroll</span><i></i></a>' : "") +
    "</section>";

  /* ---------- sections ---------- */
  function head(id, i, bare) {
    return '<div class="head' + (bare ? "" : " glass") + '"><span class="kicker">' + num(i) + "</span><h2>" + esc(C[id].heading || label(id)) + "</h2></div>";
  }
  function paras(a) { return list(a).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""); }

  function galleryGrid(id, all, unit) {
    all = list(all);
    var cards = all.map(function (p, n) {
      var shots = shotsOf(p);
      if (!shots.length) return "";
      var out = !!(p.linkOnly && p.link);
      var tag = out ? '<span class="card__count">Live site &#8599;</span>' : (shots.length > 1 ? '<span class="card__count">' + shots.length + " " + unit + "</span>" : "");
      var inner = img(shots[0].image, p.title, p.focus, "card__img") +
        '<div class="card__body"><div class="card__title">' + esc(p.title) + tag + "</div>" +
        (p.description ? '<p class="card__desc">' + esc(p.description) + "</p>" : "") + "</div>";
      return out
        ? '<a class="card glass tilt" data-cursor="Open" href="' + esc(p.link) + '" target="_blank" rel="noopener" aria-label="Open ' + esc(p.title) + ' (new tab)">' + inner + "</a>"
        : '<button class="card glass tilt" data-cursor="View" type="button" data-gallery="' + id + ":" + n + '" aria-label="View ' + esc(p.title) + '">' + inner + "</button>";
    }).join("");
    return '<div class="grid grid--featured">' + cards + "</div>";
  }
  var render = {
    about: function (s, i) {
      var lead = list(s.leadership), pt = s.portrait || {}, st = list(s.stats);
      var text = '<div class="panel glass">' + head("about", i, true) + '<div class="lead">' + paras(s.paragraphs) + "</div>" +
        (st.length ? '<div class="stats">' + st.map(function (x) {
          return '<div class="stat"><b><span data-count="' + esc(x.value) + '" data-suffix="' + esc(x.suffix || "") + '">' + esc(x.value) + esc(x.suffix || "") + "</span></b><small>" + esc(x.label) + "</small></div>";
        }).join("") + "</div>" : "") +
        (lead.length ? '<h3 class="sub-head">' + esc(s.leadershipHeading || "Leadership") + '</h3><ul class="list">' + lead.map(function (r, n) {
          var title = "<div><strong>" + esc(r.role) + "</strong>" + (r.org ? ", " + esc(r.org) : "") + "</div>";
          var years = '<div class="meta">' + esc(r.years) + "</div>";
          if (!r.line) return '<li class="job"><div class="job__head">' + title + years + "</div></li>";
          // Click a position to open the one-line description under it.
          return '<li class="job"><button type="button" class="job__head" aria-expanded="false" aria-controls="job-' + n + '">' + title + years +
            '<span class="job__chev" aria-hidden="true"></span></button>' +
            '<div class="job__body" id="job-' + n + '"><div><p class="sub">' + esc(r.line) + "</p></div></div></li>";
        }).join("") + "</ul>" : "") + "</div>";
      if (!pt.image) return text;
      return '<div class="about"><div class="portrait glass">' + img(pt.image, pt.alt || C.name, pt.focus, "") + "</div>" + text + "</div>";
    },
    academics: function (s, i) {
      var cw = list(s.coursework), hn = list(s.honors);
      function chips(a) { return '<ul class="chips">' + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
      return head("academics", i) + '<div class="edu">' +
        (s.school ? '<div class="panel glass"><div class="school">' + esc(s.school) + "</div>" +
          [s.college, s.degree, s.focus].concat(list(s.more)).filter(Boolean).map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") +
          (s.year ? '<p class="year">' + esc(s.year) + "</p>" : "") + "</div>" : "") +
        ((cw.length || hn.length) ? '<div class="panel glass">' + (cw.length ? "<h3>" + esc(s.courseworkHeading || "Coursework") + "</h3>" + chips(cw) : "") +
        (hn.length ? "<h3>" + esc(s.honorsHeading || "Honors") + "</h3>" + chips(hn) : "") + "</div>" : "") + "</div>";
    },
    projects: function (s, i) { return head("projects", i) + galleryGrid("projects", s.items, "images"); },
    personal: function (s, i) {
      return '<div class="head glass"><span class="kicker">' + num(i) + "</span><h2>" + esc(s.heading || label("personal")) + "</h2>" +
        (s.intro ? '<p style="margin:.5rem 0 0;color:var(--muted)">' + esc(s.intro) + "</p>" : "") + "</div>" +
        galleryGrid("personal", s.items, "photos");
    },
    future: function (s, i) { return '<div class="panel glass" style="max-width:760px">' + head("future", i, true) + '<div class="lead">' + paras(s.paragraphs) + "</div></div>"; },
    contact: function (s, i) {
      return '<div class="panel glass">' + head("contact", i, true) + '<div class="contact"><div>' + (s.line ? '<p class="lead">' + esc(s.line) + "</p>" : "") +
        (L.email ? '<a class="email" href="' + esc(mailto()) + '">' + esc(L.email) + "</a>" : "") +
        contactButtons("glass") + "</div>" +
        (L.linkedin ? '<div class="qr"><div id="qr"></div><p>' + esc(s.qrLabel || "LinkedIn") + "</p></div>" : "") + "</div></div>";
    },
  };

  sections.forEach(function (id, i) {
    var bg = C[id].background || {};
    html += '<section class="section' + (bg.image ? "" : " section--plain") + '" id="' + id + '" data-num="' + num(i) + '">' +
      '<div class="section__bg" aria-hidden="true">' + (bg.image ? img(bg.image, "", bg.focus, "").replace('loading="lazy"', 'loading="eager"') : "") + "</div>" +
      '<div class="wrap reveal">' + render[id](C[id], i) + "</div></section>";
  });
  $("#main").innerHTML = html;
  $("#footer").innerHTML = esc(C.footer || "");

  /* ---------- LinkedIn QR (always made from links.linkedin) ---------- */
  // Both QR codes are made from links.linkedin, so changing the link changes the codes.
  if (window.qrcode && L.linkedin) {
    var q = window.qrcode(0, "M");
    q.addData(L.linkedin);
    q.make();
    var svg = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true, alt: "QR code for LinkedIn" });
    ["qr", "qr-hero"].forEach(function (id) { var box = document.getElementById(id); if (box) box.innerHTML = svg; });
  }

  /* ---------- solid bar after the hero ---------- */
  var bar = $("#bar"), hero = $(".hero");
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      bar.classList.toggle("is-solid", !e[0].isIntersecting);
    }, { rootMargin: "-72px 0px 0px 0px" }).observe(hero);
  }

  /* ---------- section links (nav, menu, arrows) ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-go]");
    if (!a) return;
    var t = document.getElementById(a.getAttribute("data-go"));
    if (!t) return;
    e.preventDefault();
    if (menu.open) menu.close();
    t.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    history.replaceState(null, "", "#" + t.id);
  });
  var menuBtn = $(".menu-btn");
  if (menuBtn) menuBtn.addEventListener("click", function () { menu.showModal(); });
  $(".close", menu).addEventListener("click", function () { menu.close(); });

  /* ---------- resume dialog ---------- */
  var resume = $("#resume");
  if (L.resume) {
    resume.innerHTML =
      '<div class="modal__top"><div class="modal__title">Resume</div>' +
      '<button class="icon-btn" type="button" data-close aria-label="Close">' + ICON.close + "</button></div>" +
      '<div class="resume__frame">' +
      (L.resumePreview ? '<img class="resume__img" src="' + esc(L.resumePreview) + '" alt="Resume preview" loading="lazy">' : "") +
      '<iframe title="Resume preview"></iframe></div>' +
      '<div class="resume__actions">' +
      '<a class="btn btn--solid" href="' + esc(L.resume) + '" download>' + ICON.download + "Download PDF</a>" +
      '<a class="btn glass" href="' + esc(L.resume) + '" target="_blank" rel="noopener">' + ICON.open + "Open full screen</a></div>";
    document.addEventListener("click", function (e) {
      if (!e.target.closest("[data-resume]")) return;
      // Big screens show the real PDF; phones show the preview picture.
      var f = $("iframe", resume);
      var big = matchMedia("(min-width: 981px)").matches || !L.resumePreview;
      resume.classList.toggle("is-pdf", big);
      if (big && !f.getAttribute("src")) f.setAttribute("src", L.resume + "#view=FitH");
      resume.showModal();
    });
  }

  /* ---------- image viewer (projects and personal photos) ---------- */
  var viewer = $("#viewer"), shots = [], at = 0;
  viewer.innerHTML =
    '<div class="modal__top"><div class="modal__title"></div>' +
    '<button class="icon-btn" type="button" data-close aria-label="Close">' + ICON.close + "</button></div>" +
    '<div class="viewer__stage"><img class="viewer__img" alt="">' +
    '<button class="icon-btn viewer__nav viewer__nav--prev" type="button" aria-label="Previous image">' + ICON.prev + "</button>" +
    '<button class="icon-btn viewer__nav viewer__nav--next" type="button" aria-label="Next image">' + ICON.next + "</button></div>" +
    '<div class="viewer__foot"><p class="viewer__desc"></p><span class="viewer__count"></span></div>';

  function show(i) {
    if (!shots.length) return;
    at = (i + shots.length) % shots.length;
    var s = shots[at], many = shots.length > 1;
    var im = $(".viewer__img", viewer);
    // fade the old picture out, swap, fade the new one in
    if (viewer.open) { im.classList.add("is-swap"); }
    var swap = function () { im.src = s.src; im.alt = s.title || ""; };
    if (viewer.open) { setTimeout(function () { swap(); im.onload = function () { im.classList.remove("is-swap"); }; if (im.complete) im.classList.remove("is-swap"); }, 160); } else { swap(); }
    $(".modal__title", viewer).textContent = s.title || "";
    $(".viewer__desc", viewer).innerHTML = esc(s.desc || "") +
      (s.link ? ' <a class="btn glass" style="margin-left:.5rem" href="' + esc(s.link) + '" target="_blank" rel="noopener">' + ICON.open + "Visit</a>" : "");
    $(".viewer__count", viewer).textContent = many ? (at + 1) + " / " + shots.length : "";
    $(".viewer__nav--prev", viewer).hidden = !many;
    $(".viewer__nav--next", viewer).hidden = !many;
  }
  function openViewer(list_, i) { shots = list_; show(i); if (!viewer.open) viewer.showModal(); }

  document.addEventListener("click", function (e) {
    var gl = e.target.closest("[data-gallery]");
    if (gl) {
      var key = gl.getAttribute("data-gallery").split(":");
      var pr = list(C[key[0]].items)[+key[1]];
      openViewer(shotsOf(pr).map(function (o) {
        return { src: o.image, title: o.title ? pr.title + ": " + o.title : pr.title, desc: pr.description, link: pr.link };
      }), 0);
    }
  });
  $(".viewer__nav--prev", viewer).addEventListener("click", function () { show(at - 1); });
  $(".viewer__nav--next", viewer).addEventListener("click", function () { show(at + 1); });
  viewer.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(at - 1);
    if (e.key === "ArrowRight") show(at + 1);
  });
  var x0 = null, stage = $(".viewer__stage", viewer);
  stage.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
  stage.addEventListener("pointerup", function (e) {
    if (x0 == null || shots.length < 2) return;
    var dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) show(dx < 0 ? at + 1 : at - 1);
  });

  /* close buttons, and tapping the dark area closes a dialog */
  [resume, viewer].forEach(function (d) {
    d.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]") || e.target === d || e.target.classList.contains("viewer__stage")) d.close();
    });
  });

  /* ---------- fade sections in ---------- */
  var rv = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- glass that reacts to the mouse ---------- */
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var glasses = [], mouse = null, ticking = false, root = document.documentElement;
  function collect() { glasses = Array.prototype.slice.call(document.querySelectorAll(".glass")); }
  collect();
  function frame() {
    ticking = false;
    if (!mouse) return;
    var x = mouse.x, y = mouse.y, vw = innerWidth, vh = innerHeight;
    // background photos drift a little against the mouse
    root.style.setProperty("--px", ((x / vw) * 2 - 1).toFixed(3));
    root.style.setProperty("--py", ((y / vh) * 2 - 1).toFixed(3));
    for (var k = 0; k < glasses.length; k++) {
      var g = glasses[k], r = g.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var dx = Math.max(r.left - x, 0, x - r.right), dy = Math.max(r.top - y, 0, y - r.bottom);
      var glow = Math.max(0, 1 - Math.hypot(dx, dy) / 220);
      g.style.setProperty("--mx", (x - r.left).toFixed(0) + "px");
      g.style.setProperty("--my", (y - r.top).toFixed(0) + "px");
      g.style.setProperty("--glow", glow.toFixed(2));
      if (g.classList.contains("tilt") && !still) {
        var inside = dx === 0 && dy === 0;
        g.style.setProperty("--ry", inside ? (((x - r.left) / r.width - 0.5) * 7).toFixed(2) + "deg" : "0deg");
        g.style.setProperty("--rx", inside ? ((0.5 - (y - r.top) / r.height) * 7).toFixed(2) + "deg" : "0deg");
      }
    }
  }
  function queue() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  if (matchMedia("(hover: hover)").matches) {
    addEventListener("pointermove", function (e) { mouse = { x: e.clientX, y: e.clientY }; queue(); }, { passive: true });
    addEventListener("scroll", queue, { passive: true });
    document.addEventListener("pointerleave", function () {
      glasses.forEach(function (g) { g.style.setProperty("--glow", "0"); g.style.setProperty("--rx", "0deg"); g.style.setProperty("--ry", "0deg"); });
    });
  }

  /* ---------- highlight the nav item for the section on screen ---------- */
  if ("IntersectionObserver" in window) {
    var navIo = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        document.querySelectorAll(".nav a").forEach(function (a) { a.classList.toggle("is-here", a.getAttribute("data-go") === en.target.id); });
        placePill();
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (id) { navIo.observe(document.getElementById(id)); });
    if (hero) navIo.observe(hero);
  }

  /* ---------- experience rows: click to open or close ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button.job__head") : null;
    if (!b) return;
    b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") === "true" ? "false" : "true");
  });

  /* ---------- wow layer: split text, stats, pill, cursor, ripples ---------- */
  var nav = $(".nav"), pill = $(".nav__pill");
  function placePill() {
    if (!nav || !pill) return;
    var a = nav.querySelector("a.is-here");
    if (!a) { pill.style.opacity = "0"; return; }
    pill.style.opacity = "1";
    pill.style.setProperty("--x", a.offsetLeft + "px");
    pill.style.setProperty("--w", a.offsetWidth + "px");
  }
  addEventListener("resize", placePill);

  // progress line across the top
  var bar2 = document.createElement("div");
  bar2.className = "progress"; bar2.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar2);

  // count-up numbers
  var counters = document.querySelectorAll("[data-count]");
  function runCount(el) {
    var end = +el.getAttribute("data-count"), suf = el.getAttribute("data-suffix") || "", t0 = null, dur = 1700;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(end * e).toLocaleString("en-US") + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (motion && "IntersectionObserver" in window) {
    counters.forEach(function (el) { el.textContent = "0" + (el.getAttribute("data-suffix") || ""); });
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // split the name and section headings into letters that rise in
  function split(el) {
    var t = el.textContent, i = 0;
    el.setAttribute("aria-label", t);
    el.classList.add("split");
    el.innerHTML = '<span aria-hidden="true">' + t.split(" ").map(function (w) {
      return '<span class="w">' + w.split("").map(function (ch) {
        return '<span class="ch" style="--i:' + (i++) + '">' + esc(ch) + "</span>";
      }).join("") + "</span>";
    }).join(" ") + "</span>";
  }
  if (motion) {
    var h1 = $(".hero h1");
    if (h1) {
      split(h1);
      requestAnimationFrame(function () { requestAnimationFrame(function () { h1.classList.add("in"); }); });
      setTimeout(function () { h1.classList.add("done"); }, 2400);
    }
    document.querySelectorAll(".head h2").forEach(split);
  }

  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (motion && fine) {
    root.classList.add("has-cursor");
    var cur = document.createElement("div");
    cur.className = "cursor"; cur.setAttribute("aria-hidden", "true");
    cur.innerHTML = '<div class="cursor__ring"><span class="cursor__label"></span></div>';
    var dot = document.createElement("div");
    dot.className = "cursor-dot"; dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(cur); document.body.appendChild(dot);
    var ring = cur.firstChild, label = $(".cursor__label", cur);
    var tx = 0, ty = 0, rx = 0, ry = 0, run = false, seen = false, lastState = "";
    function loop() {
      rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2;
      cur.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
      if (Math.abs(tx - rx) > 0.15 || Math.abs(ty - ry) > 0.15) requestAnimationFrame(loop); else run = false;
    }
    addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
      if (!seen) { seen = true; rx = tx; ry = ty; cur.classList.add("on"); dot.classList.add("on"); }
      var t = e.target.closest ? e.target.closest("[data-cursor], a, button, .btn, .nav a") : null;
      var state = !t ? "" : t.hasAttribute("data-cursor") ? "card" : "link";
      if (state !== lastState) {
        lastState = state;
        cur.dataset.state = state;
        dot.classList.toggle("hide", state === "card");
        if (state === "card") label.textContent = t.getAttribute("data-cursor");
      }
      if (!run) { run = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.addEventListener("pointerleave", function () { cur.classList.remove("on"); dot.classList.remove("on"); seen = false; });
    document.addEventListener("pointerdown", function (e) {
      cur.classList.add("press");
      var r = document.createElement("span");
      r.className = "ripple"; r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px";
      document.body.appendChild(r);
      r.addEventListener("animationend", function () { r.remove(); });
    });
    addEventListener("pointerup", function () { cur.classList.remove("press"); });
  }
  placePill();

  /* if the page was opened with #section in the link, jump there now that it exists */
  if (location.hash.length > 1) {
    var t0 = document.getElementById(location.hash.slice(1));
    if (t0) t0.scrollIntoView({ behavior: "instant" });
  }
  if (hero) bar.classList.toggle("is-solid", hero.getBoundingClientRect().bottom < 72);
})();
