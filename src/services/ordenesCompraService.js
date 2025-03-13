// src/services/ordenesCompraService.js
import axios from '../config/axios';

const obtenerOrdenesCompra = async () => {
  const response = await axios.get('/api/ordenes-compra');
  return response.data;
};

const buscarOrdenCompra = async (id) => {
  const response = await axios.get(`/api/ordenes-compra/${id}`);
  return response.data;
};

const crearOrdenCompra = async (orden) => {
  const response = await axios.post('/api/ordenes-compra', orden);
  return response.data;
};

const obtenerProveedores = async () => {
  const response = await axios.get('/api/proveedores');
  return response.data;
};

const obtenerProductos = async () => {
  const response = await axios.get('/api/productos');
  return response.data;
};

export default {
  obtenerOrdenesCompra,
  buscarOrdenCompra,
  crearOrdenCompra,
  obtenerProveedores,
  obtenerProductos
};

