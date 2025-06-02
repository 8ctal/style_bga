import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getCitas, getEstilistas } from '../../services/citaService';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citasRes, estlistasRes] = await Promise.all([
          getCitas(),
          getEstilistas()
        ]);
        setCitas(citasRes.data);
        setEstilistas(estlistasRes.data);
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
      <div className={styles.filters}>
        <select
          value={estilistaSeleccionado}
          onChange={(e) => setEstilistaSeleccionado(e.target.value)}
          className={styles.select}
        >
          <option value="">Todos los estilistas</option>
          {estilistas.map(estilista => (
            <option key={estilista.idUsuario} value={estilista.idUsuario}>
              {estilista.nombres} {estilista.apellidos}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.calendar}>
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          view={view}
          date={date}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          views={['month', 'week', 'day', 'agenda']}
          min={new Date(0, 0, 0, 7, 0, 0)} // 7 AM
          max={new Date(0, 0, 0, 20, 0, 0)} // 8 PM
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          formats={{
            timeGutterFormat: 'HH:mm',
            eventTimeRangeFormat: ({ start, end }) => {
              return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
            }
          }}
          messages={{
            week: 'Semana',
            day: 'Día',
            month: 'Mes',
            previous: 'Anterior',
            next: 'Siguiente',
            today: 'Hoy',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'No hay citas en este rango de fechas.',
            allDay: 'Todo el día',
            work_week: 'Semana laboral',
            yesterday: 'Ayer',
            tomorrow: 'Mañana',
            showMore: total => `+ Ver más (${total})`
          }}
        />
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.pendiente}`}></span>
          <span>Pendiente</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.completada}`}></span>
          <span>Completada</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.cancelada}`}></span>
          <span>Cancelada</span>
        </div>
      </div>
    </div>
  );
};

export default DisponibilidadCalendario; 