package com.mongodb.backestilobga.controlador;

import com.mongodb.backestilobga.modelo.DisponibilidadEstilista;
import com.mongodb.backestilobga.servicio.DisponibilidadEstilistaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/disponibilidad")
@CrossOrigin(origins = "http://localhost:3000")
public class DisponibilidadEstilistaController {

    @Autowired
    private DisponibilidadEstilistaServicio disponibilidadServicio;

    @PostMapping
    public ResponseEntity<DisponibilidadEstilista> crearDisponibilidad(@RequestBody DisponibilidadEstilista disponibilidad) {
        return ResponseEntity.ok(disponibilidadServicio.guardarDisponibilidad(disponibilidad));
    }

    @GetMapping("/estilista/{estilistaId}")
    public ResponseEntity<List<DisponibilidadEstilista>> obtenerPorEstilista(@PathVariable String estilistaId) {
        return ResponseEntity.ok(disponibilidadServicio.obtenerDisponibilidadesPorEstilista(estilistaId));
    }

    @GetMapping("/rango")
    public ResponseEntity<List<DisponibilidadEstilista>> obtenerPorRango(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
        return ResponseEntity.ok(disponibilidadServicio.obtenerDisponibilidadesPorRango(inicio, fin));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisponibilidadEstilista> obtenerPorId(@PathVariable String id) {
        return disponibilidadServicio.obtenerDisponibilidadPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DisponibilidadEstilista> actualizarDisponibilidad(
            @PathVariable String id,
            @RequestBody DisponibilidadEstilista disponibilidad) {
        return ResponseEntity.ok(disponibilidadServicio.actualizarDisponibilidad(id, disponibilidad));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDisponibilidad(@PathVariable String id) {
        disponibilidadServicio.eliminarDisponibilidad(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/activas")
    public ResponseEntity<List<DisponibilidadEstilista>> obtenerDisponibilidadesActivas() {
        return ResponseEntity.ok(disponibilidadServicio.obtenerDisponibilidadesActivas());
    }
} 