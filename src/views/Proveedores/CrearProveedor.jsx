// src/views/Proveedores/CrearProveedor.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { crearProveedor } from '../../services/proveedoresService';
import './Proveedores.css';

const CrearProveedor = () => {
  const initialValues = {
    nombre: '',
    nit: '',
    direccion: '',
    telefono: '',
    nombreContacto: '',
    paginaWeb: '',
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre es requerido'),
    nit: Yup.string().required('NIT/Cédula es requerido'),
    direccion: Yup.string().required('Dirección es requerida'),
    telefono: Yup.string().required('Teléfono es requerido'),
    nombreContacto: Yup.string().required('Nombre de contacto es requerido'),
    paginaWeb: Yup.string().url('Debe ser una URL válida').nullable(),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await crearProveedor(values);
      alert('Proveedor creado exitosamente');
      resetForm(); // Limpiar el formulario después de enviar
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      alert('Hubo un error al crear el proveedor');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="formulario-proveedor">
        <div className="form-group">
          <label>Nombre</label>
          <Field type="text" name="nombre" />
          <ErrorMessage name="nombre" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label>NIT/Cédula</label>
          <Field type="text" name="nit" />
          <ErrorMessage name="nit" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <Field type="text" name="direccion" />
          <ErrorMessage name="direccion" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label>Teléfono de Contacto</label>
          <Field type="tel" name="telefono" />
          <ErrorMessage name="telefono" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label>Nombre de Contacto</label>
          <Field type="text" name="nombreContacto" />
          <ErrorMessage name="nombreContacto" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label>Página Web</label>
          <Field type="url" name="paginaWeb" />
          <ErrorMessage name="paginaWeb" component="div" className="error-message" />
        </div>

        <button type="submit" className="submit-button">Crear Proveedor</button>
      </Form>
    </Formik>
  );
};

export default CrearProveedor;