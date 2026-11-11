// New Beginning Living Inc — shared site behavior
(function () {
  document.documentElement.classList.add("js-ready");

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // ---- mobile nav toggle ----
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav-primary");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // ---- header shadow on scroll ----
    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () {
        try {
          header.style.boxShadow = window.scrollY > 6 ? "0 6px 18px -12px rgba(54,36,32,.35)" : "none";
        } catch (e) {}
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // ---- lightbox gallery ----
    var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    if (galleryItems.length) {
      var lb = document.createElement("div");
      lb.className = "lightbox";
      lb.hidden = true;
      lb.innerHTML =
        '<button class="lb-close" aria-label="Close">' + iconClose() + "</button>" +
        '<button class="lb-prev" aria-label="Previous photo">' + iconChevron("left") + "</button>" +
        '<img alt="" />' +
        '<button class="lb-next" aria-label="Next photo">' + iconChevron("right") + "</button>" +
        '<div class="lb-cap"></div>';
      document.body.appendChild(lb);
      var imgEl = lb.querySelector("img");
      var capEl = lb.querySelector(".lb-cap");
      var idx = 0;

      function srcFor(el) {
        return el.getAttribute("data-full") || (el.querySelector("img") || {}).src;
      }
      function show(i) {
        idx = (i + galleryItems.length) % galleryItems.length;
        var el = galleryItems[idx];
        imgEl.src = srcFor(el);
        var cap = el.getAttribute("data-caption") || "";
        imgEl.alt = cap;
        capEl.textContent = cap;
      }
      function open(i) {
        show(i);
        lb.hidden = false;
        document.body.style.overflow = "hidden";
      }
      function close() {
        lb.hidden = true;
        document.body.style.overflow = "";
      }
      galleryItems.forEach(function (el, i) {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          open(i);
        });
      });
      lb.querySelector(".lb-close").addEventListener("click", close);
      lb.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
      lb.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
      lb.addEventListener("click", function (e) {
        if (e.target === lb) close();
      });
      document.addEventListener("keydown", function (e) {
        if (lb.hidden) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(idx - 1);
        if (e.key === "ArrowRight") show(idx + 1);
      });
    }

    function iconClose() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';
    }
    function iconChevron(dir) {
      var d = dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6";
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
    }
  });
})();
