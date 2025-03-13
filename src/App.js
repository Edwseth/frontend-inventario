// src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginUsuarios from './views/Registro/LoginUsuarios';
import Dashboard from './views/Dashboard';
import Registro from './views/Registro/Registro';
import Usuarios from './views/Usuarios/Usuarios';
import Proveedores from './views/Proveedores/Proveedores';
import Productos from './views/Productos/Productos';
import OrdenCompra from './views/OrdenCompra/OrdenCompra';
import Movimientos from './views/MovimientosMP/MovimientosMP';
import Informes from './views/Informes/Informes';
import BrandWatermark from './components/Common/BrandWatermark';
import PrivateRoute from './routes/PrivateRoute'; // Importar PrivateRoute

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginUsuarios />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute> {/* Proteger la ruta del dashboard */}
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="registro" element={<Registro />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="productos" element={<Productos />} />
          <Route path="orden-compra" element={<OrdenCompra />} />
          <Route path="movimientos-mp" element={<Movimientos />} />
          <Route path="informes" element={<Informes />} />
        </Route>
      </Routes>
      {/* Mostrar marca de agua si no está en el dashboard */}
      {!isDashboard && <BrandWatermark isWatermark />}
    </>
  );
};

const App = () => <AppContent />;

export default App;