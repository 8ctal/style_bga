package com.mongodb.backestilobga.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Document(collection = "reportes")
public class Reporte {

    @Id
    private String idReporte;

    @Field("estilista_id")
    private String estilistaId;

    @Field("estilista_info")
    private EstilistaInfo estilistaInfo;

    @Field("fecha_inicio")
    private Date fechaInicio;

    @Field("fecha_fin")
    private Date fechaFin;

    @Field("cantidad_citas")
    private Integer cantidadCitas;

    @Field("total_ingresos")
    private Double totalIngresos;

    @Field("servicio_top1")
    private String servicioTop1;

    @Field("fecha_generado")
    private Date fechaGenerado;
    @Field("citas_incluidas")

    private List<String> citasIncluidas;

    @Field("metricas_adicionales")
    private MetricasAdicionales metricasAdicionales;

    // Constructores
    public Reporte() {
    }

    public Reporte(String estilistaId, EstilistaInfo estilistaInfo, Date fechaInicio, Date fechaFin, Integer cantidadCitas, Double totalIngresos, String servicioTop1, Date fechaGenerado, List<String> citasIncluidas, MetricasAdicionales metricasAdicionales) {
        this.estilistaId = estilistaId;
        this.estilistaInfo = estilistaInfo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cantidadCitas = cantidadCitas;
        this.totalIngresos = totalIngresos;
        this.servicioTop1 = servicioTop1;
        this.fechaGenerado = fechaGenerado;
        this.citasIncluidas = citasIncluidas;
        this.metricasAdicionales = metricasAdicionales;
    }

    // Getters y setters
    public String getIdReporte() {
        return idReporte;
    }

    public void setIdReporte(String idReporte) {
        this.idReporte = idReporte;
    }

    public String getEstilistaId() {
        return estilistaId;
    }

    public void setEstilistaId(String estilistaId) {
        this.estilistaId = estilistaId;
    }

    public EstilistaInfo getEstilistaInfo() {
        return estilistaInfo;
    }

    public void setEstilistaInfo(EstilistaInfo estilistaInfo) {
        this.estilistaInfo = estilistaInfo;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Integer getCantidadCitas() {
        return cantidadCitas;
    }

    public void setCantidadCitas(Integer cantidadCitas) {
        this.cantidadCitas = cantidadCitas;
    }

    public Double getTotalIngresos() {
        return totalIngresos;
    }

    public void setTotalIngresos(Double totalIngresos) {
        this.totalIngresos = totalIngresos;
    }

    public String getServicioTop1() {
        return servicioTop1;
    }

    public void setServicioTop1(String servicioTop1) {
        this.servicioTop1 = servicioTop1;
    }

    public Date getFechaGenerado() {
        return fechaGenerado;
    }

    public void setFechaGenerado(Date fechaGenerado) {
        this.fechaGenerado = fechaGenerado;
    }

    public List<String> getCitasIncluidas() {
        return citasIncluidas;
    }

    public void setCitasIncluidas(List<String> citasIncluidas) {
        this.citasIncluidas = citasIncluidas;
    }

    public MetricasAdicionales getMetricasAdicionales() {
        return metricasAdicionales;
    }

    public void setMetricasAdicionales(MetricasAdicionales metricasAdicionales) {
        this.metricasAdicionales = metricasAdicionales;
    }
}