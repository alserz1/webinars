import express from "express";
import path from "path";
import { Todo } from "./model";
import { ITodo } from "../shared/ITodo";
const app = express();
const port = 3000;

Todo.readAll().then(async (data) => {
  app.use(express.json());

  app.put<"/todo", {}, ITodo, unknown>("/todo", async (req, res) => {
    try {
      const newTodo = await Todo.create(req.body);
      res.send(newTodo);
    } catch {
      res.sendStatus(40);
    }
  });

  app.get<"/todo", {}, ITodo[]>("/todo", async (req, res) => {
    const newTodo = await Todo.readAll();
    res.send(newTodo);
  });

  app.get<"/todo/:id", {
    id: unknown
  }, ITodo>("/todo/:id", async (req, res) => {
    const todo = await Todo.readById(req.params.id);
    res.send(todo);
  });

  app.use(express.static(path.join(__dirname, "../../client")));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
