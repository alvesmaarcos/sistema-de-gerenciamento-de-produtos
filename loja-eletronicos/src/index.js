// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage'; // Importe a HomePage
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);