package com.mongodb.backestilobga.modelo;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

public class MetricasAdicionales {

    @Field("servicios_por_categoria")
    private Map<String, Integer> serviciosPorCategoria;

    @Field("promedio_tiempo_servicio")
    private Integer promedioTiempoServicio;

    @Field("tasa_cancelacion")
    private Double tasaCancelacion;

    // Constructores
    public MetricasAdicionales() {
    }

    public MetricasAdicionales(Map<String, Integer> serviciosPorCategoria, Integer promedioTiempoServicio, Double tasaCancelacion) {
        this.serviciosPorCategoria = serviciosPorCategoria;
        this.promedioTiempoServicio = promedioTiempoServicio;
        this.tasaCancelacion = tasaCancelacion;
    }

    // Getters y setters
    public Map<String, Integer> getServiciosPorCategoria() {
        return serviciosPorCategoria;
    }

    public void setServiciosPorCategoria(Map<String, Integer> serviciosPorCategoria) {
        this.serviciosPorCategoria = serviciosPorCategoria;
    }

    public Integer getPromedioTiempoServicio() {
        return promedioTiempoServicio;
    }

    public void setPromedioTiempoServicio(Integer promedioTiempoServicio) {
        this.promedioTiempoServicio = promedioTiempoServicio;
    }

    public Double getTasaCancelacion() {
        return tasaCancelacion;
    }

    public void setTasaCancelacion(Double tasaCancelacion) {
        this.tasaCancelacion = tasaCancelacion;
    }
}