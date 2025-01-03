import{j as e}from"./index-BMwN59_M.js";const s=()=>e.jsxs("div",{style:{padding:"20px"},children:[e.jsx("h2",{children:"¿Cómo se realizan el cálculo de las componentes?"}),e.jsx("p",{children:"Esta herramienta utiliza el método STL (Seasonal-Trend decomposition using LOESS), disponible en la biblioteca statsmodels. Este algoritmo permite descomponer una serie en componentes de tendencia, estacionalidad y ruido de manera robusta y confiable."}),e.jsx("p",{children:"STL permite descomponer una serie temporal en tres componentes principales:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Tendencia:"}),e.jsx("p",{children:"Calculada mediante un suavizado LOESS (Locally Estimated Scatterplot Smoothing), ajusta las fluctuaciones a corto plazo para capturar la dirección general de los datos."})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Estacionalidad:"}),e.jsx("p",{children:"Identificada como patrones cíclicos recurrentes en intervalos regulares. Tras eliminar la tendencia, el algoritmo calcula promedios estacionales ajustados para cada período."})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ruido:"}),e.jsx("p",{children:"Representa las fluctuaciones aleatorias restantes tras eliminar tendencia y estacionalidad. Se calcula como la diferencia entre los valores originales y la suma de las otras dos componentes."})]})]}),e.jsxs("p",{children:["El algoritmo realiza múltiples iteraciones para ajustar las componentes y utiliza un sistema de ",e.jsx("strong",{children:"pesos robustos"})," que reduce el impacto de valores atípicos, garantizando estimaciones estables."]}),e.jsx("p",{children:e.jsx("em",{children:"Modelo aditivo utilizado:"})}),e.jsx("pre",{style:{backgroundColor:"#eef",padding:"10px"},children:"Serie temporal = Tendencia + Estacionalidad + Ruido"}),e.jsxs("p",{children:["Durante cada iteración, el algoritmo realiza los siguientes pasos:",e.jsxs("ol",{children:[e.jsx("li",{children:"Ajuste inicial de la tendencia mediante un suavizado LOESS global sobre los datos."}),e.jsx("li",{children:"Cálculo de la estacionalidad como la desviación media cíclica respecto a la tendencia ajustada."}),e.jsx("li",{children:"Determinación del ruido como la diferencia entre los datos originales y la suma de tendencia y estacionalidad."}),e.jsx("li",{children:"Reajuste iterativo con pesos robustos para manejar valores atípicos."})]})]}),e.jsxs("p",{children:["Si deseas conocer más detalles sobre la implementación de este algoritmo, te recomiendo visitar la documentación oficial de ",e.jsx("strong",{children:"statsmodels"}),"y el código fuente de la clase ",e.jsx("strong",{children:"STL"}),", disponible en GitHub:"]}),e.jsx("a",{href:"https://github.com/statsmodels/statsmodels/blob/main/statsmodels/tsa/stl/_stl.pyx",target:"_blank",rel:"noopener noreferrer",style:{color:"#007bff"},children:"Consultar los detalles del algoritmo en GitHub"})]});export{s as default};