import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "name",
    "backendCookie",
  ]); // 监听 name 和 backendCookie
  const [backendResponse, setBackendResponse] = useState(null); // 存储后端返回的数据

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
    fetchBackend(); // 提交后请求后端
  };

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/",
      secure: false,
      sameSite: "Lax",
    });
  };

  const fetchBackend = () => {
    fetch("http://localhost:4000/", {
      method: "GET",
      credentials: "include", // 确保发送 cookie
    })
      .then((response) => response.text())
      .then((data) => setBackendResponse(data))
      .catch((error) => console.error("Error fetching backend:", error));
  };

  const Backend_set_cookie = () => {
    fetch("http://localhost:4000/set-cookie", {
      method: "GET",
      credentials: "include", // 确保发送 cookie
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
        setBackendResponse(data.message);
        // 读取签名 cookie
        const signedCookie = cookies.get("backendCookie", { signed: true });
        console.log("Signed cookie value:", signedCookie);
      })
      .catch((error) => console.error("Error fetching set-cookie:", error));
  };

  const clearBackendCookie = () => {
    fetch("http://localhost:4000/clear-cookie", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBackendResponse(data.message);
        removeCookie("backendCookie", { path: "/" });
      })
      .catch((error) => console.error("Error clearing cookie:", error));
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
      <button onClick={handleSubmit}>Fetch Backend (Show Cookies)</button>
      <button onClick={Backend_set_cookie}>Get Backend Cookie</button>
      <button onClick={() => removeCookie("name", { path: "/" })}>
        Clear Frontend Cookie
      </button>
      <button onClick={clearBackendCookie}>Clear Backend Cookie</button>
    </div>
  );
}
