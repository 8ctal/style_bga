package com.mongodb.backestilobga.servicio;

import com.mongodb.backestilobga.modelo.Servicio;

import java.util.List;

public interface IServicioServicio {

    // Buscar todos los servicios
    List<Servicio> buscarServicios();

    // Buscar los servicios por id
    Servicio buscarServicioPorId(String id);

    // Guardar servicio
    Servicio guardarServicio(Servicio servicio);

    // Eliminar servicio por id
    void eliminarServicio(String id);
}
