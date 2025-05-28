import React, { useEffect, useState } from 'react';
import { agregarCita } from '../services/citaService';
import axios from 'axios';

export default function CitaForm({ onSave }) {
  const [formData, setFormData] = useState({
    clienteId: '',
    estilistaId: '',
    fechaCita: '',
    horarioAsignado: { diaSemana: '', intervalo: '' },
    servicios: [],
    estado: '',
    pago: {
      total_pagado: '',
      metodo_pago: '',
      estado_pago: ''
    }
  });

  const [clientes, setClientes] = useState([]);
  const [estilistas, setEstilistas] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/clientes/list').then(res => setClientes(res.data));
    axios.get('http://localhost:8080/api/usuarios/list').then(res => setEstilistas(res.data));
    axios.get('http://localhost:8080/api/servicios/list').then(res => setServiciosDisponibles(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("pago.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        pago: { ...prev.pago, [key]: value }
      }));
    } else if (name.includes("horarioAsignado.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        horarioAsignado: { ...prev.horarioAsignado, [key]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleServicioChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormData(prev => ({ ...prev, servicios: selectedIds }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarCita(formData).then(() => {
      onSave();
      alert('Cita guardada con éxito');
    });
  };

  return (
    <div className="card p-3 mb-4">
      <h4>Agregar Cita</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Cliente</label>
            <select name="clienteId" className="form-select" value={formData.clienteId} onChange={handleChange}>
              <option value="">Seleccione un cliente</option>
              {clientes.map(c => (
                <option key={c._id} value={c._id}>{c.nombres} {c.apellidos}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Estilista</label>
            <select name="estilistaId" className="form-select" value={formData.estilistaId} onChange={handleChange}>
              <option value="">Seleccione un estilista</option>
              {estilistas.map(e => (
                <option key={e._id} value={e._id}>{e.nombres} {e.apellidos}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Fecha de la cita</label>
            <input type="datetime-local" name="fechaCita" className="form-control" value={formData.fechaCita} onChange={handleChange} />
          </div>
          <div className="col-md-3 mb-3">
            <label>Día de la semana</label>
            <input name="horarioAsignado.diaSemana" className="form-control" value={formData.horarioAsignado.diaSemana} onChange={handleChange} />
          </div>
          <div className="col-md-3 mb-3">
            <label>Intervalo</label>
            <input name="horarioAsignado.intervalo" className="form-control" value={formData.horarioAsignado.intervalo} onChange={handleChange} />
          </div>
          <div className="col-md-12 mb-3">
            <label>Servicio</label>
            <select
              name="servicios"
              className="form-select"
              value={formData.servicios[0] || ""}
              onChange={e => setFormData(prev => ({ ...prev, servicios: [e.target.value] }))}
            >
              <option value="">Seleccione un servicio</option>
              {serviciosDisponibles.map(s => (
                <option key={s._id} value={s._id}>
                  {s.nombre_servicio} - ${s.precio_servicio}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Estado de la cita</label>
            <select name="estado" className="form-select" value={formData.estado} onChange={handleChange}>
              <option value="">Seleccione...</option>
              <option value="pendiente">Pendiente</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Método de pago</label>
            <input name="pago.metodo_pago" className="form-control" value={formData.pago.metodo_pago} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Total pagado</label>
            <input name="pago.total_pagado" type="number" className="form-control" value={formData.pago.total_pagado} onChange={handleChange} />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Guardar Cita</button>
      </form>
    </div>
  );
}
