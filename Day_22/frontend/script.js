const API_URL = "http://localhost:3000/posts";

const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("posts");

// Fetch all posts
async function fetchPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();

  postsContainer.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>By ${post.author}</small>
    `;
    postsContainer.appendChild(div);
  });
}

// Create new post
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const author = document.getElementById("author").value;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content, author })
  });

  postForm.reset();
  fetchPosts();
});

// Initial load
fetchPosts();
