import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';

import App from './App.tsx'
import theme from '../theme/theme';
import { BrowserRouter } from 'react-router';
import { LoginProvider } from '@/context/LoginContext.tsx';
import { GestionarDeudasProvider } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores.tsx';
import { LoadingContextProvider } from '@/components/LoadingContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GestionarDeudasProvider>
      <LoadingContextProvider>
        <BrowserRouter>
          <LoginProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </LoginProvider>
        </BrowserRouter>
      </LoadingContextProvider>

    </GestionarDeudasProvider>
  </StrictMode>,
)
