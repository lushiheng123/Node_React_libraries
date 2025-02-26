<h1 align = "center">jsonwebtoken学习</h1>

[jsonwebtoken 文档](https://www.npmjs.com/package/jsonwebtoken)

```sh
git init
git checkout -b jsonwebtoken
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin jsonwebtoken
```

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
# 2. 