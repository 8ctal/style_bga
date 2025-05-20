package com.mongodb.backestilobga.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "servicios")
public class Servicio {

    @Id
    private String idServicio;

    @Field("nombre_servicio")
    private String nombreServicio;

    @Field("condiciones_previas")
    private String condicionesPrevias;

    // Constructores
    public Servicio() {
    }

    public Servicio(String nombreServicio, String condicionesPrevias) {
        this.nombreServicio = nombreServicio;
        this.condicionesPrevias = condicionesPrevias;
    }

    // Getters y setters
    public String getIdServicio() {
        return idServicio;
    }

    public void setIdServicio(String idServicio) {
        this.idServicio = idServicio;
    }

    public String getNombreServicio() {
        return nombreServicio;
    }

    public void setNombreServicio(String nombreServicio) {
        this.nombreServicio = nombreServicio;
    }

    public String getCondicionesPrevias() {
        return condicionesPrevias;
    }

    public void setCondicionesPrevias(String condicionesPrevias) {
        this.condicionesPrevias = condicionesPrevias;
    }
}
