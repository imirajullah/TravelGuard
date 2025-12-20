import { useState } from "react";

const Budget = () => {
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [days, setDays] = useState(1);
  const [accommodation, setAccommodation] = useState("Hotel");
  const [totalCost, setTotalCost] = useState(null);

  const prices = {
    "Hunza Valley": 50,
    Skardu: 60,
    "Fairy Meadows": 40,
  };

  const accommodationMultiplier = {
    Hotel: 1.5,
    Hostel: 1,
    Guesthouse: 1.2,
  };

  const calculateCost = () => {
    if (!destination || travelers <= 0 || days <= 0) {
      alert("Please fill in all fields correctly!");
      return;
    }
    const cost = prices[destination] * travelers * days * accommodationMultiplier[accommodation];
    setTotalCost(cost.toFixed(2));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "15px" }}>TravelGuard Budget Estimator</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Select Destination</option>
          <option value="Hunza Valley">Hunza Valley</option>
          <option value="Skardu">Skardu</option>
          <option value="Fairy Meadows">Fairy Meadows</option>
        </select>

        <input
          type="number"
          placeholder="Number of Travelers"
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
          min={1}
        />

        <input
          type="number"
          placeholder="Number of Days"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          min={1}
        />

        <select value={accommodation} onChange={(e) => setAccommodation(e.target.value)}>
          <option value="Hotel">Hotel</option>
          <option value="Hostel">Hostel</option>
          <option value="Guesthouse">Guesthouse</option>
        </select>

        <button
          onClick={calculateCost}
          style={{ padding: "10px", backgroundColor: "#1E40AF", color: "#fff", border: "none", borderRadius: "5px" }}
        >
          Calculate Total Cost
        </button>
      </div>

      {totalCost && (
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>
          Estimated Total Cost: ${totalCost}
        </p>
      )}
    </div>
  );
};

export default Budget;
