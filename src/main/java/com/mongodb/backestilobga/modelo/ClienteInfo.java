package com.mongodb.backestilobga.modelo;

import org.springframework.data.mongodb.core.mapping.Field;

public class ClienteInfo {

    private String nombres;

    private String apellidos;

    @Field("correo_electronico")
    private String correoElectronico;

    private String celular;

    // Constructores
    public ClienteInfo() {
    }

    public ClienteInfo(String nombres, String apellidos, String correoElectronico, String celular) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correoElectronico = correoElectronico;
        this.celular = celular;
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

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }
}