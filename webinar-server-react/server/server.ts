import express from "express";
import path from "path";
import { Todo } from "./model";
import { ITodo } from "../shared/ITodo";
const app = express();
const port = 3000;

Todo.readAll().then(async (data) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE")
    next();
  });
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

  app.get<
    "/todo/:id",
    {
      id: unknown;
    },
    ITodo
  >("/todo/:id", async (req, res) => {
    const todo = await Todo.readById(req.params.id);
    res.send(todo);
  });

  app.patch<
    "/todo/:id",
    {
      id: unknown;
    },
    ITodo,
    Partial<ITodo>
  >("/todo/:id", async (req, res) => {
    const todo = await Todo.patchTodo(req.params.id, req.body);
    res.send(todo);
  });

  app.delete<
    "/todo/:id",
    {
      id: unknown;
    }
  >("/todo/:id", async (req, res) => {
    await Todo.deleteTodo(req.params.id);
    res.send();
  });

  app.use(express.static(path.join(__dirname, "../../client")));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
