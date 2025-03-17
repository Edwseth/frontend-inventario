// src/views/Productos/ActualizarProducto.jsx
import React, { useState } from 'react';

const ActualizarProducto = ({ productos, onActualizar }) => {
  const [sku, setSku] = useState('');
  const [producto, setProducto] = useState(null);
  const [formData, setFormData] = useState({
    descripcion: '',
    stockMin: '',
    stockMinProveedor: '',
    unidadMedida: '',
  });
  const [mensaje, setMensaje] = useState(''); // Estado para manejar mensajes

  const handleBuscar = () => {
    // Buscar el producto por SKU
    const productoEncontrado = productos.find((p) => p.sku === sku);
    if (productoEncontrado) {
      setProducto(productoEncontrado);
      setFormData({
        descripcion: productoEncontrado.descripcion,
        stockMin: productoEncontrado.stockMin,
        stockMinProveedor: productoEncontrado.stockMinProveedor,
        unidadMedida: productoEncontrado.unidadMedida,
      });
      setMensaje(''); // Limpiar mensajes al encontrar un producto
    } else {
      setMensaje('Producto no encontrado'); // Mostrar mensaje si no se encuentra el producto
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (producto) {
      try {
        await onActualizar(producto.id, formData); // Enviar el ID y los datos actualizados
        setMensaje('Producto actualizado con éxito'); // Mensaje de éxito
      } catch (error) {
        setMensaje('Error al actualizar el producto'); // Mensaje de error
      } finally {
        // Limpiar el mensaje después de 3 segundos
        setTimeout(() => {
          setMensaje('');
        }, 3000);
      }
    }
  };

  return (
    <div className="actualizar-producto">
      <h2>Actualizar Producto</h2>
      <div className="buscar-sku">
        <input
          type="text"
          placeholder="Ingrese el SKU del producto"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {mensaje && (
        <div className={`mensaje ${mensaje.includes('éxito') ? 'exito' : 'error'}`}>
          {mensaje}
        </div>
      )}

      {producto && (
        <form onSubmit={handleSubmit} className="formulario-actualizar">
          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock Mínimo:</label>
            <input
              type="number"
              name="stockMinimo"
              value={formData.stockMin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock Mín. Proveedor:</label>
            <input
              type="number"
              name="stockMinProveedor"
              value={formData.stockMinProveedor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Unidad de Medida:</label>
            <input
              type="text"
              name="unidadMedida"
              value={formData.unidadMedida}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Actualizar Producto
          </button>
        </form>
      )}
    </div>
  );
};

export default ActualizarProducto;