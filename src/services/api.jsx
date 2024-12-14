import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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
