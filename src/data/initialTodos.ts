export type TodoCategory = {
  id: number;
  name: string;
};

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  category: "development" | "job hunting";
};

export type AlertContentType = {
  severity: "error" | "warning" | "info" | "success";
  message: string | undefined;
};

export const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Learn React",
    completed: false,
    category: "development",
  },
  {
    id: 2,
    text: "Learn Firebase",
    completed: false,
    category: "development",
  },
  {
    id: 3,
    text: "Learn GraphQL",
    completed: false,
    category: "development",
  },
  {
    id: 4,
    text: "Learn TypeScript",
    completed: false,
    category: "development",
  },
  {
    id: 5,
    text: "Update resume",
    category: "job hunting",
    completed: true,
  },
  {
    id: 6,
    text: "Apply for jobs",
    category: "job hunting",
    completed: false,
  },
  {
    id: 7,
    text: "Prepare for interviews",
    category: "job hunting",
    completed: false,
  },
  {
    id: 8,
    text: "Send follow-up emails",
    category: "job hunting",
    completed: false,
  },
];

export const todoCategories: TodoCategory[] = [
  { id: 1, name: "development" },
  { id: 2, name: "job hunting" },
];
