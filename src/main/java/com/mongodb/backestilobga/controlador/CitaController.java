package com.mongodb.backestilobga.controlador;

import com.mongodb.backestilobga.modelo.Cita;
import com.mongodb.backestilobga.servicio.CitaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
public class CitaController {

    @Autowired
    private CitaServicio citaServicio;

    // Buscar todas las citas
    @GetMapping("/list")
    public List<Cita> buscarCitas() {
        return citaServicio.buscarCitas();
    }

    // Buscar cita por id
    @GetMapping("/list/{id}")
    public Cita buscarCitaPorId(@PathVariable("id") String id) {
        return citaServicio.buscarCitaPorId(id);
    }

    // Agregar una cita
    // Los datos se pasan en el cuerpo de la peticion
    @PostMapping("/agregar")
    public ResponseEntity<Cita> agregarCita(@RequestBody Cita cita) {
        Cita nuevaCita = citaServicio.guardarCita(cita);
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }

    // Editar una cita
    // El id se pasa en el cuerpo de la peticion
    @PutMapping("/editar")
    public ResponseEntity<Cita> editarCita(@RequestBody Cita cita) {
        String id = cita.getIdCita();
        if(id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Cita citaExistente = citaServicio.buscarCitaPorId(id);
        if(citaExistente != null) {
            Cita citaActualizada = citaServicio.guardarCita(cita);
            return new ResponseEntity<>(citaActualizada, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar una cita por id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Cita> eliminarCita(@PathVariable("id") String id) {
        Cita citaExistente = citaServicio.buscarCitaPorId(id);
        if(citaExistente != null) {
            citaServicio.eliminarCita(id);
            return new ResponseEntity<>(citaExistente, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
