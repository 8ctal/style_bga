// components/EstilistaFormulario.js
import React, { useState, useEffect } from 'react';
import styles from '../ManejoEstilista.module.css';

const EstilistaFormulario = ({ stylist, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correoElectronico: '',
    celular: '',
    numeroDocumento: '',
    especializacion: '',
    aniosExperiencia: 0,
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(!isEditing);

  useEffect(() => {
    if (stylist) {
      setFormData({
        nombres: stylist.nombres || '',
        apellidos: stylist.apellidos || '',
        correoElectronico: stylist.correoElectronico || '',
        celular: stylist.celular || '',
        numeroDocumento: stylist.numeroDocumento || '',
        especializacion: stylist.perfilEstilista?.especializacion || '',
        aniosExperiencia: stylist.perfilEstilista?.aniosExperiencia || 0,
        password: ''
      });
      setShowPasswordField(false);
    } else {
      setFormData({
        nombres: '',
        apellidos: '',
        correoElectronico: '',
        celular: '',
        numeroDocumento: '',
        especializacion: '',
        aniosExperiencia: 0,
        password: ''
      });
      setShowPasswordField(true);
    }
    setErrors({});
  }, [stylist]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombres.trim()) {
      newErrors.nombres = 'Los nombres son requeridos';
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    }

    if (!formData.correoElectronico.trim()) {
      newErrors.correoElectronico = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.correoElectronico)) {
      newErrors.correoElectronico = 'El correo electrónico no es válido';
    }

    if (!formData.celular.trim()) {
      newErrors.celular = 'El teléfono es requerido';
    }

    if (!formData.numeroDocumento.trim()) {
      newErrors.numeroDocumento = 'La cédula es requerida';
    }

    if (!formData.especializacion.trim()) {
      newErrors.especializacion = 'La especialidad es requerida';
    }

    if (formData.aniosExperiencia < 0) {
      newErrors.aniosExperiencia = 'Los años de experiencia no pueden ser negativos';
    }

    if (!isEditing && !formData.password) {
      newErrors.password = 'La contraseña es requerida para nuevos estilistas';
    }

    if (showPasswordField && formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
      const usuarioData = {
        ...formData,
        rol: 'estilista',
        perfilEstilista: {
          especializacion: formData.especializacion.trim(),
          aniosExperiencia: parseInt(formData.aniosExperiencia, 10)
        }
      };

      if (isEditing) {
        usuarioData.idUsuario = stylist.idUsuario;
        if (!formData.password) {
          delete usuarioData.password;
        }
      }

      await onSave(usuarioData);
      
      setFormData({
        nombres: '',
        apellidos: '',
        correoElectronico: '',
        celular: '',
        numeroDocumento: '',
        especializacion: '',
        aniosExperiencia: 0,
        password: ''
      });
      setShowPasswordField(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordField = () => {
    setShowPasswordField(!showPasswordField);
    if (!showPasswordField) {
      setFormData(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.formTitle}>
        {isEditing ? 'Editar Estilista' : 'Agregar Nuevo Estilista'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Nombres</label>
            <input
              type="text"
              name="nombres"
              className={`${styles.formInput} ${errors.nombres ? styles.errorInput : ''}`}
              value={formData.nombres}
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
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Ingrese apellidos"
              disabled={isSubmitting}
            />
            {errors.apellidos && <div className={styles.errorText}>{errors.apellidos}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Especialidad</label>
            <input
              type="text"
              name="especializacion"
              className={`${styles.formInput} ${errors.especializacion ? styles.errorInput : ''}`}
              value={formData.especializacion}
              onChange={handleChange}
              placeholder="Ej: Corte de cabello, Coloración, Peinados"
              disabled={isSubmitting}
            />
            {errors.especializacion && <div className={styles.errorText}>{errors.especializacion}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Años de Experiencia</label>
            <input
              type="number"
              name="aniosExperiencia"
              className={`${styles.formInput} ${errors.aniosExperiencia ? styles.errorInput : ''}`}
              value={formData.aniosExperiencia}
              onChange={handleChange}
              min="0"
              max="50"
              disabled={isSubmitting}
            />
            {errors.aniosExperiencia && <div className={styles.errorText}>{errors.aniosExperiencia}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className={styles.formLabel}>Número de Documento</label>
            <input
              type="text"
              name="numeroDocumento"
              className={`${styles.formInput} ${errors.numeroDocumento ? styles.errorInput : ''}`}
              value={formData.numeroDocumento}
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
              value={formData.celular}
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
            value={formData.correoElectronico}
            onChange={handleChange}
            placeholder="Ingrese correo electrónico"
            disabled={isSubmitting}
          />
          {errors.correoElectronico && <div className={styles.errorText}>{errors.correoElectronico}</div>}
        </div>

        {isEditing && (
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

        {(showPasswordField || !isEditing) && (
          <div className="mb-3">
            <label className={styles.formLabel}>
              {isEditing ? 'Nueva Contraseña' : 'Contraseña'}
            </label>
            <input
              type="password"
              name="password"
              className={`${styles.formInput} ${errors.password ? styles.errorInput : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder={isEditing ? 'Ingrese nueva contraseña' : 'Ingrese contraseña'}
              disabled={isSubmitting}
            />
            {errors.password && <div className={styles.errorText}>{errors.password}</div>}
          </div>
        )}

        <div className={styles.flexBetween}>
          {isEditing && (
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          )}
          <button 
            type="submit" 
            className={styles.editButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EstilistaFormulario;