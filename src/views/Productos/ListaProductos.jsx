// src/views/Productos/ListaProductos.jsx
import React from 'react';

const ListaProductos = ({ productos }) => {
  return (
    <div className="lista-productos">
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>SKU</th> {/* SKU como primera columna */}
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>Stock Mín. Proveedor</th>
            <th>Unidad de Medida</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.sku}</td> {/* SKU como primera columna */}
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.stockActual}</td>
              <td>{producto.stockMin}</td>
              <td>{producto.stockMinProveedor}</td>
              <td>{producto.unidadMedida}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
