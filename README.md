<h1 align = "center">jsonwebtoken学习</h1>

[jsonwebtoken 文档](https://www.npmjs.com/package/jsonwebtoken)

```sh
git init
git checkout -b jsonwebtoken
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin jsonwebtoken
```
```sh
git init
git git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git remote -v
git fetch origin
git branch -r
git pull origin jsonwebtoken
```
![alt text](README_Images/README/image-7.png)

# 1. 初始化前后端

### 前端 `client`

```sh
npm create vite@latest ./
```

### 后端 `backend`

```sh
npm init -y
npm install express nodemon dotenv jsonwebtoken
```

### 后端`index.js`验证端口是否正确

```js
import expree from "express";
import dotenv from "dotenv";
dotenv.config();
const app = expree();

app.get("/", (req, res) => {
  res.send("你好");
});
app.listen(process.env.CLIENT_PORT || 3002, () => {
  console.log(`port is running on ${process.env.CLIENT_PORT || 3001}`);
});
```

### 后端正常

![alt text](README_Images/README/image.png)
![alt text](README_Images/README/image-1.png)

# 2. 让 Grok3 写了一个脚本，本地设置了用户名和密码

```js
// 定义一个简单的用户对象（模拟数据库中的用户信息）
const users = {
  testuser: {
    id: 1,
    username: "testuser",
    email: "testuser@example.com",
    password: "password123", // 模拟密码（实际应用应加密）
  },
};
```

### 然后写了一个`http://www.localhost:3001/login`路由，以`post`的方式，生成`jwt`

```js
app.post("/login", (req, res) => {
  // 1. 从请求体获取用户名和密码（模拟前端发送的登录数据）
  const { username, password } = req.body;
  console.log(req.body);
  // 2. 验证用户是否存在和密码是否正确
  if (
    !username ||
    !password ||
    !users[username] ||
    users[username].password !== password
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
```

### 效果，这里用`postman`测试的时候，注意添加好`Content-Type:"application/json"`的请求体，验证，添加好了 jwt

![alt text](README_Images/README/image-2.png)
![alt text](README_Images/README/image-3.png)

### 另外用`protected`路由作为`get`办法测试，加上 token

![alt text](README_Images/README/image-4.png)

```js
// 保护的路由：验证 JWT
app.get("/protected", (req, res) => {
  // 1. 检查 Authorization 头是否存在
  // 客户端通常在请求头中发送：Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  // 2. 解析 token（假设格式为 "Bearer <token>"）
  const token = authHeader.split(" ")[1]; // 提取 token（去掉 "Bearer " 前缀）
  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    // 3. 使用 jwt.verify 验证 token
    // 参数：
    // - token：客户端发送的 token
    // - secret：与生成时相同的密钥，用于验证签名
    // 如果验证通过，decoded 包含 payload（这里是 { user }）
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. 如果验证成功，返回受保护的内容
    res.json({
      message: "Protected content",
      user: decoded.user, // 返回解码后的用户信息
    });
  } catch (err) {
    // 5. 如果 token 无效（过期、签名错误等），返回错误
    return res
      .status(401)
      .json({ message: "Invalid Token", error: err.message });
  }

  // 6. 打印 cookie（可选，用于调试，如果通过 cookie 传递 token）
  console.log("Cookies:", req.headers.authorization);
});
```

### 效果：用合法的 token 请求到了用户

![alt text](README_Images/README/image-5.png)
![alt text](README_Images/README/image-6.png)

### `decode-token`解码？我也不太懂

```js
// 测试 token 解码（不验证签名，仅用于学习）
app.get("/decode-token", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "A token is required for decoding" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for decoding" });
  }

  // 使用 jwt.decode 解码 token（不验证签名）
  const decoded = jwt.decode(token);
  res.json({
    message: "Token decoded (without verification)",
    decoded, // 返回解码后的 payload
  });
});
```

### 效果

![alt text](README_Images/README/image-8.png)

# 3. 写前后端结合（用户保存到后面，实际验证交给了后端）

### 前端安装组件

```sh
npm install react-router-dom react-cookie axios
```

### 后端安装组件

```sh
npm i cookie-parser cors
```

# 效果

![alt text](README_Images/README/image-9.png)
![alt text](README_Images/README/image-10.png)

### 项目目前的效果和代码已经上传，好好看一下，下一步就是将数据保存到数据库中，目前到此为止
