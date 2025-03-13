// src/components/dashboard/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Importar estilos

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-header">
      <h2>Módulo para Inventarios</h2>
    </div>
    <nav className="sidebar-menu">
      <h2>Menú</h2>
      <ul>
        <li>
          <Link to="/dashboard/registro">Registro</Link>
        </li>
        <li>
          <Link to="/dashboard/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/dashboard/proveedores">Proveedores</Link>
        </li>
        <li>
          <Link to="/dashboard/productos">Productos</Link>
        </li>
        <li>
          <Link to="/dashboard/orden-compra">Orden de Compra</Link>
        </li>
        <li>
          <Link to="/dashboard/movimientos-mp">Movimientos de MP</Link>
        </li>
        <li>
          <Link to="/dashboard/informes">Informes</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
