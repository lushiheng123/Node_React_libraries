import AOS from 'aos';
import 'aos/dist/aos.css';
import React from "react";
function App() {

  React.useEffect(() => {
    AOS.init({
      //不定义默认2s，但是init要有
      duration: 2000
    });

  }, []);
  return (
    <div>

      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation"></div>
      <div className="animation" data-aos="fade-up"
        data-aos-anchor-placement="top-bottom">
      </div>
    </div>

  );
}
export default App