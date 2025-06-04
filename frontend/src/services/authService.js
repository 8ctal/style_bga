import { api } from './api';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// Función para decodificar el token JWT
const decodeJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decodificando token:', error);
        return null;
    }
};

export const authService = {
    async login(credentials) {
        try {
            const response = await api.post('/auth/login', credentials);
            console.log('Respuesta completa del login:', JSON.stringify(response.data, null, 2));
            
            const { token } = response.data;
            const decodedToken = decodeJwt(token);
            console.log('Token decodificado:', JSON.stringify(decodedToken, null, 2));
            
            // Guardar el token en localStorage
            localStorage.setItem(TOKEN_KEY, token);
            
            // Crear objeto de usuario con toda la información necesaria
            const userData = {
                token,
                correo: credentials.correo,
                rol: decodedToken.rol,
                nombres: decodedToken.nombres,
                apellidos: decodedToken.apellidos
            };
            
            console.log('Datos del usuario a guardar:', JSON.stringify(userData, null, 2));
            
            // Guardar los datos del usuario en localStorage
            localStorage.setItem(USER_KEY, JSON.stringify(userData));
            
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getCurrentUser() {
        const userStr = localStorage.getItem(USER_KEY);
        if (userStr) {
            const user = JSON.parse(userStr);
            console.log('Usuario actual del localStorage:', JSON.stringify(user, null, 2));
            return user;
        }
        return null;
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    isAuthenticated() {
        return !!this.getToken();
    }
}; 