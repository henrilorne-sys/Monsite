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

  /* ---------- Révélation au défilement ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
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
