const Questions = () => (
    <div style={{ padding: "20px" }}>
        <h2>¿Cómo se realizan el cálculo de las componentes?</h2>
        <p>
            Esta herramienta utiliza el método STL (Seasonal-Trend decomposition using LOESS), disponible en la biblioteca statsmodels.
            Este algoritmo permite descomponer una serie en componentes de tendencia, estacionalidad y ruido de manera robusta y confiable.

        </p>
        <p>
            STL permite descomponer una serie temporal en tres componentes principales:
        </p>
        <ul>
            <li>
                <strong>Tendencia:</strong>
                <p>
                    Calculada mediante un suavizado LOESS (Locally Estimated Scatterplot Smoothing),
                    ajusta las fluctuaciones a corto plazo para capturar la dirección general de los datos.
                </p>
            </li>
            <li>
                <strong>Estacionalidad:</strong>
                <p>
                    Identificada como patrones cíclicos recurrentes en intervalos regulares. Tras eliminar
                    la tendencia, el algoritmo calcula promedios estacionales ajustados para cada período.
                </p>
            </li>
            <li>
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
        <p>
            <em>Modelo aditivo utilizado:</em>
        </p>
        <pre style={{ backgroundColor: "#eef", padding: "10px" }}>
            Serie temporal = Tendencia + Estacionalidad + Ruido
        </pre>
        <p>
            Durante cada iteración, el algoritmo realiza los siguientes pasos:
            <ol>
                <li>
                    Ajuste inicial de la tendencia mediante un suavizado LOESS global sobre los datos.
                </li>
                <li>
                    Cálculo de la estacionalidad como la desviación media cíclica respecto a la tendencia ajustada.
                </li>
                <li>
                    Determinación del ruido como la diferencia entre los datos originales y la suma de tendencia y estacionalidad.
                </li>
                <li>
                    Reajuste iterativo con pesos robustos para manejar valores atípicos.
                </li>
            </ol>
        </p>
        <p>
            Si deseas conocer más detalles sobre la implementación de este algoritmo,
            te recomiendo visitar la documentación oficial de <strong>statsmodels</strong>
            y el código fuente de la clase <strong>STL</strong>, disponible en GitHub:
        </p>
        <a
            href="https://github.com/statsmodels/statsmodels/blob/main/statsmodels/tsa/stl/_stl.pyx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007bff" }}
        >
            Consultar los detalles del algoritmo en GitHub
        </a>

    </div>
);

export default Questions;
