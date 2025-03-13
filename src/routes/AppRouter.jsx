// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../views/registro/LoginUsuarios';
import Dashboard from '../views/Dashboard';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;