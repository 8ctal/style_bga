import React, { useEffect, useState } from 'react';
import { agregarCita, editarCita, getClientes, getEstilistas } from '../services/citaService';
import styles from './ManejoCitas.module.css';

export default function CitaForm({ onSave, citaSeleccionada }) {
  const [formData, setFormData] = useState({
    clienteId: '',
    estilistaId: '',
    fechaCita: '',
    horarioAsignado: { 
      diaSemana: '', 
      intervalo: '' 
    },
    servicios: [{
      servicioId: '',
      nombreServicio: '',
      condicionesPrevias: '',
      precioServicio: 0,
      tiempoEstimadoServicio: 60,
      promocion: false
    }],
    estado: 'pendiente',
    pago: {
      fechaPago: new Date().toISOString(),
      totalPagado: 0,
      metodoPago: '',
      estadoPago: 'pendiente'
    }
  });

  const [clientes, setClientes] = useState([]);
  const [estilistas, setEstilistas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [clientesRes, estlistasRes] = await Promise.all([
          getClientes(),
          getEstilistas()
        ]);
        setClientes(clientesRes.data);
        setEstilistas(estlistasRes.data);
      } catch (err) {
        setError('Error al cargar los datos necesarios. Por favor, intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (citaSeleccionada) {
      // Asegurarnos de preservar toda la información del servicio existente
      const servicioExistente = citaSeleccionada.servicios && citaSeleccionada.servicios[0] ? {
        servicioId: citaSeleccionada.servicios[0].servicioId || '',
        nombreServicio: citaSeleccionada.servicios[0].nombreServicio || '',
        condicionesPrevias: citaSeleccionada.servicios[0].condicionesPrevias || '',
        precioServicio: citaSeleccionada.servicios[0].precioServicio || 0,
        tiempoEstimadoServicio: citaSeleccionada.servicios[0].tiempoEstimadoServicio || 60,
        promocion: citaSeleccionada.servicios[0].promocion || false
      } : {
        servicioId: '',
        nombreServicio: '',
        condicionesPrevias: '',
        precioServicio: 0,
        tiempoEstimadoServicio: 60,
        promocion: false
      };

      setFormData({
        ...citaSeleccionada,
        clienteId: citaSeleccionada.clienteId || '',
        estilistaId: citaSeleccionada.estilistaId || '',
        fechaCita: citaSeleccionada.fechaCita || '',
        horarioAsignado: citaSeleccionada.horarioAsignado || { diaSemana: '', intervalo: '' },
        servicios: [servicioExistente],
        estado: citaSeleccionada.estado || 'pendiente',
        pago: citaSeleccionada.pago || {
          fechaPago: new Date().toISOString(),
          totalPagado: 0,
          metodoPago: '',
          estadoPago: 'pendiente'
        }
      });
    }
  }, [citaSeleccionada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("pago.")) {
      const key = name.split(".")[1];
      let processedValue = value;
      if (key === 'totalPagado') {
        processedValue = parseFloat(value) || 0;
      }
      setFormData(prev => ({
        ...prev,
        pago: { ...prev.pago, [key]: processedValue }
      }));
    } else if (name.includes("horarioAsignado.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        horarioAsignado: { ...prev.horarioAsignado, [key]: value }
      }));
    } else if (name.includes("servicios.")) {
      const key = name.split(".")[1];
      let processedValue = value;
      if (key === 'precioServicio') {
        processedValue = parseInt(value) || 0;
      } else if (key === 'tiempoEstimadoServicio') {
        processedValue = parseInt(value) || 60;
      } else if (key === 'promocion') {
        processedValue = e.target.checked;
      }
      setFormData(prev => ({
        ...prev,
        servicios: [{
          ...prev.servicios[0],
          [key]: processedValue
        }]
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validaciones básicas
      if (!formData.clienteId) throw new Error('Debe seleccionar un cliente');
      if (!formData.estilistaId) throw new Error('Debe seleccionar un estilista');
      if (!formData.fechaCita) throw new Error('Debe seleccionar una fecha');
      if (!formData.servicios[0].nombreServicio) throw new Error('Debe especificar el nombre del servicio');
      if (!formData.horarioAsignado.diaSemana) throw new Error('Debe seleccionar el día de la semana');
      if (!formData.horarioAsignado.intervalo) throw new Error('Debe especificar el intervalo de tiempo');
      if (!formData.pago.metodoPago) throw new Error('Debe seleccionar un método de pago');
      if (formData.pago.totalPagado <= 0) throw new Error('El total a pagar debe ser mayor a 0');

      // Encontrar la información del cliente y estilista seleccionados
      const clienteSeleccionado = clientes.find(c => c.idUsuario === formData.clienteId);
      const estilistaSeleccionado = estilistas.find(e => e.idUsuario === formData.estilistaId);

      if (!clienteSeleccionado) throw new Error('Cliente no encontrado');
      if (!estilistaSeleccionado) throw new Error('Estilista no encontrado');

      // Crear objetos de información
      const clienteInfo = {
        nombres: clienteSeleccionado.nombres,
        apellidos: clienteSeleccionado.apellidos,
        correoElectronico: clienteSeleccionado.correoElectronico,
        celular: clienteSeleccionado.celular
      };

      const estilistaInfo = {
        nombres: estilistaSeleccionado.nombres,
        apellidos: estilistaSeleccionado.apellidos,
        especializacion: estilistaSeleccionado.perfilEstilista?.especializacion || ''
      };

      // Si estamos editando y las condiciones previas están vacías, mantener las originales
      let servicios = [...formData.servicios];
      if (citaSeleccionada && citaSeleccionada.servicios && citaSeleccionada.servicios[0]) {
        servicios[0] = {
          ...servicios[0],
          condicionesPrevias: servicios[0].condicionesPrevias || citaSeleccionada.servicios[0].condicionesPrevias || ''
        };
      }

      const citaData = {
        ...formData,
        servicios,
        clienteInfo,
        estilistaInfo,
        fechaRegistro: new Date().toISOString(),
        pago: {
          ...formData.pago,
          fechaPago: new Date().toISOString()
        }
      };

      console.log('Enviando datos de la cita:', citaData);
      
      if (citaSeleccionada) {
        await editarCita(citaData);
      } else {
        await agregarCita(citaData);
      }
      
      onSave();
    } catch (err) {
      console.error('Error al guardar la cita:', err);
      setError(err.message || 'Error al guardar la cita. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !clientes.length) {
    return <div className="alert alert-info">Cargando datos necesarios...</div>;
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.formTitle}>{citaSeleccionada ? 'Editar Cita' : 'Agregar Cita'}</h2>
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Cliente</label>
            <select 
              name="clienteId" 
              className={styles.formInput}
              value={formData.clienteId} 
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(c => (
                <option key={c.idUsuario} value={c.idUsuario}>
                  {c.nombres} {c.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Estilista</label>
            <select 
              name="estilistaId" 
              className={styles.formInput}
              value={formData.estilistaId} 
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccione un estilista</option>
              {estilistas.map(e => (
                <option key={e.idUsuario} value={e.idUsuario}>
                  {e.nombres} {e.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Fecha de la cita</label>
            <input 
              type="datetime-local" 
              name="fechaCita" 
              className={styles.formInput}
              value={formData.fechaCita} 
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className={styles.formLabel}>Día de la semana</label>
            <select
              name="horarioAsignado.diaSemana"
              className={styles.formInput}
              value={formData.horarioAsignado.diaSemana}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccione...</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label className={styles.formLabel}>Intervalo</label>
            <input 
              name="horarioAsignado.intervalo" 
              className={styles.formInput}
              value={formData.horarioAsignado.intervalo} 
              onChange={handleChange}
              placeholder="Ej: 9:00 AM - 10:00 AM"
              disabled={loading}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Nombre del Servicio</label>
            <input
              type="text"
              name="servicios.nombreServicio"
              className={styles.formInput}
              value={formData.servicios[0].nombreServicio}
              onChange={handleChange}
              placeholder="Ej: Tinte, Corte, etc."
              disabled={loading}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Condiciones Previas</label>
            <textarea
              name="servicios.condicionesPrevias"
              className={styles.formInput}
              value={formData.servicios[0].condicionesPrevias}
              onChange={handleChange}
              placeholder="Ej: No lavarse el cabello 24h antes"
              disabled={loading}
              rows="2"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className={styles.formLabel}>Precio del Servicio</label>
            <input
              type="number"
              name="servicios.precioServicio"
              className={styles.formInput}
              value={formData.servicios[0].precioServicio}
              onChange={handleChange}
              placeholder="Ej: 50000"
              disabled={loading}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className={styles.formLabel}>Tiempo Estimado (minutos)</label>
            <input
              type="number"
              name="servicios.tiempoEstimadoServicio"
              className={styles.formInput}
              value={formData.servicios[0].tiempoEstimadoServicio}
              onChange={handleChange}
              placeholder="Ej: 60"
              disabled={loading}
            />
          </div>

          <div className="col-md-4 mb-3">
            <div className={styles.formGroup}>
              <div className="form-check mt-4">
                <input
                  type="checkbox"
                  name="servicios.promocion"
                  className="form-check-input"
                  checked={formData.servicios[0].promocion}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label className={styles.formLabel}>
                  ¿Tiene promoción?
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <label className={styles.formLabel}>Estado de la cita</label>
            <select 
              name="estado" 
              className={styles.formInput}
              value={formData.estado} 
              onChange={handleChange}
              disabled={loading}
            >
              <option value="pendiente">Pendiente</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className={styles.formLabel}>Método de pago</label>
            <select
              name="pago.metodoPago"
              className={styles.formInput}
              value={formData.pago.metodoPago}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccione método de pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className={styles.formLabel}>Total a pagar</label>
            <input 
              name="pago.totalPagado" 
              type="number" 
              className={styles.formInput}
              value={formData.pago.totalPagado} 
              onChange={handleChange}
              placeholder="Ingrese el monto a pagar"
              disabled={loading}
            />
          </div>
        </div>

        <button 
          className={styles.buttonPrimary}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Guardando...' : (citaSeleccionada ? 'Actualizar Cita' : 'Guardar Cita')}
        </button>
      </form>
    </section>
  );
}
