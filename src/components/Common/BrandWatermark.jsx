// src/components/common/BrandWatermark.jsx
import React from 'react';
import clemenLogo from '../../assets/logos/Clemen.png'; // Asegúrate de tener el logo en la carpeta assets
import './BrandWatermark.css'; // Importar estilos

const BrandWatermark = ({ isWatermark = false }) => (
  <div className={`brand-watermark ${isWatermark ? 'watermark' : ''}`}>
    <img src={clemenLogo} alt="Clemen Laboratorios" />
  </div>
);

export default BrandWatermark;