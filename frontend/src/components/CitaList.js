import React, { useEffect, useState } from 'react';
import { getCitas, eliminarCita } from '../services/citaService';

export default function CitaList({ onEdit }) {
  const [citas, setCitas] = useState([]);

  const cargarCitas = () => {
    getCitas().then(res => setCitas(res.data));
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta cita?')) {
      eliminarCita(id).then(() => cargarCitas());
    }
  };

  const formatFecha = (fechaStr) => {
    const date = new Date(fechaStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="card p-3">
      <h4>Lista de Citas</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Estilista</th>
            <th>Fecha</th>
            <th>Servicios</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(cita => (
            <tr key={cita.idCita || cita._id}>
              <td>
                {cita.clienteInfo?.nombres} {cita.clienteInfo?.apellidos}<br />
                <small>{cita.clienteInfo?.celular}</small>
              </td>
              <td>
                {cita.estilistaInfo?.nombres} {cita.estilistaInfo?.apellidos}<br />
                <small>{cita.estilistaInfo?.especializacion}</small>
              </td>
              <td>{formatFecha(cita.fechaCita)}</td>
              <td>
                <ul className="list-unstyled mb-0">
                  {cita.servicios?.map((s, i) => (
                    <li key={i}>
                      {s.nombre_servicio} - ${s.precio_servicio}
                      {s.promocion && <span className="badge bg-success ms-2">Promo</span>}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{cita.estado}</td>
              <td>${cita.pago?.total_pagado}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(cita)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cita.idCita || cita._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
