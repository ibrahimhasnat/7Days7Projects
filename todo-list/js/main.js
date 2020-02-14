// UI
const todoForm = document.getElementById("todo-form");
const todoText = document.getElementById("todo-text");
const output = document.getElementById("output");

// Add Todo
todoForm.addEventListener("submit", e => {
  e.preventDefault();

  if (todoText.value) {
    const li = document.createElement("li");
    li.textContent = todoText.value;

    const removeSpan = document.createElement("span");
    removeSpan.classList = "remove-todo";
    li.appendChild(removeSpan);

    output.appendChild(li);
    // Save in LocalStore
    saveInLocalStore(todoText.value);
  } else {
    alert("Please Add Todo");
  }

  todoText.value = "";
});

// Remove Todo
output.addEventListener("click", e => {
  if (e.target.classList.contains("remove-todo")) {
    e.target.parentElement.remove();
  }

  // Remove From LocalStore
  removeFromLS(e.target.parentElement);
});

// Save in LocalStore
function saveInLocalStore(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove From LocalStore
function removeFromLS(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((val, i) => {
    if (todo.textContent === val) {
      todos.splice(i, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get All Todo From LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  if (todos.length > 0) {
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo;

      const removeSpan = document.createElement("span");
      removeSpan.classList = "remove-todo";
      li.appendChild(removeSpan);

      output.appendChild(li);
    });
  }
});
