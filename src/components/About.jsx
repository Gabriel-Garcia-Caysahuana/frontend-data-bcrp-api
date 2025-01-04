import React from 'react';

const About = () => (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div
                    className="card shadow-sm"
                    style={{
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        padding: '20px',
                    }}
                >
                    <div className="card-body">
                        <h2
                            className="text-center"
                            style={{ color: '#343a40', fontWeight: 'bold', marginBottom: '20px' }}
                        >
                            Acerca de
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
                            Esta aplicación está diseñada para realizar análisis iniciales de series temporales de manera sencilla y gratuita. Fue desarrollada con fines educativos e investigativos, utilizando datos públicos proporcionados por la API del
                            <a
                                href="https://estadisticas.bcrp.gob.pe/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#007bff', textDecoration: 'none' }}
                            >
                                Banco Central de Reserva del Perú (BCRP)
                            </a>.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
                            Si tienes comentarios o sugerencias, ¡no dudes en compartirlos! Estamos comprometidos con mejorar la herramienta para que sea más útil y accesible.
                        </p>
                        <div className="text-center mt-4">
                            <p>
                                Fuente de datos:
                                <a
                                    href="https://estadisticas.bcrp.gob.pe/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#007bff', textDecoration: 'none', marginLeft: '5px' }}
                                >
                                    Banco Central de Reserva del Perú
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default About;
