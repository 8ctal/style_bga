import React, { useEffect, useState } from 'react';
import { getCitas } from '../services/citaService';
import { agruparTotalesPorMesYCita, obtenerAniosDisponibles, contarServiciosPorAnio } from '../utils/citasReportUtils';
import { Bar, Pie } from 'react-chartjs-2';
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

  // Datos para la gráfica de barras
  const totalesPorMes = agruparTotalesPorMesYCita(citas, anioSeleccionado);
  const dataBar = {
    labels: meses,
    datasets: [
      {
        label: `Total por mes (${anioSeleccionado})`,
        data: totalesPorMes,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Datos para la gráfica circular
  const serviciosPorAnio = contarServiciosPorAnio(citas, anioSeleccionado);
  const labelsPie = Object.keys(serviciosPorAnio);
  const dataPie = {
    labels: labelsPie,
    datasets: [
      {
        data: Object.values(serviciosPorAnio),
        backgroundColor: [
          '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
        ],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Reportes Anuales</h2>
      <div className="mb-3">
        <label>Seleccionar año:&nbsp;</label>
        <select value={anioSeleccionado} onChange={e => setAnioSeleccionado(Number(e.target.value))}>
          {aniosDisponibles.map(anio => (
            <option key={anio} value={anio}>{anio}</option>
          ))}
        </select>
      </div>
      <div className="graficos-container">
        <div className="grafico grafico-barra">
          <h5 className="text-center">Ingresos por Mes</h5>
          <Bar data={dataBar} />
        </div>
        <div className="grafico">
          <h5 className="text-center">Porcentaje de Servicios</h5>
          <Pie data={dataPie} />
        </div>
      </div>
    </div>
  );
}