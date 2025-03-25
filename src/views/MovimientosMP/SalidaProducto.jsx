import React from 'react';
import FormularioMovimiento from './FormularioMovimiento';

const camposSalida = [
  { type: 'text', name: 'productoId', placeholder: 'ID del Producto', required: true },
  { type: 'number', name: 'cantidad', placeholder: 'Cantidad', required: true },
  { type: 'text', name: 'almacenId', placeholder: 'ID del Almacén', required: true },
  { type: 'date', name: 'fechaVencimiento', placeholder: 'Fecha de Vencimiento', required: true },
  { type: 'text', name: 'loteInterno', placeholder: 'Lote Interno', required: true },
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
];

const SalidaProducto = ({ onSubmit }) => {
  return (
    <FormularioMovimiento
      titulo="Salida de Producto"
      campos={camposSalida}
      onSubmit={onSubmit}
    />
  );
};

export default SalidaProducto;