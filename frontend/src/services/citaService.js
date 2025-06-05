import { api } from './api';

// Funciones para el CRUD de citas
export const getCitas = () => api.get('/citas/list');
export const getCitaById = (id) => api.get(`/citas/list/${id}`);
export const agregarCita = async (cita) => {
  // Primero guardamos el servicio si es nuevo
  if (cita.servicios && cita.servicios.length > 0) {
    const servicio = cita.servicios[0];
    try {
      // Intentamos guardar el servicio
      const servicioGuardado = await api.post('/servicios/agregar', {
        nombreServicio: servicio.nombreServicio,
        condicionesPrevias: servicio.condicionesPrevias || ''
      });
      // Actualizamos el ID del servicio en la cita
      cita.servicios[0].servicioId = servicioGuardado.data.idServicio;
    } catch (error) {
      console.error('Error al guardar el servicio:', error);
      // Continuamos con la cita incluso si falla el guardado del servicio
    }
  }
  
  // Luego guardamos la cita
  return api.post('/citas/agregar', cita);
};

export const editarCita = async (cita) => {
  if (cita.servicios && cita.servicios.length > 0) {
    const servicio = cita.servicios[0];
    try {
      if (!servicio.servicioId) {
        // Si es un servicio completamente nuevo (sin ID), lo creamos
        const servicioGuardado = await api.post('/servicios/agregar', {
          nombreServicio: servicio.nombreServicio,
          condicionesPrevias: servicio.condicionesPrevias || ''
        });
        cita.servicios[0].servicioId = servicioGuardado.data.idServicio;
      } else {
        // Si el servicio tiene ID, primero obtenemos el servicio actual
        const servicioActual = await api.get(`/servicios/list/${servicio.servicioId}`);
        
        // Comparamos si realmente hubo cambios en el servicio
        const servicioExistente = servicioActual.data;
        const condicionesPreviasActuales = servicioExistente.condicionesPrevias || '';
        const condicionesPreviasNuevas = servicio.condicionesPrevias || '';
        
        if (servicioExistente &&
            (servicioExistente.nombreServicio !== servicio.nombreServicio ||
             condicionesPreviasActuales !== condicionesPreviasNuevas)) {
          // Solo actualizamos si hubo cambios reales
          await api.put('/servicios/editar', {
            idServicio: servicio.servicioId,
            nombreServicio: servicio.nombreServicio,
            condicionesPrevias: condicionesPreviasNuevas
          });
        }
      }
    } catch (error) {
      console.error('Error al manejar el servicio:', error);
    }
  }

  // Actualizamos la cita
  return api.put('/citas/editar', cita);
};

export const eliminarCita = async (id) => {
  try {
    // Primero obtenemos la información de la cita para saber el ID del servicio
    const citaResponse = await getCitaById(id);
    const cita = citaResponse.data;
    
    // Si la cita tiene servicios asociados, los eliminamos
    if (cita.servicios && cita.servicios.length > 0) {
      const servicioId = cita.servicios[0].servicioId;
      if (servicioId) {
        try {
          await api.delete(`/servicios/eliminar/${servicioId}`);
        } catch (error) {
          console.error('Error al eliminar el servicio:', error);
        }
      }
    }
    
    // Finalmente eliminamos la cita
    return api.delete(`/citas/eliminar/${id}`);
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    throw error;
  }
};

// Funciones para obtener usuarios por rol
export const getClientes = () => api.get('/usuarios/list?rol=cliente');
export const getEstilistas = () => api.get('/usuarios/list?rol=estilista');

// Función para obtener servicios
export const getServicios = () => api.get('/servicios/list');

export const actualizarEstadoCita = async (id, nuevoEstado) => {
  try {
    // Primero obtenemos la cita actual
    const citaResponse = await getCitaById(id);
    const citaActual = citaResponse.data;
    
    // Actualizamos solo el estado
    const citaActualizada = {
      ...citaActual,
      estado: nuevoEstado
    };
    
    // Enviamos la actualización
    return api.put('/citas/editar', citaActualizada);
  } catch (error) {
    console.error('Error al actualizar el estado de la cita:', error);
    throw error;
  }
};
