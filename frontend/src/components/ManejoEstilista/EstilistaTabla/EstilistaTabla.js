// components/EstilistaTabla.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ManejoEstilista.module.css';

const EstilistaTabla = ({ stylists = [], onEdit, onDelete, searchTerm = '', onSearchChange }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Asegurarse de que stylists sea un array
  const stylistsArray = Array.isArray(stylists) ? stylists : [];
  
  const filteredStylists = stylistsArray.filter(stylist => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (searchLower === "") return true;
    
    return (
      (stylist.nombres?.toLowerCase().includes(searchLower)) ||
      (stylist.apellidos?.toLowerCase().includes(searchLower)) ||
      (stylist.perfilEstilista?.especializacion?.toLowerCase().includes(searchLower)) ||
      (stylist.correoElectronico?.toLowerCase().includes(searchLower)) ||
      (stylist.celular?.includes(searchLower)) ||
      (stylist.numeroDocumento?.includes(searchLower))
    );
  });

  // Calcular índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStylists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStylists.length / itemsPerPage);

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando se busca
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return 'No especificado';
    return phone;
  };

  const formatExperience = (years) => {
    if (!years || years === 0) return 'Sin experiencia';
    return `${years} año${years === 1 ? '' : 's'}`;
  };

  return (
    <section className={styles.card}>
      <div className={styles.flexBetween}>
        <h2 className={styles.formTitle}>Lista de Estilistas</h2>
        <div className={styles.badge}>
          {filteredStylists.length} estilista{filteredStylists.length !== 1 ? 's' : ''} encontrado{filteredStylists.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre, apellido, especialidad, correo, teléfono o cédula..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className={styles.tableContainer}>
        {currentItems.length === 0 ? (
          <div className={styles.emptyMessage}>
            {searchTerm ? 
              `No se encontraron estilistas que coincidan con "${searchTerm}"` : 
              'No hay estilistas registrados.'
            }
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Nombres</th>
                  <th className={styles.tableHeader}>Apellidos</th>
                  <th className={styles.tableHeader}>Especialidad</th>
                  <th className={styles.tableHeader}>Experiencia</th>
                  <th className={styles.tableHeader}>Teléfono</th>
                  <th className={styles.tableHeader}>Correo</th>
                  <th className={styles.tableHeader}>Cédula</th>
                  <th className={styles.tableHeader}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((stylist) => (
                  <tr key={stylist.idUsuario} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      {stylist.nombres || 'No especificado'}
                    </td>
                    <td className={styles.tableCell}>
                      {stylist.apellidos || 'No especificado'}
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.badge}>
                        {stylist.perfilEstilista?.especializacion || 'No especificada'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      {formatExperience(stylist.perfilEstilista?.aniosExperiencia)}
                    </td>
                    <td className={styles.tableCell}>
                      {formatPhoneNumber(stylist.celular)}
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.email}>
                        {stylist.correoElectronico || 'No especificado'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      {stylist.numeroDocumento || 'No especificado'}
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.buttonPrimary}
                          onClick={() => onEdit(stylist.idUsuario)}
                          title="Editar estilista"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className={styles.buttonInfo}
                          onClick={() => navigate(`/disponibilidad/${stylist.idUsuario}`)}
                          title="Gestionar disponibilidad"
                        >
                          📅 Disponibilidad
                        </button>
                        <button
                          className={styles.buttonDanger}
                          onClick={() => {
                            if (window.confirm('¿Está seguro que desea eliminar este estilista?')) {
                              onDelete(stylist.idUsuario);
                            }
                          }}
                          title="Eliminar estilista"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.active : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={styles.paginationButton}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EstilistaTabla;