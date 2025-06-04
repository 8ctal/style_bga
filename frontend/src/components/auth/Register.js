import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  background: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({
    nombres: '',
    apellidos: '',
    numeroDocumento: '',
    correoElectronico: '',
    password: '',
    celular: '',
    rol: 'cliente'
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.register(userData);
      navigate('/login');
    } catch (err) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="center" alignItems="center">
      <CssBaseline />
      <Card variant="outlined">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="30" rx="30" ry="30" fill="#ff6a00" fillOpacity="0.15"/>
            <path d="M30 15C33 25 45 25 45 35C45 45 30 50 30 50C30 50 15 45 15 35C15 25 27 25 30 15Z" fill="#ff6a00"/>
          </svg>
        </Box>
        <Typography component="h1" variant="h5" align="center" sx={{ fontWeight: 600 }}>
          Registro de Cliente
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mt: 1, mb: 1 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombres"
            label="Nombres"
            name="nombres"
            autoComplete="given-name"
            value={userData.nombres}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="apellidos"
            label="Apellidos"
            name="apellidos"
            autoComplete="family-name"
            value={userData.apellidos}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="numeroDocumento"
            label="Número de Documento"
            name="numeroDocumento"
            value={userData.numeroDocumento}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="correoElectronico"
            label="Correo Electrónico"
            name="correoElectronico"
            autoComplete="email"
            value={userData.correoElectronico}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={userData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="celular"
            label="Celular"
            name="celular"
            autoComplete="tel"
            value={userData.celular}
            onChange={handleChange}
            disabled={loading}
          />
          <FormControlLabel
            control={<Checkbox color="primary" disabled />}
            label="Acepto los términos y condiciones"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: '1rem' }}
            disabled={loading}
          >
            Registrarse
          </Button>
        </Box>
        <Divider sx={{ my: 2 }}>o</Divider>
        <Stack spacing={1}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" fill="#EA4335" /></svg>}
            onClick={() => alert('Funcionalidad no implementada')}
            disabled={loading}
          >
            Registrarse con Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" fill="#1877F3" /></svg>}
            onClick={() => alert('Funcionalidad no implementada')}
            disabled={loading}
          >
            Registrarse con Facebook
          </Button>
        </Stack>
        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          ¿Ya tienes cuenta?{' '}
          <Link component="button" type="button" onClick={() => navigate('/login')}>
            Inicia Sesión
          </Link>
        </Typography>
      </Card>
    </SignUpContainer>
  );
} 