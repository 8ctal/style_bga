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
    aniosExperiencia: 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (stylist) {
      setFormData({
        nombres: stylist.nombres || '',
        apellidos: stylist.apellidos || '',
        correoElectronico: stylist.correoElectronico || '',
        celular: stylist.celular || '',
        numeroDocumento: stylist.numeroDocumento || '',
        especializacion: stylist.perfilEstilista?.especializacion || '',
        aniosExperiencia: stylist.perfilEstilista?.aniosExperiencia || 0
      });
      setErrors({});
    } else {
      setFormData({
        nombres: '',
        apellidos: '',
        correoElectronico: '',
        celular: '',
        numeroDocumento: '',
        especializacion: '',
        aniosExperiencia: 0
      });
      setErrors({});
    }
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Crear el objeto perfilEstilista
    const perfilEstilista = {
      especializacion: formData.especializacion.trim(),
      aniosExperiencia: parseInt(formData.aniosExperiencia, 10)
    };

    // Crear el objeto usuario completo
    const usuarioData = {
      nombres: formData.nombres.trim(),
      apellidos: formData.apellidos.trim(),
      correoElectronico: formData.correoElectronico.trim(),
      celular: formData.celular.trim(),
      numeroDocumento: formData.numeroDocumento.trim(),
      rol: 'estilista',
      password: 'tempPassword123', // Este debería manejarse de forma más segura
      fechaRegistro: new Date().toISOString(),
      perfilEstilista: perfilEstilista
    };

    // Si estamos editando, incluir el ID
    if (isEditing && stylist) {
      usuarioData.idUsuario = stylist.idUsuario;
    }

    console.log('Datos a enviar:', usuarioData); // Debug
    onSave(usuarioData);
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.formTitle}>
        {isEditing ? 'Editar Estilista' : 'Agregar Nuevo Estilista'}
      </h2>
      
      <div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="nombres">Nombres:</label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.nombres ? styles.errorInput : ''}`}
            required
          />
          {errors.nombres && <span className={styles.errorText}>{errors.nombres}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="apellidos">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.apellidos ? styles.errorInput : ''}`}
            required
          />
          {errors.apellidos && <span className={styles.errorText}>{errors.apellidos}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="especializacion">Especialidad:</label>
          <input
            type="text"
            id="especializacion"
            name="especializacion"
            value={formData.especializacion}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.especializacion ? styles.errorInput : ''}`}
            placeholder="Ej: Corte de cabello, Coloración, Peinados"
            required
          />
          {errors.especializacion && <span className={styles.errorText}>{errors.especializacion}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="aniosExperiencia">Años de Experiencia:</label>
          <input
            type="number"
            id="aniosExperiencia"
            name="aniosExperiencia"
            value={formData.aniosExperiencia}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.aniosExperiencia ? styles.errorInput : ''}`}
            min="0"
            max="50"
            required
          />
          {errors.aniosExperiencia && <span className={styles.errorText}>{errors.aniosExperiencia}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="numeroDocumento">Cédula de Ciudadanía:</label>
          <input
            type="text"
            id="numeroDocumento"
            name="numeroDocumento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.numeroDocumento ? styles.errorInput : ''}`}
            placeholder="Ingrese número de cédula"
            required
          />
          {errors.numeroDocumento && <span className={styles.errorText}>{errors.numeroDocumento}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="celular">Teléfono:</label>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.celular ? styles.errorInput : ''}`}
            placeholder="Ej: +57 300 123 4567"
            required
          />
          {errors.celular && <span className={styles.errorText}>{errors.celular}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="correoElectronico">Correo Electrónico:</label>
          <input
            type="email"
            id="correoElectronico"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.correoElectronico ? styles.errorInput : ''}`}
            placeholder="ejemplo@correo.com"
            required
          />
          {errors.correoElectronico && <span className={styles.errorText}>{errors.correoElectronico}</span>}
        </div>

        <div className={styles.flexBetween}>
          <button 
            className={styles.buttonPrimary}
            onClick={handleSubmit}
            type="submit"
          >
            {isEditing ? 'Actualizar' : 'Guardar'}
          </button>
          
          {isEditing && (
            <button 
              className={styles.buttonSecondary}
              onClick={onCancel}
              type="button"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EstilistaFormulario;