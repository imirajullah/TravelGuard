// client/src/components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ locations }) => {
  return (
    <MapContainer center={[30.0, 70.0]} zoom={5} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {locations.map((loc) => (
        <Marker key={loc.name} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.name}</strong> <br />
            {loc.country} <br />
            Safety: {loc.safety}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
