import { ChangeEvent, FormEvent, useRef } from "react";

type Props = {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent) => void;
  inputSearch: string;
  tasks: string[];
};

const FocusInput = ({
  handleInputChange,
  handleSubmit,
  inputSearch,
  tasks,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <>
      <button
        style={{ backgroundColor: "tomato", marginBottom: "5rem" }}
        onClick={handleClick}
      >
        Focus Input
      </button>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="please type your search"
            ref={inputRef}
            onChange={handleInputChange}
            value={inputSearch}
          />
          <button
            style={{ backgroundColor: "#03fca1", marginLeft: "1rem" }}
            type="submit"
          >
            Submit Task
          </button>
        </form>
      </div>
      {<p>{inputSearch}</p>}
      <div>
        <ul>
          {tasks?.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FocusInput;

//? Corresponding App.tsx :
// import { ChangeEvent, FormEvent, useState } from "react";
// import "./App.css";
// import FocusInput from "./components/FocusInput";

// function App() {
//   const [inputSearch, setInputSearch] = useState<string>("");
//   const [tasks, setTasks] = useState<string[]>([]);

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputSearch(event.target.value);
//   };

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     if (inputSearch.trim()) {
//       setTasks([...tasks, inputSearch]);
//       setInputSearch("");
//     }
//   };
//   return (
//     <>
//       <FocusInput
//         handleInputChange={handleInputChange}
//         handleSubmit={handleSubmit}
//         inputSearch={inputSearch}
//         tasks={tasks}
//       />
//     </>
//   );
// }

// export default App;
