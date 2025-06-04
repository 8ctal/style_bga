package com.mongodb.backestilobga.servicio;

import com.mongodb.backestilobga.modelo.DisponibilidadEstilista;
import com.mongodb.backestilobga.repositorio.DisponibilidadEstilistaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DisponibilidadEstilistaServicio {

    @Autowired
    private DisponibilidadEstilistaRepositorio disponibilidadRepositorio;

    public DisponibilidadEstilista guardarDisponibilidad(DisponibilidadEstilista disponibilidad) {
        // Validar que no haya solapamiento de horarios
        List<DisponibilidadEstilista> disponibilidadesExistentes = 
            disponibilidadRepositorio.findByEstilistaIdAndRangoFecha(
                disponibilidad.getEstilistaId(),
                disponibilidad.getFechaInicio(),
                disponibilidad.getFechaFin()
            );

        if (!disponibilidadesExistentes.isEmpty()) {
            throw new RuntimeException("Ya existe una disponibilidad para este horario");
        }

        return disponibilidadRepositorio.save(disponibilidad);
    }

    public List<DisponibilidadEstilista> obtenerDisponibilidadesPorEstilista(String estilistaId) {
        return disponibilidadRepositorio.findByEstilistaId(estilistaId);
    }

    public List<DisponibilidadEstilista> obtenerDisponibilidadesPorRango(LocalDateTime inicio, LocalDateTime fin) {
        return disponibilidadRepositorio.findByRangoFecha(inicio, fin);
    }

    public Optional<DisponibilidadEstilista> obtenerDisponibilidadPorId(String id) {
        return disponibilidadRepositorio.findById(id);
    }

    public void eliminarDisponibilidad(String id) {
        disponibilidadRepositorio.deleteById(id);
    }

    public List<DisponibilidadEstilista> obtenerDisponibilidadesActivas() {
        return disponibilidadRepositorio.findByDisponibleTrue();
    }

    public DisponibilidadEstilista actualizarDisponibilidad(String id, DisponibilidadEstilista disponibilidad) {
        Optional<DisponibilidadEstilista> disponibilidadExistente = disponibilidadRepositorio.findById(id);
        
        if (disponibilidadExistente.isPresent()) {
            disponibilidad.setId(id);
            return disponibilidadRepositorio.save(disponibilidad);
        } else {
            throw new RuntimeException("No se encontró la disponibilidad con ID: " + id);
        }
    }
} 