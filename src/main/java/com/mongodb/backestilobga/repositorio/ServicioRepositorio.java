package com.mongodb.backestilobga.repositorio;

import com.mongodb.backestilobga.modelo.Servicio;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepositorio extends MongoRepository<Servicio, String> {
}
