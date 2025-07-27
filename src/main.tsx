import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';

import App from './App.tsx'
import theme from '../theme/theme';
import { BrowserRouter } from 'react-router';
import { LoginProvider } from '@/context/LoginContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </LoginProvider>
    </BrowserRouter>
  </StrictMode>,
)
