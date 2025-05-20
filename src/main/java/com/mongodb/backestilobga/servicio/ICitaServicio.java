package com.mongodb.backestilobga.servicio;

import com.mongodb.backestilobga.modelo.Cita;

import java.util.List;

public interface ICitaServicio {

    // Buscar todas las citas
    List<Cita> buscarCitas();

    // Buscar cita por id
    Cita buscarCitaPorId(String id);

    // Guardar cita
    Cita guardarCita(Cita cita);

    // Eliminar cita por id
    void eliminarCita(String id);
}
