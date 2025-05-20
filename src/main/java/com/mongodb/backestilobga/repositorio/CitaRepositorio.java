package com.mongodb.backestilobga.repositorio;

import com.mongodb.backestilobga.modelo.Cita;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitaRepositorio extends MongoRepository<Cita, String> {
}
