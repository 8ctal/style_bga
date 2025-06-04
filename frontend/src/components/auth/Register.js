import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import styles from './Auth.module.css';

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nombres: '',
        apellidos: '',
        numeroDocumento: '',
        correoElectronico: '',
        password: '',
        celular: '',
        rol: 'cliente' // Fixed role for registration
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(userData);
            navigate('/login');
        } catch (err) {
            setError('Error al registrar usuario');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authBox}>
                <h2>Registro de Cliente</h2>
                {error && <div className={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            value={userData.nombres}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Apellidos</label>
                        <input
                            type="text"
                            name="apellidos"
                            value={userData.apellidos}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Número de Documento</label>
                        <input
                            type="text"
                            name="numeroDocumento"
                            value={userData.numeroDocumento}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            name="correoElectronico"
                            value={userData.correoElectronico}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Celular</label>
                        <input
                            type="tel"
                            name="celular"
                            value={userData.celular}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Registrarse
                    </button>
                </form>
                <p className={styles.switchAuth}>
                    ¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia Sesión</span>
                </p>
            </div>
        </div>
    );
};

export default Register; 