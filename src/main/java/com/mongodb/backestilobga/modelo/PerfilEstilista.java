package com.mongodb.backestilobga.modelo;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class PerfilEstilista {

    @Field("anios_experiencia")
    private Integer aniosExperiencia;

    private String especializacion;

    private List<Horario> horarios;

    // Constructores
    public PerfilEstilista() {
    }

    public PerfilEstilista(Integer aniosExperiencia, String especializacion, List<Horario> horarios) {
        this.aniosExperiencia = aniosExperiencia;
        this.especializacion = especializacion;
        this.horarios = horarios;
    }

    // Getters y setters
    public Integer getAniosExperiencia() {
        return aniosExperiencia;
    }

    public void setAniosExperiencia(Integer aniosExperiencia) {
        this.aniosExperiencia = aniosExperiencia;
    }

    public String getEspecializacion() {
        return especializacion;
    }

    public void setEspecializacion(String especializacion) {
        this.especializacion = especializacion;
    }

    public List<Horario> getHorarios() {
        return horarios;
    }

    public void setHorarios(List<Horario> horarios) {
        this.horarios = horarios;
    }
}