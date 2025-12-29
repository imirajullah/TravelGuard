import { useState, useEffect } from "react";

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

const Safety = () => {
  const [lastViewed, setLastViewed] = useState("");

  // Load last viewed from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lastSafety");
    if (saved) setTimeout(() => setLastViewed(saved), 0);
  }, []);

  const handleView = (name) => {
    setLastViewed(name);
    localStorage.setItem("lastSafety", name);
  };

  const getSafetyColor = (level) => {
    if (level === "High") return "green";
    if (level === "Medium") return "orange";
    if (level === "Low") return "red";
    return "gray";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "15px" }}>TravelGuard Safety Info</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {safetyData.map((place) => (
          <div
            key={place.name}
            onClick={() => handleView(place.name)}
            style={{
              border: lastViewed === place.name ? "2px solid #1E40AF" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              cursor: "pointer",
              boxShadow: lastViewed === place.name ? "0 4px 10px rgba(0,0,0,0.2)" : "0 2px 5px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
            }}
          >
            <h3>{place.name}</h3>
            <p>
              <strong>Safety:</strong>{" "}
              <span style={{ color: getSafetyColor(place.safety) }}>{place.safety}</span>
            </p>
            <p>{place.tips}</p>
            {lastViewed === place.name && (
              <p style={{ color: "#1E40AF",  fontWeight: "bold" }}>Last Viewed</p>
            )}
           </div>
        ))}
      </div>
    </div>
  );
};

export default Safety;
