// import { useReducer } from "react";
import { FormEvent, useRef, useState } from "react";
import "./TodoList.scss";

const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Learn React",
    completed: false,
  },
  {
    id: 2,
    text: "Learn Firebase",
    completed: false,
  },
  {
    id: 3,
    text: "Learn GraphQL",
    completed: false,
  },
  {
    id: 4,
    text: "Learn TypeScript",
    completed: false,
  },
];

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
const TodoList = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputRef?.current?.value) {
      setTodos([
        ...todos,
        {
          id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
          text: inputRef?.current?.value,
          completed: false,
        },
      ]);
      inputRef.current.value = "";
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
    setEditingId(null);
    setEditingText("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
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
                  <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
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
  );
};

export default TodoList;
