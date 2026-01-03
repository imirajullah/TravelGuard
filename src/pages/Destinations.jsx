// client/src/pages/Destinations.jsx
import { useEffect, useState } from "react";
import "./Destinations.css";
import { getDestinations } from "../services/api";
import DestinationCard from "../components/DestinationCard";
import Loader from "../components/Loader";
import MapView from "../components/MapView";
import SafetyChart from "../components/SafetyChart";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [safetyFilter, setSafetyFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDestinations = async () => {
    setLoading(true);
    setError("");
    try {
      // ✅ Try real backend first
      let data = await getDestinations();

      // ⚡ Fallback dummy data if backend returns empty
      if (!data || data.length === 0) {
        data = [
          { name: "Hunza Valley", country: "Pakistan", safety: "High", tips: "Stay on main roads" },
          { name: "Skardu", country: "Pakistan", safety: "High", tips: "Weather changes fast" },
          { name: "Fairy Meadows", country: "Pakistan", safety: "Medium", tips: "Avoid hiking alone" },
        ];
      }

      // Add lat/lng for map
      const withCoords = data.map((d) => {
        let lat = 0, lng = 0;
        if (d.name === "Hunza Valley") { lat = 36.3; lng = 74.6; }
        else if (d.name === "Skardu") { lat = 35.3; lng = 75.6; }
        else if (d.name === "Fairy Meadows") { lat = 35.5; lng = 73.5; }
        return { ...d, lat, lng };
      });

      setDestinations(withCoords);
      setFilteredDestinations(withCoords);
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search + Filter
  useEffect(() => {
    let results = destinations;

    if (searchTerm) {
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (safetyFilter !== "All") {
      results = results.filter((d) => d.safety === safetyFilter);
    }

    setFilteredDestinations(results);
  }, [searchTerm, safetyFilter, destinations]);

  // Fetch on mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="destinations-container">
      <h1>TravelGuard Destinations</h1>

      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={safetyFilter}
          onChange={(e) => setSafetyFilter(e.target.value)}
        >
          <option value="All">All Safety Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={fetchDestinations}>🔄 Refresh</button>
      </div>

      {/* Map & Safety Chart */}
      <MapView locations={filteredDestinations} />
      <SafetyChart destinations={filteredDestinations} />

      {/* Destination Cards */}
      <div className="destinations-grid">
        {filteredDestinations.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          filteredDestinations.map((place) => (
            <DestinationCard key={place.name} place={place} />
          ))
        )}
      </div>
    </div>
  );
};

export default Destinations;
