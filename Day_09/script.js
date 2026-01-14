/* GLOBAL REFERENCES */
const body = document.body;
const card = document.getElementById("flipCard");
const themeToggle = document.getElementById("themeToggle");

/* FUNCTION: TOGGLE THEME */
function toggleTheme(currentTheme) {
  return currentTheme === "dark" ? "light" : "dark";
}

/* FUNCTION: APPLY THEME */
function applyTheme(theme) {
  body.className = theme;
  themeToggle.textContent =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
}

/* EVENT: THEME SWITCH */
themeToggle.addEventListener("click", function () {
  const newTheme = toggleTheme(body.className);
  applyTheme(newTheme);
});

/* EVENT: CARD FLIP */
card.addEventListener("click", function () {
  card.classList.toggle("flipped");
});
