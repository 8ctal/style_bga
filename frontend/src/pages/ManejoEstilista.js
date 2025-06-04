import React, { useState, useEffect } from 'react';
import { getEstilistas, getEstilistaById, agregarEstilista, editarEstilista, eliminarEstilista } from '../services/estilistaServicio';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import EstilistaFormulario from '../components/ManejoEstilista/EstilistaFormulario/EstilistaFormulario';
import EstilistaTabla from '../components/ManejoEstilista/EstilistaTabla/EstilistaTabla';
import styles from '../components/Cliente.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

const ManejoEstilista = () => {
  const [estilistas, setEstilistas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [estilistaActual, setEstilistaActual] = useState({
    nombres: '',
    apellidos: '',
    numeroDocumento: '',
    correoElectronico: '',
    password: '',
    celular: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const theme = useTheme();

  const loadStylists = async () => {
    try {
      const response = await getEstilistas();
      console.log('Estilistas cargados en el componente:', response);
      setEstilistas(response.data || []);
    } catch (error) {
      console.error('Error al cargar estilistas:', error);
      setError('Error al cargar los estilistas');
    }
  };

  useEffect(() => {
    loadStylists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (estilistaActual.idUsuario) {
        await editarEstilista(estilistaActual);
        setSuccess('Estilista actualizado exitosamente');
      } else {
        await agregarEstilista(estilistaActual);
        setSuccess('Estilista agregado exitosamente');
      }
      setShowModal(false);
      loadStylists();
    } catch (error) {
      console.error('Error al guardar estilista:', error);
      setError('Error al guardar el estilista');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este estilista?')) {
      try {
        await eliminarEstilista(id);
        setSuccess('Estilista eliminado exitosamente');
        loadStylists();
      } catch (error) {
        console.error('Error al eliminar estilista:', error);
        setError('Error al eliminar el estilista');
      }
    }
  };

  const handleEdit = (estilista) => {
    setEstilistaActual(estilista);
    setShowModal(true);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', background: theme => theme.palette.background.default, py: 4, mt: { xs: 7, md: 9 } }}>
      <div className="container mt-4">
        <h2 style={{ color: '#232946' }}>Gestión de Estilistas</h2>
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        <button
          className={styles.buttonPrimary}
          onClick={() => {
            setEstilistaActual({
              nombres: '',
              apellidos: '',
              numeroDocumento: '',
              correoElectronico: '',
              password: '',
              celular: ''
            });
            setShowModal(true);
          }}
        >
          Agregar Estilista
        </button>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Nombres</th>
                <th className={styles.tableHeader}>Apellidos</th>
                <th className={styles.tableHeader}>Documento</th>
                <th className={styles.tableHeader}>Correo</th>
                <th className={styles.tableHeader}>Celular</th>
                <th className={styles.tableHeader}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estilistas.map((estilista) => (
                <tr key={estilista.idUsuario} className={styles.tableRow}>
                  <td className={styles.tableCell}>{estilista.nombres}</td>
                  <td className={styles.tableCell}>{estilista.apellidos}</td>
                  <td className={styles.tableCell}>{estilista.numeroDocumento}</td>
                  <td className={styles.tableCell}>{estilista.correoElectronico}</td>
                  <td className={styles.tableCell}>{estilista.celular}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button className={styles.editButton} onClick={() => handleEdit(estilista)}>
                        ✏️ Editar
                      </button>
                      <button className={styles.deleteButton} onClick={() => handleDelete(estilista.idUsuario)}>
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
            <Modal.Title>{estilistaActual.idUsuario ? 'Editar Estilista' : 'Agregar Estilista'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  type="text"
                  value={estilistaActual.nombres}
                  onChange={(e) => setEstilistaActual({...estilistaActual, nombres: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  value={estilistaActual.apellidos}
                  onChange={(e) => setEstilistaActual({...estilistaActual, apellidos: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Número de Documento</Form.Label>
                <Form.Control
                  type="text"
                  value={estilistaActual.numeroDocumento}
                  onChange={(e) => setEstilistaActual({...estilistaActual, numeroDocumento: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  value={estilistaActual.correoElectronico}
                  onChange={(e) => setEstilistaActual({...estilistaActual, correoElectronico: e.target.value})}
                  required
                />
              </Form.Group>
              {!estilistaActual.idUsuario && (
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={estilistaActual.password}
                    onChange={(e) => setEstilistaActual({...estilistaActual, password: e.target.value})}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="text"
                  value={estilistaActual.celular}
                  onChange={(e) => setEstilistaActual({...estilistaActual, celular: e.target.value})}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {estilistaActual.idUsuario ? 'Actualizar' : 'Agregar'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Box>
  );
};

export default ManejoEstilista;