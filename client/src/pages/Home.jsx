import React from "react";
import { useCookies } from "react-cookie";
import NameForm from "../components/NameForm";
export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天后过期
      secure: true, // 假设你在 HTTPS 下运行
      sameSite: "Strict", // 防止跨站请求
    });
  };
  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
      <button onClick={() => removeCookie("name", { path: "/" })}>
        Clear Name
      </button>
    </div>
  );
}
