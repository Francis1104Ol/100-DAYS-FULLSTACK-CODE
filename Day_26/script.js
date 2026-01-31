const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

addBtn.addEventListener("click", addTodo);

function addTodo() {
  const task = todoInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.textContent = task;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = "";
}
