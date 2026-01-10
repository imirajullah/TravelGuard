import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Destinations.css";
import { getDestinations } from "../services/api";
import DestinationCard from "../components/DestinationCard";

mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"; // Replace with your token

const Destinations = () => {
  const [query, setQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [71.5249, 33.6844], // Pakistan center
      zoom: 5,
    });

    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  // Update markers when destinations change
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add new markers
    destinations.forEach((d) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([d.longitude, d.latitude])
        .setPopup(new mapboxgl.Popup().setText(d.name))
        .addTo(map.current);
      markersRef.current.push(marker);
    });

    // Center map on first result
    if (destinations.length > 0) {
      const { latitude, longitude } = destinations[0];
      map.current.flyTo({ center: [longitude, latitude], zoom: 10 });
    }
  }, [destinations]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const data = await getDestinations(query);
      setDestinations(data);
    } catch (err) {
      console.error(err);
      setDestinations([]);
    }
    setLoading(false);
  };

  return (
    <div className="destinations-page">
      {/* Search Bar */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          placeholder="Search a place in Pakistan"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Map */}
      <div ref={mapContainer} className="map-container"></div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Destination Cards */}
      <div className="destinations-list">
        {query && destinations.length === 0 && !loading && (
          <p>No destinations found</p>
        )}
        {destinations.map((d, i) => (
          <DestinationCard key={i} place={d} />
        ))}
      </div>
    </div>
  );
};

export default Destinations;

