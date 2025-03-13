// src/views/Productos/Productos.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../config/axios'; // Importar la instancia configurada
import adicionarIcon from '../../assets/icons/add.png'; // Ícono de adicionar
import listarIcon from '../../assets/icons/lista.png'; // Ícono de listar
import buscarIcon from '../../assets/icons/buscar.png'; // Ícono de buscar
import refreshIcon from '../../assets/icons/refresh.png'; // Ícono de actualizar
import disponibilidadIcon from '../../assets/icons/disponibilidad.png'; // Ícono de disponibilidad
import blockIcon from '../../assets/icons/block.png'; // Ícono de deshabilitar
import './Productos.css'; // Estilos para la vista de productos

const Productos = () => {
  const [productos, setProductos] = useState([]); // Lista de productos
  const [accion, setAccion] = useState('listar'); // Subfunción seleccionada
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto seleccionado para actualizar
  const [buscarId, setBuscarId] = useState(''); // ID para buscar producto
  const [productoEncontrado, setProductoEncontrado] = useState(null); // Producto encontrado al buscar
  const [verificarId, setVerificarId] = useState(''); // ID para verificar disponibilidad
  const [verificarCantidad, setVerificarCantidad] = useState(''); // Cantidad para verificar disponibilidad
  const [mensajeDisponibilidad, setMensajeDisponibilidad] = useState(''); // Mensaje de disponibilidad

  // Cargar la lista de productos al montar el componente
  useEffect(() => {
    if (accion === 'listar') {
      cargarProductos();
    }
  }, [accion]);

  const cargarProductos = async () => {
    try {
      const response = await axios.get('/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const handleCrearProducto = async (formData) => {
    try {
      await axios.post('/api/productos', formData);
      cargarProductos(); // Recargar la lista de productos
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  const handleActualizarProducto = async (id, formData) => {
    try {
      await axios.put(`/api/productos/${id}`, formData);
      cargarProductos(); // Recargar la lista de productos
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const handleBuscarProducto = async () => {
    try {
      const response = await axios.get(`/api/productos/${buscarId}`);
      setProductoEncontrado(response.data);
    } catch (error) {
      console.error('Error al buscar producto:', error);
      setProductoEncontrado(null);
    }
  };

  const handleVerificarDisponibilidad = async () => {
    try {
      const response = await axios.post(`/api/productos/${verificarId}/verificar-disponibilidad`, {
        cantidad: verificarCantidad,
      });
      setMensajeDisponibilidad(response.data.mensaje);
    } catch (error) {
      console.error('Error al verificar disponibilidad:', error);
      setMensajeDisponibilidad('Error al verificar disponibilidad');
    }
  };

  const handleDeshabilitarProducto = async (id) => {
    try {
      await axios.put(`/api/productos/${id}/deshabilitar`);
      cargarProductos(); // Recargar la lista de productos
    } catch (error) {
      console.error('Error al deshabilitar producto:', error);
    }
  };

  return (
    <div className="productos-container">
      <h1>Gestión de Productos</h1>

      {/* Subfunciones */}
      <div className="subfunciones">
        <div
          className={`subfuncion ${accion === 'crear' ? 'active' : ''}`}
          onClick={() => setAccion('crear')}
        >
          <img src={adicionarIcon} alt="Crear Producto" />
          <p>Crear Producto</p>
        </div>
        <div
          className={`subfuncion ${accion === 'listar' ? 'active' : ''}`}
          onClick={() => setAccion('listar')}
        >
          <img src={listarIcon} alt="Listar Productos" />
          <p>Listar Productos</p>
        </div>
        <div
          className={`subfuncion ${accion === 'buscar' ? 'active' : ''}`}
          onClick={() => setAccion('buscar')}
        >
          <img src={buscarIcon} alt="Buscar Producto" />
          <p>Buscar Producto</p>
        </div>
        <div
          className={`subfuncion ${accion === 'actualizar' ? 'active' : ''}`}
          onClick={() => setAccion('actualizar')}
        >
          <img src={refreshIcon} alt="Actualizar Producto" />
          <p>Actualizar Producto</p>
        </div>
        <div
          className={`subfuncion ${accion === 'verificar' ? 'active' : ''}`}
          onClick={() => setAccion('verificar')}
        >
          <img src={disponibilidadIcon} alt="Verificar Disponibilidad" />
          <p>Verificar Disponibilidad</p>
        </div>
        <div
          className={`subfuncion ${accion === 'deshabilitar' ? 'active' : ''}`}
          onClick={() => setAccion('deshabilitar')}
        >
          <img src={blockIcon} alt="Deshabilitar Producto" />
          <p>Deshabilitar Producto</p>
        </div>
      </div>

      {/* Contenido de la subfunción seleccionada */}
      <div className="contenido-subfuncion">
        {accion === 'crear' && (
          <FormularioProducto
            onSubmit={handleCrearProducto}
            titulo="Crear Producto"
          />
        )}

        {accion === 'listar' && (
          <div className="lista-productos">
            <h2>Lista de Productos</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>SKU</th>
                  <th>Stock Actual</th>
                  <th>Stock Mínimo</th>
                  <th>Stock Mín. Proveedor</th>
                  <th>Unidad de Medida</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.sku}</td>
                    <td>{producto.stockActual}</td>
                    <td>{producto.stockMinimo}</td>
                    <td>{producto.stockMinProveedor}</td>
                    <td>{producto.unidadMedida}</td>
                    <td>
                      <button onClick={() => {
                        setProductoSeleccionado(producto);
                        setAccion('actualizar');
                      }}>
                        Actualizar
                      </button>
                      <button onClick={() => handleDeshabilitarProducto(producto.id)}>
                        Deshabilitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {accion === 'buscar' && (
          <div className="buscar-producto">
            <h2>Buscar Producto por ID</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Ingrese el ID del producto"
                value={buscarId}
                onChange={(e) => setBuscarId(e.target.value)}
              />
              <button onClick={handleBuscarProducto}>Buscar</button>
            </div>
            {productoEncontrado && (
              <div className="producto-encontrado">
                <h3>Producto Encontrado</h3>
                <p>Nombre: {productoEncontrado.nombre}</p>
                <p>Descripción: {productoEncontrado.descripcion}</p>
                <p>SKU: {productoEncontrado.sku}</p>
                <p>Stock Actual: {productoEncontrado.stockActual}</p>
                <p>Stock Mínimo: {productoEncontrado.stockMinimo}</p>
                <p>Stock Mín. Proveedor: {productoEncontrado.stockMinProveedor}</p>
                <p>Unidad de Medida: {productoEncontrado.unidadMedida}</p>
              </div>
            )}
          </div>
        )}

        {accion === 'actualizar' && productoSeleccionado && (
          <FormularioProducto
            onSubmit={(formData) => handleActualizarProducto(productoSeleccionado.id, formData)}
            titulo="Actualizar Producto"
            datosIniciales={productoSeleccionado}
          />
        )}

        {accion === 'verificar' && (
          <div className="verificar-disponibilidad">
            <h2>Verificar Disponibilidad</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="ID del Producto"
                value={verificarId}
                onChange={(e) => setVerificarId(e.target.value)}
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={verificarCantidad}
                onChange={(e) => setVerificarCantidad(e.target.value)}
              />
              <button onClick={handleVerificarDisponibilidad}>Verificar</button>
            </div>
            {mensajeDisponibilidad && <p>{mensajeDisponibilidad}</p>}
          </div>
        )}

        {accion === 'deshabilitar' && (
          <div className="formulario-accion">
            <h2>Deshabilitar Producto</h2>
            <p>Selecciona un producto de la lista para deshabilitarlo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para el formulario de productos
const FormularioProducto = ({ onSubmit, titulo, datosIniciales }) => {
  const [formData, setFormData] = useState(
    datosIniciales || {
      nombre: '',
      descripcion: '',
      sku: '',
      stockActual: '',
      stockMinimo: '',
      stockMinProveedor: '',
      unidadMedida: '',
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
    <div className="formulario-producto">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>SKU:</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock Actual:</label>
          <input
            type="number"
            name="stockActual"
            value={formData.stockActual}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock Mínimo:</label>
          <input
            type="number"
            name="stockMinimo"
            value={formData.stockMinimo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock Mín. Proveedor:</label>
          <input
            type="number"
            name="stockMinProveedor"
            value={formData.stockMinProveedor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Unidad de Medida:</label>
          <input
            type="text"
            name="unidadMedida"
            value={formData.unidadMedida}
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

export default Productos;