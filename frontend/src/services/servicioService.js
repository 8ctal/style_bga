import { api } from './api';

// Funciones para el CRUD de servicios
export const getServicios = () => api.get('/servicios/list');
export const getServicioById = (id) => api.get(`/servicios/list/${id}`);
export const agregarServicio = (servicio) => api.post('/servicios/agregar', servicio);
export const editarServicio = (servicio) => api.put('/servicios/editar', servicio);
export const eliminarServicio = (id) => api.delete(`/servicios/eliminar/${id}`); 