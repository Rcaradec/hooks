import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import { ThemeProvider } from "./utils/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <TodoList />
      </ThemeProvider>
    </>
  );
}

export default App;
