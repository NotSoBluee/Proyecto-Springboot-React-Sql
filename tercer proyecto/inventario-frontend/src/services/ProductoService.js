import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

export const obtenerProductos = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

export const guardarProducto = async (producto) => {
  const respuesta = await axios.post('http://localhost:8080/api/productos', producto);
  return respuesta.data;
};

export const eliminarProducto = async (id) => {
  await axios.delete(`http://localhost:8080/api/productos/${id}`);
};
export const editarProducto = async (id, producto) => {
  await axios.put(`http://localhost:8080/api/productos/${id}`, producto);
};
