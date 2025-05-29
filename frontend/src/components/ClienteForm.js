import React, { useState, useEffect } from 'react';
import { agregarCliente, editarCliente } from '../services/clienteService';
import styles from './Cliente.module.css';

export default function ClienteForm({ clienteSeleccionado, onSave, onActionSuccess }) {
  const [cliente, setCliente] = useState({
    nombres: '',
    apellidos: '',
    numeroDocumento: '',
    correoElectronico: '',
    celular: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  useEffect(() => {
    if (clienteSeleccionado) {
      setCliente({
        ...clienteSeleccionado,
        password: '' // Inicializamos password vacío
      });
      setShowPasswordField(false); // Ocultamos el campo de contraseña al editar
    } else {
      setCliente({
        nombres: '',
        apellidos: '',
        numeroDocumento: '',
        correoElectronico: '',
        celular: '',
        password: ''
      });
      setShowPasswordField(true); // Mostramos el campo de contraseña para nuevo cliente
    }
  }, [clienteSeleccionado]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!cliente.nombres.trim()) {
      newErrors.nombres = 'Los nombres son requeridos';
    }
    
    if (!cliente.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    }
    
    if (!cliente.numeroDocumento.trim()) {
      newErrors.numeroDocumento = 'El número de documento es requerido';
    }
    
    if (!cliente.correoElectronico.trim()) {
      newErrors.correoElectronico = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(cliente.correoElectronico)) {
      newErrors.correoElectronico = 'El correo electrónico no es válido';
    }
    
    if (!cliente.celular.trim()) {
      newErrors.celular = 'El celular es requerido';
    }
    
    if (!clienteSeleccionado && !cliente.password) {
      newErrors.password = 'La contraseña es requerida para nuevos clientes';
    }

    if (showPasswordField && cliente.password && cliente.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const clienteData = { ...cliente };
      
      // Si estamos editando y no se ha ingresado una nueva contraseña, la eliminamos del objeto
      if (clienteSeleccionado && !cliente.password) {
        delete clienteData.password;
      }

      const action = cliente.idUsuario ? editarCliente : agregarCliente;
      await action(clienteData);
      
      onActionSuccess(
        cliente.idUsuario 
          ? 'Cliente actualizado exitosamente' 
          : 'Cliente agregado exitosamente'
      );
      
      onSave();
      setCliente({
        nombres: '',
        apellidos: '',
        numeroDocumento: '',
        correoElectronico: '',
        celular: '',
        password: ''
      });
      setShowPasswordField(true);
    } catch (error) {
      console.error('Error:', error);
      onActionSuccess('Error al procesar la operación', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setCliente({
      nombres: '',
      apellidos: '',
      numeroDocumento: '',
      correoElectronico: '',
      celular: '',
      password: ''
    });
    setShowPasswordField(true);
    setErrors({});
    onSave();
  };

  const togglePasswordField = () => {
    setShowPasswordField(!showPasswordField);
    if (!showPasswordField) {
      setCliente(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.formTitle}>
        {cliente.idUsuario ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Nombres</label>
            <input
              type="text"
              name="nombres"
              className={`${styles.formInput} ${errors.nombres ? styles.errorInput : ''}`}
              value={cliente.nombres}
              onChange={handleChange}
              placeholder="Ingrese nombres"
              disabled={isSubmitting}
            />
            {errors.nombres && <div className={styles.errorText}>{errors.nombres}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Apellidos</label>
            <input
              type="text"
              name="apellidos"
              className={`${styles.formInput} ${errors.apellidos ? styles.errorInput : ''}`}
              value={cliente.apellidos}
              onChange={handleChange}
              placeholder="Ingrese apellidos"
              disabled={isSubmitting}
            />
            {errors.apellidos && <div className={styles.errorText}>{errors.apellidos}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Número de Documento</label>
            <input
              type="text"
              name="numeroDocumento"
              className={`${styles.formInput} ${errors.numeroDocumento ? styles.errorInput : ''}`}
              value={cliente.numeroDocumento}
              onChange={handleChange}
              placeholder="Ingrese número de documento"
              disabled={isSubmitting}
            />
            {errors.numeroDocumento && <div className={styles.errorText}>{errors.numeroDocumento}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Celular</label>
            <input
              type="tel"
              name="celular"
              className={`${styles.formInput} ${errors.celular ? styles.errorInput : ''}`}
              value={cliente.celular}
              onChange={handleChange}
              placeholder="Ingrese número de celular"
              disabled={isSubmitting}
            />
            {errors.celular && <div className={styles.errorText}>{errors.celular}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label className={styles.formLabel}>Correo Electrónico</label>
          <input
            type="email"
            name="correoElectronico"
            className={`${styles.formInput} ${errors.correoElectronico ? styles.errorInput : ''}`}
            value={cliente.correoElectronico}
            onChange={handleChange}
            placeholder="Ingrese correo electrónico"
            disabled={isSubmitting}
          />
          {errors.correoElectronico && <div className={styles.errorText}>{errors.correoElectronico}</div>}
        </div>

        {cliente.idUsuario && (
          <div className="mb-3">
            <button
              type="button"
              className={styles.buttonLink}
              onClick={togglePasswordField}
            >
              {showPasswordField ? 'Cancelar cambio de contraseña' : 'Cambiar contraseña'}
            </button>
          </div>
        )}

        {(showPasswordField || !cliente.idUsuario) && (
          <div className="mb-3">
            <label className={styles.formLabel}>
              {cliente.idUsuario ? 'Nueva Contraseña' : 'Contraseña'}
            </label>
            <input
              type="password"
              name="password"
              className={`${styles.formInput} ${errors.password ? styles.errorInput : ''}`}
              value={cliente.password}
              onChange={handleChange}
              placeholder={cliente.idUsuario ? 'Ingrese nueva contraseña' : 'Ingrese contraseña'}
              disabled={isSubmitting}
            />
            {errors.password && <div className={styles.errorText}>{errors.password}</div>}
          </div>
        )}

        <div className={styles.flexBetween}>
          {cliente.idUsuario && (
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          )}
          <button 
            type="submit" 
            className={styles.buttonPrimary}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : (cliente.idUsuario ? 'Actualizar' : 'Guardar')}
          </button>
        </div>
      </form>
    </section>
  );
} 