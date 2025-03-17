// src/views/Proveedores/BloquearProveedor.jsx
import React, { useEffect } from 'react';
import axios from '../../config/axios';
import './Proveedores.css';

const BloquearProveedor = ({ proveedorSeleccionado, setProveedorSeleccionado, proveedores, cargarProveedores }) => {

  useEffect(() => {
    cargarProveedores();
  }, [cargarProveedores]);

    const handleBloquear = async () => {
    if (!proveedorSeleccionado) return;

    try {
        await axios.put(`/api/proveedores/${proveedorSeleccionado.id}/bloquear`);
        await cargarProveedores();
        setProveedorSeleccionado(null); // Reinicia la selección
      } catch (error) {
        console.error('Error al bloquear proveedor:', error);
      }
      
  };

  return (
    <div className="formulario-accion">
      <h2>Bloquear/Desbloquear Proveedor</h2>
      <select
        onChange={(e) => {
          const proveedor = proveedores.find(p => p.id === parseInt(e.target.value));
          setProveedorSeleccionado(proveedor);
        }}
      >
        <option value="">Seleccione un proveedor</option>
        {proveedores.map((proveedor) => (
          <option key={proveedor.id} value={proveedor.id}>
            {proveedor.proveedor}
          </option>
        ))}
      </select>

      {proveedorSeleccionado && (
        <button onClick={handleBloquear} className="submit-button">
          {proveedorSeleccionado.activo ? 'Bloquear' : 'Activar'}
        </button>
      )}
    </div>
  );
};

export default BloquearProveedor;