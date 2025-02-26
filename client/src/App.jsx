import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      {/* Navbar 作为全局导航，始终显示在所有页面 */}
      <Navbar />
      {/* 页面内容通过 Outlet 渲染 */}
      <Outlet />
    </div>
  );
}
