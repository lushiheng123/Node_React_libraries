<h1 align="center">react-i18next库学习</h1>

## 目录

- [环境安装](#环境安装)
- [1. 创建 locals/en.json 和 zh.json 文件](#1-创建-localsenjson-和-zhjson-文件)
- [2. 用`select`和`option`可以做一个下拉框优化一下前端](#2-用select和option可以做一个下拉框优化一下前端)
- [3. 根据用户的浏览器语言自动设置默认语言](#3根据用户的浏览器语言自动设置默认语言)
- [4. 动态加载语言文件](#4-动态加载语言文件)
- [5. 调整文件结构](#5-调整文件结构)
- [6. 复杂翻译](#6-复杂翻译)

```sh
git init
git checkout -b i18next
git add .
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin i18next
```

```sh
git init
git git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git remote -v
git fetch origin
git branch -r
git pull origin i18next
```

# 环境安装

```sh
npm install i18next react-i18next
```

```sh
.
├── App.jsx
├── assets
│ └── react.svg
├── i18n.jsx
├── index.css
├── locales
│ ├── en.json
│ └── zh.json
└── main.jsx
```

# 1. 创建 locals/en.json 和 zh.json 文件

### en.json

```json
{
  "welcome": "Welcome to my app",
  "switch_language": "Switch Language"
}
```

### zh.json

```json
{
  "welcome": "欢迎使用我的应用",
  "switch_language": "切换语言"
}
```

### i18n.jsx

```jsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

i18n
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources: {
      en: { translation: en }, // 英文翻译
      zh: { translation: zh }, // 中文翻译
    },
    lng: "zh", // 默认语言
    fallbackLng: "zh", // 如果当前语言翻译缺失，回退到英文
    interpolation: {
      escapeValue: false, // React 默认会处理 XSS，不需要额外转义
    },
  });

export default i18n;
```

### App.jsx

```jsx
import { useTranslation } from "react-i18next";
import React from "react";
function App() {
  const { t, i18n } = useTranslation();

  // 切换语言的函数
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={toggleLanguage}>{t("switch_language")}</button>
    </div>
  );
}

export default App;
```

### 效果

![alt text](README_Images/README/chrome-capture-2025-3-31.gif)

# 2. 用`select`和`option`可以做一个下拉框优化一下前端

```jsx
import { useTranslation } from "react-i18next";
import React from "react";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="items-center justify-center flex flex-col w-[100vw] h-[100vh]">
      <div className="bg-yellow-200 text-red-500 p-4 rounded">
        <div className="">{t("welcome")}</div>
        <div className="mt-2">
          {/* 显示当前语言 */}
          <p>当前语言: {i18n.language === "en" ? "English" : "中文"}</p>
          {/* 下拉菜单切换语言 */}
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="mt-2 p-1 border rounded"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
```

### 效果

![alt text](README_Images/README/image.png)

# 3.根据用户的浏览器语言自动设置默认语言。我们可以使用 `i18next-browser-languagedetector` 插件。

```sh
npm install i18next-browser-languagedetector
```

```jsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

i18n
  .use(LanguageDetector) // 添加语言检测
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: "zh", // 回退语言
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator", "htmlTag", "path", "subdomain"], // 检测顺序
      caches: ["localStorage"], // 将语言选择缓存到 localStorage
    },
  });

export default i18n;
```

# 4. 动态加载语言文件

### 目前语言文件是静态导入的（import en from './locales/en.json'）。如果你的项目语言文件很多，或者需要按需加载，可以使用 `i18next-http-backend`动态加载。

```sh
npm install i18next-http-backend
```

# 5. 调整文件结构

![alt text](README_Images/README/image-2.png)

# 6. 复杂翻译

![alt text](README_Images/README/image-3.png)

```json
{
  "welcome": "Welcome to my app",
  "switch_language": "Switch Language",
  "greeting": "Hello, {{name}}!",
  "items": "You have {{count}} items",
  "items_0": "You have no items",
  "items_1": "You have 1 item"
}
```

```json
{
  "welcome": "欢迎使用我的应用",
  "switch_language": "切换语言",
  "greeting": "你好, {{name}}!",
  "items": "你有 {{count}} 个项目",
  "items_0": "你没有项目",
  "items_1": "你有 1 个项目"
}
```

```jsx
import { useTranslation } from "react-i18next";
import React from "react";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="items-center justify-center flex flex-col w-[100vw] h-[100vh]">
      <div className="bg-yellow-200 text-red-500 p-4 rounded">
        <div>{t("welcome")}</div>
        <div>{t("greeting", { name: "Alice" })}</div>
        <div>{t("items", { count: 0 })}</div>
        <div>{t("items", { count: 1 })}</div>
        <div>{t("items", { count: 5 })}</div>
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="mt-2 p-1 border rounded"
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>
    </div>
  );
}

export default App;
```
