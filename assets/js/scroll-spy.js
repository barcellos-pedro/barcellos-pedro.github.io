/**
 * Scrollspy for pedroreis.dev navigation
 * Tracks current active section in viewport and updates nav link styling.
 */
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  if (!navLinks.length) return;

  // If on curriculum or other subpage, mark matching link
  if (currentPath.includes("/curriculum")) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href")?.includes("/curriculum")) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
    return;
  }

  // Only run section scrollspy on homepage
  if (currentPath !== "/" && currentPath !== "/index.html" && currentPath !== "") {
    return;
  }

  const sectionIds = ["work", "process", "about"];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const setActiveLink = (activeId) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && (href === `#${activeId}` || href === `/#${activeId}`)) {
        link.classList.add("active");
        link.setAttribute("aria-current", "true");
      } else if (!href?.includes("/curriculum")) {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});
