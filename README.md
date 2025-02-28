<h1 align = "center">papaparse 库学习</h1>

### `papaparse 是一个专门处理 CSV（Comma-Separated Values）文件的 JavaScript 库，主要功能是将 CSV 数据转换为 JSON 格式，或者反过来将 JSON 转换为 CSV。`

````

```sh
git init
git checkout -b papaparse
git add .
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin papaparse
````

```sh
git init
git git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git remote -v
git fetch origin
git branch -r
git pull origin papaparse
```

# 1. 初始化环境

### `index.js`

```js
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
```

# `package.json`

```json
{
  "name": "2-28",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "nodemon": "^3.1.9"
  }
}
```

# 2. 安装`papaparse`包

```sh
npm install papaparse
```

# 3. 读文件的示例，CSV->JSON,是 csv,可调`header`,`dynamicTyping`,`skipEmptyLines`

```js
import fs from "fs";
import Papa from "papaparse";

// 读取 CSV 文件
const csvFilePath = "./data.csv";
const csvFile = fs.readFileSync(csvFilePath, "utf8");

// 使用 PapaParse 解析 CSV 文件
Papa.parse(csvFile, {
  //header: true：告诉 papaparse 将 CSV 的第一行视为标题（字段名），解析结果以对象数组形式返回，每个对象的键是标题，值是对应行的数据
  //如果需要将 T 转换为数字，可以在配置中添加 dynamicTyping: true
  //跳过空行skipEmptyLines: true
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: function (results) {
    console.log(results.data);
  },
});
```

![alt text](README_Images/README/image.png)
![alt text](README_Images/README/image-1.png)

# 4. CSV -> JSON

```JS
import fs from "fs";
import Papa from "papaparse";

// 假设有一个 CSV 字符串（或从文件读取）
const csvString = `Name,Age,City
Alice,25,New York
Bob,30,London`;

// 解析 CSV 到 JSON
Papa.parse(csvString, {
  header: true, // 第一行作为表头
  complete: (result) => {
    const jsonData = result.data;
    console.log("CSV 转换为 JSON:");
    console.log(JSON.stringify(jsonData, null, 2));

    // 可选：写入文件
    // fs.writeFileSync("output.json", JSON.stringify(jsonData, null, 2));
  },
  error: (error) => {
    console.error("解析出错:", error);
  },
});
```

### 结果

![alt text](README_Images/README/image-2.png)

# 5. JSON -> CSV

```JS
import fs from "fs";
import Papa from "papaparse";

// JSON 数据
const jsonData = [
  { Name: "Alice", Age: 25, City: "New York" },
  { Name: "Bob", Age: 30, City: "London" },
];

// 转换为 CSV
const csv = Papa.unparse(jsonData, {
  quotes: true, // 强制字段加引号
  delimiter: ",", // 分隔符
});
console.log("JSON 转换为 CSV:");
console.log(csv);

// 可选：写入文件
fs.writeFileSync("output.csv", csv);
```

![alt text](README_Images/README/image-3.png)

### fields 控制标头顺序

```js
import fs from "fs";
import Papa from "papaparse";

// JSON 数据
const jsonData = [
  { Name: "Alice", Age: 25, City: "New York" },
  { Name: "Bob", Age: 30, City: "London" },
];

// 转换为 CSV
const csv = Papa.unparse({
  fields: ["City", "Name", "Age"], // 指定字段顺序
  data: jsonData,
});
console.log("JSON 转换为 CSV:");
console.log(csv);

// 可选：写入文件
// fs.writeFileSync("output.csv", csv);
```

![alt text](README_Images/README/image-4.png)
