import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4 mt-5">
      <div className="container text-center">
        <p className="mb-2">
          <strong>Visualización de Datos</strong> - Herramienta para análisis descriptivo de series temporales.
        </p>
        <p className="mb-2">
          Desarrollado por{" "}
          <a
            href="https://blog-garcia-caysahuana.fly.dev/sobre-mi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-info"
          >
            Gabriel Garcia Caysahuana
          </a>
          .
        </p>
        <p className="mb-2">
          <a
            href="https://github.com/Gabriel-Garcia-Caysahuana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-dark"
          >
            <i className="fab fa-github"></i> Repositorio en GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/gabriel-garcia-caysahuana/"
            className="text-decoration-none text-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i> Linkedin
          </a>

        </p>
        <p className="mb-0">© 2024 Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
