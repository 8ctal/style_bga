package com.mongodb.backestilobga.modelo;

public class EstilistaInfo {

    private String nombres;

    private String apellidos;

    private String especializacion;

    // Constructores
    public EstilistaInfo() {
    }

    public EstilistaInfo(String nombres, String apellidos, String especializacion) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.especializacion = especializacion;
    }

    // Getters y setters
    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEspecializacion() {
        return especializacion;
    }

    public void setEspecializacion(String especializacion) {
        this.especializacion = especializacion;
    }
}