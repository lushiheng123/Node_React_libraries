<h1  align="center">cookie-parser 库的学习</h1>

[cookie-parser 文档](https://www.npmjs.com/package/cookie-parser)

# 初始化`git`仓库

```sh
git init
git checkout -b cookie-parser
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin cookie-parser
```

# 1. 初始化前后端,安装 cookie-parser

### 前端:`npm create vite@latest./`

### 后端：`npm init`,`npm install express nodemon dotenv cookie-parser`

#### 后端`package.json`设置为`"type":"module"`和`"server":"nodemon index.js"`

### 写一个简单的后端`index.js`

```js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Cookies:", req.cookies);
  console.log("Signed Cookies", req.signedCookies);
  res.send(`
    <h1>hello world</h1>
    <h2>${JSON.stringify(req.cookies)}</h2>
    <h2>${JSON.stringify(req.signedCookies)}</h2>
  `);
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
```

### 测试一下访问`http://www.localhost:4000/`

### `终端`

![alt text](README_Images/README/image.png)

### 渲染

![alt text](README_Images/README/image-1.png)

# 2. 前端用`react-cookie`设置 cookie，用简单的 useCookies 钩子

> npm install react-cookie

### 修改好的`App.js`

```jsx
import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [cookies, setCookie] = useCookies(["name"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
  };

  const onChange = (newName) => {
    setCookie("name", newName);
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
      <div>{cookies.name && <h1>Hello {cookies.name}!</h1>}</div>
    </div>
  );
}
```

### 前端的效果:可以有 cookie

![alt text](README_Images/README/image-2.png)
![alt text](README_Images/README/image-3.png)

# 3. 因为前后端不一个端口，互通不了，用`后端`安装`CORS`组件去做到跨域，或者 `axios`

> npm install cors

# 4. 先做到后端获取前端的 cookie

### `index.js`

```js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // 安装：npm install cors

dotenv.config();
const app = express();

// 启用 CORS，允许来自前端的请求（例如 localhost:5173）
app.use(
  cors({
    origin: `${process.env.CLIENT_SERVER}`, // 替换为你的前端运行端口
    credentials: true, // 允许发送 cookies
  })
);

// 启用 cookie-parser
app.use(cookieParser());

// 读取 cookie 的路由
app.get("/", (req, res) => {
  console.log("Cookies:", req.cookies);
});

// 启动服务器
app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
```

### `App.jsx`

```jsx
import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [cookies, setCookie] = useCookies(["name"]);
  const [backendResponse, setBackendResponse] = useState(null); // 存储后端返回的数据

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
    getClientCookieSendToBackend(); // 提交后请求后端
  };

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/", // 确保路径与后端一致
      secure: false, // 开发环境用 false
      sameSite: "Lax", // 允许跨域请求
    });
  };

  const getClientCookieSendToBackend = () => {
    fetch("http://localhost:4000/", {
      method: "GET",
      credentials: "include", // 确保发送 cookie
    })
      .then((response) => response.text())
      .then((data) => setBackendResponse(data))
      .catch((error) => console.error("Error fetching backend:", error));
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
      <div>{cookies.name && <h1>Hello {cookies.name}!</h1>}</div>
      {backendResponse && (
        <div dangerouslySetInnerHTML={{ __html: backendResponse }} />
      )}
    </div>
  );
}
```

### 效果：当提交表单，会显示前端的 cookie 在后端上，代表获取成功

![alt text](README_Images/README/image-4.png)
![alt text](README_Images/README/image-5.png)

# 5. 在这个基础上我们再设置将后端设置的 cookie 送给前端使用

### `App.jsx`

```jsx
import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "name",
    "backendCookie",
  ]); // 改成 backendCookie
  const [backendResponse, setBackendResponse] = useState(null); // 存储后端返回的数据

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
    getClientCookieSendToBackend(); // 提交后请求后端
  };

  const onChange = (newName) => {
    setCookie("name", newName, {
      path: "/", // 确保路径与后端一致
      secure: false, // 开发环境用 false
      sameSite: "Lax", // 允许跨域请求
    });
  };

  // 实际上是从送给后端
  const getClientCookieSendToBackend = () => {
    fetch("http://localhost:4000/", {
      method: "GET",
      credentials: "include", // 确保发送 cookie
    })
      .then((response) => response.text())
      .then((data) => setBackendResponse(data))
      .catch((error) => console.error("Error fetching backend:", error));
  };

  // 设置一个按钮，从后端获取 set-cookie 中的 cookie
  const Backend_set_cookie = () => {
    fetch("http://localhost:4000/set-cookie", {
      method: "GET",
      credentials: "include", // 确保发送 cookie
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data); // 调试用
        setBackendResponse(data.message); // 更新后端响应消息
        // 后端设置的 cookie 应该自动被浏览器和 useCookies 捕获，不需要额外 setCookie
      })
      .catch((error) => console.error("Error fetching set-cookie:", error));
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
      <button onClick={handleSubmit}>Fetch Client Cookie (Show Cookies)</button>
      <button onClick={Backend_set_cookie}>Get Backend Cookie</button>
      <button onClick={() => removeCookie("name", { path: "/" })}>
        Clear Frontend Cookie
      </button>
      <button onClick={() => removeCookie("backendCookie", { path: "/" })}>
        Clear Backend Cookie
      </button>
    </div>
  );
}
```

### `index.js`

```js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // 安装：npm install cors

dotenv.config();
const app = express();

// 启用 CORS，允许来自前端的请求（例如 localhost:5173）
app.use(
  cors({
    origin: `${process.env.CLIENT_SERVER}`, // 替换为你的前端运行端口
    credentials: true, // 允许发送 cookies
  })
);

// 启用 cookie-parser
app.use(cookieParser());

// 读取 cookie 的路由
app.get("/", (req, res) => {
  console.log("Cookies:", req.cookies);
  res.send(`
    <h1>Hello World</h1>
    <h2>All Cookies: ${JSON.stringify(req.cookies)}</h2>
  `);
});

app.get("/set-cookie", (req, res) => {
  // 后端设置一个 cookie 送给前端
  res.cookie("backendCookie", "BackendSet", {
    // 改成英文名称
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天后过期
    secure: false, // 开发环境用 false
    sameSite: "Lax", // 允许跨域请求
  });
  res.json({ message: "Cookie set from backend" });
});

// 启动服务器
app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT || 4000}`);
});
```

### 效果：前端页面控制获取后端 cookie

![alt text](README_Images/README/image-6.png)
![alt text](README_Images/README/image-7.png)
![alt text](README_Images/README/image-8.png)

# 6.
