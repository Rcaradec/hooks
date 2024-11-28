import SearchInput from "./SearchInput";
import FoundCity from "./FoundCity";
import { useRef } from "react";
import "./Weather.scss";
import useWeather from "./api/useWeather";

export const Weather = () => {
  const { error, fetchCity, cityObj } = useWeather();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCityClick = () => {
    if (inputRef.current) {
      fetchCity(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <>
      {cityObj?.name && <h1>Météo de {cityObj?.name}</h1>}
      <div className='weather__main_container'>
        <SearchInput inputRef={inputRef} handleCityClick={handleCityClick} />
        {cityObj && (
          <FoundCity
            city={cityObj?.name}
            temperature={cityObj?.temp}
            description={cityObj?.description}
          />
        )}

        {error && <strong style={{ color: "red" }}>{error}</strong>}
      </div>
    </>
  );
};
