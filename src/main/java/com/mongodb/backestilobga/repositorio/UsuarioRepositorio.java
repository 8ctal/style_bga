package com.mongodb.backestilobga.repositorio;

import com.mongodb.backestilobga.modelo.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends MongoRepository<Usuario, String> {
}
