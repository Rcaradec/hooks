import axios from "axios";
import { useState } from "react";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

type WeatherResponse = {
  name: string;
  weather: { description: string }[];
  main: { temp: number };
};

type CityObj = {
  name: string;
  description: string;
  temp: number;
};

const useWeather = () => {
  const [cityObj, setCityObj] = useState<CityObj | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCity = (city: string) => {
    axios
      .get<WeatherResponse>(
        `${baseUrl}${city}&appid=${apiKey}
`
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setCityObj({
          ...cityObj,
          name: data.name,
          temp: data.main.temp,
          description: data.weather[0].description,
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data");
      });
  };

  return { cityObj, fetchCity, error };
};

export default useWeather;
