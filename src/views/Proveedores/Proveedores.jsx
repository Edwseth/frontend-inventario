// src/views/Proveedores/Proveedores.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../config/axios'; // Importar la instancia configurada
import adicionarIcon from '../../assets/icons/adicionar.png'; // Ícono de adicionar
import listarIcon from '../../assets/icons/listar.png'; // Ícono de listar
import actualizarIcon from '../../assets/icons/actualizar.png'; // Ícono de actualizar
import bloquearIcon from '../../assets/icons/bloquear.png'; // Ícono de bloquear
import './Proveedores.css'; // Estilos para la vista de proveedores

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]); // Lista de proveedores
  const [accion, setAccion] = useState('listar'); // Subfunción seleccionada
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null); // Proveedor seleccionado para actualizar

  // Cargar la lista de proveedores al montar el componente
  useEffect(() => {
    if (accion === 'listar') {
      cargarProveedores();
    }
  }, [accion]);

  const cargarProveedores = async () => {
    try {
      const response = await axios.get('/api/proveedores');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    }
  };

  const handleCrearProveedor = async (formData) => {
    try {
      await axios.post('/api/proveedores', formData);
      cargarProveedores(); // Recargar la lista de proveedores
    } catch (error) {
      console.error('Error al crear proveedor:', error);
    }
  };

  const handleActualizarProveedor = async (id, formData) => {
    try {
      await axios.put(`/api/proveedores/${id}`, formData);
      cargarProveedores(); // Recargar la lista de proveedores
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
    }
  };

  const handleBloquearProveedor = async (id) => {
    try {
      await axios.put(`/api/proveedores/${id}/bloquear`);
      cargarProveedores(); // Recargar la lista de proveedores
    } catch (error) {
      console.error('Error al bloquear proveedor:', error);
    }
  };

  return (
    <div className="proveedores-container">
      <h1>Gestión de Proveedores</h1>

      {/* Subfunciones */}
      <div className="subfunciones">
        <div
          className={`subfuncion ${accion === 'crear' ? 'active' : ''}`}
          onClick={() => setAccion('crear')}
        >
          <img src={adicionarIcon} alt="Crear Proveedor" />
          <p>Crear Proveedor</p>
        </div>
        <div
          className={`subfuncion ${accion === 'listar' ? 'active' : ''}`}
          onClick={() => setAccion('listar')}
        >
          <img src={listarIcon} alt="Listar Proveedores" />
          <p>Listar Proveedores</p>
        </div>
        <div
          className={`subfuncion ${accion === 'actualizar' ? 'active' : ''}`}
          onClick={() => setAccion('actualizar')}
        >
          <img src={actualizarIcon} alt="Actualizar Proveedor" />
          <p>Actualizar Proveedor</p>
        </div>
        <div
          className={`subfuncion ${accion === 'bloquear' ? 'active' : ''}`}
          onClick={() => setAccion('bloquear')}
        >
          <img src={bloquearIcon} alt="Bloquear Proveedor" />
          <p>Bloquear Proveedor</p>
        </div>
      </div>

      {/* Contenido de la subfunción seleccionada */}
      <div className="contenido-subfuncion">
        {accion === 'crear' && (
          <FormularioProveedor
            onSubmit={handleCrearProveedor}
            titulo="Crear Proveedor"
          />
        )}

        {accion === 'listar' && (
          <div className="lista-proveedores">
            <h2>Lista de Proveedores</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>NIT/Cédula</th>
                  <th>Nombre de Contacto</th>
                  <th>Página Web</th>
                  <th>Teléfono de Contacto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((proveedor) => (
                  <tr key={proveedor.id}>
                    <td>{proveedor.id}</td>
                    <td>{proveedor.email}</td>
                    <td>{proveedor.nit}</td>
                    <td>{proveedor.nombreContacto}</td>
                    <td>{proveedor.paginaWeb}</td>
                    <td>{proveedor.telefonoContacto}</td>
                    <td>
                      <button onClick={() => {
                        setProveedorSeleccionado(proveedor);
                        setAccion('actualizar');
                      }}>
                        Actualizar
                      </button>
                      <button onClick={() => handleBloquearProveedor(proveedor.id)}>
                        Bloquear
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {accion === 'actualizar' && proveedorSeleccionado && (
          <FormularioProveedor
            onSubmit={(formData) => handleActualizarProveedor(proveedorSeleccionado.id, formData)}
            titulo="Actualizar Proveedor"
            datosIniciales={proveedorSeleccionado}
          />
        )}

        {accion === 'bloquear' && (
          <div className="formulario-accion">
            <h2>Bloquear Proveedor</h2>
            <p>Selecciona un proveedor de la lista para bloquearlo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para el formulario de proveedores
const FormularioProveedor = ({ onSubmit, titulo, datosIniciales }) => {
  const [formData, setFormData] = useState(
    datosIniciales || {
      email: '',
      nit: '',
      nombreContacto: '',
      paginaWeb: '',
      telefonoContacto: '',
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
    <div className="formulario-proveedor">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>NIT/Cédula:</label>
          <input
            type="text"
            name="nit"
            value={formData.nit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de Contacto:</label>
          <input
            type="text"
            name="nombreContacto"
            value={formData.nombreContacto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Página Web:</label>
          <input
            type="url"
            name="paginaWeb"
            value={formData.paginaWeb}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono de Contacto:</label>
          <input
            type="tel"
            name="telefonoContacto"
            value={formData.telefonoContacto}
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

export default Proveedores;