// client/src/pages/Destinations.jsx
import { useEffect, useState } from "react";
import "./Destinations.css";
import MapView from "../components/MapView";
import DestinationCard from "../components/DestinationCard";
import Loader from "../components/Loader";

// Fallback Pakistani cities
const FALLBACK_CITIES = [
  { name: "Karachi", country: "Pakistan", safety: "Medium", tips: "Avoid crowded areas", lat: 24.8607, lng: 67.0011 },
  { name: "Lahore", country: "Pakistan", safety: "Medium", tips: "Follow local guidelines", lat: 31.5497, lng: 74.3436 },
  { name: "Islamabad", country: "Pakistan", safety: "High", tips: "Stay on main roads", lat: 33.6844, lng: 73.0479 },
  { name: "Peshawar", country: "Pakistan", safety: "Low", tips: "Travel with caution", lat: 34.0151, lng: 71.5249 },
  { name: "Quetta", country: "Pakistan", safety: "Medium", tips: "Check weather and roads", lat: 30.1798, lng: 66.9750 },
];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [safetyFilter, setSafetyFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Load cities (fallback first)
  const fetchDestinations = async () => {
    setLoading(true);
    try {
      // Try to fetch from GeoDB API
      const response = await fetch(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=PK&limit=100",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "c1a0e97292mshd89e6a2de50922cp16d5b7jsn2c0f4bd6f049",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) throw new Error("API failed");

      const data = await response.json();

      const enriched = data.data.map((city) => ({
        name: city.name,
        country: city.country,
        safety: "Unknown",
        tips: "Follow local guidelines.",
        lat: city.latitude,
        lng: city.longitude,
      }));

      setDestinations(enriched);
      setFilteredDestinations(enriched);
    } catch (err) {
      console.warn("GeoDB API failed, using fallback cities.", err);

      // Use fallback if API fails
      setDestinations(FALLBACK_CITIES);
      setFilteredDestinations(FALLBACK_CITIES);
    } finally {
      setLoading(false);
    }
  };

  // Filter + search
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

  return (
    <div className="destinations-container">
      <h1>TravelGuard Destinations</h1>

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
          <option value="Unknown">Unknown</option>
        </select>

        <button onClick={fetchDestinations}>🔄 Refresh</button>
      </div>

      <MapView locations={filteredDestinations} />

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
