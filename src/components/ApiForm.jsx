import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import {
  explorarDatos,
  visualizarLinePlot,
  visualizarBoxPlot,
  visualizarComparacionAnual,
  graficarComponente,
} from '../utils/analisis';

const descargarJSON = (datos) => {
  const blob = new Blob([JSON.stringify(datos, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'datos_procesados.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ApiForm = () => {
  const [frecuencia, setFrecuencia] = useState('diaria');
  const [codigoSerie, setCodigoSerie] = useState('');
  const [periodoInicial, setPeriodoInicial] = useState('');
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [analisis, setAnalisis] = useState('');

  const handleFrecuenciaChange = (e) => {
    const nuevaFrecuencia = e.target.value;
    setFrecuencia(nuevaFrecuencia);

    if (nuevaFrecuencia === 'mensual' && periodoInicial.includes('-')) {
      const [year, month, day] = periodoInicial.split('-');
      setPeriodoInicial(`${year}-${month}`);
    } else if (nuevaFrecuencia === 'diaria' && !periodoInicial.includes('-')) {
      setPeriodoInicial('');
    }
  };

  const handlePeriodoChange = (e) => {
    setPeriodoInicial(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResultados(null);

    let periodoFormateado = periodoInicial;

    if (frecuencia === 'diaria') {
      const [year, month, day] = periodoInicial.split('-');
      periodoFormateado = `${day}-${month}-${year}`;
    } else if (frecuencia === 'mensual') {
      const [year, month] = periodoInicial.split('-');
      periodoFormateado = `${month}-${year}`;
    }

    try {
      const data = await fetchData(frecuencia, codigoSerie, periodoFormateado);
      setResultados(data);
    } catch (err) {
      setError('Hubo un error al procesar la solicitud.');
    }
  };

  useEffect(() => {
    if (resultados) {
      setTitulo(resultados.titulo); // Actualiza el estado para el título

      // Generar análisis descriptivo
      const analisisHTML = explorarDatos(frecuencia, resultados.datos);
      setAnalisis(analisisHTML);

      // Generar gráficos
      visualizarLinePlot(resultados.datos, 'Serie Temporal');
      visualizarBoxPlot(resultados.datos, 'Distribución Anual');
      visualizarComparacionAnual(resultados.datos);
      graficarComponente(
        resultados.componentes.tendencia,
        'Tendencia',
        'tendenciaDiv'
      );
      graficarComponente(
        resultados.componentes.estacionalidad,
        'Estacionalidad',
        'estacionalidadDiv'
      );
      graficarComponente(resultados.componentes.ruido, 'Ruido', 'ruidoDiv');
    }
  }, [resultados, frecuencia]);

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <h2
            className="text-center mb-4"
            style={{
              backgroundColor: "#f9f9f9",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            Tu Herramienta para Analizar Datos del BCRP
          </h2>

          {/* Información general sobre la aplicación */}
          <div className="alert alert-primary">
            <h5>¿Qué hace esta aplicación?</h5>
            <p>
              Esta aplicación proporciona estadísticas y gráficos interactivos basados en los datos del
              <a href="https://www.bcrp.gob.pe/" target="_blank" rel="noopener noreferrer"> Banco Central de Reserva del Perú (BCRP)</a>.
            </p>
            <p>Actualmente soporta dos tipos de series:</p>
            <ul>
              <li><b>Mensuales:</b> Datos agregados por mes.</li>
              <li><b>Diarias:</b> Datos de alta frecuencia (día a día).</li>
            </ul>
          </div>

          {/* Información sobre las fuentes de datos */}
          <div className="alert alert-secondary">
            <h5>¿De dónde obtener la información para el formulario?</h5>
            <p>Los códigos de las series y la información sobre la disponibilidad de fechas (inicio y fin) están disponibles en los siguientes enlaces: </p>
            <ul>
              <li>
                <a
                  href="https://estadisticas.bcrp.gob.pe/estadisticas/series/diarias"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Series Diarias
                </a>
              </li>
              <li>
                <a
                  href="https://estadisticas.bcrp.gob.pe/estadisticas/series/mensuales"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Series Mensuales
                </a>
              </li>
            </ul>
          </div>
          {/* Información sobre los requisitos */}
          <div className="alert alert-info">
            <h5>Información importante:</h5>
            <ul>
              <li>
                Para frecuencias <b>mensuales</b>, el periodo inicial debe cubrir al menos <b>24 meses</b>.
              </li>
              <li>
                Para frecuencias <b>diarias</b>, el periodo inicial debe cubrir al menos <b>14 días</b>.
              </li>
              <li>
                El límite de solicitudes es de <b>5 por minuto</b>. Si alcanzas este límite, deberás esperar antes de realizar otra consulta.
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className='p-4 border rounded bg-light'>
            <div className='mb-3'>
              <label className='form-label'>Frecuencia:</label>
              <select
                className='form-select'
                value={frecuencia}
                onChange={handleFrecuenciaChange}
              >
                <option value='diaria'>Diaria</option>
                <option value='mensual'>Mensual</option>
              </select>
              <small className='form-text text-muted'>
                Selecciona la frecuencia de los datos.
              </small>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Código de Serie:</label>
              <input
                type='text'
                className='form-control'
                value={codigoSerie}
                onChange={(e) => setCodigoSerie(e.target.value)}
                placeholder='Ejemplo: PD04639PD'
              />
              <small className='form-text text-muted'>
                Introduce el código de serie proporcionado por el BCRP.
              </small>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Periodo Inicial:</label>
              <input
                type={frecuencia === 'diaria' ? 'date' : 'month'}
                className='form-control'
                value={periodoInicial}
                onChange={handlePeriodoChange}
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              Consultar
            </button>
          </form>
          {error && <p className='text-danger mt-3'>{error}</p>}
        </div>
      </div>
      {resultados && (
        <div className='mt-5'>
          <div className='card'>
            <div className='card-body'>
              <h1 id='titulo'>{titulo}</h1>
              <div
                id='analisisdiv'
                className='mt-3'
                dangerouslySetInnerHTML={{ __html: analisis }}
              ></div>
            </div>
          </div>
          <div id='linePlotDiv' className='mt-5'></div>
          <div id='boxPlotDiv' className='mt-5'></div>
          <div id='comparacionAnualDiv' className='mt-5'></div>
          <div id='tendenciaDiv' className='mt-5'></div>
          <div id='estacionalidadDiv' className='mt-5'></div>
          <div id='ruidoDiv' className='mt-5'></div>
          <button
            className='btn btn-success float-end'
            onClick={() => descargarJSON(resultados)}
          >
            Descargar JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiForm;
