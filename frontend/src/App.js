import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import Home from "./pages/Home";
import Login from "./pages/logIn";
import Register from "./pages/register";
import DashBoard from "./pages/dashBoard";
import PrivateRoute from "./components/PrivateRoute";
import Exercise from "./pages/exercise";
import AddExercise from "./pages/addExercise"; // Asegúrate de tener este archivo

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          <Route path="/ejercicios" element={<Exercise />} />
          <Route path="/agregar-ejercicio" element={<AddExercise />} />
          {/* Puedes agregar más rutas aquí */}
          <Route path="*" element={<DashBoard />} /> {/* Ruta por defecto */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;