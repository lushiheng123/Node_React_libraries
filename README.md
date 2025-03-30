<h1 align="center">react-i18next库学习</h1>

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
