package com.mongodb.backestilobga.modelo;

import org.springframework.data.mongodb.core.mapping.Field;

public class HorarioAsignado {

    @Field("dia_semana")
    private String diaSemana;

    private String intervalo;

    // Constructores
    public HorarioAsignado() {
    }

    public HorarioAsignado(String diaSemana, String intervalo) {
        this.diaSemana = diaSemana;
        this.intervalo = intervalo;
    }

    // Getters y setters
    public String getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(String diaSemana) {
        this.diaSemana = diaSemana;
    }

    public String getIntervalo() {
        return intervalo;
    }

    public void setIntervalo(String intervalo) {
        this.intervalo = intervalo;
    }
}