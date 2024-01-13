import { Button } from "@/components/core/ui/button";
import { Card, CardContent } from "@/components/core/ui/card";
import { Input } from "@/components/core/ui/input";
import { useToast } from "@/components/core/ui/use-toast";
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
  const { toast } = useToast();

  const onFormSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo") as string;
    try {
      const payload = await editTodo({
        id,
        text: todo,
      }).unwrap();
      toast({
        title: "Todo Edited",
        description: payload.text,
      });
    } catch (e) {
      toast({
        title: "Todo Edit Failed",
        variant: "destructive",
      });
    }
  };

  const onDeleteClicked = async () => {
    try {
      const payload = await deleteTodo(id).unwrap();
      toast({
        title: "Todo Deleted",
        description: payload.text,
      });
    } catch (e) {
      toast({
        title: "Todo Delete Failed",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="my-2">
      <CardContent className="p-2">
        <li key={id}>
          <form className="flex justify-between items-center gap-4" onSubmit={onFormSave}>
            <Input name="todo" defaultValue={text} />
            <div className="flex gap-2">
              <Button variant="outline" color="" size="sm" type="submit">
                Edit
              </Button>
              <Button
                variant="destructive-outline"
                color=""
                size="sm"
                type="button"
                onClick={onDeleteClicked}
              >
                Delete
              </Button>
            </div>
          </form>
        </li>
      </CardContent>
    </Card>
  );
};
