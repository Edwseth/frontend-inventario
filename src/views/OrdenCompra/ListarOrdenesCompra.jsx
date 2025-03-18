import React from 'react';

const ListaOrdenesCompra = ({ ordenes }) => {
    console.log('Datos recibidos:', ordenes); // Depuración
  return (
    <div className="lista-ordenes-compra">
      <h2>Lista de Órdenes de Compra</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Detalles</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{orden.proveedor?.nombre}</td>
              <td>
                <ul>
                  {orden.detalles?.map((detalle, index) => (
                    <li key={index}>
                      {detalle.producto.nombre} - {detalle.cantidad} x ${detalle.precioUnitario}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{orden.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaOrdenesCompra;