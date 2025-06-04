import { createTheme } from '@mui/material/styles';

const darkBlueTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F7F8FA', // fondo general muy claro
      paper: '#FFFFFF',   // cards y secciones blancas
    },
    primary: {
      main: '#232323',    // negro para botones principales
      contrastText: '#fff',
    },
    secondary: {
      main: '#E0E0E0',    // gris claro para outline y badges
      contrastText: '#232323',
    },
    error: {
      main: '#B91C1C',    // rojo para eliminar
      contrastText: '#fff',
    },
    text: {
      primary: '#232323', // texto oscuro
      secondary: '#4B587C',
    },
    divider: '#E0E6F0',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #232323 0%, #444 100%)',
          color: '#fff',
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#fff',
          color: '#232323',
          borderRadius: 16,
          boxShadow: '0 4px 24px 0 rgba(44,62,80,0.07)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 2px 8px #d1d5db',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #232323 60%, #444 100%)',
          color: '#fff',
        },
        outlinedSecondary: {
          border: '1.5px solid #d1d5db',
          color: '#232323',
          background: '#fff',
        },
        containedError: {
          background: '#fff',
          color: '#B91C1C',
          border: '1.5px solid #d1d5db',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: '#E0E0E0',
          color: '#232323',
          fontWeight: 600,
        },
      },
    },
  },
  typography: {
    fontFamily: 'Poppins, Inter, Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
});

export default darkBlueTheme; 