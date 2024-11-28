import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./utils/ThemeContext";
import { Weather } from "./components/Weather/Weather";

function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Weather />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
