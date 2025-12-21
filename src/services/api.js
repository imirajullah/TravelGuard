
const BASE_URL = "http://localhost:5000/api";

export const getDestinations = async () => {
  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error("API error");
  return res.json();
};

