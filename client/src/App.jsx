import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Think from "./pages/Think";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="think" element={<Think />} />
      </Routes>
    </Router>
  );
}

export default App;
