import { Hono } from "hono";
import { cors } from "hono/cors";
import TodoJsonStore from "./entities/Todo/TodoJsonStore";
import type { Todo } from "./entities/Todo/interface.type";

const app = new Hono();

app.use("*", cors());

// logger middleware
app.use(async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
});

app.get("/todo", async (c) => {
  const todos = await TodoJsonStore.getTodos();
  return c.json(todos);
});

app.patch("/todo/:id", async (c) => {
  const todoId = c.req.param("id");
  const body = await c.req.json<Partial<Todo>>();
  const todo = await TodoJsonStore.updateTodo({ ...body, id: Number(todoId) });
  return c.json(todo);
});

app.post("/todo", async (c) => {
  const body = await c.req.json<{ text: string }>();
  const todo = await TodoJsonStore.addTodo(body);
  return c.json(todo);
});

app.delete("/todo/:id", async (c) => {
  const todoId = c.req.param("id");
  const todo = await TodoJsonStore.deleteTodo(Number(todoId));
  return c.json(todo);
});

export default app;
