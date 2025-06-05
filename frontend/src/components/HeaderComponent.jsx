import React, { useState } from "react";

import "../Styles/HeaderStyles.css";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1>GymPlat</h1>
      <nav>
        <div className={`botonesNav ${menuOpen ? "open" : ""}`}>
        <a href="/">Inicio</a>
        <a href="/login">Login</a>
        <a href="/register">Registro</a>
        </div>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

    </header>
  );
}
export default Header;