export function agruparTotalesPorMesYCita(citas, year) {
  // citas: array de objetos cita, year: año seleccionado (número)
  const meses = Array.from({ length: 12 }, (_, i) => i); // 0-11
  const totalesPorMes = Array(12).fill(0);

  citas.forEach(cita => {
    if (!cita.fechaCita || !cita.pago?.totalPagado) return;
    const fecha = new Date(cita.fechaCita);
    if (fecha.getFullYear() === year) {
      const mes = fecha.getMonth(); // 0-11
      totalesPorMes[mes] += Number(cita.pago.totalPagado) || 0;
    }
  });

  return totalesPorMes;
}

export function obtenerAniosDisponibles(citas) {
  const anios = new Set();
  citas.forEach(cita => {
    if (cita.fechaCita) {
      anios.add(new Date(cita.fechaCita).getFullYear());
    }
  });
  return Array.from(anios).sort((a, b) => b - a);
}

export function contarServiciosPorAnio(citas, year) {
  const conteo = {};
  citas.forEach(cita => {
    if (!cita.fechaCita || !cita.servicios) return;
    const fecha = new Date(cita.fechaCita);
    if (fecha.getFullYear() === year) {
      cita.servicios.forEach(servicio => {
        const nombre = servicio.nombreServicio || 'Desconocido';
        conteo[nombre] = (conteo[nombre] || 0) + 1;
      });
    }
  });
  return conteo;
}

export function obtenerReporteEstilistas(citas, year) {
  const reporteEstilistas = {};
  
  citas.forEach(cita => {
    if (!cita.fechaCita || !cita.estilistaInfo || !cita.estilistaId) return;
    const fecha = new Date(cita.fechaCita);
    if (fecha.getFullYear() === year && cita.estado?.toLowerCase() === 'completada') {
      const estilistaId = cita.estilistaId;
      if (!reporteEstilistas[estilistaId]) {
        reporteEstilistas[estilistaId] = {
          id: estilistaId,
          nombres: cita.estilistaInfo.nombres,
          apellidos: cita.estilistaInfo.apellidos,
          citasCompletadas: 0,
          totalIngresos: 0
        };
      }
      reporteEstilistas[estilistaId].citasCompletadas++;
      reporteEstilistas[estilistaId].totalIngresos += Number(cita.pago?.totalPagado) || 0;
    }
  });

  return Object.values(reporteEstilistas).sort((a, b) => b.totalIngresos - a.totalIngresos);
}

export function obtenerClientesFrecuentes(citas, year) {
  const clientesFrecuentes = {};
  
  citas.forEach(cita => {
    if (!cita.fechaCita || !cita.clienteInfo || !cita.clienteId) return;
    const fecha = new Date(cita.fechaCita);
    if (fecha.getFullYear() === year && cita.estado?.toLowerCase() === 'completada') {
      const clienteId = cita.clienteId;
      if (!clientesFrecuentes[clienteId]) {
        clientesFrecuentes[clienteId] = {
          id: clienteId,
          nombres: cita.clienteInfo.nombres,
          apellidos: cita.clienteInfo.apellidos,
          visitas: 0,
          totalGastado: 0
        };
      }
      clientesFrecuentes[clienteId].visitas++;
      clientesFrecuentes[clienteId].totalGastado += Number(cita.pago?.totalPagado) || 0;
    }
  });

  return Object.values(clientesFrecuentes).sort((a, b) => b.visitas - a.visitas);
}