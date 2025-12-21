// client/src/pages/Destinations.jsx
import { useEffect, useState } from "react";
import { getDestinations } from "../services/api";
import DestinationCard from "../components/DestinationCard";
import Loader from "../components/Loader";
import MapView from "../components/MapView";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDestinations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getDestinations();

      // Add lat/lng for map display (hardcoded for now)
      const withCoords = data.map((d) => {
        let lat = 0,
          lng = 0;
        if (d.name === "Hunza Valley") { lat = 36.3; lng = 74.6; }
        else if (d.name === "Skardu") { lat = 35.3; lng = 75.6; }
        else if (d.name === "Fairy Meadows") { lat = 35.5; lng = 73.5; }
        return { ...d, lat, lng };
      });

      setDestinations(withCoords);
    } catch {
      setError("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>TravelGuard Destinations</h1>

      {/* Map */}
      <MapView locations={destinations} />

      {/* Grid of Destination Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {destinations.map((place) => (
          <DestinationCard key={place.name} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Destinations;
