// client/src/pages/Destinations.jsx
import { useEffect, useState } from "react";
import "./Destinations.css";
import { getDestinations } from "../services/api";
import DestinationCard from "../components/DestinationCard";
import Loader from "../components/Loader";
import MapView from "../components/MapView";
import SafetyChart from "../components/SafetyChart";

const COORDS = {
  "Hunza Valley": { lat: 36.3, lng: 74.6 },
  "Skardu": { lat: 35.3, lng: 75.6 },
  "Fairy Meadows": { lat: 35.5, lng: 73.5 },
};

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
      let data = await getDestinations();

      // Fallback data
      if (!data || data.length === 0) {
        data = [
          { name: "Hunza Valley", country: "Pakistan", safety: "High", tips: "Stay on main roads" },
          { name: "Skardu", country: "Pakistan", safety: "High", tips: "Weather changes fast" },
          { name: "Fairy Meadows", country: "Pakistan", safety: "Medium", tips: "Avoid hiking alone" },
        ];
      }

      const enriched = data.map((d) => ({
        ...d,
        lat: COORDS[d.name]?.lat || 0,
        lng: COORDS[d.name]?.lng || 0,
      }));

      setDestinations(enriched);
      setFilteredDestinations(enriched);
    } catch (err) {
      console.error(err);
      setError("Failed to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  // Search + Safety filter
  useEffect(() => {
    let results = [...destinations];

    if (searchTerm.trim()) {
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

      {/* Map & Chart */}
      <MapView locations={filteredDestinations} />
      <SafetyChart destinations={filteredDestinations} />

      {/* Cards */}
      <div className="destinations-grid">
        {filteredDestinations.length === 0 ? (
          <p className="empty">No destinations found.</p>
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
