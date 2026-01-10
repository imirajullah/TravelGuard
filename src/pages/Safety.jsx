// client/src/pages/Safety.jsx
import { useState } from "react";
import "./Safety.css";

const SAFETY_DATA = [
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
  {
    name: "Karachi",
    safety: "Medium",
    tips: "Avoid crowded areas, stay alert.",
  },
  {
    name: "Peshawar",
    safety: "Low",
    tips: "Travel with caution, avoid late-night travel.",
  },
];

const getSafetyColor = (level) => {
  if (level === "High") return "#16a34a";
  if (level === "Medium") return "#f59e0b";
  if (level === "Low") return "#dc2626";
  return "gray";
};

const Safety = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  // ✅ Lazy initialization (no useEffect, no warning)
  const [lastViewed, setLastViewed] = useState(() => {
    return localStorage.getItem("lastSafety") || "";
  });

  const handleView = (name) => {
    setLastViewed(name);
    localStorage.setItem("lastSafety", name);
  };

  const filteredData = SAFETY_DATA.filter((place) => {
    const matchesSearch = place.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "All" || place.safety === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="safety-container">
      <h1>TravelGuard Safety Guide</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Safety Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="safety-grid">
        {filteredData.length === 0 ? (
          <p className="empty">No safety data found.</p>
        ) : (
          filteredData.map((place) => (
            <div
              key={place.name}
              className={`safety-card ${
                lastViewed === place.name ? "active" : ""
              }`}
              onClick={() => handleView(place.name)}
            >
              <h3>{place.name}</h3>

              <p>
                <strong>Safety:</strong>{" "}
                <span style={{ color: getSafetyColor(place.safety) }}>
                  {place.safety}
                </span>
              </p>

              <p className="tips">{place.tips}</p>

              {lastViewed === place.name && (
                <p className="last-viewed">Last Viewed</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Safety;
