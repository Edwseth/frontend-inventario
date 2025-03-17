// src/services/proveedoresService.js
import axios from "../config/axios";

export const obtenerProveedores = async () => {
  try {
    const response = await axios.get("/api/proveedores");
    return response;
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw error;
  }
};

export const crearProveedor = async (proveedorData) => {
  try {
    const response = await axios.post("/api/proveedores", proveedorData);
    return response;
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    throw error;
  }
};