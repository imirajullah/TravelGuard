
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // to highlight active page

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Budget", path: "/budget" },
    { name: "Safety", path: "/safety" },
  ];

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#1E40AF", color: "#fff" }}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>TravelGuard</div>
      <div style={{ display: "flex", gap: "15px" }}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? "#FFD700" : "#fff", // highlight active
              textDecoration: "none",
              fontWeight: location.pathname === link.path ? "bold" : "normal",
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
