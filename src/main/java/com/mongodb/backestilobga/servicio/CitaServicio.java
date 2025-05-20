package com.mongodb.backestilobga.servicio;

import com.mongodb.backestilobga.modelo.Cita;
import com.mongodb.backestilobga.repositorio.CitaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CitaServicio implements ICitaServicio{

    @Autowired
    private CitaRepositorio citaRepositorio;

    @Override
    public List<Cita> buscarCitas() {
        return citaRepositorio.findAll();
    }

    @Override
    public Cita buscarCitaPorId(String id) {
        return citaRepositorio.findById(id).orElse(null);
    }

    @Override
    public Cita guardarCita(Cita cita) {
        return citaRepositorio.save(cita);
    }

    @Override
    public void eliminarCita(String id) {
        citaRepositorio.deleteById(id);
    }
}
