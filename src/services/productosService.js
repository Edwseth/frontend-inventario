// src/services/productosService.js
import axios from '../config/axios';

export const obtenerProductos = async () => {
  try {
    const response = await axios.get('/api/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const crearProducto = async (formData) => {
  try {
    const response = await axios.post('/api/productos', formData);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const actualizarProducto = async (id, formData) => {
  try {
    const response = await axios.put(`/api/productos/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const buscarProducto = async (id) => {
  try {
    const response = await axios.get(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar producto:', error);
    throw error;
  }
};

export const verificarDisponibilidad = async (id, cantidad) => {
  try {
    const response = await axios.post(`/api/productos/${id}/verificar-disponibilidad`, {
      cantidad,
    });
    return response.data;
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    throw error;
  }
};

export const deshabilitarProducto = async (id) => {
  try {
    const response = await axios.put(`/api/productos/${id}/deshabilitar`);
    return response.data;
  } catch (error) {
    console.error('Error al deshabilitar producto:', error);
    throw error;
  }
};