// src/views/Proveedores/ActualizarProveedor.jsx
import React from 'react';
import axios from '../../config/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Proveedores.css';

const ActualizarProveedor = ({ proveedorSeleccionado, setProveedorSeleccionado, proveedores }) => {
  // Validación del formulario
  const validationSchema = Yup.object({
    nombreContacto: Yup.string().required('Nombre de contacto es requerido'),
    telefonoContacto: Yup.string().required('Teléfono de contacto es requerido'),
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    paginaWeb: Yup.string().url('URL inválida').nullable(),
    direccion: Yup.string().required('Dirección es requerida'),
  });

  // Función para manejar el envío del formulario
  const onSubmit = async (values) => {
    try {
      await axios.put(`/api/proveedores/${proveedorSeleccionado.id}`, values);
      alert('Proveedor actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
      alert('Hubo un error al actualizar el proveedor');
    }
  };

  return (
    <div className="formulario-proveedor">
  <h2>Actualizar Proveedor</h2>

  {/* Campo de selección de proveedor */}
  <div className="seleccionar-proveedor">
    <label>Seleccionar Proveedor</label>
    <select
      value={proveedorSeleccionado ? proveedorSeleccionado.id : ""}
      onChange={(e) => {
        const proveedor = proveedores.find((p) => p.id === parseInt(e.target.value));
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
  </div>

  {/* Formulario para actualizar el proveedor seleccionado */}
  {proveedorSeleccionado && (
    <Formik
      initialValues={{
        nombreContacto: proveedorSeleccionado.nombreContacto || '',
        telefonoContacto: proveedorSeleccionado.telefonoContacto || '',
        email: proveedorSeleccionado.email || '',
        paginaWeb: proveedorSeleccionado.paginaWeb || '',
        direccion: proveedorSeleccionado.direccion || '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form>
        {/* Primera línea: Nombre de Contacto y Teléfono de Contacto */}
        <div className="form-row">
          <div className="form-group">
            <label>Nombre de Contacto</label>
            <Field type="text" name="nombreContacto" />
            <ErrorMessage name="nombreContacto" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label>Teléfono de Contacto</label>
            <Field type="text" name="telefonoContacto" />
            <ErrorMessage name="telefonoContacto" component="div" className="error-message" />
          </div>
        </div>

        {/* Segunda línea: Email y Página Web */}
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label>Página Web</label>
            <Field type="url" name="paginaWeb" />
            <ErrorMessage name="paginaWeb" component="div" className="error-message" />
          </div>
        </div>

        {/* Tercera línea: Dirección */}
        <div className="form-row">
          <div className="form-group">
            <label>Dirección</label>
            <Field type="text" name="direccion" />
            <ErrorMessage name="direccion" component="div" className="error-message" />
          </div>
        </div>

        {/* Botón de envío */}
        <button type="submit" className="submit-button">Actualizar Proveedor</button>
      </Form>
    </Formik>
  )}
</div>
  );
};

export default ActualizarProveedor;