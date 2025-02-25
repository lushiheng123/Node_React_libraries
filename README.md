<!-- filepath: /D:/代码/学习/react学习/25_2_24/README.md -->
<h1  align="center">react-cookie 库的学习</h1>

[react-cookie 文档](http://ynpmjs.com/package/react-cookie)

## 初始化 Git 仓库

```sh
git init
git checkout -b react-cookie
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin react-cookie
```

## 1.安装 react 项目，作为 clint 里面的前端

```sh
npm create vite@latest ./
npm installl react-cookie
```

## 2.基础文件

> src/APP.jsx

```jsx
import React from "react";
import { useCookies } from "react-cookie";

import NameForm from "./components/NameForm";

function App() {
  const [cookies, setCookie] = useCookies(["name"]);

  const onChange = (newName) => {
    setCookie("name", newName);
  };

  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
    </div>
  );
}

export default App;
```

> src\components\NameForm.jsx

```jsx
import React, { useState } from "react";

function NameForm({ name, onChange }) {
  const [inputValue, setInputValue] = useState(name || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    onChange(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NameForm;
```

### 效果：可以生成了 cookie 保存了

![alt text](README_Images/README/image.png) > ![alt text](README_Images/README/image-1.png)
