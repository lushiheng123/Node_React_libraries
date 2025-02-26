import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "name",
    "backendCookie",
  ]); // 改成 backendCookie
  const [backendResponse, setBackendResponse] = useState(null); // 存储后端返回的数据

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
    getClientCookieSendToBackend(); // 提交后请求后端
  };

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/", // 确保路径与后端一致
      secure: false, // 开发环境用 false
      sameSite: "Lax", // 允许跨域请求
    });
  };

  // 实际上是从送给后端
  const getClientCookieSendToBackend = () => {
    fetch("http://localhost:4000/", {
      method: "GET",
      credentials: "include", // 确保发送 cookie
    })
      .then((response) => response.text())
      .then((data) => setBackendResponse(data))
      .catch((error) => console.error("Error fetching backend:", error));
  };

  // 设置一个按钮，从后端获取 set-cookie 中的 cookie
  const Backend_set_cookie = () => {
    fetch("http://localhost:4000/set-cookie", {
      method: "GET",
      credentials: "include", // 确保发送 cookie
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data); // 调试用
        setBackendResponse(data.message); // 更新后端响应消息
        // 后端设置的 cookie 应该自动被浏览器和 useCookies 捕获，不需要额外 setCookie
      })
      .catch((error) => console.error("Error fetching set-cookie:", error));
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
        {/* 显示前端设置的 cookie */}
        {cookies.name && <h1>Frontend Cookie (Name): {cookies.name}</h1>}
        {/* 显示后端设置的 cookie */}
        {cookies.backendCookie && (
          <h2>Backend Cookie: {cookies.backendCookie}</h2>
        )}
      </div>
      {backendResponse && <p>Backend Response: {backendResponse}</p>}
      <button onClick={handleSubmit}>Fetch Client Cookie (Show Cookies)</button>
      <button onClick={Backend_set_cookie}>Get Backend Cookie</button>
      <button onClick={() => removeCookie("name", { path: "/" })}>
        Clear Frontend Cookie
      </button>
      <button onClick={() => removeCookie("backendCookie", { path: "/" })}>
        Clear Backend Cookie
      </button>
    </div>
  );
}
