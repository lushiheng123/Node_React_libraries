<h1 align = "center" >zod库学习</h1>

[zod 官方](https://www.npmjs.com/package/zod#nullish)

```sh
git init
git checkout -b zod
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin zod
```

```sh
git init
git git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git remote -v
git fetch origin
git branch -r
git pull origin zod
```

# 1. 项目初始化，都用 ts

### 前端 client/:

```sh
npm create vite@latest ./ 选TS
npm i zod
```

### 后端 backend/

```sh
npm init -y
npm install express zod typescript @types/express @types/node ts-node
npx tsc --init
```

### 后端用`npx ts-node index.ts`启动

# 2. 用`safePrase`而不是 prase 保证不会报错

```ts
import { z } from "zod";

// 创建一个字符串模式的 schema
const mySchema = z.string();

// 解析
// console.log(mySchema.parse("tuna")); // 输出: "tuna"
// console.log(mySchema.parse(12)); // 抛出 ZodError

// safeparse不会中断程序
console.log(mySchema.safeParse("tuna")); // 输出: { success: true, data: "tuna" }
console.log(mySchema.safeParse(12)); // 输出: { success: false, error: ZodError }
```

![alt text](README_Images/README/image.png)

# 3.
