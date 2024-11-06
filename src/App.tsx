import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import FilteredTodoList from "./components/TodoList/FilteredTodoList";
import { ThemeProvider } from "./utils/ThemeContext";
import TodoItem from "./components/TodoList/TodoItem";
import { SelectChangeEvent } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import {
  TodoCategory,
  todoCategories,
  Todo,
  initialTodos,
} from "./data/initialTodos";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<
    TodoCategory | undefined
  >(undefined);
  const [todoClicked, setTodoClicked] = useState<Todo | undefined>(undefined);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const selectedValue = e.target.value;
    const category = todoCategories.find((cat) => cat.name === selectedValue);
    setSelectedCategory(category);
  };

  const cachedVisibleTodos: Todo[] = useMemo(() => {
    return selectedCategory
      ? initialTodos.filter((todos) => todos.category === selectedCategory.name)
      : initialTodos;
  }, [selectedCategory]);

  const handleTodoElem = useCallback(
    (todo: Todo) => {
      const target = cachedVisibleTodos.filter((elem) => elem.id === todo.id);
      setTodoClicked(target[0]);
    },
    [cachedVisibleTodos]
  );

  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <FilteredTodoList
                  handleChange={handleChange}
                  cachedVisibleTodos={cachedVisibleTodos}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  handleTodoElem={handleTodoElem}
                />
              }
            />
            <Route
              path="/todo/:id"
              element={<TodoItem todoClicked={todoClicked} />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
