package com.mongodb.backestilobga.servicio;

import com.mongodb.backestilobga.modelo.Reporte;
import com.mongodb.backestilobga.repositorio.ReporteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReporteServicio implements IReporteServicio{

    @Autowired
    private ReporteRepositorio reporteRepositorio;

    @Override
    public List<Reporte> buscarReportes() {
        return reporteRepositorio.findAll();
    }

    @Override
    public Reporte buscarReportePorId(String id) {
        return reporteRepositorio.findById(id).orElse(null);
    }

    @Override
    public Reporte guardarReporte(Reporte reporte) {
        return reporteRepositorio.save(reporte);
    }

    @Override
    public void eliminarReporte(String id) {
        reporteRepositorio.deleteById(id);
    }
}
