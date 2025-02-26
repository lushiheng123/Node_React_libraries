import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();

// 创建一个简单的用户对象
const user = {
  id: 1,
  username: "testuser",
  email: "testuser@example.com",
};

// 生成 JWT
app.get("/login", (req, res) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// 验证 JWT
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Protected content", user: decoded.user });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
});

app.listen(process.env.CLIENT_PORT || 3002, () => {
  console.log(`port is running on ${process.env.CLIENT_PORT || 3001}`);
});
