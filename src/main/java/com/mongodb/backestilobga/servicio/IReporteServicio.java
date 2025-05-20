package com.mongodb.backestilobga.servicio;

import com.mongodb.backestilobga.modelo.Reporte;

import java.util.List;

public interface IReporteServicio {

    // Buscar todos los reportes
    List<Reporte> buscarReportes();

    // Buscar reporte por id
    Reporte buscarReportePorId(String id);

    // Guardar reporte
    Reporte guardarReporte(Reporte reporte);

    // Eliminar reporte por id
    void eliminarReporte(String id);
}
