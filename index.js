import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("你好");
});

app.listen(3001, () => {
  console.log("port is running on 3000");
});
