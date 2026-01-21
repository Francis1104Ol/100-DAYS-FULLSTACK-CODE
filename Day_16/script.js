 const toggle = document.querySelector(".nav-toggle");
  const navLink = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    navLink.classList.toggle("active");
  });


/* =========================
   MOBILE NAV TOGGLE
========================= */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav ul");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-open");
  });
}

/* =========================
   CTA BUTTON FEEDBACK
========================= */
const ctaButtons = document.querySelectorAll(".cta-button");

ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("clicked");

    setTimeout(() => {
      button.classList.remove("clicked");
    }, 200);
  });
});

/* =========================
   CONTACT FORM VALIDATION
========================= */
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Message sent successfully!");
    form.reset();
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================
   ACTIVE NAV LINK
========================= */
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

/* =========================
   SIMPLE SCROLL ANIMATION
========================= */
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));