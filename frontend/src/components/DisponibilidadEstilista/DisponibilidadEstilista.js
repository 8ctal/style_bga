import React, { useState, useEffect } from 'react';
import { disponibilidadService } from '../../services/disponibilidadService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './DisponibilidadEstilista.css';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const DisponibilidadEstilista = () => {
    const { estilistaId } = useParams();
    const navigate = useNavigate();
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [estilista, setEstilista] = useState(null);
    const [nuevaDisponibilidad, setNuevaDisponibilidad] = useState({
        fechaInicio: '',
        fechaFin: '',
        disponible: true,
        estado: 'DISPONIBLE'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!estilistaId) {
            setError('ID de estilista no proporcionado');
            return;
        }
        cargarDisponibilidades();
        cargarEstilista();
    }, [estilistaId]);

    const cargarEstilista = async () => {
        try {
            const response = await api.get(`/usuarios/${estilistaId}`);
            setEstilista(response.data);
        } catch (err) {
            console.error('Error al cargar información del estilista:', err);
        }
    };

    const cargarDisponibilidades = async () => {
        try {
            setLoading(true);
            const data = await disponibilidadService.obtenerDisponibilidadesPorEstilista(estilistaId);
            setDisponibilidades(data || []);
            setError(null);
        } catch (err) {
            setError('Error al cargar disponibilidades: ' + (err.message || 'Error desconocido'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNuevaDisponibilidad(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!estilistaId) {
            setError('ID de estilista no proporcionado');
            return;
        }
        try {
            setLoading(true);
            await disponibilidadService.crearDisponibilidad({
                ...nuevaDisponibilidad,
                estilistaId
            });
            setNuevaDisponibilidad({
                fechaInicio: '',
                fechaFin: '',
                disponible: true,
                estado: 'DISPONIBLE'
            });
            await cargarDisponibilidades();
            setError(null);
        } catch (err) {
            setError('Error al guardar disponibilidad: ' + (err.message || 'Error desconocido'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta disponibilidad?')) {
            try {
                setLoading(true);
                await disponibilidadService.eliminarDisponibilidad(id);
                await cargarDisponibilidades();
                setError(null);
            } catch (err) {
                setError('Error al eliminar disponibilidad: ' + (err.message || 'Error desconocido'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const formatearFecha = (fecha) => {
        return format(new Date(fecha), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
    };

    if (!estilistaId) {
        return (
            <div className="disponibilidad-container">
                <div className="error-message">
                    Error: ID de estilista no proporcionado
                </div>
                <button className="btn-back" onClick={() => navigate('/estilistas')}>
                    Volver a Estilistas
                </button>
            </div>
        );
    }

    if (loading && !estilista) {
        return (
            <div className="disponibilidad-container">
                <div>Cargando...</div>
            </div>
        );
    }

    return (
        <div className="disponibilidad-container">
            <div className="header-section">
                <button className="btn-back" onClick={() => navigate('/estilistas')}>
                    ← Volver a Estilistas
                </button>
                <h2>Gestión de Disponibilidad</h2>
            </div>

            {estilista && (
                <div className="estilista-info">
                    <h3>{estilista.nombres} {estilista.apellidos}</h3>
                    <p><strong>Especialidad:</strong> {estilista.perfilEstilista?.especializacion || 'No especificada'}</p>
                    <p><strong>Experiencia:</strong> {estilista.perfilEstilista?.aniosExperiencia || 0} años</p>
                    <p><strong>Contacto:</strong> {estilista.celular || 'No especificado'}</p>
                </div>
            )}
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="disponibilidad-form">
                <h3>Agregar Nueva Disponibilidad</h3>
                <div className="form-group">
                    <label>Fecha y hora de inicio:</label>
                    <input
                        type="datetime-local"
                        name="fechaInicio"
                        value={nuevaDisponibilidad.fechaInicio}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora de fin:</label>
                    <input
                        type="datetime-local"
                        name="fechaFin"
                        value={nuevaDisponibilidad.fechaFin}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="disponible"
                            checked={nuevaDisponibilidad.disponible}
                            onChange={handleInputChange}
                        />
                        Disponible
                    </label>
                </div>

                <div className="form-group">
                    <label>Estado:</label>
                    <select
                        name="estado"
                        value={nuevaDisponibilidad.estado}
                        onChange={handleInputChange}
                    >
                        <option value="DISPONIBLE">Disponible</option>
                        <option value="NO_DISPONIBLE">No Disponible</option>
                        <option value="EN_SERVICIO">En Servicio</option>
                    </select>
                </div>

                <button type="submit" className="btn-submit">
                    Guardar Disponibilidad
                </button>
            </form>

            <div className="disponibilidades-list">
                <h3>Disponibilidades Registradas</h3>
                {disponibilidades.length === 0 ? (
                    <p>No hay disponibilidades registradas</p>
                ) : (
                    <ul>
                        {disponibilidades.map((disp) => (
                            <li key={disp.id} className="disponibilidad-item">
                                <div className="disponibilidad-info">
                                    <p>
                                        <strong>Inicio:</strong> {formatearFecha(disp.fechaInicio)}
                                    </p>
                                    <p>
                                        <strong>Fin:</strong> {formatearFecha(disp.fechaFin)}
                                    </p>
                                    <p>
                                        <strong>Estado:</strong> {disp.estado}
                                    </p>
                                    <p>
                                        <strong>Disponible:</strong> {disp.disponible ? 'Sí' : 'No'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleEliminar(disp.id)}
                                    className="btn-eliminar"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DisponibilidadEstilista; 