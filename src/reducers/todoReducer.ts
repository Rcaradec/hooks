import { AlertContentType, initialTodos, Todo } from "../data/initialTodos";

type State = {
  todos: Todo[];
  isAlertVisible: boolean;
  editingId?: number;
  editingText?: string;
  alertContent?: AlertContentType;
  isCompleted?: boolean | undefined;
};

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "EMPTY_ADD_TODO" }
  | {
      type: "SHOW_ALERT";
      severity: "success" | "error" | "info";
      message: string;
    }
  | { type: "HIDE_ALERT" }
  | { type: "START_EDIT_TODO"; id: number; text: string }
  | { type: "UPDATE_EDIT_TEXT"; text: string }
  | { type: "SAVE_EDIT_TODO"; id: number; text: string }
  | { type: "CANCEL_EDIT_TODO" }
  | { type: "DELETE_TODO"; id: number };

export const initialState: State = {
  todos: initialTodos,
  isAlertVisible: false,
  editingId: undefined,
  editingText: undefined,
  alertContent: undefined,
  isCompleted: undefined,
};

export const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        isAlertVisible: true,
        alertContent: {
          severity: action.severity,
          message: action.message,
        },
      };
    case "HIDE_ALERT": {
      return { ...state, isAlertVisible: false };
    }
    case "ADD_TODO": {
      const newTodo: Todo = {
        id:
          state.todos.length > 0
            ? state.todos[state.todos.length - 1].id + 1
            : 1,
        text: action.text,
        completed: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
        isAlertVisible: true,
        alertContent: {
          severity: "success",
          message: "Todo added !",
        },
      };
    }
    case "START_EDIT_TODO": {
      return {
        ...state,
        editingId: action.id,
        editingText: action.text,
      };
    }
    case "UPDATE_EDIT_TEXT": {
      return {
        ...state,
        editingText: action.text,
      };
    }
    case "CANCEL_EDIT_TODO": {
      return {
        ...state,
        editingId: undefined,
        editingText: "",
      };
    }
    case "SAVE_EDIT_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        ),
        editingId: undefined,
        editingText: "",
        isAlertVisible: true,
        alertContent: {
          severity: "info",
          message: "Todo edited!",
        },
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
        isAlertVisible: true,
        alertContent: {
          severity: "error",
          message: "Todo Deleted !",
        },
      };
    }
    default:
      return state;
  }
};
