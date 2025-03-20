// src/views/OrdenCompra/BuscarOrdenCompra.jsx
import React, { useState } from 'react';
import ordenesCompraService from '../../services/ordenesCompraService';

const BuscarOrdenCompra = ({ onBuscar }) => {
  const [buscarId, setBuscarId] = useState('');
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    try {
      if (!buscarId) {
        setError('Debe ingresar un ID para buscar');
        onBuscar(null); // Notify parent that no order was found
        return;
      }
      const orden = await ordenesCompraService.buscarOrdenCompra(buscarId);
      onBuscar(orden); // Pass the found order to the parent component
      setError(''); // Clear any previous error
    } catch (error) {
      setError('Orden no encontrada');
      onBuscar(null); // Notify parent that no order was found
    }
  };

  return (
    <div className="buscar-orden">
      <h2>Buscar Orden de Compra</h2>
      <input
        type="text"
        value={buscarId}
        onChange={(e) => setBuscarId(e.target.value)}
        placeholder="Ingrese el ID de la orden"
      />
      <button onClick={handleBuscar}>Buscar</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default BuscarOrdenCompra;