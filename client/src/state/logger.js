// logger.js
import { subscribe } from "valtio";
import { state } from "./state";

// 监听整个状态
subscribe(state, () => {
  console.log("State changed:", state);
});

// 只监听 count 变化
subscribe(state.count, () => {
  console.log("Count changed to:", state.count);
});
