import { useEffect, useState } from "react";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [aiAnswer, setAiAnswer] = useState("");

  useEffect(() => {
    // Fetch destinations
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/destinations`);
        const data = await res.json();
        setDestinations(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };

    // Call OpenAI via backend
    const fetchAiAnswer = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/openai/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "Give me a travel tip for Skardu" })
        });
        const data = await res.json();
        setAiAnswer(data.answer || data); // adjust depending on backend response
        console.log(data);
      } catch (err) {
        console.error("Error fetching AI answer:", err);
      }
    };

    fetchDestinations();
    fetchAiAnswer();
  }, []);

  return (
    <div>
      <h1>Destinations</h1>
      <ul>
        {destinations.map((dest, index) => (
          <li key={index}>{dest.name} - {dest.safety}</li>
        ))}
      </ul>

      <h2>AI Travel Tip</h2>
      <p>{aiAnswer}</p>
    </div>
  );
};

export default Home;
