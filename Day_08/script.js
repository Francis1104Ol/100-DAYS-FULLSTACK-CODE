/* =====================================
   PART 1: JavaScript Event Handling
===================================== */

// Click event example
const clickBtn = document.getElementById("clickBtn");
const clickMessage = document.getElementById("clickMessage");

clickBtn.addEventListener("click", function () {
  clickMessage.textContent = "Button clicked successfully!";
});

// Mouseover event example
const hoverBox = document.getElementById("hoverBox");

hoverBox.addEventListener("mouseover", function () {
  hoverBox.textContent = "You're hovering over me!";
});

hoverBox.addEventListener("mouseout", function () {
  hoverBox.textContent = "Hover over me";
});


/* =====================================
   PART 2: Interactive Elements
===================================== */

/* Feature 1: Light/Dark Mode Toggle */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

/* Feature 2: Counter */
let counter = 0;

const counterValue = document.getElementById("counterValue");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");

addBtn.addEventListener("click", function () {
  counter++;
  counterValue.textContent = counter;
});

resetBtn.addEventListener("click", function () {
  counter = 0;
  counterValue.textContent = counter;
});


/* =====================================
   PART 3: Custom Form Validation
===================================== */

const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const feedback = document.getElementById("formFeedback");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop form submission

  feedback.textContent = "";
  feedback.style.color = "red";

  // Name validation
  if (nameInput.value.trim().length < 3) {
    feedback.textContent = "Name must be at least 3 characters.";
    return;
  }

  // Email validation using regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    feedback.textContent = "Please enter a valid email address.";
    return;
  }

  // Password validation
  if (passwordInput.value.length < 6) {
    feedback.textContent = "Password must be at least 6 characters.";
    return;
  }

  // Success feedback
  feedback.style.color = "green";
  feedback.textContent = "Form submitted successfully!";
  form.reset();
});
/* =====================================
   TABBED INTERFACE FUNCTIONALITY
===================================== */

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", function () {
    
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove("active"));
    
    // Hide all tab contents
    tabContents.forEach(content => content.classList.remove("active"));

    // Activate clicked button
    this.classList.add("active");

    // Show corresponding tab content
    const tabId = this.dataset.tab;
    document.getElementById(tabId).classList.add("active");
  });
});
/* =====================================
   FAQ ACCORDION FUNCTIONALITY
===================================== */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
  question.addEventListener("click", function () {
    
    // Toggle the next element (answer)
    const answer = this.nextElementSibling;
    answer.style.display =
      answer.style.display === "block" ? "none" : "block";
  });
});
