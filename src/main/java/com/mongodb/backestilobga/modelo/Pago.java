package com.mongodb.backestilobga.modelo;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

public class Pago {

    @Field("fecha_pago")
    private Date fechaPago;

    @Field("metodo_pago")
    private String metodoPago;

    @Field("total_pagado")
    private Double totalPagado;

    @Field("estado_pago")
    private String estadoPago;

    // Constructores
    public Pago() {
    }

    public Pago(Date fechaPago, String metodoPago, Double totalPagado, String estadoPago) {
        this.fechaPago = fechaPago;
        this.metodoPago = metodoPago;
        this.totalPagado = totalPagado;
        this.estadoPago = estadoPago;
    }

    // Getters y setters
    public Date getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(Date fechaPago) {
        this.fechaPago = fechaPago;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public Double getTotalPagado() {
        return totalPagado;
    }

    public void setTotalPagado(Double totalPagado) {
        this.totalPagado = totalPagado;
    }

    public String getEstadoPago() {
        return estadoPago;
    }

    public void setEstadoPago(String estadoPago) {
        this.estadoPago = estadoPago;
    }
}