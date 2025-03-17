// src/views/Proveedores/Proveedores.jsx
import React, { useState, useEffect, useCallback } from "react";
import ActualizarProveedor from "./ActualizarProveedor";
import BloquearProveedor from "./BloquearProveedor";
import CrearProveedor from "./CrearProveedor";
import { obtenerProveedores } from "../../services/proveedoresService";
import axios from "../../config/axios";
import adicionarIcon from "../../assets/icons/adicionar.png";
import listarIcon from "../../assets/icons/listar.png";
import actualizarIcon from "../../assets/icons/actualizar.png";
import bloquearIcon from "../../assets/icons/bloquear.png";
import "./Proveedores.css";

const acciones = [
  { key: "crear", icon: adicionarIcon, label: "Crear Proveedor" },
  { key: "listar", icon: listarIcon, label: "Listar Proveedores" },
  { key: "actualizar", icon: actualizarIcon, label: "Actualizar Proveedor" },
  { key: "bloquear", icon: bloquearIcon, label: "Bloquear Proveedor" },
];

const Proveedores = () => {
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [accion, setAccion] = useState("");

  const cargarProveedores = useCallback(async () => {
    try {
      const response = await obtenerProveedores();
      const proveedoresNormalizados = response.data.map((proveedor) => ({
        ...proveedor,
        activo: !proveedor.bloqueado, // Inferir el estado "activo" desde el campo "bloqueado"
      }));
      console.log("Proveedores normalizados:", proveedoresNormalizados); // Verifica los datos normalizados
      setProveedores(proveedoresNormalizados);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
    }
  }, []);

  useEffect(() => {
    console.log("Acción actual:", accion);
    if (accion === "listar") {
      cargarProveedores();
    }
  }, [accion, cargarProveedores]);

  const handleBloquearProveedor = async (id) => {
    try {
      await axios.put(`/api/proveedores/${id}/bloquear`);
      cargarProveedores();
    } catch (error) {
      console.error("Error al bloquear proveedor:", error);
    }
  };

  const handleSeleccionAccion = (key) => {
    console.log("Acción seleccionada:", key);
    setAccion(key);
  };

  const renderContenido = () => {
    console.log("Renderizando contenido para acción:", accion);

    switch (accion) {
      case "crear":
        return <CrearProveedor cargarProveedores={cargarProveedores} />;
      case "actualizar":
        return (
          <ActualizarProveedor
            proveedorSeleccionado={proveedorSeleccionado}
            setProveedorSeleccionado={setProveedorSeleccionado}
            proveedores={proveedores}
            setProveedores={setProveedores}
          />
        );
      case "bloquear":
        return (
          <BloquearProveedor
            proveedorSeleccionado={proveedorSeleccionado}
            setProveedorSeleccionado={setProveedorSeleccionado}
            proveedores={proveedores}
            setProveedores={setProveedores}
            cargarProveedores={cargarProveedores}
          />
        );
      case "listar":
        return (
          <ListaProveedores
            proveedores={proveedores}
            setProveedorSeleccionado={setProveedorSeleccionado}
            setAccion={setAccion}
            handleBloquearProveedor={handleBloquearProveedor}
          />
        );
      default:
        return (
          <div className="mensaje-inicial">
            <h2>Bienvenido a la Gestión de Proveedores</h2>
            <p>Selecciona una acción para comenzar.</p>
          </div>
        );
    }
  };

  return (
    <div className="proveedores-container">
      <h1>Gestión de Proveedores</h1>

      {/* Subfunciones */}
      <div className="subfunciones">
        {acciones.map(({ key, icon, label }) => (
          <div
            key={key}
            className={`subfuncion ${accion === key ? "active" : ""}`}
            onClick={() => handleSeleccionAccion(key)}
          >
            <img src={icon} alt={label} onError={() => console.error(`Error cargando ${label}`)} />
            <p>{label}</p>
          </div>
        ))}
      </div>

      {/* Contenido dinámico */}
      <div className="contenido-subfuncion">{renderContenido()}</div>
    </div>
  );
};

// Componente para listar proveedores
const ListaProveedores = ({ proveedores, setProveedorSeleccionado, setAccion, handleBloquearProveedor }) => {
  console.log("Proveedores recibidos en ListaProveedores:", proveedores); // Verifica los datos

  return (
    <div className="lista-proveedores">
      <h2>Lista de Proveedores</h2>
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Email</th>
            <th>NIT/Cédula</th>
            <th>Nombre de Contacto</th>
            <th>Página Web</th>
            <th>Teléfono de Contacto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.proveedor}</td>
              <td>{proveedor.email}</td>
              <td>{proveedor.nitCedula}</td>
              <td>{proveedor.nombreContacto}</td>
              <td>{proveedor.paginaWeb}</td>
              <td>{proveedor.telefonoContacto}</td>
              <td>
                {proveedor.activo ? ( // Mostrar "Activo" o "Inactivo" según el estado
                  <span style={{ color: "green" }}>Activo</span>
                ) : (
                  <span style={{ color: "red" }}>Inactivo</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proveedores;
