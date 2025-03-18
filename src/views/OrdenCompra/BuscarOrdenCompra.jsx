// src/views/OrdenCompra/BuscarOrdenCompra.jsx
import React, { useState } from 'react';

const BuscarOrdenCompra = ({ onBuscar }) => {
  const [buscarId, setBuscarId] = useState('');

  const handleBuscar = () => {
    onBuscar(buscarId);
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
    </div>
  );
};

export default BuscarOrdenCompra;