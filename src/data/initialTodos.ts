export const initialTodos: Todo[] = [
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

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type AlertContentType = {
  severity: "error" | "warning" | "info" | "success";
  message: string;
};
