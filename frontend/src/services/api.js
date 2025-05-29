import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Configuración base de axios con interceptores
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Importante para CORS
});

// Interceptor para peticiones
api.interceptors.request.use(
  (config) => {
    console.log('Enviando petición:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => {
    console.log('Respuesta exitosa:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Error en la respuesta:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data || error.message,
      error: error
    });
    return Promise.reject(error);
  }
);

export const getClientes = () => api.get('/clientes');
export const getEstilistas = () => api.get('/usuarios');
export const getServicios = () => api.get('/servicios');
export const guardarCita = (cita) => api.post('/citas/agregar', cita);
