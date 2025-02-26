import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios"; // 假设已安装 axios

export default function Navbar() {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState(""); // 存储用户名
  const navigate = useNavigate();

  // 在组件挂载时，从后端获取用户名（可选）
  useEffect(() => {
    const fetchUser = async () => {
      if (cookies.token) {
        try {
          const response = await axios.get("http://localhost:3001/protected", {
            withCredentials: true, // 确保发送 cookie
          });
          setUsername(response.data.user.username || "User");
        } catch (error) {
          console.error("Error fetching user:", error);
          setUsername("User");
        }
      }
    };
    fetchUser();
  }, [cookies.token]);

  // 处理登出逻辑
  const handleLogout = () => {
    removeCookie("token", { path: "/" }); // 清除 token cookie
    setUsername(""); // 清空用户名
    navigate("/login"); // 跳转到登录页
  };

  return (
    <nav
      style={{
        backgroundColor: "#f0f0f0",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }}
      >
        {/* 左侧：Home 按钮 */}
        <li>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#333",
              padding: "5px 10px",
            }}
          >
            Home
          </Link>
        </li>
        {/* 右侧：动态显示登录状态 */}
        <li style={{ display: "flex", gap: "20px" }}>
          {cookies.token ? (
            <>
              <span style={{ padding: "5px 10px" }}>{username}</span>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#333",
                  textDecoration: "underline",
                  padding: "5px 10px",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#333",
                  padding: "5px 10px",
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#333",
                  padding: "5px 10px",
                }}
              >
                Register
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
