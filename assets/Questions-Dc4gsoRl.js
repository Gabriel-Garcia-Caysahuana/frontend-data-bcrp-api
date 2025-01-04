import{j as e}from"./index-BKlgBLZ0.js";const s=()=>e.jsx("div",{className:"container mt-5",children:e.jsx("div",{className:"row justify-content-center",children:e.jsx("div",{className:"col-md-10",children:e.jsx("div",{className:"card shadow-sm",children:e.jsxs("div",{className:"card-body",children:[e.jsx("h2",{className:"text-center mb-4",style:{color:"#343a40"},children:"¿Cómo se realizan el cálculo de las componentes?"}),e.jsxs("p",{children:["Esta herramienta utiliza el método ",e.jsx("strong",{children:"STL"}),"(",e.jsx("em",{children:"Seasonal-Trend decomposition using LOESS"}),"), disponible en la biblioteca",e.jsx("strong",{children:" statsmodels"}),". Este algoritmo permite descomponer una serie en componentes de tendencia, estacionalidad y ruido de manera robusta y confiable."]}),e.jsx("p",{children:"STL descompone una serie temporal en tres componentes principales:"}),e.jsxs("ul",{className:"list-group list-group-flush mb-4",children:[e.jsxs("li",{className:"list-group-item",children:[e.jsx("strong",{children:"Tendencia:"}),e.jsx("p",{children:"Calculada mediante un suavizado LOESS (Locally Estimated Scatterplot Smoothing), ajusta las fluctuaciones a corto plazo para capturar la dirección general de los datos."})]}),e.jsxs("li",{className:"list-group-item",children:[e.jsx("strong",{children:"Estacionalidad:"}),e.jsx("p",{children:"Identificada como patrones cíclicos recurrentes en intervalos regulares. Tras eliminar la tendencia, el algoritmo calcula promedios estacionales ajustados para cada período."})]}),e.jsxs("li",{className:"list-group-item",children:[e.jsx("strong",{children:"Ruido:"}),e.jsx("p",{children:"Representa las fluctuaciones aleatorias restantes tras eliminar tendencia y estacionalidad. Se calcula como la diferencia entre los valores originales y la suma de las otras dos componentes."})]})]}),e.jsxs("p",{children:["El algoritmo realiza múltiples iteraciones para ajustar las componentes y utiliza un sistema de ",e.jsx("strong",{children:"pesos robustos"})," que reduce el impacto de valores atípicos, garantizando estimaciones estables."]}),e.jsxs("div",{className:"bg-light p-3 rounded mb-4",children:[e.jsx("em",{children:"Modelo aditivo utilizado:"}),e.jsx("pre",{style:{backgroundColor:"#eef",padding:"10px",borderRadius:"5px"},children:"Serie temporal = Tendencia + Estacionalidad + Ruido"})]}),e.jsx("p",{children:"Durante cada iteración, el algoritmo realiza los siguientes pasos:"}),e.jsxs("ol",{className:"mb-4",children:[e.jsx("li",{children:"Ajuste inicial de la tendencia mediante un suavizado LOESS global sobre los datos."}),e.jsx("li",{children:"Cálculo de la estacionalidad como la desviación media cíclica respecto a la tendencia ajustada."}),e.jsx("li",{children:"Determinación del ruido como la diferencia entre los datos originales y la suma de tendencia y estacionalidad."}),e.jsx("li",{children:"Reajuste iterativo con pesos robustos para manejar valores atípicos."})]}),e.jsxs("p",{children:["Si deseas conocer más detalles sobre la implementación de este algoritmo, consulta la documentación oficial de ",e.jsx("strong",{children:"statsmodels"})," y el código fuente de la clase ",e.jsx("strong",{children:"STL"}),", disponible en GitHub:"]}),e.jsx("a",{href:"https://github.com/statsmodels/statsmodels/blob/main/statsmodels/tsa/stl/_stl.pyx",target:"_blank",rel:"noopener noreferrer",className:"btn btn-primary",children:"Consultar los detalles del algoritmo en GitHub"})]})})})})});export{s as default};
