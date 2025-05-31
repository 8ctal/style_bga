import React from 'react';
import DisponibilidadCalendario from '../components/DisponibilidadCalendario/DisponibilidadCalendario';
import styles from '../components/ManejoCitas.module.css';

const DisponibilidadPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <h1>Disponibilidad de Estilistas</h1>
        <p>Consulta los horarios disponibles de nuestros estilistas y agenda tu cita</p>
      </header>

      <main>
        <DisponibilidadCalendario />
      </main>
    </div>
  );
};

export default DisponibilidadPage; 