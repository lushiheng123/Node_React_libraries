// state.js
import { proxy } from "valtio";

// 创建一个全局状态对象，使用 proxy 包裹
export const state = proxy({ count: 0, text: "hello" });
