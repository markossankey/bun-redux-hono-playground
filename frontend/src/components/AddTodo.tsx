import { Button } from "@/components/core/ui/button";
import { Input } from "@/components/core/ui/input";
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
      <Input name="todo" type="text" />
      <Button type="submit">Add</Button>
    </form>
  );
};
