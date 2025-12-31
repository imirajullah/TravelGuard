import { useState, useEffect } from "react";
import "./Budget.css";
import BudgetChart from "../components/BudgetChart";


// Accommodation options with icons and rates
const accommodationOptions = {
  Hostel: { rate: 60, icon: "🏠" },
  Hotel: { rate: 120, icon: "🏨" },
  Guesthouse: { rate: 90, icon: "🏡" },
};

// Daily expenses options
const dailyExpenseOptions = {
  Low: { value: 500, icon: "💰" },
  Medium: { value: 1000, icon: "💵" },
  High: { value: 2000, icon: "💸" },
};

// Daily expense colors
const expenseColors = {
  Low: "#d1fae5",
  Medium: "#fef3c7",
  High: "#fee2e2",
};

// Safety multiplier
const safetyOptions = {
  High: 1,
  Medium: 1,
  Low: 1.2,
};

const Budget = () => {
  const [budget, setBudget] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lastBudget") || "{}");
      return saved?.totalCost !== undefined
        ? saved
        : {
            destination: "",
            nights: "",
            guests: "",
            accommodation: "Hostel",
            dailyExpenses: "",
            safety: "Medium",
            totalCost: 0,
          };
    } catch {
      return {
        destination: "",
        nights: "",
        guests: "",
        accommodation: "Hostel",
        dailyExpenses: "",
        safety: "Medium",
        totalCost: 0,
      };
    }
  });

  const [savedBudgets, setSavedBudgets] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("savedBudgets") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [animatedCost, setAnimatedCost] = useState(0);

  const showWarning = budget.safety === "Low";

  // Animate total cost safely
  useEffect(() => {
    if (budget.totalCost === 0) {
      const timer = setTimeout(() => setAnimatedCost(0), 0);
      return () => clearTimeout(timer);
    }

    let start = 0;
    const increment = Math.max(1, Math.floor(budget.totalCost / 100));

    const interval = setInterval(() => {
      start += increment;
      if (start >= budget.totalCost) {
        start = budget.totalCost;
        clearInterval(interval);
      }
      setAnimatedCost(start);
    }, 10);

    return () => clearInterval(interval);
  }, [budget.totalCost]);

  const handleChange = (field, value) => {
    setBudget((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const nights = Number(budget.nights) || 0;
    const guests = Number(budget.guests) || 0;
    const daily = Number(budget.dailyExpenses) || 0;
    const safetyMultiplier = safetyOptions[budget.safety] || 1;

    if (nights > 0 && guests > 0 && daily > 0) {
      const accommodationCost =
        accommodationOptions[budget.accommodation].rate * nights * guests;
      const dailyCost = daily * nights * guests * safetyMultiplier;
      const total = accommodationCost + dailyCost;
      const updatedBudget = { ...budget, totalCost: total };
      setBudget(updatedBudget);
      localStorage.setItem("lastBudget", JSON.stringify(updatedBudget));
    } else {
      setBudget((prev) => ({ ...prev, totalCost: 0 }));
    }
  };

  const resetForm = () => {
    const resetBudget = {
      destination: "",
      nights: "",
      guests: "",
      accommodation: "Hostel",
      dailyExpenses: "",
      safety: "Medium",
      totalCost: 0,
    };
    setBudget(resetBudget);
    localStorage.removeItem("lastBudget");
  };

  const saveBudget = () => {
    if (!budget.destination) return alert("Enter a destination first!");
    const newSaved = [...savedBudgets, budget];
    setSavedBudgets(newSaved);
    localStorage.setItem("savedBudgets", JSON.stringify(newSaved));
  };

  const deleteBudget = (index) => {
    const newSaved = savedBudgets.filter((_, i) => i !== index);
    setSavedBudgets(newSaved);
    localStorage.setItem("savedBudgets", JSON.stringify(newSaved));
  };

  // Get color for daily expenses
  const dailyExpenseColor = Object.keys(dailyExpenseOptions).find(
    (key) => dailyExpenseOptions[key].value === Number(budget.dailyExpenses)
  )
    ? expenseColors[
        Object.keys(dailyExpenseOptions).find(
          (key) => dailyExpenseOptions[key].value === Number(budget.dailyExpenses)
        )
      ]
    : "#fff";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1E40AF",
            marginBottom: "25px",
            fontSize: "1.8rem",
          }}
        >
          TravelGuard Budget Estimator
        </h1>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Destination"
          value={budget.destination}
          onChange={(e) => handleChange("destination", e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "1rem",
          }}
        />

        <input
          type="number"
          placeholder="Number of Nights"
          value={budget.nights}
          onChange={(e) => handleChange("nights", e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "1rem",
          }}
        />

        <input
          type="number"
          placeholder="Number of Guests"
          value={budget.guests}
          onChange={(e) => handleChange("guests", e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "1rem",
          }}
        />

        <select
          value={budget.accommodation}
          onChange={(e) => handleChange("accommodation", e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "1rem",
          }}
        >
          {Object.entries(accommodationOptions).map(([name, { rate, icon }]) => (
            <option key={name} value={name}>
              {icon} {name} ({rate} PKR/night)
            </option>
          ))}
        </select>

        <select
          value={budget.dailyExpenses}
          onChange={(e) => handleChange("dailyExpenses", e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "1rem",
            backgroundColor: dailyExpenseColor,
          }}
        >
          <option value="">Select Daily Expenses</option>
          {Object.values(dailyExpenseOptions).map(({ value, icon }) => (
            <option key={value} value={value}>
              {icon} ({value} PKR)
            </option>
          ))}
        </select>

        <select
          value={budget.safety}
          onChange={(e) => handleChange("safety", e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "1rem",
          }}
        >
          {Object.keys(safetyOptions).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {showWarning && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              marginBottom: "12px",
              animation: "flash 1s infinite",
            }}
          >
            ⚠️ Warning: Low safety! Travel cautiously.
          </p>
        )}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={calculateTotal}
            style={{
              flex: "1 1 48%",
              padding: "12px",
              backgroundColor: "#1E40AF",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Calculate
          </button>
          <button
            onClick={resetForm}
            style={{
              flex: "1 1 48%",
              padding: "12px",
              backgroundColor: "#f44336",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {animatedCost > 0 && (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.3rem",
              color: "#1E40AF",
              marginBottom: "12px",
            }}
          >
            Estimated Total Cost: PKR {animatedCost.toFixed(0)}
          </p>
        )}

        <button
          onClick={saveBudget}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            backgroundColor: "#1E40AF",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Save Budget
        </button>

        {/* Saved Budgets */}
        {savedBudgets.length > 0 && (
          <div>
            <h2 style={{ color: "#1E40AF", marginBottom: "10px" }}>Saved Budgets</h2>
            {savedBudgets.map((b, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div>
                  <strong>{b.destination}</strong> - {b.nights} nights, {b.guests} guests
                  <br />
                  {b.accommodation} | Safety: {b.safety}
                  <br />
                  PKR {b.totalCost.toFixed(2)}
                </div>
                <button
                  onClick={() => deleteBudget(idx)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "6px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}

            {/* Budget Chart */}
            <div>
              <h2 style={{ color: "#1E40AF", marginBottom: "10px" }}>
                Budget Visualization
              </h2>
              <BudgetChart budgets={savedBudgets} />
            </div>
          </div>
        )}

        <style>
          {`
            @keyframes flash {
              0%, 50%, 100% { opacity: 1; }
              25% , 75% { opacity: 0.4; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default  Budget;
