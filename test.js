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
