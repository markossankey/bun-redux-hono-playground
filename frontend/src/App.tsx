import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { Toaster } from "@/components/core/ui/toaster";
import { store } from "@/lib/redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <main className="container mx-auto p-2 max-w-4xl">
        <AddTodo />
        <TodoList />
      </main>
      <Toaster />
    </Provider>
  );
}

export default App;
