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

### 前端的效果:可以有cookie

![alt text](README_Images/README/image-2.png)
![alt text](README_Images/README/image-3.png)

# 3. 因为前后端不一个端口，互通不了，用`CORS`组件去做到互通