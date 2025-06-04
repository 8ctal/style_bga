import '../App.css';
import React, { useState } from 'react';
import CitaList from '../components/CitaList';
import CitaForm from '../components/CitaForm';


function CrudCita() {
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleGuardado = () => {
    setCitaSeleccionada(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Gestionar Citas</h1>
      <CitaForm citaSeleccionada={citaSeleccionada} onSave={handleGuardado} />
      <CitaList onEdit={setCitaSeleccionada} refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default CrudCita;
