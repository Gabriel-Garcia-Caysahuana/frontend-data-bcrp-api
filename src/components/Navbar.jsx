import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link text-secondary px-3" to="/">
                            App
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-secondary px-3" to="/about">
                            Acerca de
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-secondary px-3" to="/questions">
                            Preguntas frecuentes
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;

