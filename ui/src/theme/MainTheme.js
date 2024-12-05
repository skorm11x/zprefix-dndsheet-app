import { createTheme } from '@mui/material/styles';

const tokens = {
  colors: {
    primary: '#CCCCFF',
    secondary: '#FF9999',
    background: '#FFFFCC',
    text: '#ffffff',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: {
      small: '0.8rem',
      medium: '1rem',
      large: '1.2rem',
    },
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '4px',
        textTransform: 'none',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        padding: '16px',
      },
    },
  },
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tokens.colors.primary,
    },
    secondary: {
      main: tokens.colors.secondary,
    },
    background: {
      default: tokens.colors.background,
      paper: '#085491',
    },
    text: {
      primary: tokens.colors.text,
    },
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    fontSize: 12,
  },
  spacing: (factor) => `${8 * factor}px`,
  components,
});

export { theme, tokens, components };