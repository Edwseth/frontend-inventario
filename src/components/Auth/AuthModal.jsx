// Ejemplo AuthModal.jsx
import React from 'react';
import './AuthModal.css';

const AuthModal = ({ onClose }) => (
  <div className="auth-modal">
    <img src={edwtechLogo} alt="EdwTech Solutions" />
    <form>
      <input type="text" placeholder="Usuario" />
      <input type="password" placeholder="Contraseña" />
      <button type="submit">Ingresar</button>
    </form>
  </div>
);