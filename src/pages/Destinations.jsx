// client/src/pages/Destinations.jsx
import { useEffect, useState } from "react";
import "./Destinations.css";
import DestinationCard from "../components/DestinationCard";
import Loader from "../components/Loader";
import MapView from "../components/MapView";
import SafetyChart from "../components/SafetyChart";

// Safety levels
const assignSafety = (name) => {
  const highSafetyCities = ["Islamabad", "Lahore", "Karachi", "Hunza Valley", "Skardu"];
  const mediumSafetyCities = ["Fairy Meadows", "Murree", "Swat", "Multan"];
  if (highSafetyCities.includes(name)) return "High";
  if (mediumSafetyCities.includes(name)) return "Medium";
  return "Low"; // default for small towns/villages
};

// Fetch towns/cities in a province from OpenStreetMap
const fetchTowns = async (province) => {
  const url = `https://nominatim.openstreetmap.org/search?country=Pakistan&state=${province}&format=json&limit=100`;
  const res = await fetch(url);
  const data = await res.json();
  return data.map((d) => ({
    name: d.display_name.split(",")[0],
    country: "Pakistan",
    lat: parseFloat(d.lat),
    lng: parseFloat(d.lon),
    safety: assignSafety(d.display_name.split(",")[0]),
    tips: "Check local guidelines before visiting.",
  }));
};

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [safetyFilter, setSafetyFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load destinations (with caching)
  const loadAllDestinations = async () => {
    setLoading(true);
    setError("");
    try {
      const cached = localStorage.getItem("allDestinations");
      if (cached) {
        const parsed = JSON.parse(cached);
        setDestinations(parsed);
        setFilteredDestinations(parsed);
        setLoading(false);
        return;
      }

      const provinces = [
        "Punjab",
        "Sindh",
        "Khyber Pakhtunkhwa",
        "Balochistan",
        "Gilgit-Baltistan",
        "Islamabad",
      ];

      let allDestinations = [];
      for (const province of provinces) {
        const towns = await fetchTowns(province);
        allDestinations = [...allDestinations, ...towns];
      }

      // Remove duplicates
      const uniqueDestinations = Array.from(
        new Map(allDestinations.map((d) => [d.name, d])).values()
      );

      setDestinations(uniqueDestinations);
      setFilteredDestinations(uniqueDestinations);
      localStorage.setItem("allDestinations", JSON.stringify(uniqueDestinations));
    } catch (err) {
      console.error(err);
      setError("Failed to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  // Search + Safety Filter
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
    loadAllDestinations();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="destinations-container">
      <h1>TravelGuard Destinations - Pakistan</h1>

      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
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

        <button onClick={loadAllDestinations}>🔄 Refresh</button>
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
