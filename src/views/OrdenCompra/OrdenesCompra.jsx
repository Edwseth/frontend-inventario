// src/views/OrdenesCompra/OrdenesCompra.jsx
import React, { useState, useEffect } from 'react';
import useCargarDatos from '../../hooks/useCargarDatos';
import ordenesCompraService from '../../services/ordenesCompraService';
import FormularioOrdenCompra from './FormularioOrdenCompra';
import ListaOrdenesCompra from './ListarOrdenesCompra';
import BuscarOrdenCompra from './BuscarOrdenCompra';
import ModificarOrdenCompra from './ModificarOrdenCompra';
import EliminarOrdenCompra from './EliminarOrdenCompra';
import EstadoOrdenCompra from './EstadoOrdenCompra';
import './OrdenCompra.css';

// Importar iconos
import adicionarIcon from '../../assets/icons/add.png';
import listarIcon from '../../assets/icons/lista.png';
import buscarIcon from '../../assets/icons/buscar.png';
import refreshIcon from '../../assets/icons/refresh.png';
import eliminarIcon from '../../assets/icons/eliminar.png';
import estadoIcon from '../../assets/icons/check.png';

const OrdenesCompra = () => {
  const { proveedores, productos, ordenesCompra, cargarOrdenesCompra } = useCargarDatos();
  const [accion, setAccion] = useState('');
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState(null);

  // Cargar órdenes de compra cuando la acción es "listar"
  useEffect(() => {
    if (accion === 'listar') {
      cargarOrdenesCompra();
    }
  }, [accion, cargarOrdenesCompra]);

  // Función para crear una nueva orden de compra
  const handleCrearOrdenCompra = async (nuevaOrden) => {
    try {
      await ordenesCompraService.crearOrdenCompra(nuevaOrden);
      setMensajeExito('Orden de compra creada exitosamente');
      setError('null');
      setTimeout(() => setMensajeExito(''), 5000);
    } catch (error) {
      setError('Error al crear orden de compra');
      setMensajeExito('');
    }
  };

  // Función para manejar la modificación de una orden de compra
  const handleModificarOrdenCompra = async () => {
    setMensajeExito('Orden de compra modificada exitosamente');
    setTimeout(() => setMensajeExito(''), 5000);
  };

  // Limpiar el estado de ordenEncontrada solo si no es "buscar" ni "modificar"
  useEffect(() => {
    if (accion !== 'buscar' && accion !== 'modificar') {
      setOrdenEncontrada(null);
    }
  }, [accion]);

  return (
    <div className="ordenes-compra-container">
      <h1>Gestión de Órdenes de Compra</h1>
      {error && <div className="error-message">{error}</div>}
      {mensajeExito && <div className="success-message">{mensajeExito}</div>}

      {/* Botones de subfunciones con iconos */}
      <div className="subfunciones">
        {[
          { accion: 'crear', icono: adicionarIcon, texto: 'Crear Ordenes' },
          { accion: 'listar', icono: listarIcon, texto: 'Listar Ordenes' },
          { accion: 'buscar', icono: buscarIcon, texto: 'Buscar Ordenes' },
          { accion: 'modificar', icono: refreshIcon, texto: 'Modificar Ordenes', deshabilitado: !ordenEncontrada },
          { accion: 'eliminar', icono: eliminarIcon, texto: 'Eliminar Ordenes'},
          { accion: 'estado', icono: estadoIcon, texto: 'Estado Ordenes' },
        ].map((subaccion) => (
          <div
            key={subaccion.accion}
            className={`subfuncion ${accion === subaccion.accion ? 'active' : ''} ${subaccion.deshabilitado ? 'disabled' : ''}`}
            onClick={() => {

              if (!subaccion.deshabilitado) setAccion(subaccion.accion);
            }}
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
            <BuscarOrdenCompra
              onBuscar={(orden) => {
                if (orden) {
                  setOrdenEncontrada(orden); // Update the state with the found order
                  setAccion('modificar'); // Automatically transition to the "modificar" action
                } else {
                  setOrdenEncontrada(null); // Clear the state if no order is found
                }
              }}
            />
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
          <ModificarOrdenCompra
            ordenId={ordenEncontrada?.id}
            proveedores={proveedores}
            productos={productos}
            onModificar={handleModificarOrdenCompra}
          />
        )}
        {accion === 'eliminar' && (
          <EliminarOrdenCompra
            orden={ordenEncontrada}
            onEliminar={async () => {
              try {
                await ordenesCompraService.eliminarOrdenCompra(ordenEncontrada.id);
                setMensajeExito('Orden eliminada exitosamente');
                setAccion('');
                setOrdenEncontrada(null);
              } catch (error) {
                setError('Error al eliminar la orden de compra');
              }
            }}
          />
        )}

        {accion === 'estado' && <EstadoOrdenCompra />}
      </div>
    </div>
  );
};

export default OrdenesCompra;