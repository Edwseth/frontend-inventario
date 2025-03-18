// src/views/OrdenesCompra/OrdenesCompra.jsx
import React, { useState, useEffect } from 'react';
import ordenesCompraService from '../../services/ordenesCompraService';
import { useAuth } from '../../context/AuthContext';
import FormularioOrdenCompra from './FormularioOrdenCompra';
import ListaOrdenesCompra from './ListarOrdenesCompra';
import BuscarOrdenCompra from './BuscarOrdenCompra';
import './OrdenCompra.css';

// Importar iconos
import adicionarIcon from '../../assets/icons/add.png';
import listarIcon from '../../assets/icons/lista.png';
import buscarIcon from '../../assets/icons/buscar.png';
import refreshIcon from '../../assets/icons/refresh.png';
import eliminarIcon from '../../assets/icons/eliminar.png';
import estadoIcon from '../../assets/icons/check.png';

const OrdenesCompra = () => {
  // Obtener el estado de autenticación y el usuario
  const { user, isAdmin, isAuthenticated } = useAuth();
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [accion, setAccion] = useState('');
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

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

  // Cargar datos iniciales (proveedores y productos)
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

  // Cargar órdenes de compra cuando la acción es "listar"
  useEffect(() => {
    if (accion === 'listar') {
      cargarOrdenesCompra();
    }
  }, [accion]);

  // Función para buscar una orden de compra por ID
  const handleBuscarOrdenCompra = async (id) => {
    try {
      const orden = await ordenesCompraService.buscarOrdenCompra(id);
      setOrdenEncontrada(orden);
      setError('');
    } catch (error) {
      setOrdenEncontrada(null);
      setError('Orden no encontrada');
    }
  };

  // Función para crear una nueva orden de compra
  const handleCrearOrdenCompra = async (nuevaOrden) => {
    try {
      await ordenesCompraService.crearOrdenCompra(nuevaOrden);
      cargarOrdenesCompra(); // Recargar la lista de órdenes
      setError('');
    } catch (error) {
      setError('Error al crear orden de compra');
    }
  };

  return (
    <div className="ordenes-compra-container">
      <h1>Gestión de Órdenes de Compra</h1>
      {error && <div className="error-message">{error}</div>}

      {/* Botones de subfunciones con iconos */}
      <div className="subfunciones">
        {[
          { accion: 'crear', icono: adicionarIcon, texto: 'Crear' },
          { accion: 'listar', icono: listarIcon, texto: 'Listar' },
          { accion: 'buscar', icono: buscarIcon, texto: 'Buscar' },
          { accion: 'modificar', icono: refreshIcon, texto: 'Modificar' },
          { accion: 'eliminar', icono: eliminarIcon, texto: 'Eliminar' },
          { accion: 'estado', icono: estadoIcon, texto: 'Estado' },
        ].map((subaccion) => (
          <div
            key={subaccion.accion}
            className={`subfuncion ${accion === subaccion.accion ? 'active' : ''}`}
            onClick={() => setAccion(subaccion.accion)}
          >
            <img src={subaccion.icono} alt={subaccion.accion} className="icono-subfuncion" />
            <p>{subaccion.texto}</p>
          </div>
        ))}
      </div>

      {/* Contenido según la acción seleccionada */}
      <div className="contenido-subfuncion">
        {accion === 'crear' && (
          <FormularioOrdenCompra
            onSubmit={handleCrearOrdenCompra}
            titulo="Crear Orden de Compra"
            proveedores={proveedores}
            productos={productos}
          />
        )}

        {accion === 'listar' && <ListaOrdenesCompra ordenes={ordenesCompra} />}

        {accion === 'buscar' && (
          <BuscarOrdenCompra onBuscar={handleBuscarOrdenCompra} />
        )}

        {accion === 'modificar' && (
          <p>Funcionalidad de modificar en desarrollo...</p>
        )}

        {accion === 'eliminar' && (
          <p>Funcionalidad de eliminar en desarrollo...</p>
        )}

        {accion === 'estado' && (
          <p>Funcionalidad de cambiar estado en desarrollo...</p>
        )}
      </div>
    </div>
  );
};

export default OrdenesCompra;