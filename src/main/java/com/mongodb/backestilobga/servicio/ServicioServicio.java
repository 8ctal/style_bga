package com.mongodb.backestilobga.servicio;

import com.mongodb.backestilobga.modelo.Servicio;
import com.mongodb.backestilobga.repositorio.ServicioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioServicio implements IServicioServicio {

    @Autowired
    private ServicioRepositorio servicioRepositorio;

    @Override
    public List<Servicio> buscarServicios() {
        return servicioRepositorio.findAll();
    }

    @Override
    public Servicio buscarServicioPorId(String id) {
        return servicioRepositorio.findById(id).orElse(null);
    }

    @Override
    public Servicio guardarServicio(Servicio servicio) {
        return servicioRepositorio.save(servicio);
    }

    @Override
    public void eliminarServicio(String id) {
        servicioRepositorio.deleteById(id);
    }
}