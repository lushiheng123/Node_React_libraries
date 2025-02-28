import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

const BACKEND_PORT = process.env.BACKEND_PORT || 3001;
app.get("/", (req, res) => {
  res.send("你好");
});
app.listen(BACKEND_PORT, () => {
  console.log(`port is running on ${BACKEND_PORT}`);
});
