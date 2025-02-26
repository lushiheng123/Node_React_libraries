import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["name", "serverName"]); // 监听 name 和 serverName
  const [backendResponse, setBackendResponse] = useState(null); // 存储后端返回的数据

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
    fetchBackend(); // 提交后请求后端
  };

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/", // 确保路径与后端一致
      secure: false, // 开发环境用 false
      sameSite: "Lax", // 允许跨域请求
    });
  };

  const fetchBackend = () => {
    fetch("http://localhost:4000/set-cookie", {
      // 改为请求 /set-cookie 路由
      method: "GET",
      credentials: "include", // 确保发送 cookie
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendResponse(data.message); // 显示后端返回的消息
        console.log("Backend response:", data);
      })
      .catch((error) => console.error("Error fetching backend:", error));
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
      <div>
        {cookies.name && <h1>Hello {cookies.name}!</h1>}
        {cookies.serverName && <h2>Backend Cookie: {cookies.serverName}</h2>}
      </div>
      {backendResponse && <p>{backendResponse}</p>}
      <button onClick={() => removeCookie("name", { path: "/" })}>
        Clear Name Cookie
      </button>
      <button onClick={() => removeCookie("serverName", { path: "/" })}>
        Clear Server Cookie
      </button>
    </div>
  );
}
