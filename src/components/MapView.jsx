import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet icons for React + Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = ({ locations }) => {
  if (!locations || locations.length === 0) return null;

  const center = [locations[0].lat || 33.6844, locations[0].lng || 73.0479];

  return (
    <MapContainer center={center} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />
      {locations.map((loc) => (
        <Marker key={loc.name} position={[loc.lat, loc.lng]}>
          <Popup>
            <b>{loc.name}</b> <br /> Safety: {loc.safety}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
