import { ITodo } from "../shared/ITodo";
import { Todo } from "./model.js";

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

async function createTodo(text: ITodo['text']): Promise<HTMLLIElement> {
  await Todo.create(text);
  const todoElem = document.createElement("li");
  todoElem.textContent = text;
  todoElem.classList.add("todo");
  todoElem.setAttribute("tabindex", "0");
  todoElem.appendChild(createItemActions());
  return todoElem;
}

function initTodosInput() {
  const todosInput = document.getElementsByClassName(
    "todoInput"
  )[0] as HTMLInputElement;

  todosInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const todo = await createTodo(todosInput.value);
      const todosList = document.getElementsByClassName(
        "todos"
      )[0] as HTMLUListElement;
      todosList.appendChild(todo);
      todosInput.value = "";
    }
  });
}

function initTodosList() {
  const todosList = document.getElementsByClassName(
    "todos"
  )[0] as HTMLUListElement;

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
}

function initSearch() {
  const searchInput = document.getElementsByClassName(
    "header__search"
  )[0] as HTMLInputElement;

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const searchText = searchInput.value.toLowerCase();
      const todosList = document.getElementsByClassName(
        "todos"
      )[0] as HTMLUListElement;
  
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
}

function init() {
  initTodosInput();
  initTodosList();
  initSearch();
}

init();