package com.mongodb.backestilobga.controlador;

import com.mongodb.backestilobga.modelo.Servicio;
import com.mongodb.backestilobga.servicio.ServicioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class ServicioController {

    @Autowired
    private ServicioServicio servicioServicio;

    // Buscar todos los servicios
    @GetMapping("/list")
    public List<Servicio> buscarServicios() {
        System.out.println("Recibida petición para listar servicios");
        List<Servicio> servicios = servicioServicio.buscarServicios();
        System.out.println("Total de servicios encontrados: " + servicios.size());
        return servicios;
    }

    // Buscar servicio por id
    @GetMapping("/list/{id}")
    public Servicio buscarServicioPorId(@PathVariable("id") String id) {
        return servicioServicio.buscarServicioPorId(id);
    }

    // Agregar un servicio
    // Los datos se pasan en el cuerpo de la peticion
    @PostMapping("/agregar")
    public ResponseEntity<Servicio> agregarServicio(@RequestBody Servicio servicio) {
        Servicio nuevoServicio = servicioServicio.guardarServicio(servicio);
        return new ResponseEntity<>(nuevoServicio, HttpStatus.CREATED);
    }

    // Editar un servicio
    // El id se pasa en el cuerpo de la peticion
    @PutMapping("/editar")
    public ResponseEntity<Servicio> editarServicio(@RequestBody Servicio servicio) {
        String id = servicio.getIdServicio();
        if(id == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Servicio servicioExistente = servicioServicio.buscarServicioPorId(id);
        if(servicioExistente != null){
            Servicio servicioActualizado = servicioServicio.guardarServicio(servicio);
            return new ResponseEntity<>(servicioActualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un servicio por id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Servicio> eliminarServicio(@PathVariable("id") String id) {
        Servicio servicioExistente = servicioServicio.buscarServicioPorId(id);
        if(servicioExistente != null){
            servicioServicio.eliminarServicio(id);
            return new ResponseEntity<>(servicioExistente, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}