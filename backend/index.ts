import { z } from "zod";

// 创建一个字符串模式的 schema
const mySchema = z.string();

// 解析
// console.log(mySchema.parse("tuna")); // 输出: "tuna"
// console.log(mySchema.parse(12)); // 抛出 ZodError

// safeparse不会中断程序
console.log(mySchema.safeParse("tuna")); // 输出: { success: true, data: "tuna" }
console.log(mySchema.safeParse(12)); // 输出: { success: false, error: ZodError }
