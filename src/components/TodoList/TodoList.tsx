import { FormEvent, useRef } from "react";
import "./TodoList.scss";
import { Alert, Snackbar } from "@mui/material";
import { useReducer } from "react";
import { initialState, todoReducer } from "../../reducers/todoReducer";

const TodoList = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let target = inputRef?.current?.value;

    if (!target) {
      dispatch({ type: "EMPTY_ADD_TODO" });
    } else {
      dispatch({ type: "ADD_TODO", text: target });
      target = "";
    }
  };

  const handleEditTodo = (id: number, text: string) => {
    dispatch({ type: "START_EDIT_TODO", id, text });
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  };

  const handleSaveEdit = (id: number) => {
    if (state.editingText !== undefined) {
      dispatch({ type: "SAVE_EDIT_TODO", id, text: state.editingText });
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  const handleSnackBarClose = () => {
    dispatch({ type: "HIDE_ALERT" });
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
          {state.todos.map((todo) => (
            <li key={todo.id} className="list__element">
              {state.editingId === todo.id ? (
                <>
                  <input
                    className="input__edit"
                    type="text"
                    value={state.editingText}
                    ref={editInputRef}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_EDIT_TEXT",
                        text: e.target.value,
                      })
                    }
                  />
                  <div className="input__edit_cta-container">
                    <button onClick={() => handleSaveEdit(todo.id)}>
                      Save
                    </button>
                    <button
                      onClick={() => dispatch({ type: "CANCEL_EDIT_TODO" })}
                    >
                      Cancel
                    </button>
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
        open={state.isAlertVisible}
        autoHideDuration={4000}
        onClose={() => dispatch({ type: "HIDE_ALERT" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={state.alertContent?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.alertContent?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TodoList;
