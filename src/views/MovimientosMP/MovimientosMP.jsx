// src/views/MovimientosMP/MovimientosMP.jsx
import React, { useState } from 'react';
import axios from '../../config/axios';
import EntradaProducto from '../../views/MovimientosMP/EntradaProducto';
import SalidaProducto from '../../views/MovimientosMP/SalidaProducto';
import DevolucionBodega from '../../views/MovimientosMP/DevolucionBodega';
import entradaIcon from '../../assets/icons/entrada.png'; // Ícono de listar
import salidaIcon from '../../assets/icons/salida.png'; // Ícono de buscar
import devolucionIcon from '../../assets/icons/devolucion.png'; // Ícono de actualizar
import './MovimientosMP.css';

const MovimientosMP = () => {
  const [accion, setAccion] = useState('entrada');
  const [error, setError] = useState(null);

  const handleSubmit = async (url, formData) => {
    try {
      await axios.post(url, formData);
      setError(null);
      alert('Movimiento registrado exitosamente');
    } catch (error) {
      setError('Error: ' + (error.response?.data?.message || error.message));
      console.error('Error al registrar movimiento:', error);
    }
  };

  return (
    <div className="movimientos-container">
      <h1>Gestión de Movimientos de MP</h1>

      {/* Subfunciones */}
      <div className="subfunciones">
        <div
          className={`subfuncion ${accion === 'entrada' ? 'active' : ''}`}
          onClick={() => setAccion('entrada')}
        >
          <img src={entradaIcon} alt="Entrada de Producto" />
          <p>Entrada de Producto</p>
        </div>
        <div
          className={`subfuncion ${accion === 'salida' ? 'active' : ''}`}
          onClick={() => setAccion('salida')}
        >
          <img src={salidaIcon} alt="Salida de Producto" />
          <p>Salida de Producto</p>
        </div>
        <div
          className={`subfuncion ${accion === 'devolucion' ? 'active' : ''}`}
          onClick={() => setAccion('devolucion')}
        >
          <img src={devolucionIcon} alt="Devolución a Bodega" />
          <p>Devolución a Bodega</p>
        </div>
      </div>

      {/* Contenido de la subfunción seleccionada */}
      <div className="contenido-subfuncion">
        {accion === 'entrada' && (
          <EntradaProducto
            onSubmit={(formData) => handleSubmit('/api/movimientos/entrada', formData)}
          />
        )}

        {accion === 'salida' && (
          <SalidaProducto
            onSubmit={(formData) => handleSubmit('/api/movimientos/salida', formData)}
          />
        )}

        {accion === 'devolucion' && (
          <DevolucionBodega
            onSubmit={(formData) => handleSubmit('/api/movimientos/devolucion', formData)}
          />
        )}
      </div>

      {/* Mostrar errores */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MovimientosMP;