import { Todo, todoApi } from "@/lib/redux/services/todo";

export const TodoList = () => {
  const { isLoading, isError, isSuccess, data: todos } = todoApi.useAllQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !isSuccess) {
    return <div>Error</div>;
  }

  return (
    <ul className="py-2">
      {todos.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

const TodoCard = ({ id, text }: Todo) => {
  const [deleteTodo] = todoApi.useDeleteMutation();
  const [editTodo] = todoApi.useEditMutation();

  const onFormSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo") as string;
    editTodo({
      id,
      text: todo,
    });
  };

  const onDeleteClicked = () => {
    deleteTodo(id);
  };

  return (
    <>
      <li key={id} className="border rounded p-2  my-2">
        <form className="flex justify-between items-center" onSubmit={onFormSave}>
          <input
            name="todo"
            defaultValue={text}
            className="focus:border-blue-500 focus:border-b outline-none"
          />
          <div className="flex gap-2">
            <button className="border rounded px-2 bg-green-500 text-white" type="submit">
              Edit
            </button>
            <button
              type="button"
              className="border rounded px-2 bg-red-500 text-white"
              onClick={onDeleteClicked}
            >
              Delete
            </button>
          </div>
        </form>
      </li>
    </>
  );
};
