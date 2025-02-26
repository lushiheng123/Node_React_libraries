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
