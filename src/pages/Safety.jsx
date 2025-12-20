import { useState } from "react";

const Safety = () => {
  const [filter, setFilter] = useState("");

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
    if (level === "High") return "green";
    if (level === "Medium") return "orange";
    if (level === "Low") return "red";
    return "gray";
  };

  const filteredData = safetyData.filter((item) =>
    filter ? item.safety === filter : true
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "15px" }}>TravelGuard Safety Info</h1>

      {/* Filter */}
      <div style={{ marginBottom: "15px" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px" }}
        >
          <option value="">All Safety Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Safety Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {filteredData.map((item, index) => (
          <div
            key={index}
            style={{
              border: `2px solid ${getSafetyColor(item.safety)}`,
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3>{item.name}</h3>
            <p>
              <strong>Safety:</strong>{" "}
              <span style={{ color: getSafetyColor(item.safety) }}>
                {item.safety}
              </span>
            </p>
            <p>{item.tips}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Safety;
