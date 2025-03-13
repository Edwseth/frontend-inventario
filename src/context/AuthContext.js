// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');

    // Verificar si hay datos en localStorage antes de intentar analizarlos
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error al analizar el usuario desde localStorage:', error);
        // Limpiar localStorage si hay un error
        localStorage.removeItem('user');
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    try {
      // Guardar el usuario en localStorage como JSON
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error al guardar el usuario en localStorage:', error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    try {
      // Eliminar el usuario y el token de localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('jwtToken');
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return user && user.role === 'ROLE_ADMIN';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);