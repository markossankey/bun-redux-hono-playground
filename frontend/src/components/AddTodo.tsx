import { todoApi } from "@/lib/redux/services/todo";

export const AddTodo = () => {
  const [addTodo] = todoApi.useAddMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo") as string;
    addTodo({ text: todo });
    // reset form
    e.currentTarget.reset();
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        name="todo"
        type="text"
        className="w-full border-b border-slate-200 focus:border-blue-500 outline-none"
      />
      <button type="submit" className="border py-1 px-4 rounded-full bg-slate-700 text-white">
        Add
      </button>
    </form>
  );
};
