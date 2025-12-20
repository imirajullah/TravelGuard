import { useEffect, useState } from "react";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [safetyFilter, setSafetyFilter] = useState("");

  // Fetch destinations from backend
  const fetchDestinations = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/destinations");
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setDestinations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Map safety levels to colors
  const getSafetyColor = (level) => {
    if (level === "High") return "green";
    if (level === "Medium") return "orange";
    if (level === "Low") return "red";
    return "gray";
  };

  // Filtered destinations based on search & safety
  const filteredDestinations = destinations.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSafety = safetyFilter ? place.safety === safetyFilter : true;
    return matchesSearch && matchesSafety;
  });

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "15px" }}>TravelGuard Destinations</h1>

      {/* Search & Filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by name or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", flex: 1, minWidth: "200px" }}
        />
        <select
          value={safetyFilter}
          onChange={(e) => setSafetyFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px" }}
        >
          <option value="">All Safety Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          onClick={fetchDestinations}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "#1E40AF",
            color: "#fff",
            border: "none",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading destinations...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Destinations List */}
      {!loading && !error && filteredDestinations.length === 0 && (
        <p>No destinations found.</p>
      )}

      {!loading && !error && filteredDestinations.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {filteredDestinations.map((place, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3>{place.name}</h3>
              <p>
                <strong>Country:</strong> {place.country}
              </p>
              <p>
                <strong>Safety:</strong>{" "}
                <span style={{ color: getSafetyColor(place.safety) }}>
                  {place.safety}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
