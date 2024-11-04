import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../../utils/ThemeContext";
import { darkTheme, lightTheme } from "../../styles/theme";
import "./DataFetcher.scss";

type Quote = {
  id: number;
  quote: string;
  author: string;
};

const DataFetcher = () => {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const context = useContext(ThemeContext);

  const fetchRandomQuote = () => {
    axios
      .get("https://dummyjson.com/quotes")
      .then((response) => {
        const randomIndex = Math.floor(
          Math.random() * response.data.quotes.length
        );

        setRandomQuote(response.data?.quotes[randomIndex]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => fetchRandomQuote(), []);

  if (!context) return <p>Loading Context...</p>;

  const { theme, toggleTheme } = context;
  const buttonClass = `dataFetcher__btn--${
    theme === "darkTheme" ? "dark" : "light"
  }`;

  return (
    <>
      <div
        className="dataFetcher__container"
        style={
          theme === "darkTheme"
            ? {
                backgroundColor: darkTheme.backgroundColor,
                color: darkTheme.color,
              }
            : {
                backgroundColor: lightTheme.backgroundColor,
                color: lightTheme.color,
              }
        }
      >
        <button className={buttonClass} onClick={toggleTheme}>
          Toggle color theme
        </button>
        <div>
          <h3>{randomQuote?.quote}</h3>
          <p>{randomQuote?.author}</p>
        </div>
        <button className={buttonClass} onClick={() => fetchRandomQuote()}>
          Next one
        </button>
      </div>
    </>
  );
};

export default DataFetcher;
