// src/views/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import ContentArea from '../components/Dashboard/ContentArea';
import BrandWatermark from '../components/Common/BrandWatermark';
import './Dashboard.css';

const Dashboard = () => (
  <div className="dashboard-layout">
    <Sidebar />
    <ContentArea />
    <BrandWatermark />
  </div>
);

export default Dashboard;
