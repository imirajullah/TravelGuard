 
import React from "react";

const BudgetChart = ({ budgets }) => {
  return (
    <div>
      <h2>Budget Chart</h2>
      {budgets && budgets.length > 0 ? (
        <ul>
          {budgets.map((b, idx) => (
            <li key={idx}>
              {b.destination} - {b.nights} nights, {b.guests} guests, Total: PKR{" "}
              {b.totalCost}
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved  budgets yet.</p>
      )}
    </div>
  );
};

export default BudgetChart;
