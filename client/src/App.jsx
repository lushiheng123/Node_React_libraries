import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [cookies, setCookie] = useCookies(["name"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
  };

  const onChange = (newName) => {
    setCookie("name", newName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>{cookies.name && <h1>Hello {cookies.name}!</h1>}</div>
    </div>
  );
}
