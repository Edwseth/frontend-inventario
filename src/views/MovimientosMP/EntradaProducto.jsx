// src/views/MovimientosMP/EntradaProducto.jsx
import React from 'react';
import FormularioMovimiento from './FormularioMovimiento';
import { registrarRecepcion } from '../../services/movimientosService';

const EntradaProducto = () => {
  const handleSubmit = async (formData) => {
    try {
      const idMovimiento = formData.ordenCompraId; // Capturar el ID de la orden de compra
      if (!idMovimiento) {
        throw new Error('El ID de la orden de compra no está definido.');
      }
      delete formData.ordenCompraId; // Eliminar el campo antes de enviar al backend
      const movimientosDTO = [
        {
          ...formData,
          tipoMovimiento: 'RECEPCION', // Tipo de movimiento para entradas
          fechaIngreso: new Date().toISOString().split('T')[0], // Fecha actual como fecha de ingreso
        },
      ];
      const response = await registrarRecepcion(idMovimiento, movimientosDTO); // Usar el método registrarRecepcion
      console.log('Movimiento registrado:', response);
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
    }
  };

  const camposEntrada = [
    { type: 'text', name: 'ordenCompraId', placeholder: 'ID de la Orden de Compra', required: true },
    { type: 'text', name: 'productoId', placeholder: 'ID del Producto', required: true },
    { type: 'number', name: 'cantidad', placeholder: 'Cantidad', required: true },
    { type: 'text', name: 'almacenId', placeholder: 'ID del Almacén', required: true },
    { type: 'date', name: 'fechaVencimiento', placeholder: 'Fecha de Vencimiento', required: true },
    { type: 'text', name: 'loteInterno', placeholder: 'Lote Interno', required: true },
    { type: 'text', name: 'loteProveedor', placeholder: 'Lote Proveedor', required: true },
    { type: 'text', name: 'ubicacionAlmacen', placeholder: 'Ubicación en Almacén', required: true },
    { type: 'text', name: 'comentarios', placeholder: 'Comentarios', required: false },
    { type: 'number', name: 'costoPromedio', placeholder: 'Costo Promedio', required: true },
    { type: 'number', name: 'proveedorId', placeholder: 'ID del Proveedor', required: true },
    {
      type: 'select',
      name: 'categoria',
      required: true,
      options: [
        { value: 'MATERIA_PRIMA', label: 'Materia Prima' },
        { value: 'PRODUCTO_TERMINADO', label: 'Producto Terminado' },
        { value: 'MATERIAL_EMPAQUE', label: 'Material de Empaque' },
      ],
    },
    {
      type: 'select',
      name: 'subcategoria',
      required: true,
      options: [
        { value: 'SOLIDOS', label: 'Sólidos' },
        { value: 'LIQUIDOS', label: 'Líquidos' },
        { value: 'POLVOS', label: 'Polvos' },
        { value: 'GRANULADOS', label: 'Granulados' },
        { value: 'TABLETAS', label: 'Tabletas' },
        { value: 'JARABES', label: 'Jarabes' },
        { value: 'CAPSULAS', label: 'Cápsulas' },
        { value: 'INYECCIONES', label: 'Inyecciones' },
        { value: 'CAJAS', label: 'Cajas' },
        { value: 'ETIQUETAS', label: 'Etiquetas' },
        { value: 'BOTELLAS', label: 'Botellas' },
        { value: 'BLISTER', label: 'Blister' },
      ],
    },
    {
      type: 'select',
      name: 'estado',
      required: true,
      options: [
        { value: 'DISPONIBLE', label: 'Disponible' },
        { value: 'NO_DISPONIBLE', label: 'No Disponible' },
      ],
    },
  ];

  return (
    <FormularioMovimiento
      titulo="Entrada de Producto"
      campos={camposEntrada}
      onSubmit={handleSubmit}
    />
  );
};

export default EntradaProducto;