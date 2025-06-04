import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette?.divider || theme.palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows?.[1] || theme.shadows[1],
  padding: '8px 12px',
}));

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
  const user = authService.getCurrentUser();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) return null;

  const navLinks = navLinksByRole(user.rol);

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: '28px' }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 700 }}
            >
              EstiloBGA
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  color="info"
                  variant="text"
                  size="small"
                  sx={{ fontWeight: 500 }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button onClick={handleLogout} color="secondary" variant="contained" size="small" sx={{ fontWeight: 600 }}>
              Cerrar Sesión
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{ sx: { top: 0 } }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => setDrawerOpen(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {navLinks.map((link) => (
                  <MenuItem key={link.to} onClick={() => { setDrawerOpen(false); navigate(link.to); }}>
                    {link.label}
                  </MenuItem>
                ))}
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button onClick={() => { setDrawerOpen(false); handleLogout(); }} color="secondary" variant="contained" fullWidth>
                    Cerrar Sesión
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}