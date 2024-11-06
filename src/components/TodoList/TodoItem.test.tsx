import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { Todo } from "../../data/initialTodos";

describe("TodoItem", () => {
  it("should display the todo text and category", () => {
    const todo: Todo = {
      id: 1,
      text: "Learn React",
      completed: false,
      category: "development",
    };

    render(<TodoItem todoClicked={todo} />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("development")).toBeInTheDocument();
  });

  it("should handle undefined todoClicked", () => {
    render(<TodoItem todoClicked={undefined} />);

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
    expect(screen.queryByText("development")).not.toBeInTheDocument();
  });
});
