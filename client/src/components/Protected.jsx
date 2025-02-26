import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Protected() {
  const [message, setMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const response = await axios.get("http://localhost:3001/protected", {
          withCredentials: true, // 确保发送 cookie
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Access denied");
        navigate("/login"); // 未授权时跳转回登录页
      }
    };
    fetchProtected();
  }, [navigate]);

  return (
    <div>
      <h2>Protected Page</h2>
      {message && <p>{message}</p>}
      {cookies.token && <p>Current Token: {cookies.token}</p>}
    </div>
  );
}
