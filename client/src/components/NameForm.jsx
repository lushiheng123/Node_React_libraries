import React, { useState } from "react";

function NameForm({ name, onChange }) {
  const [inputValue, setInputValue] = useState(name || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    onChange(inputValue);
  };

  return (
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
  );
}

export default NameForm;
