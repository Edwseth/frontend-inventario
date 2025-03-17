// src/views/Productos/VerificarDisponibilidad.jsx
import React, { useState } from 'react';

const VerificarDisponibilidad = ({ onVerificar }) => {
  const [verificarId, setVerificarId] = useState('');
  const [verificarCantidad, setVerificarCantidad] = useState('');

  const handleVerificar = () => {
    onVerificar(verificarId, verificarCantidad);
  };

  return (
    <div className="verificar-disponibilidad">
      <h2>Verificar Disponibilidad</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="ID del Producto"
          value={verificarId}
          onChange={(e) => setVerificarId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={verificarCantidad}
          onChange={(e) => setVerificarCantidad(e.target.value)}
        />
        <button onClick={handleVerificar}>Verificar</button>
      </div>
    </div>
  );
};

export default VerificarDisponibilidad;