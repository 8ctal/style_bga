package com.mongodb.backestilobga.servicio;

import com.mongodb.backestilobga.modelo.Usuario;

import java.util.List;

public interface IUsuarioServicio {

    // Buscar todos los usuarios
    List<Usuario> buscarUsuarios();

    // Buscar usuario por id
    Usuario buscarUsuarioPorId(String id);

    // Guardar usuario
    Usuario guardarUsuario(Usuario usuario);

    // Eliminar usuario por id
    void eliminarUsuario(String id);
}
