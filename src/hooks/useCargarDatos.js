// src/hooks/useCargarDatos.js
import { useState, useEffect } from 'react';
import ordenesCompraService from '../services/ordenesCompraService';

const useCargarDatos = () => {
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [error, setError] = useState('');

  // Cargar proveedores y productos al montar el componente
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [proveedoresData, productosData] = await Promise.all([
          ordenesCompraService.obtenerProveedores(),
          ordenesCompraService.obtenerProductos(),
        ]);
        setProveedores(proveedoresData);
        setProductos(productosData);
      } catch (error) {
        setError('Error al cargar datos iniciales');
      }
    };

    cargarDatosIniciales();
  }, []);

  // Función para cargar todas las órdenes de compra
  const cargarOrdenesCompra = async () => {
    try {
      const data = await ordenesCompraService.obtenerOrdenesCompra();
      setOrdenesCompra(data);
      setError('');
    } catch (error) {
      setError('Error al cargar órdenes de compra');
    }
  };

  return {
    proveedores,
    productos,
    ordenesCompra,
    error,
    cargarOrdenesCompra,
  };
};

export default useCargarDatos;