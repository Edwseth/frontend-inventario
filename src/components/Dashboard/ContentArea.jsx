// src/components/dashboard/ContentArea.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const ContentArea = () => (
  <div className="content-area">
    <Outlet /> {/* Aquí se renderizarán las páginas */}
  </div>
);

export default ContentArea;