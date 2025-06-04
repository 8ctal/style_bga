import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/authService';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CrudCita from './pages/CrudCita';
import CrudCliente from './pages/CrudCliente';
import DisponibilidadPage from './pages/DisponibilidadPage';
import Navbar from './components/Navbar';
import './App.css';
import ManejoEstilista from './pages/ManejoEstilista';
import ManejoServicios from './pages/ManejoServicios';
import Reportes from './pages/Reportes';
import DisponibilidadEstilista from './components/DisponibilidadEstilista/DisponibilidadEstilista';

// Componente para rutas protegidas
const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = authService.getCurrentUser();
    console.log('ProtectedRoute - Usuario:', user);
    console.log('ProtectedRoute - Roles permitidos:', allowedRoles);
    
    if (!user) {
        console.log('ProtectedRoute - No hay usuario, redirigiendo a login');
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        console.log('ProtectedRoute - Rol no permitido:', user.rol);
        return <Navigate to="/unauthorized" />;
    }

    console.log('ProtectedRoute - Acceso permitido');
    return children;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Rutas protegidas */}
                    <Route path="/citas" element={
                        <ProtectedRoute allowedRoles={['admin', 'cliente', 'estilista']}>
                            <CrudCita />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/estilistas" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManejoEstilista />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/clientes" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <CrudCliente />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/servicios" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManejoServicios />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/reportes" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Reportes />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/disponibilidad" element={
                        <ProtectedRoute allowedRoles={['admin', 'cliente', 'estilista']}>
                            <DisponibilidadPage />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/disponibilidad/:estilistaId" element={
                        <ProtectedRoute allowedRoles={['admin', 'cliente', 'estilista']}>
                            <DisponibilidadEstilista />
                        </ProtectedRoute>
                    } />
                    
                    {/* Ruta para acceso no autorizado */}
                    <Route path="/unauthorized" element={
                        <div className="container mt-5">
                            <h1>Acceso No Autorizado</h1>
                            <p>No tienes permisos para acceder a esta página.</p>
                        </div>
                    } />
                    
                    {/* Ruta por defecto */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
