package com.mongodb.backestilobga.repositorio;

import com.mongodb.backestilobga.modelo.DisponibilidadEstilista;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface DisponibilidadEstilistaRepositorio extends MongoRepository<DisponibilidadEstilista, String> {
    
    List<DisponibilidadEstilista> findByEstilistaId(String estilistaId);
    
    @Query("{'estilistaId': ?0, 'fechaInicio': {$gte: ?1}, 'fechaFin': {$lte: ?2}}")
    List<DisponibilidadEstilista> findByEstilistaIdAndRangoFecha(String estilistaId, LocalDateTime inicio, LocalDateTime fin);
    
    @Query("{'fechaInicio': {$gte: ?0}, 'fechaFin': {$lte: ?1}}")
    List<DisponibilidadEstilista> findByRangoFecha(LocalDateTime inicio, LocalDateTime fin);
    
    List<DisponibilidadEstilista> findByDisponibleTrue();
} 