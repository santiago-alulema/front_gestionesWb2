import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A6FA5',     // Azul bajo principal
      light: '#7F9BC1',    // Versión más clara
      dark: '#2E4A7D',     // Azul oscuro suave
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6D8B74',     // Verde-azul terroso
      light: '#9AB59F',
      dark: '#4A6350',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#C66868',     // Rojo apagado
    },
    background: {
      default: '#F8FAFC',  // Fondo casi blanco
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3D4A5C',   // Texto principal (gris-azul)
      secondary: '#6B7B8F', // Texto secundario
    },
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", sans-serif',
    h1: { 
      color: '#4A6FA5',     // Títulos en azul bajo
      fontWeight: 500,      // Menos intenso
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#4A6FA5', // Navbar en azul bajo
          boxShadow: 'none',          // Sin sombra para minimalismo
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none',          // Botones planos
          '&:hover': {
            backgroundColor: '#3A5A8F', // Oscurece al hover
          },
        },
      },
    },
  },
});

export default theme;