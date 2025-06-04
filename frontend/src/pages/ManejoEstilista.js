import React, { useState, useEffect } from 'react';
import { getEstilistas, getEstilistaById, agregarEstilista, editarEstilista, eliminarEstilista } from '../services/estilistaServicio';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import EstilistaFormulario from '../components/ManejoEstilista/EstilistaFormulario/EstilistaFormulario';
import EstilistaTabla from '../components/ManejoEstilista/EstilistaTabla/EstilistaTabla';
import styles from '../components/ManejoEstilista/ManejoEstilista.module.css';

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
    <div className="container mt-4">
      <h2>Gestión de Estilistas</h2>
      
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Button variant="primary" className="mb-3" onClick={() => {
        setEstilistaActual({
          nombres: '',
          apellidos: '',
          numeroDocumento: '',
          correoElectronico: '',
          password: '',
          celular: ''
        });
        setShowModal(true);
      }}>
        Agregar Estilista
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Documento</th>
            <th>Correo</th>
            <th>Celular</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estilistas.map((estilista) => (
            <tr key={estilista.idUsuario}>
              <td>{estilista.nombres}</td>
              <td>{estilista.apellidos}</td>
              <td>{estilista.numeroDocumento}</td>
              <td>{estilista.correoElectronico}</td>
              <td>{estilista.celular}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(estilista)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(estilista.idUsuario)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
  );
};

export default ManejoEstilista;