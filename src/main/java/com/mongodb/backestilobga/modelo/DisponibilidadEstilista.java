package com.mongodb.backestilobga.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "disponibilidades")
public class DisponibilidadEstilista {
    @Id
    private String id;
    
    private String estilistaId;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private boolean disponible;
    private String estado; // DISPONIBLE, NO_DISPONIBLE, EN_SERVICIO

    public DisponibilidadEstilista() {
    }

    public DisponibilidadEstilista(String estilistaId, LocalDateTime fechaInicio, LocalDateTime fechaFin, boolean disponible, String estado) {
        this.estilistaId = estilistaId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.disponible = disponible;
        this.estado = estado;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEstilistaId() {
        return estilistaId;
    }

    public void setEstilistaId(String estilistaId) {
        this.estilistaId = estilistaId;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
} 