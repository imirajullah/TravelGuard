// client/src/pages/Safety.jsx
import { useState } from "react";
import "./Safety.css";

const getSafetyColor = (level) => {
  if (level === "High") return "#16a34a";
  if (level === "Medium") return "#f59e0b";
  if (level === "Low") return "#dc2626";
  return "#6b7280";
};

const Safety = ({ destinations = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredData = destinations.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.country?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All" || place.safety === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="safety-container">
      <h1>TravelGuard Safety Guide</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search city or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Safety Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>

      <div className="safety-grid">
        {filteredData.length === 0 ? (
          <p className="empty">No safety data found.</p>
        ) : (
          filteredData.map((place) => (
            <div key={place.name} className="safety-card">
              <h3>{place.name}</h3>

              <p>
                <strong>Safety:</strong>{" "}
                <span style={{ color: getSafetyColor(place.safety) }}>
                  {place.safety}
                </span>
              </p>

              <p className="tips">{place.tips}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Safety;

