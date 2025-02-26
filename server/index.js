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

// 新增设置 cookie 的路由
app.get("/set-cookie", (req, res) => {
  // 后端设置一个 cookie
  res.cookie("serverName", "BackendSet", {
    path: "/", // 确保 cookie 可在所有路径下访问
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天后过期
    secure: false, // 开发环境用 false
    sameSite: "Lax", // 允许跨域请求
  });
  res.json({ message: "Cookie set from backend!" });
});

// 启动服务器
app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
