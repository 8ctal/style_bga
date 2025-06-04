import { api } from './api';

const AUTH_URL = '/auth';

// Función para decodificar el token JWT
const decodeJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decodificando token:', error);
        return null;
    }
};

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post(`${AUTH_URL}/login`, credentials);
            console.log('Respuesta completa del backend:', response.data);
            
            if (response.data.token) {
                // Decodificar el token para obtener la información del usuario
                const decodedToken = decodeJwt(response.data.token);
                console.log('Token decodificado:', decodedToken);

                // Crear objeto de usuario con la información del token
                const userData = {
                    token: response.data.token,
                    correo: decodedToken.sub, // El subject del token es el correo
                    rol: decodedToken.rol, // El rol viene en el token
                    nombres: decodedToken.nombres,
                    apellidos: decodedToken.apellidos
                };
                console.log('Datos del usuario a guardar:', userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return userData;
            }
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post(`${AUTH_URL}/register`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            console.log('Usuario actual del localStorage:', user);
            return user;
        }
        return null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    }
}; 