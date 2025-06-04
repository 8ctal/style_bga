import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    if (!user) {
        return null; // No mostrar navbar en login/register
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.navBrand}>
                <Link to="/">EstiloBGA</Link>
            </div>
            <div className={styles.navLinks}>
                {user.rol === 'admin' && (
                    <>
                        <Link to="/clientes">Clientes</Link>
                        <Link to="/estilistas">Estilistas</Link>
                        <Link to="/servicios">Servicios</Link>
                        <Link to="/citas">Citas</Link>
                        <Link to="/disponibilidad">Disponibilidad</Link>
                        <Link to="/reportes">Reportes</Link>
                    </>
                )}
                {user.rol === 'estilista' && (
                    <>
                        <Link to="/citas">Mis Citas</Link>
                        <Link to="/disponibilidad">Mi Disponibilidad</Link>
                    </>
                )}
                {user.rol === 'cliente' && (
                    <>
                        <Link to="/citas">Mis Citas / Agendar Cita</Link>
                        <Link to="/disponibilidad">Disponibilidad</Link>
                    </>
                )}
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
};

export default Navbar;