(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("#nav-links");
  const links = Array.from(document.querySelectorAll(".nav-links a"));

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          links.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
  }

  const taxonomyReveal = document.querySelector(".taxonomy-reveal");
  if (taxonomyReveal) {
    const restartReveal = () => {
      taxonomyReveal.classList.remove("is-running");
      window.requestAnimationFrame(() => {
        taxonomyReveal.classList.add("is-running");
      });
    };

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              restartReveal();
            }
          });
        },
        { threshold: 0.45 },
      );

      revealObserver.observe(taxonomyReveal);
    } else {
      taxonomyReveal.classList.add("is-running");
    }
  }

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target || !navigator.clipboard) {
        return;
      }

      const originalText = button.textContent;
      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = originalText;
        }, 1600);
      } catch {
        button.textContent = "Copy unavailable";
        setTimeout(() => {
          button.textContent = originalText;
        }, 1600);
      }
    });
  });
})();
