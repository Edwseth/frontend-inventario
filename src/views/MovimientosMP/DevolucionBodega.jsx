// src/views/MovimientosMP/DevolucionBodega.jsx
import React from 'react';
import FormularioMovimiento from './FormularioMovimiento';

const camposDevolucion = [
  { type: 'text', name: 'productoId', placeholder: 'ID del Producto', required: true },
  { type: 'number', name: 'cantidad', placeholder: 'Cantidad', required: true },
  { type: 'text', name: 'almacenId', placeholder: 'ID del Almacén', required: true },
  { type: 'date', name: 'fechaVencimiento', placeholder: 'Fecha de Vencimiento', required: true },
  { type: 'text', name: 'loteInterno', placeholder: 'Lote Interno', required: true },
  { type: 'text', name: 'loteProveedor', placeholder: 'Lote del Proveedor', required: true },
  { type: 'text', name: 'ubicacionAlmacen', placeholder: 'Ubicación en Almacén', required: true },
  { type: 'text', name: 'comentarios', placeholder: 'Comentarios', required: false },
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
      { value: 'AGOTADO', label: 'Agotado' },
      { value: 'EN_TRANSITO', label: 'En Tránsito' },
      { value: 'PENDIENTE_REPOSICION', label: 'Pendiente de Reposición' },
      { value: 'DESCONTINUADO', label: 'Descontinuado' },
    ],
  },
  { type: 'text', name: 'proveedorId', placeholder: 'ID del Proveedor', required: true },
  { type: 'checkbox', name: 'esDevolucionProduccion', label: 'Es Devolución de Producción' },
];

const DevolucionBodega = ({ onSubmit }) => {
  return (
    <FormularioMovimiento
      titulo="Devolución a Bodega"
      campos={camposDevolucion}
      onSubmit={onSubmit}
    />
  );
};

export default DevolucionBodega;