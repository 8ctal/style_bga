import axios from 'axios';

const API_URL = 'http://localhost:8080/api/citas';

export const getCitas = () => axios.get(`${API_URL}/list`);
export const getCitaById = (id) => axios.get(`${API_URL}/list/${id}`);
export const agregarCita = (cita) => axios.post(`${API_URL}/agregar`, cita);
export const editarCita = (cita) => axios.put(`${API_URL}/editar`, cita);
export const eliminarCita = (id) => axios.delete(`${API_URL}/eliminar/${id}`);
