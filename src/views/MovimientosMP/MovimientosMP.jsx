// src/views/MovimientosMP/MovimientosMP.jsx
import React, { useState } from 'react';
import { registrarRecepcion, registrarSalida, registrarDevolucion } from '../../services/movimientosService';
import EntradaProducto from '../../views/MovimientosMP/EntradaProducto';
import SalidaProducto from '../../views/MovimientosMP/SalidaProducto';
import DevolucionBodega from '../../views/MovimientosMP/DevolucionBodega';
import entradaIcon from '../../assets/icons/entrada.png';
import salidaIcon from '../../assets/icons/salida.png';
import devolucionIcon from '../../assets/icons/devolucion.png';
import './MovimientosMP.css';

const MovimientosMP = () => {
  const [accion, setAccion] = useState('recepcion');
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      if (accion === 'recepcion') {
        const idMovimiento = formData.ordenCompraId; // Usar el ID de la orden de compra
        delete formData.ordenCompraId; // Eliminar el campo antes de enviar
        await registrarRecepcion(idMovimiento, [formData]);
      } else if (accion === 'salida') {
        await registrarSalida(formData); // Enviar directamente los datos
      } else if (accion === 'devolucion') {
        await registrarDevolucion([formData]); // Enviar como un array
      }
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
          className={`subfuncion ${accion === 'recepcion' ? 'active' : ''}`}
          onClick={() => setAccion('recepcion')}
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
        {accion === 'recepcion' && <EntradaProducto onSubmit={handleSubmit} />}
        {accion === 'salida' && <SalidaProducto onSubmit={handleSubmit} />}
        {accion === 'devolucion' && <DevolucionBodega onSubmit={handleSubmit} />}
      </div>

      {/* Mostrar errores */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MovimientosMP;