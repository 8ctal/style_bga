import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import styles from './Auth.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        correo: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Enviando credenciales:', JSON.stringify(credentials, null, 2));
            const response = await authService.login(credentials);
            console.log('Respuesta del login:', JSON.stringify(response, null, 2));
            
            // Obtener el usuario actual del localStorage
            const currentUser = authService.getCurrentUser();
            console.log('Usuario actual:', JSON.stringify(currentUser, null, 2));
            
            // Verificar que el rol existe
            if (!currentUser || !currentUser.rol) {
                console.error('No se recibió el rol en la respuesta. Usuario actual:', currentUser);
                setError('Error en la autenticación');
                return;
            }

            // Redirigir según el rol que devuelve el backend
            switch (currentUser.rol) {
                case 'admin':
                    console.log('Redirigiendo a /clientes (admin)');
                    navigate('/clientes');
                    break;
                case 'estilista':
                    console.log('Redirigiendo a /citas (estilista)');
                    navigate('/citas');
                    break;
                case 'cliente':
                    console.log('Redirigiendo a /citas (cliente)');
                    navigate('/citas');
                    break;
                default:
                    console.error('Rol no reconocido:', currentUser.rol);
                    setError('Rol no válido');
            }
        } catch (err) {
            console.error('Error en login:', err);
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authBox}>
                <h2>Iniciar Sesión</h2>
                {error && <div className={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            name="correo"
                            value={credentials.correo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Iniciar Sesión
                    </button>
                </form>
                <p className={styles.switchAuth}>
                    ¿No tienes cuenta? <span onClick={() => navigate('/register')}>Regístrate</span>
                </p>
            </div>
        </div>
    );
};

export default Login; 