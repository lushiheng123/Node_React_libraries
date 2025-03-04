import React from "react";
import { proxy, useSnapshot } from "valtio";
import { useEffect } from "react";
// 创建一个全局状态对象，使用 proxy 包裹
import { state } from "./state/state";
// 一个简单的计时器组件，展示 count 并允许增加
const Counter = () => {
  const snap = useSnapshot(state);

  return (
    <div>
      {/* 显示当前 count */}
      <div>Count: {snap.count}</div>
      {/* 显示固定文本 */}
      <div>Text: {snap.text}</div>
      {/* 点击按钮增加 count */}
      <button onClick={() => ++state.count}>Increment</button>
    </div>
  );
};

// 一个外部函数，用于定时修改状态（模拟“随时随地修改”）
const startInterval = () => {
  setInterval(() => {
    // 每 1 秒增加 count
    ++state.count;
  }, 1000);
};

// 主组件
export default function App() {
  useEffect(() => {
    startInterval();
  }, []); // 仅在组件挂载时执行一次

  return (
    <div>
      <h1>Valtio Example</h1>
      <Counter />
    </div>
  );
}
