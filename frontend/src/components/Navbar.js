import * as React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

const navLinksByRole = (rol) => {
  if (rol === 'admin') {
    return [
      { to: '/clientes', label: 'Clientes' },
      { to: '/estilistas', label: 'Estilistas' },
      { to: '/servicios', label: 'Servicios' },
      { to: '/citas', label: 'Citas' },
      { to: '/disponibilidad', label: 'Disponibilidad' },
      { to: '/reportes', label: 'Reportes' },
    ];
  }
  if (rol === 'estilista') {
    return [
      { to: '/citas', label: 'Mis Citas' },
      { to: '/disponibilidad', label: 'Mi Disponibilidad' },
    ];
  }
  if (rol === 'cliente') {
    return [
      { to: '/citas', label: 'Mis Citas / Agendar Cita' },
      { to: '/disponibilidad', label: 'Disponibilidad' },
    ];
  }
  return [];
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) return null;

  const navLinks = navLinksByRole(user.rol);

  return (
    <AppBar position="fixed" elevation={0} sx={{ background: 'linear-gradient(90deg, #232323 0%, #444 100%)', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', letterSpacing: 1 }}>
          EstiloBGA
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {navLinks.map(link => (
            <Link
              key={link.to}
              component={RouterLink}
              to={link.to}
              sx={{
                px: 2,
                py: 0.7,
                borderRadius: 3,
                fontWeight: 600,
                color: location.pathname === link.to ? '#232323' : '#fff',
                background: location.pathname === link.to ? '#fff' : 'transparent',
                boxShadow: location.pathname === link.to ? '0 2px 8px #d1d5db' : 'none',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  background: location.pathname === link.to ? '#fff' : 'rgba(255,255,255,0.08)',
                  color: '#232323',
                },
              }}
            >
              {link.label}
            </Link>
          ))}
          <Button onClick={handleLogout} color="error" variant="contained" sx={{ borderRadius: 3, fontWeight: 600, ml: 2 }}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}