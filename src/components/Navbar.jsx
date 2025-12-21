import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1E40AF",
        color: "#fff",
        flexWrap: "wrap",
      }}
    >
      <h2 style={{ margin: 0 }}>TravelGuard</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#FFD700" : "#fff",
            textDecoration: "none",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/destinations"
          style={({ isActive }) => ({
            color: isActive ? "#FFD700" : "#fff",
            textDecoration: "none",
          })}
        >
          Destinations
        </NavLink>
        <NavLink
          to="/budget"
          style={({ isActive }) => ({
            color: isActive ? "#FFD700" : "#fff",
            textDecoration: "none",
          })}
        >
          Budget
        </NavLink>
        <NavLink
          to="/safety"
          style={({ isActive }) => ({
            color: isActive ? "#FFD700" : "#fff",
            textDecoration: "none",
          })}
        >
          Safety
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
