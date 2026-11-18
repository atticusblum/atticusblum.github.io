/*
  Builds the whole page from window.CONTENT (content.js).
  You should not need to edit this file to change text, links or images.
*/
(function () {
  "use strict";
  var C = window.CONTENT || {};
  var ORDER = ["about", "academics", "projects", "personal", "future", "contact"];

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
  var has = {
    about: function (s) { return list(s.paragraphs).length || list(s.leadership).length; },
    academics: function (s) { return s.school || list(s.coursework).length || list(s.honors).length; },
    projects: function (s) { return list(s.items).length; },
    personal: function (s) { return list(s.items).length; },
    future: function (s) { return list(s.paragraphs).length; },
    contact: function () { return C.links && (C.links.email || C.links.linkedin); },
  };
  var sections = ORDER.filter(function (id) { return C[id] && has[id](C[id]); });
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
    '<nav class="nav" aria-label="Sections">' + navLinks + "</nav>" +
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
    "<h1>" + esc(C.name) + "</h1>" +
    (C.tagline ? '<p class="tagline">' + esc(C.tagline) + "</p>" : "") +
    (C.intro ? '<p class="intro">' + esc(C.intro) + "</p>" : "") +
    contactButtons("btn--glass") +
    (arrows ? '<div class="arrows">' + arrows + "</div>" : "") +
    "</div></section>";

  /* ---------- sections ---------- */
  function head(id, i) {
    return '<span class="kicker">' + num(i) + "</span><h2>" + esc(C[id].heading || label(id)) + "</h2>";
  }
  function paras(a) { return list(a).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""); }

  var render = {
    about: function (s) {
      var lead = list(s.leadership);
      return '<div class="lead">' + paras(s.paragraphs) + "</div>" +
        (lead.length ? "<h3>" + esc(s.leadershipHeading || "Leadership") + '</h3><ul class="list">' + lead.map(function (r) {
          return "<li><div><strong>" + esc(r.role) + "</strong>" + (r.org ? ", " + esc(r.org) : "") + "</div>" +
            '<div class="meta">' + esc(r.years) + "</div>" + (r.line ? '<div class="sub">' + esc(r.line) + "</div>" : "") + "</li>";
        }).join("") + "</ul>" : "");
    },
    academics: function (s) {
      var cw = list(s.coursework), hn = list(s.honors);
      function chips(a) { return '<ul class="chips">' + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
      return '<div class="edu">' +
        (s.school ? '<div class="edu-card"><div class="school">' + esc(s.school) + "</div>" +
          [s.college, s.degree, s.focus].filter(Boolean).map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") +
          (s.year ? '<p class="year">' + esc(s.year) + "</p>" : "") + "</div>" : "") +
        "<div>" + (cw.length ? "<h3>" + esc(s.courseworkHeading || "Coursework") + "</h3>" + chips(cw) : "") +
        (hn.length ? "<h3>" + esc(s.honorsHeading || "Honors") + "</h3>" + chips(hn) : "") + "</div></div>";
    },
    projects: function (s) {
      var items = list(s.items);
      var feat = items.filter(function (p) { return p.featured; });
      var rest = items.filter(function (p) { return !p.featured; });
      function cards(arr) {
        return arr.map(function (p) {
          var n = items.indexOf(p);
          var count = 1 + list(p.gallery).length;
          return '<button class="card" type="button" data-project="' + n + '" aria-label="View ' + esc(p.title) + '">' +
            img(p.image, p.title, p.focus, "card__img") +
            '<div class="card__body"><div class="card__title">' + esc(p.title) +
            (count > 1 ? '<span class="card__count">' + count + " images</span>" : "") + "</div>" +
            (p.description ? '<p class="card__desc">' + esc(p.description) + "</p>" : "") + "</div></button>";
        }).join("");
      }
      var out = "";
      if (feat.length) out += (rest.length ? "<h3>" + esc(s.featuredHeading || "Featured") + "</h3>" : "") + '<div class="grid grid--featured">' + cards(feat) + "</div>";
      if (rest.length) out += (feat.length ? "<h3>" + esc(s.moreHeading || "More work") + "</h3>" : "") + '<div class="grid">' + cards(rest) + "</div>";
      return out;
    },
    personal: function (s) {
      return (s.intro ? '<p class="lead">' + esc(s.intro) + "</p>" : "") +
        '<div class="grid">' + list(s.items).map(function (p, i) {
          return '<button class="card photo" type="button" data-photo="' + i + '" aria-label="View ' + esc(p.title || "photo") + '">' +
            img(p.image, p.title || "", p.focus, "card__img") +
            '<div class="card__body">' + (p.title ? '<div class="card__title">' + esc(p.title) + "</div>" : "") +
            (p.caption ? '<p class="card__desc">' + esc(p.caption) + "</p>" : "") + "</div></button>";
        }).join("") + "</div>";
    },
    future: function (s) { return '<div class="lead">' + paras(s.paragraphs) + "</div>"; },
    contact: function (s) {
      return '<div class="contact"><div>' + (s.line ? '<p class="lead">' + esc(s.line) + "</p>" : "") +
        (L.email ? '<a class="email" href="' + esc(mailto()) + '">' + esc(L.email) + "</a>" : "") +
        contactButtons("btn--line") + "</div>" +
        (L.linkedin ? '<div class="qr"><div id="qr"></div><p>' + esc(s.qrLabel || "LinkedIn") + "</p></div>" : "") + "</div>";
    },
  };

  sections.forEach(function (id, i) {
    html += '<section class="section" id="' + id + '"><div class="wrap reveal">' + head(id, i) + render[id](C[id]) + "</div></section>";
  });
  $("#main").innerHTML = html;
  $("#footer").innerHTML = esc(C.footer || "");

  /* ---------- LinkedIn QR (always made from links.linkedin) ---------- */
  var qrBox = $("#qr");
  if (qrBox && window.qrcode) {
    var q = window.qrcode(0, "M");
    q.addData(L.linkedin);
    q.make();
    qrBox.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true, alt: "QR code for LinkedIn" });
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
      '<a class="btn btn--glass" href="' + esc(L.resume) + '" target="_blank" rel="noopener">' + ICON.open + "Open full screen</a></div>";
    document.addEventListener("click", function (e) {
      if (!e.target.closest("[data-resume]")) return;
      // Big screens show the real PDF; phones show the preview picture.
      var f = $("iframe", resume);
      var big = matchMedia("(min-width: 861px)").matches || !L.resumePreview;
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
    im.src = s.src; im.alt = s.title || "";
    $(".modal__title", viewer).textContent = s.title || "";
    $(".viewer__desc", viewer).innerHTML = esc(s.desc || "") +
      (s.link ? ' <a class="btn btn--glass" style="margin-left:.5rem" href="' + esc(s.link) + '" target="_blank" rel="noopener">' + ICON.open + "Visit</a>" : "");
    $(".viewer__count", viewer).textContent = many ? (at + 1) + " / " + shots.length : "";
    $(".viewer__nav--prev", viewer).hidden = !many;
    $(".viewer__nav--next", viewer).hidden = !many;
  }
  function openViewer(list_, i) { shots = list_; show(i); if (!viewer.open) viewer.showModal(); }

  document.addEventListener("click", function (e) {
    var p = e.target.closest("[data-project]");
    if (p) {
      var pr = list(C.projects.items)[+p.getAttribute("data-project")];
      var imgs = [pr.image].concat(list(pr.gallery));
      openViewer(imgs.map(function (src) { return { src: src, title: pr.title, desc: pr.description, link: pr.link }; }), 0);
      return;
    }
    var ph = e.target.closest("[data-photo]");
    if (ph) {
      openViewer(list(C.personal.items).map(function (x) { return { src: x.image, title: x.title, desc: x.caption }; }), +ph.getAttribute("data-photo"));
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

  /* if the page was opened with #section in the link, jump there now that it exists */
  if (location.hash.length > 1) {
    var t0 = document.getElementById(location.hash.slice(1));
    if (t0) t0.scrollIntoView({ behavior: "instant" });
  }
  if (hero) bar.classList.toggle("is-solid", hero.getBoundingClientRect().bottom < 72);
})();
