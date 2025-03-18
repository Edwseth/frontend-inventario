// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Incluir el token en el estado del usuario
        setUser({ ...parsedUser, token });
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
      localStorage.setItem('user', JSON.stringify({
        username: userData.username,
        roles: userData.roles || [], // ✅ Asegurar que sea un array
        email: userData.email,
      }));
      localStorage.setItem('jwtToken', userData.token);
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
    return user && Array.isArray(user.roles) && user.roles.includes('ROLE_ADMIN');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);