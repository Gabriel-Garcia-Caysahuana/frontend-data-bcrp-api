import axios from "axios";

// Configuración de Axios con URL base fija
const api = axios.create({
  baseURL: "https://api-bcrp-series-analyse.fly.dev/api",
});

export const fetchData = async (frecuencia, codigoSerie, periodoInicial) => {
  try {
    const response = await api.post("/procesar-datos/", {
      frecuencia,
      codigos_series: codigoSerie,
      periodo_inicial: periodoInicial,
    });
    return response.data;
  } catch (error) {
    console.error("Error al consumir la API:", error);
    throw error; // Maneja el error en el frontend
  }
};
