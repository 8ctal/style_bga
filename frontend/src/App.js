import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import CrudCita from './pages/CrudCita.js';
import ManejoEstilista from './pages/ManejoEstilista';
import CrudCliente from './pages/CrudCliente';
<<<<<<< HEAD
import DisponibilidadPage from './pages/DisponibilidadPage';
=======
import Navbar from './components/Navbar'; // <-- Importa el navbar
>>>>>>> c36f91f0fc3cf3b1447b0216944262e4622676f8

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
          <Route path="/disponibilidad" element={<DisponibilidadPage />} />
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
