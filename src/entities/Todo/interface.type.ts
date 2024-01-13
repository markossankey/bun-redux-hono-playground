export type Todo = {
  id: number | string;
  text: string;
  isDone: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface TodoInterface {
  getTodos(): Promise<Todo[]>;
  addTodo(todo: Partial<Todo> & Pick<Todo, "text">): Promise<Todo>;
  updateTodo(todo: Partial<Todo> & Pick<Todo, "id">): Promise<Todo>;
  deleteTodo(id: Todo["id"]): Promise<Todo>;
}
