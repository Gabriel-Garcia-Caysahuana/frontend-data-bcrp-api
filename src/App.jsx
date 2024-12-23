import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import ApiForm from "./components/ApiForm";
import Footer from "./components/Footer";
import About from "./components/About"; // Importar el componente About
import Questions from "./components/Questions";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Barra de navegación */}
        <Navbar />
        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<ApiForm />} /> {/* Ruta principal */}
          <Route path="/about" element={<About />} /> {/* Ruta "Acerca de" */}
          <Route path="/questions" element={<Questions />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
