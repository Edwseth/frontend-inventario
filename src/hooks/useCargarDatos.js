// src/hooks/useCargarDatos.js
import { useState, useEffect, useCallback } from 'react';
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
  const cargarOrdenesCompra = useCallback(async () => {
    try {
      const ordenes = await ordenesCompraService.obtenerOrdenesCompra();
      setOrdenesCompra(ordenes);
    } catch (error) {
      console.error('Error al cargar órdenes de compra:', error);
    }
  }, []);

  return {
    proveedores,
    productos,
    ordenesCompra,
    error,
    cargarOrdenesCompra,
  };
};

export default useCargarDatos;