const API_URL = "http://localhost:3000/posts";

const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("posts");

let editingPostId = null;

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
      <small>By ${post.author}</small><br/><br/>
      <button onclick="editPost('${post._id}', '${post.title}', '${post.content}', '${post.author}')">
        Edit
      </button>
      <button onclick="deletePost('${post._id}')">
        Delete
      </button>
    `;

    postsContainer.appendChild(div);
  });
}

// Create or Update post
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const author = document.getElementById("author").value;

  if (editingPostId) {
    // UPDATE
    await fetch(`${API_URL}/${editingPostId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    editingPostId = null;
  } else {
    // CREATE
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, author })
    });
  }

  postForm.reset();
  fetchPosts();
});

// Edit post
function editPost(id, title, content, author) {
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
  document.getElementById("author").value = author;

  editingPostId = id;
}

// Delete post
async function deletePost(id) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");

  if (!confirmDelete) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  fetchPosts();
}


// Initial load
fetchPosts();
