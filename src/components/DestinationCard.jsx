const DestinationCard = ({ place }) => (
  <div
    className="card"
    style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px",
    }}
  >
    <h3>{place.name}</h3>
    <p>Country: {place.country}</p>
    <p>Safety: {place.safety}</p>
  </div>
);

export default DestinationCard;
