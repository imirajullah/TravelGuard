import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Budget from "./pages/Budget";
import Safety from "./pages/Safety";
import Navbar from "./components/Navbar";

function App() {
  // ✅ Global destinations state
  const [destinations, setDestinations] = useState([]);

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/destinations"
              element={
                <Destinations
                  destinations={destinations}
                  setDestinations={setDestinations}
                />
              }
            />

            <Route path="/budget" element={<Budget />} />

            <Route
              path="/safety"
              element={<Safety destinations={destinations} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


