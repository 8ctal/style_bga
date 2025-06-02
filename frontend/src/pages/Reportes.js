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
  const totalIngresosAnual = totalesPorMes.reduce((acc, val) => acc + val, 0);
  const dataBar = {
    labels: meses,
    datasets: [
      {
        label: `Total por mes (${anioSeleccionado})`,
        data: totalesPorMes,
        backgroundColor: [
          '#ffd6e0', // rosa pastel
          '#ffe5b4', // durazno pastel
          '#fffac8', // amarillo pastel
          '#d0f4de', // verde menta pastel
          '#b5ead7', // verde agua pastel
          '#c7ceea', // azul pastel
          '#b5d0ff', // celeste pastel
          '#e2f0cb', // verde claro pastel
          '#f3c6e8', // lila pastel
          '#f7d6e0', // rosa claro pastel
          '#f9e2ae', // amarillo claro pastel
          '#e0c3fc', // violeta pastel
        ],
        borderColor: '#fff',
        borderWidth: 2,
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
          '#ffd6e0', // rosa pastel
          '#ffe5b4', // durazno pastel
          '#fffac8', // amarillo pastel
          '#d0f4de', // verde menta pastel
          '#b5ead7', // verde agua pastel
          '#c7ceea', // azul pastel
          '#b5d0ff', // celeste pastel
          '#e2f0cb', // verde claro pastel
          '#f3c6e8', // lila pastel
          '#f7d6e0', // rosa claro pastel
          '#f9e2ae', // amarillo claro pastel
          '#e0c3fc', // violeta pastel
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center"><strong>REPORTES ANUALES</strong></h2>
      <div className="mb-3" style={{ textAlign: 'center' }}>
        <label className="selector-anio-label">Año:</label>
        <select
          className="selector-anio"
          value={anioSeleccionado}
          onChange={e => setAnioSeleccionado(Number(e.target.value))}
        >
          {aniosDisponibles.map(anio => (
            <option key={anio} value={anio}>{anio}</option>
          ))}
        </select>
      </div>
      <div
        className="resumen-anual"
        style={{
          background: '#ffd6e0',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(234, 52, 52, 0.07)',
          padding: '1.5rem 1rem',
          marginBottom: '2rem',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Total de ingresos en {anioSeleccionado}: ${totalIngresosAnual.toLocaleString('es-CO', {minimumFractionDigits: 2})}
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