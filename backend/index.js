import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";

// 加载环境变量
dotenv.config();

// 创建 Express 应用
const app = express();

// 启用 JSON 解析中间件（解析 application/json 请求体）
app.use(express.json());

// 启用 cookie-parser（处理 cookie 中的 JWT）
app.use(cookieParser());

// 启用 CORS（允许前端跨域请求，例如 localhost:5173）
app.use(
  cors({
    origin: `${process.env.CLIENT_SERVER || "http://localhost:5173"}`, // 替换为你的前端端口
    credentials: true, // 允许发送 cookies 和 Authorization 头
  })
);

// 模拟用户数据库（实际应用应使用 MongoDB、PostgreSQL 等）
let users = {
  testuser: {
    id: 1,
    username: "testuser",
    password: "password123", // 模拟密码（实际应用应加密，如用 bcrypt）
  },
};

// 注册接口：保存新用户
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // 验证输入
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // 检查用户名是否已存在
  if (users[username]) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // 模拟保存用户（实际应用应加密密码并存入数据库）
  users[username] = {
    id: Object.keys(users).length + 1,
    username,
    password, // 实际应用应加密
  };

  res.json({ message: "Registration successful, please login" });
});

// 登录接口：生成 JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 验证用户是否存在和密码是否正确
  if (
    !username ||
    !password ||
    !users[username] ||
    users[username].password !== password
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 生成 JWT
  const payload = {
    user: { id: users[username].id, username: users[username].username },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  // 将 JWT 存储到 cookie
  res.cookie("token", token, {
    path: "/",
    secure: false, // 开发环境用 false，生产环境用 true（需要 HTTPS）
    sameSite: "Lax", // 允许跨域请求
    httpOnly: true, // 防止 XSS 攻击
  });

  res.json({
    message: "Login successful",
    token, // 同时返回 token（前端可选择性使用）
  });
});

// 保护的路由：验证 JWT
app.get("/protected", (req, res) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1]; // 从 cookie 或 Authorization 头获取
  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      message: "Protected content",
      user: decoded.user,
    });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid Token", error: err.message });
  }
});

// 根路由，测试服务器运行
app.get("/", (req, res) => {
  res.json(users);
});

// 启动服务器
app.listen(process.env.CLIENT_PORT || 3002, () => {
  console.log(`Server is running on port ${process.env.CLIENT_PORT || 3002}`);
});
