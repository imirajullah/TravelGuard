import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "15px 20px",
        backgroundColor: "#1E40AF",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0 }}>
        &copy; {new Date().getFullYear()} TravelGuard. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
