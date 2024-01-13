import path from "path";
import { type Todo, type TodoInterface } from "./interface.type";

const TODO_FILEPATH = path.join(import.meta.dir, "../../../data/todos.json");

export default {
  getTodos: async () => {
    const file = Bun.file(TODO_FILEPATH);
    const todos = await file.json<Todo[]>();
    return todos.filter((t) => !t.isDeleted);
  },
  addTodo: async (data) => {
    const file = Bun.file(TODO_FILEPATH);
    const todos = await file.json<Todo[]>();
    const todo = {
      id: todos.length + 1,
      text: data.text,
      isDone: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    todos.push(todo);
    await Bun.write(TODO_FILEPATH, JSON.stringify(todos));
    return todo;
  },
  updateTodo: async (data) => {
    const file = Bun.file(TODO_FILEPATH);
    const todos = await file.json<Todo[]>();
    const todo = todos.find((t) => t.id === data.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.isDone = data.isDone ?? todo.isDone;
    todo.text = data.text ?? todo.text;
    todo.updatedAt = new Date();
    await Bun.write(TODO_FILEPATH, JSON.stringify(todos));
    return todo;
  },
  deleteTodo: async (id) => {
    const file = Bun.file(TODO_FILEPATH);
    const todos = await file.json<Todo[]>();
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.isDeleted = true;
    todo.updatedAt = new Date();
    await Bun.write(TODO_FILEPATH, JSON.stringify(todos));
    return todo;
  },
} satisfies TodoInterface;
