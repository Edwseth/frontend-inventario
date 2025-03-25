import axiosInstance from '../config/axios'; // Importar la instancia de Axios

export const registrarRecepcion = async (idMovimiento, movimientosDTO) => {
  const response = await axiosInstance.put(`/api/movimientos/${idMovimiento}/recepcion`, movimientosDTO);
  return response.data; // Retornar los datos de la respuesta
};

export const registrarSalida = async (movimientosDTO) => {
  const response = await axiosInstance.post(`/api/movimientos/salida`, movimientosDTO);
  return response.data; // Retornar los datos de la respuesta
};

export const registrarDevolucion = async (movimientosDTO) => {
  const response = await axiosInstance.post(`/api/movimientos/devolucion`, movimientosDTO);
  return response.data; // Retornar los datos de la respuesta
};
