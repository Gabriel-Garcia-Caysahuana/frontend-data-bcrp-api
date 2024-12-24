// src/utils/analisis.js
const Plotly = window.Plotly;

/**
 * Agrupa los datos por una clave específica y suma los valores de una columna.
 * @param {Array<Object>} data - Datos procesados.
 * @param {string} clave - Clave para agrupar los datos.
 * @param {string} columna - Columna cuyos valores serán sumados.
 * @returns {Object} - Objeto con las sumas agrupadas.
 */
function agruparYSumar(data, clave, columna) {
  return data.reduce((acumulador, fila) => {
    const grupo = fila[clave];
    if (!acumulador[grupo]) {
      acumulador[grupo] = 0;
    }
    acumulador[grupo] += fila[columna] ? 1 : 0; // Suma si la columna es true (nulo)
    return acumulador;
  }, {});
}

/**
* Calcula estadísticas descriptivas agrupadas por una clave específica.
* @param {Array<Object>} data - Datos procesados.
* @param {string} clave - Clave para agrupar los datos.
* @param {string} columna - Columna cuyos valores serán analizados.
* @returns {Object} - Estadísticas descriptivas por grupo.
*/
function calcularEstadisticas(data, clave, columna) {
  const grupos = data.reduce((acumulador, fila) => {
    const grupo = fila[clave];
    if (!acumulador[grupo]) {
      acumulador[grupo] = [];
    }
    if (fila[columna] !== null) {
      acumulador[grupo].push(fila[columna]);
    }
    return acumulador;
  }, {});

  const estadisticas = {};
  for (const grupo in grupos) {
    const valores = grupos[grupo];
    const suma = valores.reduce((a, b) => a + b, 0);
    const media = valores.length > 0 ? suma / valores.length : 0;
    const min = Math.min(...valores);
    const max = Math.max(...valores);
    estadisticas[grupo] = {
      count: valores.length,
      mean: media.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2)
    };
  }

  return estadisticas;
}


export function explorarDatos(frecuencia, data) {
  const valoresPerdidos = data.filter(row => row.null).length;
  const perdidosPorAno = agruparYSumar(data, 'year', 'null');
  const estadisticasPorAno = calcularEstadisticas(data, 'year', 'value');

  let resultadoHTML = `
      <h5 class="text-primary">Datos Generales:</h5>
      <p><strong>Total de valores perdidos:</strong> ${valoresPerdidos}</p>
      <h5 class="text-primary mt-4">Valores Perdidos:</h5>
      <table class="table table-striped table-sm">
          <thead>
              <tr>
                  <th>Categoría</th>
                  <th>Detalle</th>
                  <th>Valores Perdidos</th>
              </tr>
          </thead>
          <tbody>
              ${Object.entries(perdidosPorAno)
      .map(([year, count]) => `
                  <tr>
                      <td>Año</td>
                      <td>${year}</td>
                      <td>${count}</td>
                  </tr>`).join('')}
              ${frecuencia === "diaria"
      ? Object.entries(agruparYSumar(data, 'value_day_week', 'null'))
        .map(([day, count]) => `
                      <tr>
                          <td>Día de la Semana</td>
                          <td>Día ${day}</td>
                          <td>${count}</td>
                      </tr>`).join('')
      : ''
    }
          </tbody>
      </table>
  
      <h5 class="text-primary mt-4">Estadísticas Descriptivas por Año:</h5>
      <table class="table table-striped table-sm">
          <thead>
              <tr>
                  <th>Año</th>
                  <th>Cantidad</th>
                  <th>Media</th>
                  <th>Mínimo</th>
                  <th>Máximo</th>
              </tr>
          </thead>
          <tbody>
              ${Object.entries(estadisticasPorAno)
      .map(([year, stats]) => `
                  <tr>
                      <td>${year}</td>
                      <td>${stats.count}</td>
                      <td>${stats.mean}</td>
                      <td>${stats.min}</td>
                      <td>${stats.max}</td>
                  </tr>`).join('')}
          </tbody>
      </table>
    `;

  return resultadoHTML;
}


export function visualizarLinePlot(data, titulo, guardar = false) {
  const dataSorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));

  const trace = {
    x: dataSorted.map(row => row.date),
    y: dataSorted.map(row => row.value),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "blue" },
    line: { width: 2 },
  };

  const layout = {
    title: titulo,
    xaxis: { title: "Fecha", tickangle: -45 },
    yaxis: { title: "Valor" },
  };

  const config = { responsive: true, displaylogo: false };
  Plotly.newPlot("linePlotDiv", [trace], layout, config);

}


export function visualizarBoxPlot(data, titulo, guardar = false) {
  const trace = {
    y: data.map(row => row.value),
    x: data.map(row => row.year),
    type: "box",
    name: "Distribución Anual",
    boxpoints: false,
  };

  const layout = {
    title: titulo,
    xaxis: { title: "Año" },
    yaxis: { title: "Valor" },
  };

  const config = { responsive: true, displaylogo: false };
  Plotly.newPlot("boxPlotDiv", [trace], layout, config);

}


export function visualizarComparacionAnual(data, guardar = false) {
  const datosPorAñoYMes = {};

  data.forEach(row => {
    const año = row.year;
    const mes = row.value_month;
    if (!datosPorAñoYMes[año]) {
      datosPorAñoYMes[año] = {};
    }
    if (!datosPorAñoYMes[año][mes]) {
      datosPorAñoYMes[año][mes] = [];
    }
    if (row.value !== null) {
      datosPorAñoYMes[año][mes].push(row.value);
    }
  });

  const traces = Object.keys(datosPorAñoYMes).map(año => {
    const yValues = [];
    for (let mes = 1; mes <= 12; mes++) {
      const valores = datosPorAñoYMes[año][mes] || [];
      yValues.push(valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : null);
    }

    return {
      x: [...Array(12).keys()].map(i => i + 1),
      y: yValues,
      type: "scatter",
      mode: "lines+markers",
      name: año,
    };
  });

  const layout = {
    title: "Comparación Mensual por Año",
    xaxis: {
      title: "Mes",
      tickmode: "array",
      tickvals: [...Array(12).keys()].map(i => i + 1),
      ticktext: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    },
    yaxis: { title: "Media" },
  };

  const config = { responsive: true, displaylogo: false };
  Plotly.newPlot("comparacionAnualDiv", traces, layout, config);

}


export function graficarComponente(data, titulo, divId) {
  const trace = {
    x: Object.keys(data),
    y: Object.values(data),
    type: "scatter",
    mode: "lines",
    line: { shape: "spline", width: 2 },
  };

  const layout = {
    title: titulo,
    xaxis: { title: "Fecha" },
    yaxis: { title: "Valor" },
  };
  const config = { responsive: true, displaylogo: false };

  Plotly.newPlot(divId, [trace], layout, config);
}
