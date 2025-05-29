import React, { useState, useEffect } from 'react';
import { getEstilistas, getEstilistaById, agregarEstilista, editarEstilista, eliminarEstilista } from '../services/estilistaServicio';
import EstilistaFormulario from '../components/ManejoEstilista/EstilistaFormulario/EstilistaFormulario';
import EstilistaTabla from '../components/ManejoEstilista/EstilistaTabla/EstilistaTabla';
import styles from '../components/ManejoEstilista/ManejoEstilista.module.css';

const ManejoEstilista = () => {
  const [stylists, setStylists] = useState([]);
  const [currentStylist, setCurrentStylist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Cargar estilistas al inicializar
  useEffect(() => {
    loadStylists();
  }, []);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const loadStylists = async () => {
    try {
      setLoading(true);
      setError('');
      const estilistas = await getEstilistas();
      console.log('Estilistas cargados en el componente:', estilistas); // Debug
      setStylists(estilistas);
    } catch (err) {
      setError('Error al cargar los estilistas. Por favor, intente de nuevo más tarde.');
      console.error('Error al cargar estilistas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (stylistData) => {
    try {
      setLoading(true);
      setError('');
      
      if (isEditing) {
        await editarEstilista(stylistData);
        showSuccess('Estilista actualizado exitosamente');
      } else {
        await agregarEstilista(stylistData);
        showSuccess('Estilista creado exitosamente');
      }
      
      await loadStylists();
      handleCancel();
    } catch (err) {
      setError('Error al guardar el estilista. Por favor, intente de nuevo.');
      console.error('Error al guardar estilista:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      setError('');
      const estilista = await getEstilistaById(id);
      console.log('Estilista a editar:', estilista); // Debug
      setCurrentStylist(estilista);
      setIsEditing(true);
    } catch (err) {
      setError('Error al cargar el estilista para editar.');
      console.error('Error al cargar estilista:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentStylist(null);
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('No hay ID de estilista para eliminar');
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('Eliminando estilista:', id);
      
      const success = await eliminarEstilista(id);
      
      if (success) {
        // Actualizar el estado local eliminando el estilista
        setStylists(prevStylists => 
          prevStylists.filter(stylist => stylist.idUsuario !== id)
        );
        
        showSuccess('Estilista eliminado exitosamente');

        // Recargar la lista completa para asegurar sincronización con el backend
        await loadStylists();
      } else {
        throw new Error('La eliminación no fue exitosa');
      }
    } catch (err) {
      console.error('Error en handleDelete:', err);
      setError(err.response?.data?.message || 'Error al eliminar el estilista. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>
          <div className={styles.spinner}></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Gestión de Estilistas</h1>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      <main>
        <EstilistaFormulario
          stylist={currentStylist}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={isEditing}
        />
        
        <EstilistaTabla
          stylists={stylists}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </main>
    </div>
  );
};

export default ManejoEstilista;