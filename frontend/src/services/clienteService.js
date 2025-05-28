import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

// Configuración del interceptor para el token JWT
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

// Funciones para el CRUD de clientes
export const getClientes = () => api.get('/list?rol=cliente');
export const getClienteById = (id) => api.get(`/list/${id}`);
export const agregarCliente = (cliente) => api.post('/agregar', {
  ...cliente,
  rol: 'cliente',
  fechaRegistro: new Date()
});
export const editarCliente = (cliente) => api.put('/editar', cliente);
export const eliminarCliente = (id) => api.delete(`/eliminar/${id}`); 