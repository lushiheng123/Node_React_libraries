import reader from "xlsx";

// Reading our test file
const file = reader.readFile("./data.xlsx");

let data = [];
const sheets = file.SheetNames;
