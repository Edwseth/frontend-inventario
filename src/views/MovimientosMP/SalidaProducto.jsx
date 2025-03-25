import React from 'react';
import FormularioMovimiento from './FormularioMovimiento';
import { registrarSalida } from '../../services/movimientosService';

const SalidaProducto = () => {
  const handleSubmit = async (formData) => {
    try {
      const movimientosDTO = {
        ...formData,
        tipoMovimiento: 'SALIDA', // Tipo de movimiento para salidas
        fechaIngreso: new Date().toISOString().split('T')[0], // Fecha actual como fecha de ingreso
      };
      const response = await registrarSalida(movimientosDTO); // Usar el método registrarSalida
      console.log('Movimiento registrado:', response);
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
    }
  };

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

  return (
    <FormularioMovimiento
      titulo="Salida de Producto"
      campos={camposSalida}
      onSubmit={handleSubmit}
    />
  );
};

export default SalidaProducto;