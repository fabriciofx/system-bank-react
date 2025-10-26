import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiTable: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 'bold'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#f9f9f9'
          },
          '&:hover': {
            backgroundColor: '#e3f2fd'
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled'
      }
    }
  }
});

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  );
} else {
  console.error('root element not found!');
}
