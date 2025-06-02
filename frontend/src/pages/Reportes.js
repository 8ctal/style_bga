import React, { useEffect, useState } from 'react';
import { getCitas } from '../services/citaService';
import { agruparTotalesPorMesYCita, obtenerAniosDisponibles } from '../utils/citasReportUtils';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function Reportes() {
  const [citas, setCitas] = useState([]);
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
  const [aniosDisponibles, setAniosDisponibles] = useState([]);

  useEffect(() => {
    getCitas().then(res => {
      setCitas(res.data);
      setAniosDisponibles(obtenerAniosDisponibles(res.data));
    });
  }, []);

  const totalesPorMes = agruparTotalesPorMesYCita(citas, anioSeleccionado);

  const data = {
    labels: meses,
    datasets: [
      {
        label: `Total por mes (${anioSeleccionado})`,
        data: totalesPorMes,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Reporte de Ingresos por Mes</h2>
      <div className="mb-3">
        <label>Seleccionar año:&nbsp;</label>
        <select value={anioSeleccionado} onChange={e => setAnioSeleccionado(Number(e.target.value))}>
          {aniosDisponibles.map(anio => (
            <option key={anio} value={anio}>{anio}</option>
          ))}
        </select>
      </div>
      <Bar data={data} />
    </div>
  );
}