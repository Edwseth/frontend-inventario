// src/views/Productos/Productos.jsx
import React, { useState, useEffect } from 'react';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  buscarProducto,
  verificarDisponibilidad,
  deshabilitarProducto,
} from '../../services/productosService';
import ListaProductos from './ListaProductos';
import FormularioProducto from './FormularioProducto';
import BuscarProducto from './BuscarProducto';
import VerificarDisponibilidad from './VerificarDisponibilidad';
import DeshabilitarProducto from './DeshabilitarProducto';
import ActualizarProducto from './ActualizarProducto'; // Importar el nuevo componente
import './Productos.css';

// Importar los iconos
import adicionarIcon from '../../assets/icons/add.png'; // Ícono de adicionar
import listarIcon from '../../assets/icons/lista.png'; // Ícono de listar
import buscarIcon from '../../assets/icons/buscar.png'; // Ícono de buscar
import refreshIcon from '../../assets/icons/refresh.png'; // Ícono de actualizar
import disponibilidadIcon from '../../assets/icons/disponibilidad.png'; // Ícono de disponibilidad
import blockIcon from '../../assets/icons/block.png'; // Ícono de deshabilitar

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [accion, setAccion] = useState('');
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  useEffect(() => {
    if (accion === 'listar') {
      cargarProductos();
    }
  }, [accion]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const handleCrearProducto = async (formData) => {
    try {
      await crearProducto(formData);
      cargarProductos();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  const handleActualizarProducto = async (id, formData) => {
    try {
      await actualizarProducto(id, formData);
      cargarProductos();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const handleBuscarProducto = async (id) => {
    try {
      const data = await buscarProducto(id);
      setProductoEncontrado(data);
    } catch (error) {
      console.error('Error al buscar producto:', error);
      setProductoEncontrado(null);
    }
  };

  const handleVerificarDisponibilidad = async (id, cantidad) => {
    try {
      const data = await verificarDisponibilidad(id, cantidad);
      console.log('Mensaje de disponibilidad:', data.mensaje); // Para depuración
    } catch (error) {
      console.error('Error al verificar disponibilidad:', error);
    }
  };

  const handleDeshabilitarProducto = async (id) => {
    try {
      await deshabilitarProducto(id);
      cargarProductos();
    } catch (error) {
      console.error('Error al deshabilitar producto:', error);
    }
  };

  return (
    <div className="productos-container">
      <h1>Gestión de Productos</h1>

      {/* Subfunciones */}
      <div className="subfunciones">
        <div
          className={`subfuncion ${accion === 'crear' ? 'active' : ''}`}
          onClick={() => setAccion('crear')}
        >
          <img src={adicionarIcon} alt="Crear Producto" />
          <p>Crear Producto</p>
        </div>
        <div
          className={`subfuncion ${accion === 'listar' ? 'active' : ''}`}
          onClick={() => setAccion('listar')}
        >
          <img src={listarIcon} alt="Listar Productos" />
          <p>Listar Productos</p>
        </div>
        <div
          className={`subfuncion ${accion === 'buscar' ? 'active' : ''}`}
          onClick={() => setAccion('buscar')}
        >
          <img src={buscarIcon} alt="Buscar Producto" />
          <p>Buscar Producto</p>
        </div>
        <div
          className={`subfuncion ${accion === 'actualizar' ? 'active' : ''}`}
          onClick={() => setAccion('actualizar')}
        >
          <img src={refreshIcon} alt="Actualizar Producto" />
          <p>Actualizar Producto</p>
        </div>
        <div
          className={`subfuncion ${accion === 'verificar' ? 'active' : ''}`}
          onClick={() => setAccion('verificar')}
        >
          <img src={disponibilidadIcon} alt="Verificar Disponibilidad" />
          <p>Verificar Disponibilidad</p>
        </div>
        <div
          className={`subfuncion ${accion === 'deshabilitar' ? 'active' : ''}`}
          onClick={() => setAccion('deshabilitar')}
        >
          <img src={blockIcon} alt="Deshabilitar Producto" />
          <p>Deshabilitar Producto</p>
        </div>
      </div>

      {/* Contenido de la subfunción seleccionada */}
      <div className="contenido-subfuncion">
        {!accion && ( // Si no hay acción seleccionada, mostrar mensaje de bienvenida
          <div className="mensaje-bienvenida">
            <h2>Bienvenido a la Gestión de Productos</h2>
            <p>Selecciona una acción para comenzar.</p>
          </div>
        )}

        {accion === 'crear' && (
          <FormularioProducto
            onSubmit={handleCrearProducto}
            titulo="Crear Producto"
          />
        )}

        {accion === 'listar' && (
          <ListaProductos productos={productos} />
        )}

        {accion === 'buscar' && (
          <BuscarProducto
            productos={productos}
            onBuscar={handleBuscarProducto}
          />
        )}

        {accion === 'actualizar' && (
          <ActualizarProducto
            productos={productos}
            onActualizar={handleActualizarProducto}
          />
        )}

        {accion === 'verificar' && (
          <VerificarDisponibilidad onVerificar={handleVerificarDisponibilidad} />
        )}

        {accion === 'deshabilitar' && (
          <DeshabilitarProducto />
        )}

        {accion === 'buscar' && productoEncontrado && (
          <div className="producto-encontrado">
            <h3>Producto Encontrado</h3>
            <p>Nombre: {productoEncontrado.nombre}</p>
            <p>Descripción: {productoEncontrado.descripcion}</p>
            <p>SKU: {productoEncontrado.sku}</p>
            <p>Stock Actual: {productoEncontrado.stockActual}</p>
            <p>Stock Mínimo: {productoEncontrado.stockMin}</p>
            <p>Stock Mín. Proveedor: {productoEncontrado.stockMinProveedor}</p>
            <p>Unidad de Medida: {productoEncontrado.unidadMedida}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;