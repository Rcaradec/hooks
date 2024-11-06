import "./App.css";
import FilteredTodoList from "./components/TodoList/FilteredTodoList";
import { ThemeProvider } from "./utils/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <FilteredTodoList />
      </ThemeProvider>
    </>
  );
}

export default App;
