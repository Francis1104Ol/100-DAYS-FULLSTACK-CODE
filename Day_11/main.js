const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    alert(`You clicked: ${button.textContent}`);
  });
});
