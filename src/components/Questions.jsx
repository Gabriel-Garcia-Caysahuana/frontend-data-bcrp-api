const Questions = () => (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="text-center mb-4" style={{ color: "#343a40" }}>
                            ¿Cómo se realizan el cálculo de las componentes?
                        </h2>
                        <p>
                            Esta herramienta utiliza el método <strong>STL</strong>
                            (<em>Seasonal-Trend decomposition using LOESS</em>), disponible en la biblioteca
                            <strong> statsmodels</strong>. Este algoritmo permite descomponer una serie en
                            componentes de tendencia, estacionalidad y ruido de manera robusta y confiable.
                        </p>
                        <p>STL descompone una serie temporal en tres componentes principales:</p>
                        <ul className="list-group list-group-flush mb-4">
                            <li className="list-group-item">
                                <strong>Tendencia:</strong>
                                <p>
                                    Calculada mediante un suavizado LOESS (Locally Estimated Scatterplot Smoothing),
                                    ajusta las fluctuaciones a corto plazo para capturar la dirección general de los datos.
                                </p>
                            </li>
                            <li className="list-group-item">
                                <strong>Estacionalidad:</strong>
                                <p>
                                    Identificada como patrones cíclicos recurrentes en intervalos regulares. Tras eliminar
                                    la tendencia, el algoritmo calcula promedios estacionales ajustados para cada período.
                                </p>
                            </li>
                            <li className="list-group-item">
                                <strong>Ruido:</strong>
                                <p>
                                    Representa las fluctuaciones aleatorias restantes tras eliminar tendencia y estacionalidad.
                                    Se calcula como la diferencia entre los valores originales y la suma de las otras dos componentes.
                                </p>
                            </li>
                        </ul>
                        <p>
                            El algoritmo realiza múltiples iteraciones para ajustar las componentes y utiliza un sistema
                            de <strong>pesos robustos</strong> que reduce el impacto de valores atípicos, garantizando estimaciones estables.
                        </p>
                        <div className="bg-light p-3 rounded mb-4">
                            <em>Modelo aditivo utilizado:</em>
                            <pre style={{ backgroundColor: "#eef", padding: "10px", borderRadius: "5px" }}>
                                Serie temporal = Tendencia + Estacionalidad + Ruido
                            </pre>
                        </div>
                        <p>
                            Durante cada iteración, el algoritmo realiza los siguientes pasos:
                        </p>
                        <ol className="mb-4">
                            <li>Ajuste inicial de la tendencia mediante un suavizado LOESS global sobre los datos.</li>
                            <li>
                                Cálculo de la estacionalidad como la desviación media cíclica respecto a la tendencia ajustada.
                            </li>
                            <li>
                                Determinación del ruido como la diferencia entre los datos originales y la suma de tendencia y estacionalidad.
                            </li>
                            <li>Reajuste iterativo con pesos robustos para manejar valores atípicos.</li>
                        </ol>
                        <p>
                            Si deseas conocer más detalles sobre la implementación de este algoritmo,
                            consulta la documentación oficial de <strong>statsmodels</strong> y el código fuente
                            de la clase <strong>STL</strong>, disponible en GitHub:
                        </p>
                        <a
                            href="https://github.com/statsmodels/statsmodels/blob/main/statsmodels/tsa/stl/_stl.pyx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Consultar los detalles del algoritmo en GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Questions;
