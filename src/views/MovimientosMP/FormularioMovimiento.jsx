// src/views/MovimientosMP/FormularioMovimiento.jsx
import React from 'react';
import './FormularioMovimiento.css'; // Asegurarse de que los estilos estén importados

const FormularioMovimiento = ({ titulo, campos, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSubmit(data); // Pasar los datos capturados al método onSubmit
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{titulo}</h2>
      <div className="form-grid">
        {campos.map((campo, index) => {
          if (campo.type === 'select') {
            return (
              <div key={index} className="form-field">
                <label htmlFor={campo.name}>
                  {campo.name === 'categoria' && 'Categoría'}
                  {campo.name === 'subcategoria' && 'Subcategoría'}
                  {campo.name === 'tipoProducto' && 'Tipo de Producto'}
                  {campo.name === 'estado' && 'Estado'}
                  {campo.placeholder}
                </label>
                <select id={campo.name} name={campo.name} required={campo.required}>
                  {campo.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          return (
            <div key={index} className="form-field">
              <label htmlFor={campo.name}>
                {campo.name === 'categoria' && 'Categoría'}
                {campo.name === 'subcategoria' && 'Subcategoría'}
                {campo.name === 'tipoProducto' && 'Tipo de Producto'}
                {campo.name === 'estado' && 'Estado'}
                {campo.placeholder}
              </label>
              <input
                id={campo.name}
                type={campo.type}
                name={campo.name}
                placeholder={campo.placeholder}
                required={campo.required}
              />
            </div>
          );
        })}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioMovimiento;