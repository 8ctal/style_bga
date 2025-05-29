import React, { useEffect, useState } from 'react';
import { getCitas, eliminarCita } from '../services/citaService';
import styles from './ManejoCitas.module.css';

export default function CitaList({ onEdit }) {
  const [citas, setCitas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const cargarCitas = () => {
    setLoading(true);
    getCitas().then(res => {
      setCitas(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta cita?')) {
      eliminarCita(id).then(() => cargarCitas());
    }
  };

  const formatFecha = (fechaStr) => {
    const date = new Date(fechaStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Filtrar citas basado en el término de búsqueda
  const filteredCitas = citas.filter(cita => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (searchLower === "") return true;
    
    return (
      (cita.clienteInfo?.nombres?.toLowerCase().includes(searchLower)) ||
      (cita.clienteInfo?.apellidos?.toLowerCase().includes(searchLower)) ||
      (cita.estilistaInfo?.nombres?.toLowerCase().includes(searchLower)) ||
      (cita.servicios?.[0]?.nombreServicio?.toLowerCase().includes(searchLower)) ||
      (cita.estado?.toLowerCase().includes(searchLower))
    );
  });

  // Calcular índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCitas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCitas.length / itemsPerPage);

  const getEstadoBadgeClass = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'completada':
        return styles.badgeSuccess;
      case 'pendiente':
        return styles.badgeWarning;
      case 'cancelada':
        return styles.badgeDanger;
      default:
        return styles.badge;
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.flexBetween}>
        <h2 className={styles.formTitle}>Lista de Citas</h2>
        <div className={styles.badge}>
          {filteredCitas.length} cita{filteredCitas.length !== 1 ? 's' : ''} encontrada{filteredCitas.length !== 1 ? 's' : ''}
        </div>
      </div>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Buscar por cliente, estilista, servicio o estado..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <div className={styles.emptyMessage}>Cargando citas...</div>
      ) : currentItems.length === 0 ? (
        <div className={styles.emptyMessage}>
          {searchTerm ? 
            `No se encontraron citas que coincidan con "${searchTerm}"` : 
            'No hay citas registradas.'
          }
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Cliente</th>
                  <th className={styles.tableHeader}>Estilista</th>
                  <th className={styles.tableHeader}>Fecha</th>
                  <th className={styles.tableHeader}>Servicios</th>
                  <th className={styles.tableHeader}>Estado</th>
                  <th className={styles.tableHeader}>Total</th>
                  <th className={styles.tableHeader}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(cita => (
                  <tr key={cita.idCita || cita._id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <div className={styles.citaInfo}>
                        <span>{cita.clienteInfo?.nombres} {cita.clienteInfo?.apellidos}</span>
                        <span className={styles.citaInfoSecondary}>{cita.clienteInfo?.celular}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.citaInfo}>
                        <span>{cita.estilistaInfo?.nombres} {cita.estilistaInfo?.apellidos}</span>
                        <span className={styles.citaInfoSecondary}>{cita.estilistaInfo?.especializacion}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.citaInfo}>
                        <span>{formatFecha(cita.fechaCita)}</span>
                        <span className={styles.citaInfoSecondary}>
                          {cita.horarioAsignado?.diaSemana}, {cita.horarioAsignado?.intervalo}
                        </span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <ul className="list-unstyled mb-0">
                        {cita.servicios?.map((s, i) => (
                          <li key={i}>
                            <div className={styles.citaInfo}>
                              <span>{s.nombreServicio}</span>
                              <span className={styles.citaInfoSecondary}>${s.precioServicio}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={getEstadoBadgeClass(cita.estado)}>
                        {cita.estado}
                      </span>
                    </td>
                    <td className={styles.tableCell}>${cita.pago?.totalPagado}</td>
                    <td className={styles.tableCell}>
                      <div className={styles.flexBetween}>
                        <button
                          className={styles.buttonPrimary}
                          onClick={() => onEdit(cita)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className={styles.buttonDanger}
                          onClick={() => handleDelete(cita.idCita || cita._id)}
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
        </>
      )}
    </section>
  );
}
