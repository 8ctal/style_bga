import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

// Configuración base de axios con interceptores
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // Agregamos timeout de 10 segundos
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

// Interceptor para respuestas - CORREGIDO
api.interceptors.response.use(
  (response) => {
    console.log('Respuesta exitosa del servidor:', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data
    });
    
    // Para DELETE requests que retornan 204, no hay data
    if (response.status === 204) {
      return { success: true, status: 204 };
    }
    
    return response.data;
  },
  (error) => {
    console.error('Error en la respuesta:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      mensaje: error.response?.data?.message || error.message,
      error: error
    });
    throw error;
  }
);

// Función para filtrar solo los estilistas
const filtrarEstilistas = (usuarios) => {
  if (!Array.isArray(usuarios)) {
    console.error('usuarios no es un array:', usuarios);
    return [];
  }
  
  console.log('Filtrando usuarios:', usuarios);
  
  return usuarios.filter(usuario => {
    if (!usuario) {
      console.log('Usuario inválido encontrado');
      return false;
    }

    console.log(`Verificando usuario ${usuario.nombres}:`, {
      tieneRol: !!usuario.rol,
      rolValor: usuario.rol,
      tipoRol: typeof usuario.rol
    });

    // Verificar si el rol es estilista (considerando que puede ser un enum)
    const esEstilista = usuario.rol === 'estilista' || 
                       (typeof usuario.rol === 'string' && usuario.rol.toLowerCase() === 'estilista');

    if (esEstilista) {
      console.log(`Usuario ${usuario.nombres} ES estilista`);
    } else {
      console.log(`Usuario ${usuario.nombres} NO es estilista, rol:`, usuario.rol);
    }

    return esEstilista;
  });
};

// Obtener todos los estilistas
export const getEstilistas = async () => {
  try {
    console.log('Obteniendo usuarios del servidor...');
    const usuarios = await api.get('/list');
    console.log('Respuesta del servidor:', usuarios);
    
    const estilistas = filtrarEstilistas(usuarios);
    console.log('Estilistas filtrados:', estilistas);
    
    return estilistas;
  } catch (error) {
    console.error('Error al obtener estilistas:', error);
    throw error;
  }
};

// Obtener un estilista por ID
export const getEstilistaById = async (id) => {
  try {
    const usuario = await api.get(`/list/${id}`);
    return usuario && usuario.rol && usuario.rol.toLowerCase() === 'estilista' ? usuario : null;
  } catch (error) {
    console.error('Error al obtener estilista por ID:', error);
    return null;
  }
};

// Agregar un nuevo estilista
export const agregarEstilista = async (estilista) => {
  try {
    console.log('Enviando datos al servidor para crear estilista:', estilista);
    const response = await api.post('/agregar', estilista);
    console.log('Respuesta del servidor al crear:', response);
    return response;
  } catch (error) {
    console.error('Error al crear estilista:', error);
    throw error;
  }
};

// Editar un estilista existente
export const editarEstilista = async (estilista) => {
  try {
    console.log('Enviando datos al servidor para editar estilista:', estilista);
    const response = await api.put('/editar', estilista);
    console.log('Respuesta del servidor al editar:', response);
    return response;
  } catch (error) {
    console.error('Error al editar estilista:', error);
    throw error;
  }
};

// Eliminar un estilista
export const eliminarEstilista = async (id) => {
  try {
    console.log('Intentando eliminar estilista con ID:', id);
    if (!id) {
      throw new Error('ID de estilista no proporcionado');
    }

    // Asegurarnos de que la URL es correcta
    const url = `/eliminar/${id}`;
    console.log('URL de eliminación:', url);

    // Hacer la petición DELETE con la configuración correcta
    const response = await api.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Log de la respuesta completa para debugging
    console.log('Respuesta completa del servidor:', {
      status: response?.status,
      data: response,
      headers: response?.headers
    });

    if (!response) {
      throw new Error('No se recibió respuesta del servidor');
    }

    return response;
  } catch (error) {
    // Log detallado del error
    console.error('Error detallado al eliminar estilista:', {
      mensaje: error.message,
      respuesta: error.response?.data,
      status: error.response?.status,
      config: error.config,
      error: error
    });

    // Si es un error de red, mostrar un mensaje más específico
    if (error.message === 'Network Error') {
      throw new Error('No se pudo conectar con el servidor. Por favor, verifica tu conexión.');
    }

    throw error;
  }
};