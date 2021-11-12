import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes } from './routes';

export const App = () => (
  // Usamos HashRouter por si queremos agregar una mobil app despues
  <HashRouter>
    <Routes toggleTheme='dark'/>
  </HashRouter>
);
