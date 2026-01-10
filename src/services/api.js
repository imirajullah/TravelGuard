// services/api.js
export const getDestinations = async (query) => {
  const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN"; // Replace with your token
  if (!query) return [];

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?country=pk&limit=10&access_token=${MAPBOX_TOKEN}`;

  const res = await fetch(url);
  const data = await res.json();

  // Map to usable format
  return data.features.map((f) => ({
    name: f.place_name,
    latitude: f.center[1],
    longitude: f.center[0],
  }));
};

