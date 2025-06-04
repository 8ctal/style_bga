import React, { useState, useEffect } from 'react';
import { getServicios, getServicioById, agregarServicio, editarServicio, eliminarServicio } from '../services/servicioService';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import styles from '../components/Cliente.module.css';

// Agregar estilos globales para los botones de acción si no existen en el CSS de servicios
const style = `
.actionButtons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
.editButton {
  background: linear-gradient(90deg, #232323 60%, #444 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #d1d5db;
  transition: background 0.2s, box-shadow 0.2s;
  margin-right: 0.5rem;
}
.editButton:hover {
  background: linear-gradient(90deg, #444 0%, #232323 100%);
  box-shadow: 0 4px 16px #a1a1aa;
}
.deleteButton {
  background: #fff;
  color: #B91C1C;
  border: 1.5px solid #d1d5db;
  border-radius: 2rem;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.deleteButton:hover {
  background: #B91C1C;
  color: #fff;
}
`;

const ManejoServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [servicioActual, setServicioActual] = useState({
    nombreServicio: '',
    condicionesPrevias: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();

  const loadServicios = async () => {
    try {
      const response = await getServicios();
      console.log('Servicios cargados:', response);
      setServicios(response.data || []);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
      setError('Error al cargar los servicios');
    }
  };

  useEffect(() => {
    loadServicios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (servicioActual.idServicio) {
        await editarServicio(servicioActual);
        setSuccess('Servicio actualizado exitosamente');
      } else {
        await agregarServicio(servicioActual);
        setSuccess('Servicio agregado exitosamente');
      }
      setShowModal(false);
      loadServicios();
    } catch (error) {
      console.error('Error al guardar servicio:', error);
      setError('Error al guardar el servicio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este servicio?')) {
      try {
        await eliminarServicio(id);
        setSuccess('Servicio eliminado exitosamente');
        loadServicios();
      } catch (error) {
        console.error('Error al eliminar servicio:', error);
        setError('Error al eliminar el servicio');
      }
    }
  };

  const handleEdit = (servicio) => {
    setServicioActual(servicio);
    setShowModal(true);
  };

  return (
    <>
      <style>{style}</style>
      <Box sx={{ flexGrow: 1, minHeight: '100vh', background: theme => theme.palette.background.default, py: 4, mt: { xs: 7, md: 9 } }}>
        <div className="container mt-4">
          <h2 style={{ color: '#232946' }}>Gestión de Servicios</h2>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
          {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
          <button
            className={styles.buttonPrimary}
            onClick={() => {
              setServicioActual({
                nombreServicio: '',
                condicionesPrevias: ''
              });
              setShowModal(true);
            }}
          >
            Agregar Servicio
          </button>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Nombre del Servicio</th>
                  <th className={styles.tableHeader}>Condiciones Previas</th>
                  <th className={styles.tableHeader}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((servicio) => (
                  <tr key={servicio.idServicio} className={styles.tableRow}>
                    <td className={styles.tableCell}>{servicio.nombreServicio}</td>
                    <td className={styles.tableCell}>{servicio.condicionesPrevias}</td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionButtons}>
                        <button className={styles.editButton} onClick={() => handleEdit(servicio)}>
                          ✏️ Editar
                        </button>
                        <button className={styles.deleteButton} onClick={() => handleDelete(servicio.idServicio)}>
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{servicioActual.idServicio ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Servicio</Form.Label>
                  <Form.Control
                    type="text"
                    value={servicioActual.nombreServicio}
                    onChange={(e) => setServicioActual({...servicioActual, nombreServicio: e.target.value})}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Condiciones Previas</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={servicioActual.condicionesPrevias}
                    onChange={(e) => setServicioActual({...servicioActual, condicionesPrevias: e.target.value})}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className={styles.editButton}
                  disabled={isSubmitting}
                >
                  {servicioActual.idServicio ? 'Actualizar' : 'Agregar'}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </Box>
    </>
  );
};

export default ManejoServicios; 