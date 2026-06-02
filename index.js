const typewriterElement = document.getElementById("typewriter");
const roles = [
  "Artificial Intelligence & Machine Learning Undergraduate",
  "Text-to-SQL Systems Builder",
  "Voice AI Application Developer",
  "NLP and Generative AI Enthusiast",
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  if (!typewriterElement) return;

  const current = roles[roleIndex];
  typewriterElement.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    window.setTimeout(typeRole, 70);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(typeRole, 35);
    return;
  }

  deleting = !deleting;
  if (!deleting) {
    roleIndex = (roleIndex + 1) % roles.length;
  }

  window.setTimeout(typeRole, deleting ? 1100 : 260);
}

// Loading, navigation, scroll animation, and project filtering.
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  typeRole();
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks?.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => activeObserver.observe(section));

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category || "";
      card.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});
