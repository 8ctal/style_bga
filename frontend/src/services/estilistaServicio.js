import { api } from './api';

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
export const getEstilistas = () => api.get('/usuarios/list?rol=estilista');

// Obtener un estilista por ID
export const getEstilistaById = (id) => api.get(`/usuarios/list/${id}`);

// Agregar un nuevo estilista
export const agregarEstilista = (estilista) => api.post('/usuarios/agregar', { ...estilista, rol: 'estilista' });

// Editar un estilista existente
export const editarEstilista = (estilista) => api.put('/usuarios/editar', estilista);

// Eliminar un estilista
export const eliminarEstilista = (id) => api.delete(`/usuarios/eliminar/${id}`);