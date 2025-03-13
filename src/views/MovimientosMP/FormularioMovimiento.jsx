// src/views/MovimientosMP/FormularioMovimiento.jsx
import React from 'react';

const FormularioMovimiento = ({ titulo, campos, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(Object.fromEntries(formData));
  };

  return (
    <div className="formulario-accion">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit}>
        {campos.map((campo, index) => (
          <div key={index} className="form-group">
            {campo.type === 'select' ? (
              <select name={campo.name} required={campo.required}>
                {campo.options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : campo.type === 'checkbox' ? (
              <>
                <input type="checkbox" name={campo.name} />
                <label>{campo.label}</label>
              </>
            ) : (
              <input
                type={campo.type}
                name={campo.name}
                placeholder={campo.placeholder}
                required={campo.required}
              />
            )}
          </div>
        ))}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default FormularioMovimiento;