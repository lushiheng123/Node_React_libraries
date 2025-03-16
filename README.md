<h1 align="center">Aos动画库的学习</h1>

# [官方文档](https://michalsnik.github.io/aos/)

```sh
git init
git checkout -b aos
git commit -m "first commit"
git remote add origin git@github.com:lushiheng123/Node_React_libraries.git
git push -u origin aos
```

# 1. 环境配置非常简单

```sh
 npm install aox
```

### 在 App.jsx 中添加

```jsx
import AOS from "aos";
import "aos/dist/aos.css";
```

# 2. 全局定义一个动画效果先

<details>

<summary>App.jsx</summary>

```jsx
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";
function App() {
  React.useEffect(() => {
    AOS.init({
      //   duration: 2000,
    });
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="text-center">Welcome to REact animation</h1>
        <br /> <br /> <br />
        <h1>Fade</h1>
        <div className="animation" data-aos="fade-up"></div>
        <div className="animation" data-aos="fade-down"></div>
        <div className="animation" data-aos="fade-right"></div>
        <div className="animation" data-aos="fade-left"></div>
        <div className="animation" data-aos="fade-up-right"></div>
        <div className="animation" data-aos="fade-up-left"></div>
        <div className="animation" data-aos="fade-down-right"></div>
        <div className="animation" data-aos="fade-down-left"></div>
        <h1>Flip</h1>
        <div className="animation" data-aos="flip-left"></div>
        <div className="animation" data-aos="flip-right"></div>
        <div className="animation" data-aos="flip-up"></div>
        <div className="animation" data-aos="flip-down"></div>
        <h1>Zoom Animation</h1>
        <div className="animation" data-aos="zoom-in"></div>
        <div className="animation" data-aos="zoom-in-up"></div>
        <div className="animation" data-aos="zoom-in-down"></div>
        <div className="animation" data-aos="zoom-in-left"></div>
        <div className="animation" data-aos="zoom-in-right"></div>
        <div className="animation" data-aos="zoom-out"></div>
        <div className="animation" data-aos="zoom-out-up"></div>
        <div className="animation" data-aos="zoom-out-down"></div>
        <div className="animation" data-aos="zoom-out-right"></div>
        <div className="animation" data-aos="zoom-out-left"></div>
      </div>
    </>
  );
}
export default App;
```

</details>

# 2. 一些官方 example

### `data-aos-duration="3000"`定义持续时间

![alt text](README_Images/README/chrome-capture-2025-3-16.gif)

### `data-aos-easing="linear"`代表 easing 方式为线性，另外还可以试试`data-aos-easing="ease-in-back" `

![alt text](<README_Images/README/chrome-capture-2025-3-16 (1).gif>)

### data-aos-easing="ease-out-cubic"开始快后来慢

![alt text](<README_Images/README/chrome-capture-2025-3-16 (2).gif>)

### `data-aos-offset="0"` 元素进入视口时立即触发动画

### `data-aos-delay="300"` 延迟时间

# 3. `data-aos-anchor-placement="top-bottom"`视角到达某个位置的时候触发

> data-aos-anchor-placement="center-bottom
> data-aos-anchor-placement="bottom-bottom
> data-aos-anchor-placement="top-center"
> data-aos-anchor-placement="center-center">
> data-aos-anchor-placement="bottom-center">
>
# 4. `data-aos-once="true"`不管怎么样，只做一次动画

