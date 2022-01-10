import { useState, useEffect } from "react";
import { ITodo } from "./ITodo";
import { Todo } from "./model";

export function Content(props: { searchValue: string }) {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todoInputValue, setTodoInputValue] = useState("");

  useEffect(() => {
    let isCancelled = false;
    Todo.readAll().then((todos) => {
      if (isCancelled) {
        return;
      }
      setAllTodos(todos);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    setTodos(
      allTodos.filter((todo) =>
        todo.text.toLowerCase().includes(props.searchValue)
      )
    );
  }, [props.searchValue, allTodos]);

  async function createTodo(text: ITodo["text"]) {
    const newTodo = await Todo.create(text);
    setAllTodos((todos) => {
      const newTodos = todos.slice();
      newTodos.push(newTodo);
      return newTodos;
    });
  }

  async function completeTodo(id: ITodo["id"]) {
    const newTodo = await Todo.completeTodo(id);
    setAllTodos((todos) => {
      const oldTodoIndex = todos.findIndex((todo) => todo.id === id);
      if (oldTodoIndex === -1) {
        return todos;
      }
      const newTodos = todos.slice();
      newTodos[oldTodoIndex] = newTodo;
      return newTodos;
    });
  }

  async function deleteTodo(id: ITodo["id"]) {
    await Todo.deleteTodo(id);
    setAllTodos((todos) => {
      const oldTodoIndex = todos.findIndex((todo) => todo.id === id);
      if (oldTodoIndex === -1) {
        return todos;
      }
      const newTodos = todos.slice();
      newTodos.splice(oldTodoIndex, 1);
      return newTodos;
    });
  }

  return (
    <main className="content">
      <input
        className="todoInput"
        type="text"
        placeholder="Add todo..."
        value={todoInputValue}
        onChange={(e) => setTodoInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTodo((e.target as HTMLInputElement).value);
            setTodoInputValue('');
          }
        }}
      />
      {todos.length ? (
        <ul className="todos">
          {todos.map((todo) => (
            <li
              className={"todo" + (todo.completed ? " todo_completed" : "")}
              tabIndex={0}
              key={todo.id}
            >
              {todo.text}
              <div className="itemActions">
                <button
                  className="itemActions__action"
                  onClick={() => completeTodo(todo.id)}
                >
                  Complete
                </button>
                <button
                  className="itemActions__action"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Add your first todo!</div>
      )}
    </main>
  );
}
