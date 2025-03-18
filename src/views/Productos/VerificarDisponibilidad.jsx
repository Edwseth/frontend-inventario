// src/views/Productos/VerificarDisponibilidad.jsx
import React, { useState } from 'react';

const VerificarDisponibilidad = ({ productos, onVerificar }) => {
  const [sku, setSku] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleVerificar = () => {
    // Buscar el producto por SKU
    const producto = productos.find((p) => p.sku === sku);
    if (producto) {
      console.log('Producto encontrado:', producto); // Depuración
      onVerificar(producto.id, cantidad); // Enviar el ID y la cantidad
    } else {
      console.log('Producto no encontrado'); // Depuración
      alert('Producto no encontrado'); // Mostrar un mensaje si no se encuentra el producto
    }
  };

  return (
    <div className="verificar-disponibilidad">
      <h2>Verificar Disponibilidad</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Ingrese el SKU del producto"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button onClick={handleVerificar}>Verificar</button>
      </div>
    </div>
  );
};

export default VerificarDisponibilidad;