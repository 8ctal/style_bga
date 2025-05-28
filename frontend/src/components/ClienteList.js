import React, { useEffect, useState } from 'react';
import { getClientes, eliminarCliente } from '../services/clienteService';
import styles from './Cliente.module.css';

export default function ClienteList({ onEdit, onActionSuccess, updateTrigger }) {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const cargarClientes = async () => {
    setIsLoading(true);
    try {
      const response = await getClientes();
      setClientes(response.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      onActionSuccess('Error al cargar la lista de clientes', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, [updateTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este cliente?')) {
      setIsLoading(true);
      try {
        await eliminarCliente(id);
        await cargarClientes();
        onActionSuccess('Cliente eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar cliente:', error);
        onActionSuccess('Error al eliminar el cliente', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredClientes = clientes.filter(cliente => {
    const searchLower = searchTerm.toLowerCase();
    return (
      cliente.nombres?.toLowerCase().includes(searchLower) ||
      cliente.apellidos?.toLowerCase().includes(searchLower) ||
      cliente.correoElectronico?.toLowerCase().includes(searchLower) ||
      cliente.celular?.includes(searchTerm) ||
      cliente.numeroDocumento?.includes(searchTerm)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClientes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className={styles.card}>
      <div className={styles.flexBetween}>
        <h2>Lista de Clientes</h2>
        <div className={styles.badge}>
          {filteredClientes.length} cliente{filteredClientes.length !== 1 ? 's' : ''} encontrado{filteredClientes.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar cliente por nombre, apellido, documento, correo, celular, etc..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      
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
            {isLoading ? (
              <tr>
                <td colSpan="6" className={styles.tableCell}>
                  <div className={styles.emptyMessage}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.tableCell}>
                  <div className={styles.emptyMessage}>
                    {searchTerm 
                      ? `No se encontraron clientes que coincidan con "${searchTerm}"`
                      : 'No hay clientes registrados.'}
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map(cliente => (
                <tr key={cliente.idUsuario} className={styles.tableRow}>
                  <td className={styles.tableCell}>{cliente.nombres}</td>
                  <td className={styles.tableCell}>{cliente.apellidos}</td>
                  <td className={styles.tableCell}>{cliente.numeroDocumento}</td>
                  <td className={styles.tableCell}>{cliente.correoElectronico}</td>
                  <td className={styles.tableCell}>{cliente.celular}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.editButton}
                        onClick={() => onEdit(cliente)}
                        disabled={isLoading}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDelete(cliente.idUsuario)}
                        disabled={isLoading}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            Anterior
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.active : ''}`}
              onClick={() => paginate(index + 1)}
              disabled={isLoading}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={styles.paginationButton}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
} 