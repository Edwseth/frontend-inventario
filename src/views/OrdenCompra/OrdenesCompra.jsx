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
  const { user, isAdmin, isAuthenticated } = useAuth();
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [accion, setAccion] = useState('');
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

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

  // Función para crear una nueva orden de compra
  const handleCrearOrdenCompra = async (nuevaOrden) => {
    try {
      await ordenesCompraService.crearOrdenCompra(nuevaOrden);
      setMensajeExito('Orden de compra creada exitosamente'); // Mostrar mensaje de éxito
      setError(''); // Limpiar mensajes de error
      setTimeout(() => setMensajeExito(''), 5000); // Limpiar el mensaje después de 5 segundos
    } catch (error) {
      setError('Error al crear orden de compra');
      setMensajeExito(''); // Limpiar mensaje de éxito
    }
  };

  // Limpiar el estado de ordenEncontrada al cambiar de acción
  useEffect(() => {
    if (accion !== 'buscar') {
      setOrdenEncontrada(null);
    }
  }, [accion]);

  return (
    <div className="ordenes-compra-container">
      <h1>Gestión de Órdenes de Compra</h1>
      {error && <div className="error-message">{error}</div>}
      {mensajeExito && <div className="success-message">{mensajeExito}</div>} {/* Mostrar mensaje de éxito */}

      {/* Botones de subfunciones con iconos */}
      <div className="subfunciones">
        {[
          { accion: 'crear', icono: adicionarIcon, texto: 'Crear Ordenes' },
          { accion: 'listar', icono: listarIcon, texto: 'Listar Ordenes' },
          { accion: 'buscar', icono: buscarIcon, texto: 'Buscar Ordenes' },
          { accion: 'modificar', icono: refreshIcon, texto: 'Modificar Ordenes' },
          { accion: 'eliminar', icono: eliminarIcon, texto: 'Eliminar Ordenes' },
          { accion: 'estado', icono: estadoIcon, texto: 'Estado Ordenes' },
        ].map((subaccion) => (
          <div
            key={subaccion.accion}
            className={`subfuncion ${accion === subaccion.accion ? 'active' : ''}`}git
            onClick={() => setAccion(subaccion.accion)}
          >
            <img src={subaccion.icono} alt={subaccion.accion} className="icono-subfuncion" />
            <p>{subaccion.texto}</p>
          </div>
        ))}
      </div>

      {/* Contenido según la acción seleccionada */}
      <div className="contenido-subfuncion">
      {!accion && ( // Si no hay acción seleccionada, mostrar mensaje de bienvenida
          <div className="mensaje-bienvenida">
            <h2>Bienvenido a la Gestión de Ordenes de Compra</h2>
            <p>Selecciona una acción para comenzar.</p>
          </div>
        )}
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
          <>
            <BuscarOrdenCompra onBuscar={setOrdenEncontrada} />
            {ordenEncontrada ? (
              <div className="detalles-orden">
                <h3>Detalles de la Orden de Compra</h3>
                <p><strong>ID:</strong> {ordenEncontrada.id}</p>
                <p><strong>Fecha:</strong> {ordenEncontrada.fechaOrden}</p>
                <p><strong>Estado:</strong> {ordenEncontrada.estado}</p>
                <p><strong>Proveedor:</strong> {ordenEncontrada.proveedor.nombre}</p>
                <p><strong>NIT/Cédula:</strong> {ordenEncontrada.proveedor.nitCedula}</p>
                <p><strong>Teléfono:</strong> {ordenEncontrada.proveedor.telefonoContacto}</p>
                <h4>Detalles de la Orden</h4>
                {ordenEncontrada.detalles.map((detalle, index) => (
                  <div key={index} className="detalle-producto">
                    <p><strong>Producto:</strong> {detalle.producto.nombre}</p>
                    <p><strong>Cantidad Solicitada:</strong> {detalle.cantidad}</p>
                    <p><strong>Cantidad Recibida:</strong> {detalle.cantidadRecibida}</p>
                    <p><strong>Cantidad Pendiente:</strong> {detalle.cantidadPendiente}</p>
                    <p><strong>Precio Unitario:</strong> ${detalle.precioUnitario.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No se encontró ninguna orden con el ID proporcionado.</p>
            )}
          </>
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