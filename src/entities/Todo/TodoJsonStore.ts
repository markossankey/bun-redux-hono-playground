import { mkdirSync } from "fs";
import path from "path";
import { type Todo, type TodoInterface } from "./interface.type";

const DATA_DIR = path.join(import.meta.dir, "../../../data");
const TODO_FILEPATH = `${DATA_DIR}/todos.json`;

export default class TodoJsonStore implements TodoInterface {
  async init() {
    // try to read, if does not exist, create one, then return this
    const file = Bun.file(TODO_FILEPATH);
    const fileExists = await file.exists();
    if (fileExists) {
      return this;
    }
    mkdirSync(DATA_DIR);
    await Bun.write(TODO_FILEPATH, "[]");
    return this;
  }

  async getTodos() {
    const file = Bun.file(TODO_FILEPATH);
    const todos = await file.json<Todo[]>();
    return todos.filter((t) => !t.isDeleted);
  }
  async addTodo(data: Partial<Todo> & Pick<Todo, "text">): Promise<Todo> {
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
  }

  async updateTodo(data: Partial<Todo> & Pick<Todo, "id">): Promise<Todo> {
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
  }

  async deleteTodo(id: string | number): Promise<Todo> {
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
  }
}
