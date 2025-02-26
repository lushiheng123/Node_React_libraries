import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]); // 仅需要 setCookie

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          username,
          password,
        },
        {
          withCredentials: true, // 确保发送 cookie
        }
      );
      setMessage(response.data.message);
      // 验证 cookie 是否设置（可选，后端已通过 cookie 返回 token）
      const token = response.data.token;
      if (token) {
        setCookie("token", token, {
          path: "/",
          secure: false,
          sameSite: "Lax",
        });
      }
      navigate("/protected"); // 登录成功后跳转到受保护页面
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
