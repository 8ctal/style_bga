package com.mongodb.backestilobga.repositorio;

import com.mongodb.backestilobga.modelo.Reporte;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReporteRepositorio extends MongoRepository<Reporte, String> {
}
