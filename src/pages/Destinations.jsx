import { useEffect, useState } from "react";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading destinations...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>TravelGuard Destinations</h1>

      {destinations.length === 0 ? (
        <p>No destinations available.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {destinations.map((place, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>{place.name}</h3>
              <p><strong>Country:</strong> {place.country}</p>
              <p><strong>Safety:</strong> {place.safety}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
