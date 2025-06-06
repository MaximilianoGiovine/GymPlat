import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Styles/HeaderStyles.css";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="header">
      <h1>GymPlat</h1>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        {/* Ícono hamburguesa o X */}
        {menuOpen ? "✖" : "☰"}
      </button>
      <nav>
        <div className={`botonesNav${menuOpen ? " open" : ""}`}>
          <Link to={isLoggedIn ? "/dashboard" : "/"} onClick={() => setMenuOpen(false)}>Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/ejercicios" onClick={() => setMenuOpen(false)}>Ejercicios</Link>
              <Link to="/agregar-ejercicio" onClick={() => setMenuOpen(false)}>Agregar Ejercicio</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="logout-btn">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Registro</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header;