<h1 align="center">valtio状态库学习</h1>

#1. 暂时不用
[valito](https://www.npmjs.com/package/valtio)

```sh
git init
git checkout -b valtio
git add .
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin valtio
```

```sh
git init
git git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git remote -v
git fetch origin
git branch -r
git pull origin valtio
```

# 1. `App.jsx`

```jsx
import React from "react";
import { useSnapshot } from "valtio";
import { useEffect } from "react";
import { state } from "./state/state"; // 导入状态

const Counter = () => {
  const snap = useSnapshot(state);

  return (
    <div>
      <div>Count: {snap.count}</div>
      <div>Text: {snap.text}</div>
      <button onClick={() => ++state.count}>Increment</button>
    </div>
  );
};

const startInterval = () => {
  setInterval(() => {
    ++state.count;
  }, 1000);
};

export default function App() {
  useEffect(() => {
    startInterval();
  }, []);

  return (
    <div>
      <h1>Valtio Example</h1>
      <Counter />
    </div>
  );
}
```

### `state/state.js`

```js
// src/state/state.js
import { proxy } from "valtio";

export const state = proxy({ count: 0, text: "hello" });
```

### 效果

![alt text](README_Images/README/image.png)
