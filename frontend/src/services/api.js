import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getClientes = () => axios.get(`${API_URL}/clientes`);
export const getEstilistas = () => axios.get(`${API_URL}/usuarios`);
export const getServicios = () => axios.get(`${API_URL}/servicios`);
export const guardarCita = (cita) => axios.post(`${API_URL}/citas/agregar`, cita);
