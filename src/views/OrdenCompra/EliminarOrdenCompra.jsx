//src/views/OrdenCompra/EliminarOrdenCompra.jsx
import React, { useState } from 'react';
import ordenesCompraService from '../../services/ordenesCompraService';

const EliminarOrdenCompra = () => {
  const [buscarId, setBuscarId] = useState('');
  const [orden, setOrden] = useState(null);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // Function to fetch order details
  const handleBuscar = async () => {
    try {
      if (!buscarId.trim()) {
        setError('Debe ingresar un ID para buscar');
        setOrden(null);
        return;
      }
      const ordenEncontrada = await ordenesCompraService.buscarOrdenCompra(buscarId);
      setOrden(ordenEncontrada);
      setError('');
    } catch (error) {
      setError('Orden no encontrada');
      setOrden(null);
    }
  };

  // Function to delete the order
  const handleEliminar = async () => {
    try {
      if (!orden) {
        setError('No hay una orden cargada para eliminar');
        return;
      }
      await ordenesCompraService.eliminarOrdenCompra(orden.id);
      setMensajeExito('Orden eliminada exitosamente');
      setOrden(null);
      setBuscarId('');
      setTimeout(() => setMensajeExito(''), 5000);
    } catch (error) {
      setError('Error al eliminar la orden de compra');
    }
  };

  return (
    <div className="eliminar-orden-compra">
      <h2>Eliminar Orden de Compra</h2>

      {/* Input to search for the order */}
      <div className="buscar-orden">
        <input
          type="text"
          value={buscarId}
          onChange={(e) => setBuscarId(e.target.value)}
          placeholder="Ingrese el ID de la orden"
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {mensajeExito && <div className="success-message">{mensajeExito}</div>}

      {/* Display order details if found */}
      {orden && (
        <div className="detalles-orden">
          <h3>Detalles de la Orden de Compra</h3>
          <p><strong>ID:</strong> {orden.id}</p>
          <p><strong>Fecha:</strong> {orden.fechaOrden}</p>
          <p><strong>Estado:</strong> {orden.estado}</p>
          <p><strong>Proveedor:</strong> {orden.proveedor.nombre}</p>
          <p><strong>NIT/Cédula:</strong> {orden.proveedor.nitCedula}</p>
          <p><strong>Teléfono:</strong> {orden.proveedor.telefonoContacto}</p>
          <h4>Detalles de la Orden</h4>
          {orden.detalles.map((detalle, index) => (
            <div key={index} className="detalle-producto">
              <p><strong>Producto:</strong> {detalle.producto.nombre}</p>
              <p><strong>Cantidad Solicitada:</strong> {detalle.cantidad}</p>
              <p><strong>Cantidad Recibida:</strong> {detalle.cantidadRecibida}</p>
              <p><strong>Cantidad Pendiente:</strong> {detalle.cantidadPendiente}</p>
              <p><strong>Precio Unitario:</strong> ${detalle.precioUnitario.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Button to delete the order */}
      <button onClick={handleEliminar} className="boton-eliminar-confirmar">
        Confirmar Eliminación
      </button>
    </div>
  );
};

export default EliminarOrdenCompra;