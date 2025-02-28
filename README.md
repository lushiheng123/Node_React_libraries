<h1 align="center">xlsx库学习</h1>

```sh
git init
git checkout -b xlsx
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin xlsx
```

```sh
git init
git git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git remote -v
git fetch origin
git branch -r
git pull origin xlsx
```

# 1. 初始化环境

### 后端`index.js`

```js
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
```

### 后端`package.json`

```json
{
  "name": "backend",
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

# 2. 安装 xlsx

```sh
npm install xlsx
```

### 假设一开始我们的数据是这样的

![alt text](README_Images/README/image.png)

### 3. xlsx.reader 的简单用法

### `reader.readFile.SheetNames`

```js
import reader, { read } from "xlsx";

//reader.readFile读文档
const file = reader.readFile("./data.xlsx");
let data = [];
// reader.readFile("文件名").SheetNames读出当前文档页面的名字
const sheets = file.SheetNames;
console.log(`一共有${sheets.length}个页面`);
console.log(`这些页面的名字是:${sheets}`);
```

### 处理全部数据 `reader.utils.sheet_to_json`

```js
import reader, { read } from "xlsx";
//reader.readFile读文档
const file = reader.readFile("./data.xlsx");
let data = [];
//获取xlsx文件全部内容
const sheets = file.SheetNames;
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}
// console.log(data);
//只获取sheet1里面的内容
const sheet1 = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
console.log(sheet1);
```

### 3. 获取某一个单元格的值

```js
import reader, { read } from "xlsx";
//reader.readFile读文档
const file = reader.readFile("./data.xlsx");

// 获取某一个sheet1单元格的值，比方说B4
const cellValue = file.Sheets[file.SheetNames[0]]["B4"].v;
console.log(`The value of cell B4 is: ${cellValue}`);
```

# 4. 解析单元格化成行列，`reader.utils.decode_range(sheet["!ref"]);`

```js
import reader, { read } from "xlsx";
//reader.readFile读文档
const file = reader.readFile("./data.xlsx");

// 获取当前有多少行数据，（比方说我们这个sheet1的第六行已经为空）
const sheet = file.Sheets[file.SheetNames[0]];
const range = reader.utils.decode_range(sheet["!ref"]);
const rowCount = range.e.r + 1;
// 获取单元格的范围
console.log(sheet["!ref"]);
// s开始:start,e结束:end,c列:column,r行:row
console.log(range);
//看看有多少行数据
console.log(`The number of rows is: ${rowCount}`);
```

# 5. 写入`writeFile`

```js
import reader from "xlsx";

// Reading the file
const file = reader.readFile("./data.xlsx");

// Sample data set
let student_data = [
  {
    Student: "Nikhil",
    Age: 22,
    Branch: "ISE",
    Marks: 70,
  },
  {
    Student: "Amitha",
    Age: 21,
    Branch: "EC",
    Marks: 80,
  },
];

// Check if "Sheet3" already exists
if (file.SheetNames.includes("Sheet3")) {
  console.log("Sheet3 already exists");
} else {
  const ws = reader.utils.json_to_sheet(student_data);
  reader.utils.book_append_sheet(file, ws, "Sheet3");

  // Writing to our file
  reader.writeFile(file, "./data.xlsx");
  console.log("Sheet3 has been added");
}
```

### 效果

![alt text](README_Images/README/image-1.png)
