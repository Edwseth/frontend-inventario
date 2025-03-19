//src/views/OrdenCompra/FormularioOrdenCompra.jsx
import React, { useState } from 'react';

const FormularioOrdenCompra = ({ onSubmit, titulo, proveedores = [], productos = [], orden }) => {
  const [formData, setFormData] = useState(
    orden || {
      fechaOrden: '',
      estado: 'CREADA',
      proveedorId: '',
      detalles: [{ id: null, productoId: '', cantidad: '', precioUnitario: '' }],
    }
  );

  const [error, setError] = useState('');

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'proveedorId' || name === 'fechaOrden') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      const nuevosDetalles = [...formData.detalles];
      nuevosDetalles[index][name] = value;
      setFormData({
        ...formData,
        detalles: nuevosDetalles,
      });
    }
  };

  const handleAgregarDetalle = () => {
    setFormData({
      ...formData,
      detalles: [...formData.detalles, { productoId: '', cantidad: '', precioUnitario: '' }],
    });
  };

  const handleEliminarDetalle = (index) => {
    const nuevosDetalles = formData.detalles.filter((_, i) => i !== index);
    setFormData({ ...formData, detalles: nuevosDetalles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!formData.fechaOrden || !formData.proveedorId || formData.detalles.length === 0) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Ajustar la estructura de los detalles
  const detallesAjustados = formData.detalles.map((detalle) => ({
    id: detalle.id || null, // Incluir el id del detalle (puede ser null)
    producto: { id: parseInt(detalle.productoId) }, // Convertir productoId en un objeto producto
    cantidad: detalle.cantidad,
    precioUnitario: detalle.precioUnitario,
  }));

    const datosAjustados = {
      ...formData,
      detalles: detallesAjustados,
    };

    onSubmit(datosAjustados);
  };

  return (
    <div className="formulario-orden-compra">
      <h2>{titulo}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Campo para seleccionar fecha */}
        <div className="form-group">
          <label>Fecha de la Orden:</label>
          <input
            type="date"
            name="fechaOrden"
            value={formData.fechaOrden || ''}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {/* Campo para seleccionar proveedor */}
        <div className="form-group">
          <label>Proveedor:</label>
          <select
            name="proveedorId"
            value={formData.proveedorId || ''}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.proveedor}
              </option>
            ))}
          </select>
        </div>

        {/* Detalles de la orden */}
        <div className="detalles">
          <h3>Detalles de la Orden</h3>
          {formData.detalles.map((detalle, index) => (
            <div key={index} className="detalle">
              {/* Campo para seleccionar producto */}
              <div className="form-group">
                <label>Producto:</label>
                <select
                  name="productoId"
                  value={detalle.productoId || ''}
                  onChange={(e) => handleChange(e, index)}
                  required
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Cantidad:</label>
                <input
                  type="number"
                  name="cantidad"
                  value={detalle.cantidad}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio Unitario:</label>
                <input
                  type="number"
                  name="precioUnitario"
                  value={detalle.precioUnitario}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleEliminarDetalle(index)}
                className="eliminar-detalle"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAgregarDetalle} className="agregar-detalle">
            Agregar Detalle
          </button>
        </div>

        <button type="submit" className="submit-button">
          {titulo}
        </button>
      </form>
    </div>
  );
};

export default FormularioOrdenCompra;