// import { useReducer } from "react";
import { FormEvent, useRef, useState } from "react";
import "./TodoList.scss";
import { Alert, Snackbar } from "@mui/material";
import { AlertContentType, initialTodos, Todo } from "../../data/initialTodos";

const TodoList = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [isAlertVisible, setIsAlertVisible] = useState<boolean | undefined>(
    false
  );
  const [alertContent, setAlertContent] = useState<AlertContentType | null>(
    null
  );

  const showAlert = (
    severity: "success" | "error" | "info",
    message: string
  ) => {
    setAlertContent({ severity, message });
    setIsAlertVisible(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let target = inputRef?.current?.value;

    if (!target) {
      showAlert("error", "no todo to be added!");
      setIsAlertVisible(true);
    } else {
      setTodos([
        ...todos,
        {
          id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
          text: target,
          completed: false,
        },
      ]);
      target = "";
      showAlert("success", "Todo added!");
    }
  };
  const handleEditTodo = (id: number, text: string) => {
    console.log("text:", text);
    setEditingId(id);
    setEditingText(text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("null");
  };

  const handleSaveEdit = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    showAlert("info", "Todo edited!");
    setEditingId(null);
    setEditingText("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    showAlert("success", "Todo deleted!");
  };

  const handleSnackBarClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <div className="main_container">
        <h2>TodoList with UseReducer:</h2>
        <div className="input__container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Please enter a new todo"
              ref={inputRef}
            />
            <button type="submit">Add</button>
          </form>
        </div>
        <ul className="list__container">
          {todos.map((todo) => (
            <li key={todo.id} className="list__element">
              {editingId === todo.id ? (
                <>
                  <input
                    className="input__edit"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="input__edit_cta-container">
                    <button onClick={() => handleSaveEdit(todo.id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                  <div className="input__edit_cta-container">
                    <button onClick={() => handleEditTodo(todo.id, todo.text)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Snackbar
        open={isAlertVisible}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        message="Todo Added!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={alertContent?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertContent?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TodoList;
