/* ===== Easy settings: edit here ===== */
const CONFIG = {
  phone: "919515977522",
  clinicName: "VK Physiotherapy Clinic",
  offer: {
    enabled: true, // set to false to hide the Sunday offer everywhere on the site
    headline: "Every Sunday: Free OP",
    detail: "50% discount on physiotherapy treatments",
    suffix: "every Sunday"
  }
};
/* ==================================== */

(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Special offer: update text or remove it
  if (!CONFIG.offer.enabled) {
    $$("[data-offer]").forEach(function (el) { el.remove(); });
  } else {
    $$("[data-offer-headline]").forEach(function (el) { el.textContent = CONFIG.offer.headline; });
    $$("[data-offer-detail]").forEach(function (el) { el.textContent = CONFIG.offer.detail; });
    $$("[data-offer-suffix]").forEach(function (el) { el.textContent = CONFIG.offer.suffix; });
  }

  // Mobile navigation
  var burger = $("#burger"), nav = $("#nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // Header shadow and active link
  var header = $(".site-header");
  window.addEventListener("scroll", function () { header.classList.toggle("scrolled", window.scrollY > 8); }, { passive: true });
  if ("IntersectionObserver" in window) {
    var links = $$("nav a[href^='#']:not(.nav-cta)");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { io.observe(s); });
  }

  // WhatsApp appointment request (no backend)
  var form = $("#form"), err = $("#err");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var name = (d.get("name") || "").trim(), phone = (d.get("phone") || "").trim();
    if (!name || !phone) { err.hidden = false; return; }
    err.hidden = true;
    var lines = ["Hello " + CONFIG.clinicName + ", I would like to book an appointment.",
      "Name: " + name, "Phone: " + phone];
    if ((d.get("issue") || "").trim()) lines.push("Problem: " + d.get("issue").trim());
    if ((d.get("when") || "").trim()) lines.push("Preferred time: " + d.get("when").trim());
    window.open("https://wa.me/" + CONFIG.phone + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });

  $("#year").textContent = new Date().getFullYear();
})();

/* Scroll-reveal animations (skipped when the visitor prefers reduced motion) */
(function () {
  "use strict";
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var groups = [
    [".head", 0, "rv"], [".about-img", 0, "rv rv-left"], [".about-grid > div", 0, "rv rv-right"],
    [".creds li", 0.12, "rv"], [".cond-grid li", 0.05, "rv"], [".svc-grid article", 0.1, "rv"],
    [".poster", 0.2, "rv rv-right"], [".why-grid article", 0.12, "rv"], [".offer-grid > div", 0, "rv rv-left"],
    [".offer-grid > img", 0.15, "rv rv-right"], [".contact-grid .card", 0.15, "rv"], [".map", 0, "rv"],
    [".foot-grid > *", 0.1, "rv"]
  ];
  var els = [];
  groups.forEach(function (g) {
    Array.prototype.forEach.call(document.querySelectorAll(g[0]), function (el, i) {
      g[2].split(" ").forEach(function (c) { el.classList.add(c); });
      el.style.setProperty("--d", Math.min(i % 6, 5) * g[1] + "s");
      els.push(el);
    });
  });
  document.documentElement.classList.add("js-reveal");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  els.forEach(function (el) { io.observe(el); });
})();
