import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>EstiloBGA</div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/citas" className={({ isActive }) => isActive ? styles.active : ''}>
            Citas
          </NavLink>
        </li>
        <li>
          <NavLink to="/estilistas" className={({ isActive }) => isActive ? styles.active : ''}>
            Estilistas
          </NavLink>
        </li>
        <li>
          <NavLink to="/clientes" className={({ isActive }) => isActive ? styles.active : ''}>
            Clientes
          </NavLink>
        </li>
        <li>
          <NavLink to="/reportes" className={({ isActive }) => isActive ? styles.active : ''}>
            Reportes
          </NavLink>
        </li>
        <li>
          <NavLink to="/disponibilidad/1" className={({ isActive }) => isActive ? styles.active : ''}>
            Disponibilidad
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}