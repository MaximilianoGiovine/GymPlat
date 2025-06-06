
import { Link, useNavigate } from "react-router-dom";

import "../Styles/HeaderStyles.css";
function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="header">
      <h1>GymPlat</h1>
      <nav>
        <div className="botonesNav">
          <Link to={isLoggedIn ? "/dashboard" : "/"}>Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/ejercicios">Ejercicios</Link>
              <Link to="/agregar-ejercicio">Agregar Ejercicio</Link>
              <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header;