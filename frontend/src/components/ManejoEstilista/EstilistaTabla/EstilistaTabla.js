// components/EstilistaTabla.js
import React from 'react';
import styles from '../ManejoEstilista.module.css';

const EstilistaTabla = ({ stylists = [], onEdit, onDelete, searchTerm = '', onSearchChange }) => {
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

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
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
      
      <div className={styles.formGroup}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Buscar por nombre, apellido, especialidad, correo, teléfono o cédula..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className={styles.tableContainer}>
        {filteredStylists.length === 0 ? (
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
                {filteredStylists.map((stylist) => (
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
                      <div className={styles.flexBetween}>
                        <button
                          className={styles.buttonPrimary}
                          onClick={() => onEdit(stylist.idUsuario)}
                          title="Editar estilista"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className={styles.buttonDanger}
                          onClick={() => {
                            console.log('Clic en eliminar estilista:', stylist.idUsuario);
                            onDelete(stylist.idUsuario);
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
      </div>
    </section>
  );
};

export default EstilistaTabla;