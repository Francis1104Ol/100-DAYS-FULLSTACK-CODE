const detailsBox = document.getElementById("details");
const hostingSelect = document.getElementById("hosting-select");
const tableRows = document.querySelectorAll("tbody tr");

// Hosting info
const hostingInfo = {
  "GitHub Pages": "GitHub Pages is free, great for static websites, and integrates directly with GitHub repositories.",
  "Netlify": "Netlify supports static and JAMstack sites with continuous deployment and free SSL.",
  "Vercel": "Vercel is ideal for static and serverless deployments with excellent integration with Next.js.",
  "Firebase Hosting": "Firebase Hosting supports static and dynamic content, with serverless backend via Firebase functions."
};

// Update details
function showDetails(platform) {
  if (platform && hostingInfo[platform]) {
    detailsBox.innerHTML = `<p>${hostingInfo[platform]}</p>`;
  } else {
    detailsBox.innerHTML = `<p>Select a hosting option above to see details here.</p>`;
  }
}

// Dropdown change
hostingSelect.addEventListener("change", (e) => {
  showDetails(e.target.value);
});

// Table row click
tableRows.forEach((row) => {
  row.addEventListener("click", () => {
    const platform = row.getAttribute("data-platform");
    hostingSelect.value = platform; // sync dropdown
    showDetails(platform);
  });
});
