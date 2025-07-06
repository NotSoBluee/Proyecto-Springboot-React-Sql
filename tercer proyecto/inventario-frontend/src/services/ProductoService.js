import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

export const obtenerProductos = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};
