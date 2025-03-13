// src/views/Proveedores/CrearProveedor.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { crearProveedor } from '../../services/proveedoresService';

const CrearProveedor = () => {
  const initialValues = {
    nombre: '',
    direccion: '',
    telefono: '',
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre es requerido'),
    direccion: Yup.string().required('Dirección es requerida'),
    telefono: Yup.string().required('Teléfono es requerido'),
  });

  const onSubmit = async (values) => {
    await crearProveedor(values); // Lógica para crear proveedor
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label>Nombre</label>
          <Field type="text" name="nombre" />
          <ErrorMessage name="nombre" component="div" />
        </div>
        <div>
          <label>Dirección</label>
          <Field type="text" name="direccion" />
          <ErrorMessage name="direccion" component="div" />
        </div>
        <div>
          <label>Teléfono</label>
          <Field type="text" name="telefono" />
          <ErrorMessage name="telefono" component="div" />
        </div>
        <button type="submit">Crear Proveedor</button>
      </Form>
    </Formik>
  );
};

export default CrearProveedor;