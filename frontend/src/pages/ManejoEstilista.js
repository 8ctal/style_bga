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
  const [showModal, setShowModal] = useState(false);

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

  const handleOpenModal = () => {
    setCurrentStylist(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      setError('');
      const estilista = await getEstilistaById(id);
      setCurrentStylist(estilista);
      setIsEditing(true);
      setShowModal(true); // <-- Abrir modal al editar
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
    setShowModal(false); // <-- Cerrar modal
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
        <h1 className={styles.headerTitle}>Gestión de Estilistas</h1>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {successMessage && (
        <div className={styles.toastSuccess}>
          {successMessage}
        </div>
      )}

      <main>
        <button
          className={styles.buttonPrimary}
          style={{ marginBottom: '1rem', fontSize: '1.1rem', padding: '0.7rem 2rem', borderRadius: '2rem' }}
          onClick={handleOpenModal}
        >
          Agendar Estilista
        </button>

        {/* Modal */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={handleCancel}
                aria-label="Cerrar"
                type="button"
              >
                &times;
              </button>
              <EstilistaFormulario
                stylist={currentStylist}
                onSave={handleSave}
                onCancel={handleCancel}
                isEditing={isEditing}
              />
            </div>
          </div>
        )}

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