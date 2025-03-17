// src/views/Productos/BuscarProducto.jsx
import React, { useState } from 'react';

const BuscarProducto = ({ productos, onBuscar }) => {
  const [sku, setSku] = useState('');

  const handleBuscar = () => {
    // Buscar el producto por SKU
    const producto = productos.find((p) => p.sku === sku);
    if (producto) {
      onBuscar(producto.id); // Enviar el ID del producto
    } else {
      alert('Producto no encontrado'); // Mostrar un mensaje si no se encuentra el producto
    }
  };

  return (
    <div className="buscar-producto">
      <h2>Buscar Producto por SKU</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Ingrese el SKU del producto"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>
    </div>
  );
};

export default BuscarProducto;