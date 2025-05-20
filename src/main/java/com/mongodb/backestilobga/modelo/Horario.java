package com.mongodb.backestilobga.modelo;

import org.springframework.data.mongodb.core.mapping.Field;

public class Horario {

    @Field("dia_semana")
    private String diaSemana;

    @Field("intervalo_disponible")
    private String intervaloDisponible;

    // Constructores
    public Horario() {
    }

    public Horario(String intervaloDisponible, String diaSemana) {
        this.intervaloDisponible = intervaloDisponible;
        this.diaSemana = diaSemana;
    }

    // Getters y setters
    public String getIntervaloDisponible() {
        return intervaloDisponible;
    }

    public void setIntervaloDisponible(String intervaloDisponible) {
        this.intervaloDisponible = intervaloDisponible;
    }

    public String getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(String diaSemana) {
        this.diaSemana = diaSemana;
    }
}