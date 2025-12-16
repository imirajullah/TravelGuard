import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Budget from "./pages/Budget";
import Safety from "./pages/Safety";



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/safety" element={<Safety />} />
        {/* Add more routes here later */}
      </Routes>
    </Router>
  );
}

export default App;
