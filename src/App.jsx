import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import ApiForm from "./components/ApiForm";
// import About from "./components/About"; // Importar el componente About
// import Questions from "./components/Questions";

const ApiForm = lazy(() => import("./components/ApiForm"));
const About = lazy(() => import("./components/About"));
const Questions = lazy(() => import("./components/Questions"));

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<ApiForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/questions" element={<Questions />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
