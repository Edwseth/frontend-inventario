// src/views/OrdenCompra/ModificarOrdenCompra.jsx
import React, { useState, useEffect } from 'react';
import ordenesCompraService from '../../services/ordenesCompraService';
import FormularioOrdenCompra from './FormularioOrdenCompra';

const ModificarOrdenCompra = ({ ordenId, proveedores, productos, onModificar }) => {
  const [orden, setOrden] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  // Cargar la orden de compra al montar el componente
  useEffect(() => {
    const cargarOrden = async () => {
      try {
        const ordenCargada = await ordenesCompraService.buscarOrdenCompra(ordenId);
        setOrden(ordenCargada);
        setError('');
      } catch (error) {
        setError('Error al cargar la orden de compra');
      } finally {
        setCargando(false);
      }
    };

    if (ordenId) {
      cargarOrden();
    } else {
      setError('No se ha seleccionado ninguna orden para modificar');
      setCargando(false);
    }
  }, [ordenId]);

  const handleModificar = async (ordenModificada) => {
    try {
      await ordenesCompraService.modificarOrdenCompra(ordenId, ordenModificada);
      onModificar(); // Notificar al componente padre que la orden se modificó
      setError('');
    } catch (error) {
      setError('Error al modificar la orden de compra');
    }
  };

  if (cargando) {
    return <div>Cargando orden de compra...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!orden) {
    return <div>No se encontró la orden de compra.</div>;
  }

  return (
    <div className="modificar-orden-compra">
      <h2>Modificar Orden de Compra</h2>
      <FormularioOrdenCompra
        onSubmit={handleModificar}
        titulo="Modificar Orden de Compra"
        proveedores={proveedores}
        productos={productos}
        orden={orden} // Pasar la orden cargada al formulario
      />
    </div>
  );
  
};

export default ModificarOrdenCompra;