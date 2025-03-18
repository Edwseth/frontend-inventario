//src/views/OrdenCompra/FormularioOrdenCompra.jsx
import React, { useState } from 'react';

const FormularioOrdenCompra = ({ onSubmit, titulo, proveedores = [], productos = [], orden }) => {
  const [formData, setFormData] = useState(
    orden || {
      fechaOrden: '', // Asegúrate de incluir fechaOrden
      estado: 'CREADA', // Asegúrate de incluir estado
      proveedorId: '',
      detalles: [{ productoId: '', cantidad: '', precioUnitario: '' }],
    }
  );

  const handleChange = (e, index) => {
    const { name, value } = e.target;
  
    if (name === 'proveedorId' || name === 'fechaOrden') {
      // Manejar cambios en proveedorId y fechaOrden
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // Manejar cambios en los detalles de la orden
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
  
    // Ajustar la estructura de los detalles para incluir un objeto producto
    const detallesAjustados = formData.detalles.map((detalle) => ({
      ...detalle,
      producto: { id: detalle.productoId }, // Convertir productoId en un objeto producto
    }));
  
    const datosAjustados = {
      ...formData,
      detalles: detallesAjustados,
    };
  
    console.log('Datos enviados:', datosAjustados); // Verifica los datos antes de enviar
    onSubmit(datosAjustados);
  };

  return (
    <div className="formulario-orden-compra">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha de la Orden:</label>
          <input
            type="date"
            name="fechaOrden"
            value={formData.fechaOrden}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

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
                {proveedor.proveedor}
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