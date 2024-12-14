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
          <h2 className='text-center mb-4'>Consumo de API del BCRP</h2>
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
