/**
 * Étude notariale — comportements front (progressive enhancement).
 * Tout le contenu reste lisible sans JavaScript (SEO / robots IA).
 */
(function () {
  "use strict";

  /* ---------- Navigation mobile ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        navToggle.focus();
      }
    });

    var mq = window.matchMedia("(min-width: 940px)");
    mq.addEventListener("change", function (e) {
      if (e.matches) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Accordéon FAQ ---------- */
  document.querySelectorAll(".accordion-trigger").forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;

    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
    });

    window.addEventListener("resize", function () {
      if (btn.getAttribute("aria-expanded") === "true") {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Révélation au défilement (avec effet de cascade) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    // Décalage en cascade : les éléments qui partagent un même parent
    // (cartes d'une grille, étapes, éléments de chronologie...) se
    // révèlent l'un après l'autre plutôt que tous d'un coup.
    var groupCounters = new WeakMap();
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      var index = groupCounters.has(parent) ? groupCounters.get(parent) : 0;
      groupCounters.set(parent, index + 1);
      var delay = Math.min(index, 5) * 80;
      el.style.setProperty("--reveal-delay", delay + "ms");
    });

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px 120px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });

      // Filet de sécurité : un défilement très rapide (molette, geste
      // "flick" sur mobile) peut faire sauter des frames et empêcher
      // l'observateur de détecter le passage d'un élément. Après un
      // délai raisonnable, on force l'affichage du contenu restant afin
      // qu'il ne reste jamais invisible.
      setTimeout(function () {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
        io.disconnect();
      }, 2500);
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------- Barre de progression, en-tête dynamique, parallaxe ---------- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var siteHeader = document.querySelector(".site-header");
  var heroArt = document.querySelector(".hero__art");

  var progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.setAttribute("aria-hidden", "true");
  document.body.prepend(progressBar);

  if (heroArt && !prefersReducedMotion) {
    heroArt.setAttribute("data-parallax", "");
  }

  var ticking = false;

  function updateOnScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Barre de progression de lecture
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";

    // En-tête : ombre + resserrement après un léger défilement
    if (siteHeader) {
      siteHeader.classList.toggle("is-scrolled", scrollTop > 12);
    }

    // Parallaxe très légère sur l'image du hero
    if (heroArt && !prefersReducedMotion) {
      var offset = Math.min(scrollTop * 0.12, 40);
      heroArt.style.setProperty("--parallax-y", offset + "px");
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateOnScroll();

  /* ---------- Année courante dans le footer ---------- */
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Formulaire de contact (soumission AJAX vers Formspree) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      if (action.indexOf("VOTRE_ID_FORMSPREE") !== -1) {
        // Le formulaire n'a pas encore été connecté à un service d'envoi :
        // on laisse le comportement par défaut du navigateur être bloqué
        // et on affiche une instruction claire au lieu d'un échec silencieux.
        e.preventDefault();
        showStatus("error", "Formulaire non connecté : suivez les instructions du README pour activer l'envoi des messages (Formspree ou équivalent).");
        return;
      }

      e.preventDefault();
      var data = new FormData(form);
      var submitBtn = form.querySelector("[type=submit]");
      submitBtn.disabled = true;
      submitBtn.dataset.label = submitBtn.textContent;
      submitBtn.textContent = "Envoi en cours…";

      fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            showStatus("success", "Merci, votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.");
          } else {
            showStatus("error", "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous appeler directement.");
          }
        })
        .catch(function () {
          showStatus("error", "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous appeler directement.");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.label;
        });
    });

    function showStatus(type, message) {
      status.textContent = message;
      status.className = "form-status is-visible form-status--" + type;
      status.setAttribute("role", "status");
      status.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
})();
