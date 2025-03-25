//src/views/OrdenCompra/EstadoOrdenCompra.jsx
import React, { useState } from 'react';
import ordenesCompraService from '../../services/ordenesCompraService';

const EstadoOrdenCompra = () => {
  const [ordenId, setOrdenId] = useState('');
  const [orden, setOrden] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');

  const estados = [
    'PENDIENTE_APROBACION',
    'APROBADA',
    'ENVIADA',
    'EN_PROCESO',
    'PARCIALMENTE_RECIBIDA',
    'RECIBIDA_COMPLETAMENTE',
    'FACTURADA',
    'CERRADA',
    'CANCELADA',
    'RECHAZADA',
  ];

  const buscarOrden = async () => {
    try {
      const ordenEncontrada = await ordenesCompraService.buscarOrdenCompra(ordenId);
      setOrden(ordenEncontrada);
      setError('');
    } catch (err) {
      setError('No se encontró la orden de compra. Verifique el ID ingresado.');
      setOrden(null);
    }
  };

  const cambiarEstado = async () => {
    if (!nuevoEstado || nuevoEstado.trim() === '') {
      setError('Debe seleccionar un nuevo estado para la orden.');
      return;
    }

    try {
      await ordenesCompraService.cambiarEstadoOrdenCompra(ordenId, nuevoEstado);
      setMensajeExito('Estado de la orden actualizado exitosamente.');
      setError('');
      setOrden(null);
      setOrdenId('');
      setNuevoEstado('');
    } catch (err) {
      setError(err.message || 'Error al actualizar el estado de la orden. Intente nuevamente.');
      setMensajeExito('');
    }
  };

  return (
    <div className="estado-orden-compra">
      <h2>Cambiar Estado de Orden de Compra</h2>
      {error && <div className="error-message">{error}</div>}
      {mensajeExito && <div className="success-message">{mensajeExito}</div>}

      <div className="form-group">
        <label htmlFor="ordenId">ID de la Orden:</label>
        <input
          type="text"
          id="ordenId"
          value={ordenId}
          onChange={(e) => setOrdenId(e.target.value)}
        />
        <button onClick={buscarOrden}>Buscar</button>
      </div>

      {orden && (
        <div className="detalles-orden">
          <h3>Detalles de la Orden</h3>
          <p><strong>ID:</strong> {orden.id}</p>
          <p><strong>Estado Actual:</strong> {orden.estado}</p>
          <label htmlFor="nuevoEstado">Nuevo Estado:</label>
          <select
            id="nuevoEstado"
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
          >
            <option value="">Seleccione un estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          <button onClick={cambiarEstado} disabled={!nuevoEstado}>
            Cambiar Estado
          </button>
        </div>
      )}
    </div>
  );
};

export default EstadoOrdenCompra;
