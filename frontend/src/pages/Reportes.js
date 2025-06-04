import React, { useEffect, useState } from 'react';
import { getCitas } from '../services/citaService';
import { 
  agruparTotalesPorMesYCita, 
  obtenerAniosDisponibles, 
  contarServiciosPorAnio,
  obtenerReporteEstilistas,
  obtenerClientesFrecuentes
} from '../utils/citasReportUtils';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Box from '@mui/material/Box';

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
          '#ffd6e0', '#ffe5b4', '#fffac8', '#d0f4de', '#b5ead7',
          '#c7ceea', '#b5d0ff', '#e2f0cb', '#f3c6e8', '#f7d6e0',
          '#f9e2ae', '#e0c3fc',
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
          '#ffd6e0', '#ffe5b4', '#fffac8', '#d0f4de', '#b5ead7',
          '#c7ceea', '#b5d0ff', '#e2f0cb', '#f3c6e8', '#f7d6e0',
          '#f9e2ae', '#e0c3fc',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Datos para el reporte de estilistas
  const reporteEstilistas = obtenerReporteEstilistas(citas, anioSeleccionado);
  const dataEstilistas = {
    labels: reporteEstilistas.map(e => `${e.nombres} ${e.apellidos}`),
    datasets: [
      {
        label: 'Ingresos por Estilista',
        data: reporteEstilistas.map(e => e.totalIngresos),
        backgroundColor: '#b5d0ff',
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Datos para el reporte de clientes frecuentes
  const clientesFrecuentes = obtenerClientesFrecuentes(citas, anioSeleccionado);
  const dataClientes = {
    labels: clientesFrecuentes.map(c => `${c.nombres} ${c.apellidos}`),
    datasets: [
      {
        label: 'Visitas por Cliente',
        data: clientesFrecuentes.map(c => c.visitas),
        backgroundColor: '#d0f4de',
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', py: 4, mt: { xs: 7, md: 9 } }}>
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

        {/* Reporte General */}
        <div className="resumen-anual">
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

        {/* Reporte de Estilistas */}
        <div className="mt-5">
          <h3 className="text-center mb-4">Desempeño de Estilistas</h3>
          <div className="graficos-container">
            <div className="grafico grafico-barra">
              <h5 className="text-center">Ingresos por Estilista</h5>
              <Bar data={dataEstilistas} />
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Estilista</th>
                    <th>Citas Completadas</th>
                    <th>Total Ingresos</th>
                    <th>% del Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reporteEstilistas.map(estilista => (
                    <tr key={estilista.id}>
                      <td>{estilista.nombres} {estilista.apellidos}</td>
                      <td>{estilista.citasCompletadas}</td>
                      <td>${estilista.totalIngresos.toLocaleString('es-CO', {minimumFractionDigits: 2})}</td>
                      <td>{((estilista.totalIngresos / totalIngresosAnual) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reporte de Clientes Frecuentes */}
        <div className="mt-5">
          <h3 className="text-center mb-4">Clientes Frecuentes</h3>
          <div className="graficos-container">
            <div className="grafico grafico-barra">
              <h5 className="text-center">Visitas por Cliente</h5>
              <Bar data={dataClientes} />
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Visitas</th>
                    <th>Total Gastado</th>
                    <th>Promedio por Visita</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFrecuentes.map(cliente => (
                    <tr key={cliente.id}>
                      <td>{cliente.nombres} {cliente.apellidos}</td>
                      <td>{cliente.visitas}</td>
                      <td>${cliente.totalGastado.toLocaleString('es-CO', {minimumFractionDigits: 2})}</td>
                      <td>${(cliente.totalGastado / cliente.visitas).toLocaleString('es-CO', {minimumFractionDigits: 2})}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}