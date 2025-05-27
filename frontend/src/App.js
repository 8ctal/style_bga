import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import CrudCita from './pages/CrudCita.js';
import ManejoEstilista from './pages/ManejoEstilista';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <h1 className="mb-4 text-center">Hola mundo, Esta es la vista principal o home</h1>
            </div>
          } />
          {/* Ejemplo de cómo agregar más rutas */}
          <Route path="/citas" element={<CrudCita />} />
          <Route path="/estilistas" element={<ManejoEstilista />} />
          <Route path="/servicios" element={<div>Página de Servicios</div>} />
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
