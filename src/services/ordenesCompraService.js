// src/services/ordenesCompraService.js
import axios from '../config/axios';

const ORDENES_COMPRA_URL = '/api/ordenes-compra';
const PROVEEDORES_URL = '/api/proveedores';
const PRODUCTOS_URL = '/api/productos';
const CAMBIAR_ESTADO_ORDEN_COMPRA_URL = (id) => `${ORDENES_COMPRA_URL}/${id}/estado`;

const obtenerOrdenesCompra = async () => {
  const response = await axios.get(ORDENES_COMPRA_URL);
  return response.data;
};

const buscarOrdenCompra = async (id) => {
  const response = await axios.get(`${ORDENES_COMPRA_URL}/${id}`);
  return response.data;
};

const crearOrdenCompra = async (orden) => {
  try {
    const response = await axios.post(ORDENES_COMPRA_URL, orden);
    return response.data;
  } catch (error) {
    console.error('Error al crear orden de compra:', error);
    throw error;
  }
};

const obtenerProveedores = async () => {
  const response = await axios.get(PROVEEDORES_URL);
  return response.data;
};

const obtenerProductos = async () => {
  const response = await axios.get(PRODUCTOS_URL);
  return response.data;
};

const modificarOrdenCompra = async (id, orden) => {
  try {
    const response = await axios.put(`${ORDENES_COMPRA_URL}/${id}`, orden);
    return response.data;
  } catch (error) {
    console.error('Error al modificar orden de compra:', error);
    throw error;
  }
};

const eliminarOrdenCompra = async (id) => {
  try {
    const response = await axios.delete(`${ORDENES_COMPRA_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar orden:', error);
    throw error;
  }
};

const cambiarEstadoOrdenCompra = async (id, nuevoEstado) => {
  if (!nuevoEstado || nuevoEstado.trim() === '') {
    throw new Error('El estado no puede ser nulo o vacío.');
  }

  try {
    const response = await axios.put(CAMBIAR_ESTADO_ORDEN_COMPRA_URL(id), { nuevoEstado }); // Cambiado a "nuevoEstado"
    return response.data;
  } catch (error) {
    console.error('Error al cambiar el estado de la orden:', error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error desconocido al cambiar el estado');
    }
    throw error;
  }
};

export default {
  obtenerOrdenesCompra,
  buscarOrdenCompra,
  crearOrdenCompra,
  modificarOrdenCompra,
  eliminarOrdenCompra,
  obtenerProveedores,
  obtenerProductos,
  cambiarEstadoOrdenCompra,
};

