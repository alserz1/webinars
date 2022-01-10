import fs from "fs/promises";
import path from "path";
import { ITodo } from "../shared/ITodo";

const pathToData = path.join(__dirname, "../data.json");

export class Todo {
  static async create(data: unknown): Promise<ITodo> {
    if (!Todo.isTodoWithoutId(data)) {
      throw new Error("Invalid data.");
    }
    const todos = await Todo.readAll();
    const highestId = todos.reduce((max, item) => {
      return Math.max(max, item.id);
    }, 0);
    const newTodo = {
      id: highestId + 1,
      ...data,
    };
    todos.push(newTodo);
    await fs.writeFile(pathToData, JSON.stringify(todos));
    return newTodo;
  }

  static async readById(rawId: unknown): Promise<ITodo> {
    if (typeof rawId !== "string") {
      throw new Error("Incorrect id.");
    }
    const id = parseInt(rawId, 10);
    if (typeof id !== "number" || Number.isNaN(id)) {
      throw new Error("Incorrect id.");
    }
    const todos = await Todo.readAll();
    const todo = todos.find((item) => item.id === id);
    if (!todo) {
      throw new Error(`Can't find todo with the id ${id}.`);
    }
    return todo;
  }

  static async readAll(): Promise<ITodo[]> {
    const rawData = await fs.readFile(pathToData, {
      encoding: "utf-8",
    });
    return JSON.parse(rawData);
  }

  private static isTodoWithoutId(data: unknown): data is Omit<ITodo, "id"> {
    if (!data || typeof data !== "object") {
      return false;
    }
    if (!("text" in data) || !("tags" in data)) {
      return false;
    }
    return (
      typeof (data as ITodo).text === "string" &&
      Array.isArray((data as ITodo).tags) &&
      (data as ITodo).tags.every((tag: unknown) => typeof tag === "string")
    );
  }
}
