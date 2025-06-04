import React, { useState, useEffect } from 'react';
import { getServicios, getServicioById, agregarServicio, editarServicio, eliminarServicio } from '../services/servicioService';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

const ManejoServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [servicioActual, setServicioActual] = useState({
    nombreServicio: '',
    condicionesPrevias: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    <Box sx={{ flexGrow: 1, minHeight: '100vh', background: theme => theme.palette.background.default, py: 4, mt: { xs: 7, md: 9 } }}>
      <div className="container mt-4">
        <h2 style={{ color: '#232946' }}>Gestión de Servicios</h2>
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        <Button variant="primary" className="mb-3" onClick={() => {
          setServicioActual({
            nombreServicio: '',
            condicionesPrevias: ''
          });
          setShowModal(true);
        }}>
          Agregar Servicio
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre del Servicio</th>
              <th>Condiciones Previas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.idServicio}>
                <td>{servicio.nombreServicio}</td>
                <td>{servicio.condicionesPrevias}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(servicio)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(servicio.idServicio)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
              <Button variant="primary" type="submit">
                {servicioActual.idServicio ? 'Actualizar' : 'Agregar'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Box>
  );
};

export default ManejoServicios; 