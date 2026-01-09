import { useState, useEffect } from "react";
import "./Safety.css";

const safetyData = [
  {
    name: "Hunza Valley",
    safety: "High",
    tips: "Carry cash, follow local guidelines, stay on main roads.",
  },
  {
    name: "Skardu",
    safety: "High",
    tips: "Weather can change fast, bring warm clothing.",
  },
  {
    name: "Fairy Meadows",
    safety: "Medium",
    tips: "Avoid hiking alone, check weather conditions.",
  },
];

const getSafetyColor = (level) => {
  if (level === "High") return "#16a34a"; // green
  if (level === "Medium") return "#f59e0b"; // orange
  if (level === "Low") return "#dc2626"; // red
  return "gray";
};

const Safety = () => {
  const [lastViewed, setLastViewed] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lastSafety");
    if (saved) setTimeout(() => setLastViewed(saved), 0);
  }, []);

  const handleView = (name) => {
    setLastViewed(name);
    localStorage.setItem("lastSafety", name);
  };

  return (
    <div className="safety-container">
      <h1>TravelGuard Safety Info</h1>
      <div className="safety-grid">
        {safetyData.map((place) => (
          <div
            key={place.name}
            className={`safety-card ${lastViewed === place.name ? "active" : ""}`}
            onClick={() => handleView(place.name)}
          >
            <h3>{place.name}</h3>
            <p>
              <strong>Safety:</strong>{" "}
              <span style={{ color: getSafetyColor(place.safety) }}>{place.safety}</span>
            </p>
            <p className="tips">{place.tips}</p>
            {lastViewed === place.name && <p className="last-viewed">Last Viewed</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Safety;
