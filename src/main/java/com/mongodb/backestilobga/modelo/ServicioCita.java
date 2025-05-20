package com.mongodb.backestilobga.modelo;

import org.springframework.data.mongodb.core.mapping.Field;

public class ServicioCita {

    @Field("servicio_id")
    private String servicioId;

    @Field("nombre_servicio")
    private String nombreServicio;

    @Field("precio_servicio")
    private Integer precioServicio;

    @Field("tiempo_estimado_servicio")
    private Integer tiempoEstimadoServicio;

    private Boolean promocion;

    // Constructores
    public ServicioCita() {
    }

    public ServicioCita(String servicioId, String nombreServicio, Integer precioServicio, Integer tiempoEstimadoServicio, Boolean promocion) {
        this.servicioId = servicioId;
        this.nombreServicio = nombreServicio;
        this.precioServicio = precioServicio;
        this.tiempoEstimadoServicio = tiempoEstimadoServicio;
        this.promocion = promocion;
    }

    // Getters y setters
    public String getServicioId() {
        return servicioId;
    }

    public void setServicioId(String servicioId) {
        this.servicioId = servicioId;
    }

    public String getNombreServicio() {
        return nombreServicio;
    }

    public void setNombreServicio(String nombreServicio) {
        this.nombreServicio = nombreServicio;
    }

    public Integer getPrecioServicio() {
        return precioServicio;
    }

    public void setPrecioServicio(Integer precioServicio) {
        this.precioServicio = precioServicio;
    }

    public Integer getTiempoEstimadoServicio() {
        return tiempoEstimadoServicio;
    }

    public void setTiempoEstimadoServicio(Integer tiempoEstimadoServicio) {
        this.tiempoEstimadoServicio = tiempoEstimadoServicio;
    }

    public Boolean getPromocion() {
        return promocion;
    }

    public void setPromocion(Boolean promocion) {
        this.promocion = promocion;
    }
}