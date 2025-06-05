import React from 'react';
import DisponibilidadCalendario from '../components/DisponibilidadCalendario/DisponibilidadCalendario';
import styles from '../components/ManejoCitas.module.css';
import Box from '@mui/material/Box';

const DisponibilidadPage = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', py: 4, mt: { xs: 7, md: 9 } }}>
      <div className={styles.container}>
        <header>
          <h1>Disponibilidad de Estilistas</h1>
          <p>Consulta los horarios disponibles de nuestros estilistas y agenda tu cita</p>
        </header>

        <main>
          <DisponibilidadCalendario />
        </main>
      </div>
    </Box>
  );
};

export default DisponibilidadPage; 