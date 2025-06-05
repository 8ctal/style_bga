import '../App.css';
import React, { useState } from 'react';
import CitaList from '../components/CitaList';
import CitaForm from '../components/CitaForm';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function CrudCita() {
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleGuardado = () => {
    setCitaSeleccionada(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', background: theme => theme.palette.background.default, py: 4, mt: { xs: 7, md: 9 } }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 600, color: '#232946' }}>Gestionar Citas</h1>
      <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <CitaForm citaSeleccionada={citaSeleccionada} onSave={handleGuardado} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CitaList onEdit={setCitaSeleccionada} refreshTrigger={refreshTrigger} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CrudCita;
