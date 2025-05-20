package com.mongodb.backestilobga.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Document(collection = "citas")
public class Cita {

    @Id
    private String idCita;

    @Field("cliente_id")
    private String clienteId;

    @Field("cliente_info")
    private ClienteInfo clienteInfo;

    @Field("estilista_id")
    private String estilistaId;

    @Field("estilista_info")
    private EstilistaInfo estilistaInfo;

    @Field("fecha_cita")
    private Date fechaCita;

    @Field("horario_asignado")
    private HorarioAsignado horarioAsignado;

    private List<ServicioCita> servicios;

    private String estado;

    private Pago pago;

    // Constructores
    public Cita() {
    }

    public Cita(String clienteId, ClienteInfo clienteInfo, String estilistaId, EstilistaInfo estilistaInfo, Date fechaCita, HorarioAsignado horarioAsignado, List<ServicioCita> servicios, String estado, Pago pago) {
        this.clienteId = clienteId;
        this.clienteInfo = clienteInfo;
        this.estilistaId = estilistaId;
        this.estilistaInfo = estilistaInfo;
        this.fechaCita = fechaCita;
        this.horarioAsignado = horarioAsignado;
        this.servicios = servicios;
        this.estado = estado;
        this.pago = pago;
    }

    // Getters y setters
    public String getIdCita() {
        return idCita;
    }

    public void setIdCita(String idCita) {
        this.idCita = idCita;
    }

    public String getClienteId() {
        return clienteId;
    }

    public void setClienteId(String clienteId) {
        this.clienteId = clienteId;
    }

    public ClienteInfo getClienteInfo() {
        return clienteInfo;
    }

    public void setClienteInfo(ClienteInfo clienteInfo) {
        this.clienteInfo = clienteInfo;
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

    public Date getFechaCita() {
        return fechaCita;
    }

    public void setFechaCita(Date fechaCita) {
        this.fechaCita = fechaCita;
    }

    public HorarioAsignado getHorarioAsignado() {
        return horarioAsignado;
    }

    public void setHorarioAsignado(HorarioAsignado horarioAsignado) {
        this.horarioAsignado = horarioAsignado;
    }

    public List<ServicioCita> getServicios() {
        return servicios;
    }

    public void setServicios(List<ServicioCita> servicios) {
        this.servicios = servicios;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Pago getPago() {
        return pago;
    }

    public void setPago(Pago pago) {
        this.pago = pago;
    }
}