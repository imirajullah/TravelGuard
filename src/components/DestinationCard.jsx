const DestinationCard = ({ place }) => (
  <div
    className="card"
    style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "10px",
    }}
  >
    <h3>{place.name}</h3>
    <p>Latitude: {place.latitude}</p>
    <p>Longitude: {place.longitude}</p>
  </div>
);

export default DestinationCard;

