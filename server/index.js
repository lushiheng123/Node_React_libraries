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

// 启用 cookie-parser（设置密钥）
app.use(cookieParser("zhenghaoxi")); // 设置签名密钥

// 读取 cookie 的路由
app.get("/", (req, res) => {
  console.log("Cookies:", req.cookies);
  console.log("Signed Cookies:", req.signedCookies); // 打印签名 cookie
  res.send(`
    <h1>Hello World</h1>
    <h2>All Cookies: ${JSON.stringify(req.cookies)}</h2>
    <h2>Signed Cookies: ${JSON.stringify(req.signedCookies)}</h2>
  `);
});

app.get("/set-cookie", (req, res) => {
  // 后端设置一个签名 cookie 送给前端
  res.cookie("backendCookie", "BackendSet", {
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天后过期
    secure: false, // 开发环境用 false
    sameSite: "Lax", // 允许跨域请求
    signed: true, // 设置为签名 cookie
  });
  res.json({ message: "Signed cookie set from backend" });
});

app.get("/clear-cookie", (req, res) => {
  // 清除后端设置的 cookie
  res.clearCookie("backendCookie", {
    path: "/",
    secure: false,
    sameSite: "Lax",
  });
  res.json({ message: "Cookie cleared from backend" });
});

// 启动服务器
app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT || 4000}`);
});
