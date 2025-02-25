import React from "react";
import { useCookies } from "react-cookie";

import NameForm from "./components/NameForm";

function App() {
  const [cookies, setCookie] = useCookies(["name"]);

  const onChange = (newName) => {
    setCookie("name", newName);
  };

  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
    </div>
  );
}

export default App;
