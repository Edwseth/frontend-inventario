// src/services/ordenesCompraService.js
import axios from '../config/axios';

const ORDENES_COMPRA_URL = '/api/ordenes-compra';
const PROVEEDORES_URL = '/api/proveedores';
const PRODUCTOS_URL = '/api/productos';

const obtenerOrdenesCompra = async () => {
  const response = await axios.get(ORDENES_COMPRA_URL);
  return response.data;
};

const buscarOrdenCompra = async (id) => {
  const response = await axios.get(`${ORDENES_COMPRA_URL}/${id}`);
  return response.data;
};

const crearOrdenCompra = async (orden) => {
  const response = await axios.post(ORDENES_COMPRA_URL, orden);
  return response.data;
};

const obtenerProveedores = async () => {
  const response = await axios.get(PROVEEDORES_URL);
  return response.data;
};

const obtenerProductos = async () => {
  const response = await axios.get(PRODUCTOS_URL);
  return response.data;
};

export default {
  obtenerOrdenesCompra,
  buscarOrdenCompra,
  crearOrdenCompra,
  obtenerProveedores,
  obtenerProductos,
};

