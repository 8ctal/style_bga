import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getCitas, getEstilistas } from '../../services/citaService';
import { authService } from '../../services/authService';
import styles from './DisponibilidadCalendario.module.css';

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DisponibilidadCalendario = () => {
  const [citas, setCitas] = useState([]);
  const [estilistas, setEstilistas] = useState([]);
  const [estilistaSeleccionado, setEstilistaSeleccionado] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citasRes, estlistasRes] = await Promise.all([
          getCitas(),
          getEstilistas()
        ]);
        setCitas(citasRes.data);
        setEstilistas(estlistasRes.data);
        
        // Si el usuario es estilista, establecer automáticamente su ID como estilista seleccionado
        if (currentUser.rol === 'estilista') {
          setEstilistaSeleccionado(currentUser.idUsuario);
        }
      } catch (err) {
        setError('Error al cargar los datos. Por favor, intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Convertir las citas a eventos del calendario
  const eventos = citas
    .filter(cita => !estilistaSeleccionado || cita.estilistaId === estilistaSeleccionado)
    .map(cita => {
      const inicio = new Date(cita.fechaCita);
      const fin = new Date(inicio.getTime() + (cita.servicios[0]?.tiempoEstimadoServicio || 60) * 60000);
      
      return {
        id: cita.idCita,
        title: `${cita.servicios[0]?.nombreServicio} - ${cita.clienteInfo?.nombres} ${cita.clienteInfo?.apellidos}`,
        start: inicio,
        end: fin,
        estilista: `${cita.estilistaInfo?.nombres} ${cita.estilistaInfo?.apellidos}`,
        servicio: cita.servicios[0]?.nombreServicio,
        cliente: `${cita.clienteInfo?.nombres} ${cita.clienteInfo?.apellidos}`,
        estado: cita.estado
      };
    });

  const eventStyleGetter = (event) => {
    let backgroundColor = '#17a2b8';
    
    switch (event.estado?.toLowerCase()) {
      case 'completada':
        backgroundColor = '#28a745';
        break;
      case 'pendiente':
        backgroundColor = '#ffc107';
        break;
      case 'cancelada':
        backgroundColor = '#dc3545';
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const handleSelectEvent = (event) => {
    alert(
      `Detalles de la cita:
      Servicio: ${event.servicio}
      Cliente: ${event.cliente}
      Estilista: ${event.estilista}
      Estado: ${event.estado}
      Hora: ${event.start.toLocaleTimeString()}`
    );
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  if (loading) return <div className={styles.loading}>Cargando calendario...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.estilistaSelector}>
        <select
          value={estilistaSeleccionado}
          onChange={(e) => setEstilistaSeleccionado(e.target.value)}
          className={styles.select}
          disabled={currentUser.rol === 'estilista'}
        >
          <option value="">Todos los estilistas</option>
          {estilistas.map(estilista => (
            <option key={estilista.idUsuario} value={estilista.idUsuario}>
              {estilista.nombres} {estilista.apellidos}
            </option>
          ))}
        </select>
      </div>
      
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día"
        }}
      />
    </div>
  );
};

export default DisponibilidadCalendario; 