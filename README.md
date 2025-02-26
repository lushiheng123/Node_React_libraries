<!-- filepath: /D:/代码/学习/react学习/25_2_24/README.md -->
<h1  align="center">react-cookie 库的学习</h1>

[react-cookie 文档](http://ynpmjs.com/package/react-cookie)

## 初始化 Git 仓库

```sh
git init
git checkout -b react-cookie
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin react-cookie
```

## 1.安装 react 项目，作为 clint 里面的前端

```sh
npm create vite@latest ./
npm installl react-cookie
```

## 2.基础文件

> `src/APP.jsx`

```jsx
import React from "react";
import { useCookies } from "react-cookie";

import NameForm from "./components/NameForm";

function App() {
  const [cookies, setCookie] = useCookies(["name"]);

  const onChange = (newName) => {
    setCookie("name", newName);
  };

  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
    </div>
  );
}

export default App;
```

> `src\components\NameForm.jsx`

```jsx
import React, { useState } from "react";

function NameForm({ name, onChange }) {
  const [inputValue, setInputValue] = useState(name || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    onChange(inputValue);
  };

  return (
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
  );
}

export default NameForm;
```

### 效果：可以生成了 cookie 保存了（可以改进的点：是输入空的值，它还是会保存）

![alt text](README_Images/README/image.png)
![alt text](README_Images/README/image-1.png)

# 3. `<CookiesProvider defaultSetOptions />`放到根中，保存全局 cookie

![alt text](README_Images/README/image-2.png)

### 调整 cookie 时间，在 `main.jsx` 中修改，然后看看 expires 过期时间

> `main.jsx`

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie"; // 导入 CookiesProvider
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider
      defaultSetOptions={{
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }}
    >
      <App />
    </CookiesProvider>
  </StrictMode>
);
```

### 效果：过期时间显示了

![alt text](README_Images/README/image-3.png)

# 4. 在 `App.jsx` 设置过期时间覆盖 `main.jsx` 中的过期时间

### `App.jsx`

```jsx
const onChange = (newName) => {
  setCookie("name", newName, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  }); // 改成 1 天
};
```

![alt text](README_Images/README/image-4.png)

# 5.`setCookie` 或者 `removeCookie`里面的参数选项，添加了 removeCookie 的功能（可以先把 main 中的删了）

### `App.jsx`修改

```jsx
import React from "react";
import { useCookies } from "react-cookie";
import NameForm from "./components/NameForm";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天后过期
      secure: true, // 假设你在 HTTPS 下运行
      sameSite: "Strict", // 防止跨站请求
    });
  };

  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
      <button onClick={() => removeCookie("name", { path: "/" })}>
        Clear Name
      </button>
    </div>
  );
}

export default App;
```

![alt text](README_Images/README/image-5.png)

# 6. `useCookies()`钩子里面的`setCookie`里的 path，代表着 cookie 的路径，我们测试一下，`about`页面的 cookie 能不能到`think`路由里，前提是我们在 about 页面中的 setCookie 的 path 设置"/about"

### 先安装`react-router-dom`的库

> npm install react-router-dom

### 创建 pahes/About,Home,Think 三个界面，作为路由

### `App.jsx`

```jsx
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Think from "./pages/Think";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="think" element={<Think />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### `About.jsx`

```jsx
import React from "react";
import { useCookies } from "react-cookie";
import NameForm from "../components/NameForm";
export default function About() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/about",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天后过期
      secure: true, // 假设你在 HTTPS 下运行
      sameSite: "Strict", // 防止跨站请求
    });
  };
  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
      <button onClick={() => removeCookie("name", { path: "/" })}>
        Clear Name
      </button>
    </div>
  );
}
```

### `Home.jsx`

```jsx
import React from "react";
import { useCookies } from "react-cookie";
import NameForm from "../components/NameForm";
export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天后过期
      secure: true, // 假设你在 HTTPS 下运行
      sameSite: "Strict", // 防止跨站请求
    });
  };
  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
      <button onClick={() => removeCookie("name", { path: "/" })}>
        Clear Name
      </button>
    </div>
  );
}
```

### Think.jsx

```jsx
import React from "react";

export default function Think() {
  return <div>Think</div>;
}
```

### 效果就是 About 页面的 cookie 并不会在 think 中体现，因为代码`setCookie`中的 path 设置为了`/about`

# 6.`updateCookie学习`（用不到，先不学）

# 7. `withCookies`和`useCookies`的区别

### `类组件`简单说就是`class`定义的组件

![alt text](README_Images/README/image-6.png)

> npm i react-router-dom
