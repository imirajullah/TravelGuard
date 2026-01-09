import { useState, useEffect } from "react";
import "./Budget.css";
import BudgetChart from "../components/BudgetChart";

/* ---------- CONFIG ---------- */

const accommodationOptions = {
  Hostel: { rate: 60, icon: "🏠" },
  Hotel: { rate: 120, icon: "🏨" },
  Guesthouse: { rate: 90, icon: "🏡" },
};

const dailyExpenseOptions = {
  Low: { value: 500, icon: "💰" },
  Medium: { value: 1000, icon: "💵" },
  High: { value: 2000, icon: "💸" },
};

const safetyOptions = {
  High: 1,
  Medium: 1,
  Low: 1.2,
};

/* ---------- COMPONENT ---------- */

const Budget = () => {
  /* ✅ Lazy initialization (NO useEffect setState) */
  const [budget, setBudget] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lastBudget"));
      return (
        saved || {
          destination: "",
          nights: "",
          guests: "",
          accommodation: "Hostel",
          dailyExpenses: "",
          safety: "Medium",
          totalCost: 0,
        }
      );
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
      const saved = JSON.parse(localStorage.getItem("savedBudgets"));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [animatedCost, setAnimatedCost] = useState(0);

  const showWarning = budget.safety === "Low";

  /* ---------- ANIMATION ---------- */
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, budget.totalCost / 50);

    const interval = setInterval(() => {
      current += step;
      if (current >= budget.totalCost) {
        current = budget.totalCost;
        clearInterval(interval);
      }
      setAnimatedCost(current);
    }, 20);

    return () => clearInterval(interval);
  }, [budget.totalCost]);

  /* ---------- HANDLERS ---------- */

  const handleChange = (field, value) => {
    setBudget((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const nights = Number(budget.nights);
    const guests = Number(budget.guests);
    const daily = Number(budget.dailyExpenses);

    if (!nights || !guests || !daily) {
      setBudget((prev) => ({ ...prev, totalCost: 0 }));
      return;
    }

    const accommodationCost =
      accommodationOptions[budget.accommodation].rate * nights * guests;

    const dailyCost =
      daily * nights * guests * safetyOptions[budget.safety];

    const total = accommodationCost + dailyCost;

    const updated = { ...budget, totalCost: total };
    setBudget(updated);
    localStorage.setItem("lastBudget", JSON.stringify(updated));
  };

  const resetForm = () => {
    setBudget({
      destination: "",
      nights: "",
      guests: "",
      accommodation: "Hostel",
      dailyExpenses: "",
      safety: "Medium",
      totalCost: 0,
    });
    setAnimatedCost(0);
    localStorage.removeItem("lastBudget");
  };

  const saveBudget = () => {
    if (!budget.destination) {
      alert("Please enter a destination first!");
      return;
    }
    const updated = [...savedBudgets, budget];
    setSavedBudgets(updated);
    localStorage.setItem("savedBudgets", JSON.stringify(updated));
  };

  const deleteBudget = (index) => {
    const updated = savedBudgets.filter((_, i) => i !== index);
    setSavedBudgets(updated);
    localStorage.setItem("savedBudgets", JSON.stringify(updated));
  };

  /* ---------- UI ---------- */

  return (
    <div className="budget-wrapper">
      <div className="budget-card">
        <h1>TravelGuard Budget Estimator</h1>

        <input
          type="text"
          placeholder="Destination"
          value={budget.destination}
          onChange={(e) => handleChange("destination", e.target.value)}
        />

        <input
          type="number"
          placeholder="Number of Nights"
          value={budget.nights}
          onChange={(e) => handleChange("nights", e.target.value)}
        />

        <input
          type="number"
          placeholder="Number of Guests"
          value={budget.guests}
          onChange={(e) => handleChange("guests", e.target.value)}
        />

        <select
          value={budget.accommodation}
          onChange={(e) => handleChange("accommodation", e.target.value)}
        >
          {Object.entries(accommodationOptions).map(([name, data]) => (
            <option key={name} value={name}>
              {data.icon} {name} ({data.rate} PKR / night)
            </option>
          ))}
        </select>

        <select
          value={budget.dailyExpenses}
          onChange={(e) => handleChange("dailyExpenses", e.target.value)}
        >
          <option value="">Select Daily Expenses</option>
          {Object.values(dailyExpenseOptions).map((d) => (
            <option key={d.value} value={d.value}>
              {d.icon} {d.value} PKR
            </option>
          ))}
        </select>

        <select
          value={budget.safety}
          onChange={(e) => handleChange("safety", e.target.value)}
        >
          {Object.keys(safetyOptions).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {showWarning && <p className="warning">⚠️ Low safety area</p>}

        <div className="btn-row">
          <button onClick={calculateTotal}>Calculate</button>
          <button className="danger" onClick={resetForm}>
            Reset
          </button>
        </div>

        {animatedCost > 0 && (
          <p className="total">
            Estimated Total Cost: PKR {animatedCost.toFixed(0)}
          </p>
        )}

        <button className="save-btn" onClick={saveBudget}>
          Save Budget
        </button>

        {savedBudgets.length > 0 && (
          <>
            <h2>Saved Budgets</h2>
            {savedBudgets.map((b, i) => (
              <div className="saved-item" key={i}>
                <span>
                  <strong>{b.destination}</strong> — PKR {b.totalCost}
                </span>
                <button onClick={() => deleteBudget(i)}>Delete</button>
              </div>
            ))}

            <BudgetChart budgets={savedBudgets} />
          </>
        )}
      </div>
    </div>
  );
};

export default Budget;
