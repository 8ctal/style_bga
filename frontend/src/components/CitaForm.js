import React, { useState, useEffect } from 'react';
import { agregarCita, editarCita } from '../services/citaService';

export default function CitaForm({ citaSeleccionada, onSave }) {
  const [cita, setCita] = useState({
    idCita: '',
    descripcion: '',
    fecha: ''
  });

  useEffect(() => {
    if (citaSeleccionada) {
      setCita(citaSeleccionada);
    } else {
      setCita({ idCita: '', descripcion: '', fecha: '' });
    }
  }, [citaSeleccionada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCita(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = cita.idCita ? editarCita : agregarCita;
    action(cita).then(() => {
      onSave();
      setCita({ idCita: '', descripcion: '', fecha: '' });
    });
  };

  return (
    <div className="card p-3 mb-4">
      <h4>{cita.idCita ? 'Editar Cita' : 'Agregar Nueva Cita'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            name="descripcion"
            value={cita.descripcion}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingrese la descripción"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            name="fecha"
            type="date"
            value={cita.fecha}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          {cita.idCita ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
    </div>
  );
}
