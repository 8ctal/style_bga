import { api } from './api';

// Funciones para manejar clientes
export const getClientes = () => api.get('/usuarios/list?rol=cliente');
export const getClienteById = (id) => api.get(`/usuarios/list/${id}`);
export const agregarCliente = (cliente) => api.post('/usuarios/agregar', { ...cliente, rol: 'cliente' });
export const editarCliente = (cliente) => api.put('/usuarios/editar', cliente);
export const eliminarCliente = (id) => api.delete(`/usuarios/eliminar/${id}`); 