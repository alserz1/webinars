import { ITodo } from "./ITodo";

const urlStart = 'http://localhost:3000';

export class Todo {
  static async create(text: ITodo["text"]): Promise<ITodo> {
    return await fetch(urlStart + "/todo", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text,
        tags: [],
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  static async readAll(): Promise<ITodo[]> {
    return fetch(urlStart + "/todo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  static async readById(id: ITodo["id"]): Promise<ITodo> {
    return fetch(urlStart + `/todo/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  static async completeTodo(id: ITodo['id']): Promise<ITodo> {
    return await fetch(urlStart + `/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  static async deleteTodo(id: ITodo["id"]): Promise<void> {
    return await fetch(urlStart + `/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }
    }).then(() => undefined);
  }
}
