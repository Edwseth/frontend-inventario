import React, { useState } from 'react';

const FormularioOrdenCompra = ({ onSubmit, titulo, proveedores, productos, orden }) => {
  const [formData, setFormData] = useState(
    orden || {
      proveedorId: '',
      detalles: [{ productoId: '', cantidad: '', precioUnitario: '' }],
    }
  );

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'proveedorId') {
      setFormData({ ...formData, proveedorId: value });
    } else {
      const nuevosDetalles = [...formData.detalles];
      nuevosDetalles[index][name] = value;
      setFormData({ ...formData, detalles: nuevosDetalles });
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
    onSubmit(formData);
  };

  return (
    <div className="formulario-orden-compra">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Proveedor:</label>
          <select
            name="proveedorId"
            value={formData.proveedorId}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="detalles">
          <h3>Detalles de la Orden</h3>
          {formData.detalles.map((detalle, index) => (
            <div key={index} className="detalle">
              <div className="form-group">
                <label>Producto:</label>
                <select
                  name="productoId"
                  value={detalle.productoId}
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