import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import CrudCita from './pages/CrudCita.js';
import ManejoEstilista from './pages/ManejoEstilista';
import CrudCliente from './pages/CrudCliente';
import DisponibilidadPage from './pages/DisponibilidadPage';
import Navbar from './components/Navbar'; // <-- Importa el navbar
import Reportes from './pages/Reportes';
import DisponibilidadEstilista from './components/DisponibilidadEstilista/DisponibilidadEstilista';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* <-- Agrega el navbar aquí */}
        <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <h1 className="mb-4 text-center">Hola mundo, Esta es la vista principal o home</h1>
            </div>
          } />
          {/* Ejemplo de cómo agregar más rutas */}
          <Route path="/citas" element={<CrudCita />} />
          <Route path="/estilistas" element={<ManejoEstilista />} />
          <Route path="/clientes" element={<CrudCliente />} />
          <Route path="/servicios" element={<div>Página de Servicios</div>} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/disponibilidad/:estilistaId" element={<DisponibilidadEstilista />} />
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
