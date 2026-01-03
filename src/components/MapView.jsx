import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component to auto-fit map bounds based on markers
const FitBounds = ({ locations }) => {
  const map = useMap();
  if (locations.length === 0) return null;

  const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
  map.fitBounds(bounds, { padding: [50, 50] });
  return null;
};

const MapView = ({ locations }) => {
  if (!locations || locations.length === 0) return null;

  return (
    <MapContainer
      center={[30.0, 70.0]} // initial center (will auto-adjust)
      zoom={5}
      style={{ height: "400px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {locations.map((loc) => (
        <Marker key={loc.name} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.name}</strong>
            <br />
            {loc.country}
            <br />
            Safety: {loc.safety}
          </Popup>
        </Marker>
      ))}
      <FitBounds locations={locations} />
    </MapContainer>
  );
};

export default MapView;
