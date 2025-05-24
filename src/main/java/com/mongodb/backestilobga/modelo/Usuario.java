package com.mongodb.backestilobga.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "usuarios")
public class Usuario {

    @Id
    private String idUsuario;

    private String nombres;

    private String apellidos;

    @Field("numero_documento")
    private String numeroDocumento;

    @Field("correo_electronico")
    private String correoElectronico;

    private String password;

    private String celular;

    private Rol rol;

    @Field("fecha_registro")
    private Date fechaRegistro;

    @Field("perfil_estilista")
    private PerfilEstilista perfilEstilista;

    // Clase roles, en este caso admin, cliente y estilista
    public enum Rol {
        admin,
        cliente,
        estilista
    }

    // Constructores
    public Usuario() {
    }

    public Usuario(String nombres, String apellidos, String numeroDocumento, String correoElectronico, String password, String celular, Rol rol, Date fechaRegistro, PerfilEstilista perfilEstilista) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.numeroDocumento = numeroDocumento;
        this.correoElectronico = correoElectronico;
        this.password = password;
        this.celular = celular;
        this.rol = rol;
        this.fechaRegistro = fechaRegistro;
        this.perfilEstilista = perfilEstilista;
    }

    // Getters y setters
    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

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

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public PerfilEstilista getPerfilEstilista() {
        return perfilEstilista;
    }

    public void setPerfilEstilista(PerfilEstilista perfilEstilista) {
        this.perfilEstilista = perfilEstilista;
    }
}