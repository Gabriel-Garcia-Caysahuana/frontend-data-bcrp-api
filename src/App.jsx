import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const ApiForm = lazy(() => import("./components/ApiForm"));
const About = lazy(() => import("./components/About"));
const Questions = lazy(() => import("./components/Questions"));
const DonationSection = lazy(() => import("./components/DonationSection"));

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
            <Route path="/donations" element={<DonationSection />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
