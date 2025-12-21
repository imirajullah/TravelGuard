import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Budget from "./pages/Budget";
import Safety from "./pages/Safety";
import Navbar from "./components/Navbar";

// import Footer from "./components/Footer/Footer"; // Optional if you add footer later

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Navbar always visible */}
        <Navbar />

        {/* Main content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/safety" element={<Safety />} />
          </Routes>
        </div>

        {/* Optional Footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;

