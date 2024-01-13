import { Provider } from "react-redux";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { store } from "./lib/redux/store";

function App() {
  return (
    <Provider store={store}>
      <main className="container mx-auto p-2 max-w-4xl">
        <AddTodo />
        <TodoList />
      </main>
    </Provider>
  );
}

export default App;
