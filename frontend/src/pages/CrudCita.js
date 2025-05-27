import '../App.css';
import React, { useState } from 'react';
import CitaList from '../components/CitaList';
import CitaForm from '../components/CitaForm';


function CrudCita() {
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const handleGuardado = () => {
    setCitaSeleccionada(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">CRUD de Citas</h1>
      <CitaForm citaSeleccionada={citaSeleccionada} onSave={handleGuardado} />
      <CitaList onEdit={setCitaSeleccionada} />
    </div>
  );
}

export default CrudCita;
