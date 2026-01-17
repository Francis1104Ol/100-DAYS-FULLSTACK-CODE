const rows = document.querySelectorAll("#hostingTable tbody tr");
const infoBox = document.getElementById("infoBox");

rows.forEach(row => {
  row.addEventListener("click", () => {
    const details = row.getAttribute("data-details");
    infoBox.innerHTML = `<strong>Details:</strong> ${details}`;
  });
});
