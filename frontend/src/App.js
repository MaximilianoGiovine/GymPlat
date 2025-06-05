import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import Home from "./pages/Home";
import Login from "./pages/logIn";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;