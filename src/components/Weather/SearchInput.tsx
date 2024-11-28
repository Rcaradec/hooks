import React, { LegacyRef } from "react";
import "./SearchInput.scss";

type Props = {
  inputRef: LegacyRef<HTMLInputElement>;
  handleCityClick: () => void;
};

const SearchInput = ({ inputRef, handleCityClick }: Props) => {
  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type='text'
            className='input__container'
            placeholder='Enter a city'
            ref={inputRef}
          />
          <button
            style={{ marginLeft: "10px" }}
            onClick={handleCityClick}
            type='submit'
          >
            search
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchInput;
