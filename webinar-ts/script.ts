const todosInput = document.getElementsByClassName(
  "todoInput"
)[0] as HTMLInputElement;
const todosList = document.getElementsByClassName(
  "todos"
)[0] as HTMLUListElement;
const searchInput = document.getElementsByClassName(
  "header__search"
)[0] as HTMLInputElement;

function createItemActions() {
  const itemActions = document.createElement("div");
  itemActions.classList.add("itemActions");

  ["Complete", "Delete"].forEach((item) => {
    const btn = document.createElement("button");
    btn.classList.add("itemActions__action");
    btn.textContent = item;
    itemActions.appendChild(btn);
  });

  return itemActions;
}

function createTodo(text: string) {
  const todo = document.createElement("li");
  todo.textContent = text;
  todo.classList.add("todo");
  todo.setAttribute("tabindex", "0");
  todo.appendChild(createItemActions());
  return todo;
}

todosInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    todosList.appendChild(createTodo(todosInput.value));
    todosInput.value = "";
  }
});

todosList.addEventListener("click", (e) => {
  if (e.target instanceof HTMLButtonElement) {
    const todo = e
      .composedPath()
      .find(
        (item) => item instanceof Element && item.classList.contains("todo")
      );
    if (!todo || !(todo instanceof Element)) {
      return;
    }
    if (e.target.textContent === "Delete") {
      todo.remove();
    }
    if (e.target.textContent === "Complete") {
      e.target.remove();
      todo.classList.add("todo_completed");
    }
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchText = searchInput.value.toLowerCase();

    Array.from(todosList.children).forEach((child) => {
      if (!searchText) {
        child.classList.remove("hidden");
        return;
      }

      if (
        !child.childNodes[0].textContent?.toLowerCase().includes(searchText)
      ) {
        child.classList.add("hidden");
      } else {
        child.classList.remove("hidden");
      }
    });
  }
});
