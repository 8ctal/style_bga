import { api } from './api';

// Quitamos '/api' porque ya está incluido en la configuración base de api.js
const BASE_URL = '/disponibilidad';

export const disponibilidadService = {
    crearDisponibilidad: async (disponibilidad) => {
        try {
            const response = await api.post(BASE_URL, disponibilidad);
            return response.data;
        } catch (error) {
            console.error('Error al crear disponibilidad:', error);
            throw error;
        }
    },

    obtenerDisponibilidadesPorEstilista: async (estilistaId) => {
        if (!estilistaId) {
            throw new Error('El ID del estilista es requerido');
        }
        try {
            const response = await api.get(`${BASE_URL}/estilista/${estilistaId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener disponibilidades:', error);
            throw error;
        }
    },

    obtenerDisponibilidadesPorRango: async (inicio, fin) => {
        try {
            const response = await api.get(`${BASE_URL}/rango`, {
                params: { inicio, fin }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener disponibilidades por rango:', error);
            throw error;
        }
    },

    actualizarDisponibilidad: async (id, disponibilidad) => {
        try {
            const response = await api.put(`${BASE_URL}/${id}`, disponibilidad);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar disponibilidad:', error);
            throw error;
        }
    },

    eliminarDisponibilidad: async (id) => {
        try {
            await api.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error('Error al eliminar disponibilidad:', error);
            throw error;
        }
    },

    obtenerDisponibilidadesActivas: async () => {
        try {
            const response = await api.get(`${BASE_URL}/activas`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener disponibilidades activas:', error);
            throw error;
        }
    }
}; 