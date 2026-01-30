const form = document.getElementById("carForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Clear errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const brand = document.getElementById("brand").value;

  const features = Array.from(document.querySelectorAll(".feature:checked"))
    .map(cb => cb.value);

  let valid = true;

  if (!name) {
    document.getElementById("nameError").textContent = "Name is required";
    valid = false;
  }

  if (!email) {
    document.getElementById("emailError").textContent = "Email is required";
    valid = false;
  }

  if (!brand) {
    document.getElementById("brandError").textContent = "Select a car brand";
    valid = false;
  }

  if (!valid) return;

  const data = { name, email, brand, features };

  try {
    const res = await fetch("http://localhost:5000/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
    form.reset();
  } catch (err) {
    alert("Failed to submit form");
  }
});
