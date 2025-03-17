// src/views/Productos/FormularioProducto.jsx
import React, { useState } from 'react';

const FormularioProducto = ({ onSubmit, titulo, datosIniciales }) => {
  const [formData, setFormData] = useState(
    datosIniciales || {
      nombre: '',
      descripcion: '',
      sku: '',
      stockActual: '',
      stockMinimo: '',
      stockMinProveedor: '',
      unidadMedida: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="formulario-producto">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit} className="formulario-grid">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
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
          <label>SKU:</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock Actual:</label>
          <input
            type="number"
            name="stockActual"
            value={formData.stockActual}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock Mínimo:</label>
          <input
            type="number"
            name="stockMinimo"
            value={formData.stockMinimo}
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
          {titulo}
        </button>
      </form>
    </div>
  );
};

export default FormularioProducto;