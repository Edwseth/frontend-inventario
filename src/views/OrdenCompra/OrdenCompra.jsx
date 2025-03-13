// src/views/OrdenesCompra/OrdenesCompra.jsx
import React, { useState, useEffect } from 'react';
import ordenesCompraService from '../../services/ordenesCompraService';
import { useAuth } from '../../context/AuthContext';
import adicionarIcon from '../../assets/icons/add.png';
import listarIcon from '../../assets/icons/lista.png';
import buscarIcon from '../../assets/icons/buscar.png';
import refreshIcon from '../../assets/icons/refresh.png';
import eliminarIcon from '../../assets/icons/eliminar.png';
import estadoIcon from '../../assets/icons/check.png';
import './OrdenCompra.css';

const OrdenesCompra = () => {
  const { isAuthenticated } = useAuth();
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [accion, setAccion] = useState('listar');
  const [buscarId, setBuscarId] = useState('');
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  // Cargar datos iniciales (proveedores y productos)
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [proveedoresData, productosData] = await Promise.all([
          ordenesCompraService.obtenerProveedores(),
          ordenesCompraService.obtenerProductos(),
        ]);
        setProveedores(proveedoresData);
        setProductos(productosData);
      } catch (error) {
        setError('Error al cargar datos iniciales');
      }
    };

    cargarDatosIniciales();
  }, []);

  // Cargar órdenes de compra cuando la acción es "listar"
  useEffect(() => {
    if (accion === 'listar') {
      cargarOrdenesCompra();
    }
  }, [accion]);

  // Si el usuario no está autenticado, mostrar mensaje de acceso denegado
  if (!isAuthenticated) {
    return <p>No tienes acceso a esta sección.</p>;
  }

  // Función para cargar todas las órdenes de compra
  const cargarOrdenesCompra = async () => {
    try {
      const data = await ordenesCompraService.obtenerOrdenesCompra();
      setOrdenesCompra(data);
      setError('');
    } catch (error) {
      setError('Error al cargar órdenes de compra');
    }
  };

  // Función para buscar una orden de compra por ID
  const handleBuscarOrdenCompra = async () => {
    if (!buscarId) {
      setError('Por favor, ingrese un ID válido.');
      return;
    }

    try {
      const orden = await ordenesCompraService.buscarOrdenCompra(buscarId);
      setOrdenEncontrada(orden);
      setError('');
    } catch (error) {
      setOrdenEncontrada(null);
      setError('Orden no encontrada');
    }
  };

  // Función para crear una nueva orden de compra
  const handleCrearOrdenCompra = async (nuevaOrden) => {
    try {
      await ordenesCompraService.crearOrdenCompra(nuevaOrden);
      cargarOrdenesCompra(); // Recargar la lista de órdenes
      setError('');
    } catch (error) {
      setError('Error al crear orden de compra');
    }
  };

  return (
    <div className="ordenes-compra-container">
      <h1>Gestión de Órdenes de Compra</h1>
      {error && <div className="error-message">{error}</div>}

      {/* Botones de subfunciones */}
      <div className="subfunciones">
        {['crear', 'listar', 'buscar', 'modificar', 'eliminar', 'estado'].map((subaccion) => (
          <div
            key={subaccion}
            className={`subfuncion ${accion === subaccion ? 'active' : ''}`}
            onClick={() => setAccion(subaccion)}
          >
            <img
              src={
                subaccion === 'crear' ? adicionarIcon :
                subaccion === 'listar' ? listarIcon :
                subaccion === 'buscar' ? buscarIcon :
                subaccion === 'modificar' ? refreshIcon :
                subaccion === 'eliminar' ? eliminarIcon : estadoIcon
              }
              alt={subaccion}
              className="icono-subfuncion"
            />
            <p>{subaccion.charAt(0).toUpperCase() + subaccion.slice(1)} OC</p>
          </div>
        ))}
      </div>

      {/* Contenido según la acción seleccionada */}
      <div className="contenido-subfuncion">
        {accion === 'crear' && (
          <FormularioOrdenCompra
            onSubmit={handleCrearOrdenCompra}
            titulo="Crear Orden de Compra"
            proveedores={proveedores}
            productos={productos}
          />
        )}

        {accion === 'listar' && (
          <div className="lista-ordenes-compra">
            <h2>Lista de Órdenes de Compra</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Proveedor</th>
                  <th>Detalles</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ordenesCompra.map((orden) => (
                  <tr key={orden.id}>
                    <td>{orden.id}</td>
                    <td>{orden.proveedor.nombre}</td>
                    <td>
                      <ul>
                        {orden.detalles.map((detalle, index) => (
                          <li key={index}>
                            {detalle.producto.nombre} - {detalle.cantidad} x ${detalle.precioUnitario}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{orden.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {accion === 'buscar' && (
          <div className="buscar-orden">
            <h2>Buscar Orden de Compra</h2>
            <input
              type="text"
              value={buscarId}
              onChange={(e) => setBuscarId(e.target.value)}
              placeholder="Ingrese el ID de la orden"
            />
            <button onClick={handleBuscarOrdenCompra}>Buscar</button>
            {ordenEncontrada && (
              <div className="orden-encontrada">
                <p>ID: {ordenEncontrada.id}</p>
                <p>Proveedor: {ordenEncontrada.proveedor.nombre}</p>
                <p>Estado: {ordenEncontrada.estado}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente FormularioOrdenCompra (modular y reutilizable)
const FormularioOrdenCompra = ({ onSubmit, titulo, proveedores, productos }) => {
  const [formData, setFormData] = useState({
    proveedorId: '',
    detalles: [{ productoId: '', cantidad: '', precioUnitario: '' }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'proveedorId') {
      setFormData({ ...formData, proveedorId: value });
    } else {
      const nuevosDetalles = [...formData.detalles];
      nuevosDetalles[index][name] = value;
      setFormData({ ...formData, detalles: nuevosDetalles });
    }
  };

  const handleAgregarDetalle = () => {
    setFormData({
      ...formData,
      detalles: [...formData.detalles, { productoId: '', cantidad: '', precioUnitario: '' }],
    });
  };

  const handleEliminarDetalle = (index) => {
    const nuevosDetalles = formData.detalles.filter((_, i) => i !== index);
    setFormData({ ...formData, detalles: nuevosDetalles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="formulario-orden-compra">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Proveedor:</label>
          <select
            name="proveedorId"
            value={formData.proveedorId}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="detalles">
          <h3>Detalles de la Orden</h3>
          {formData.detalles.map((detalle, index) => (
            <div key={index} className="detalle">
              <div className="form-group">
                <label>Producto:</label>
                <select
                  name="productoId"
                  value={detalle.productoId}
                  onChange={(e) => handleChange(e, index)}
                  required
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Cantidad:</label>
                <input
                  type="number"
                  name="cantidad"
                  value={detalle.cantidad}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio Unitario:</label>
                <input
                  type="number"
                  name="precioUnitario"
                  value={detalle.precioUnitario}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleEliminarDetalle(index)}
                className="eliminar-detalle"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAgregarDetalle} className="agregar-detalle">
            Agregar Detalle
          </button>
        </div>

        <button type="submit" className="submit-button">
          {titulo}
        </button>
      </form>
    </div>
  );
};

export default OrdenesCompra;