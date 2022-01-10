import { ITodo } from "../shared/ITodo";

export class Todo {
  static async create(text: ITodo['text']): Promise<ITodo> {
    return await fetch("/todo", {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        text,
        tags: []
      })
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  static async readAll(): Promise<ITodo[]> {
    return fetch("/todo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  static async readById(id: ITodo["id"]): Promise<ITodo> {
    return fetch(`/todo/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => data);
  }
}
