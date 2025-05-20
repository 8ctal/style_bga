package com.mongodb.backestilobga.controlador;

import com.mongodb.backestilobga.modelo.Reporte;
import com.mongodb.backestilobga.servicio.ReporteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    @Autowired
    private ReporteServicio reporteServicio;

    // Buscar todos los reportes
    @GetMapping("/list")
    public List<Reporte> buscarReportes() {
        return reporteServicio.buscarReportes();
    }

    // Buscar reporte por id
    @GetMapping("/list/{id}")
    public Reporte buscarReportePorId(@PathVariable("id") String id) {
        return reporteServicio.buscarReportePorId(id);
    }

    // Agregar un reporte
    // Los datos se pasan en el cuerpo de la peticion
    @PostMapping("/agregar")
    public ResponseEntity<Reporte> agregarReporte(@RequestBody Reporte reporte) {
        Reporte nuevoReporte = reporteServicio.guardarReporte(reporte);
        return new ResponseEntity<>(nuevoReporte, HttpStatus.CREATED);
    }


    // Editar un reporte
    // El id se pasa en el cuerpo de la peticion
    @PutMapping("/editar")
    public ResponseEntity<Reporte> editarReporte(@RequestBody Reporte reporte) {
        String id = reporte.getIdReporte();
        if(id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Reporte reporteExistente = reporteServicio.buscarReportePorId(id);
        if(reporteExistente != null) {
            Reporte reporteActualizado = reporteServicio.guardarReporte(reporte);
            return new ResponseEntity<>(reporteActualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un reporte por id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Reporte> eliminarReporte(@PathVariable("id") String id) {
        Reporte reporteExistente = reporteServicio.buscarReportePorId(id);
        if(reporteExistente != null) {
            reporteServicio.eliminarReporte(id);
            return new ResponseEntity<>(reporteExistente, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
