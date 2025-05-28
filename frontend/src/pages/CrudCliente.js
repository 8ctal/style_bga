import '../App.css';
import React, { useState } from 'react';
import ClienteList from '../components/ClienteList';
import ClienteForm from '../components/ClienteForm';
import styles from '../components/Cliente.module.css';

function CrudCliente() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleActionSuccess = (message, type = 'success') => {
    if (type === 'error') {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 3000);
      // Incrementar el contador para forzar la actualización de la lista
      setUpdateTrigger(prev => prev + 1);
    }
  };

  const handleSave = () => {
    setClienteSeleccionado(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Gestión de Clientes</h1>
      
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <ClienteForm 
        clienteSeleccionado={clienteSeleccionado} 
        onSave={handleSave}
        onActionSuccess={handleActionSuccess}
      />
      <ClienteList 
        onEdit={setClienteSeleccionado}
        onActionSuccess={handleActionSuccess}
        updateTrigger={updateTrigger}
      />
    </div>
  );
}

export default CrudCliente; 