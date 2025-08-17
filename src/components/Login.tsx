import LoginImageLeft from '@/assets/images/LoginImageLeft.png';
import logo from '@/assets/images/logo.png';
import { useLogin } from '@/context/LoginContext';
import { LoginUser } from '@/services/Service';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Grid
} from '@mui/material';
import { useState } from 'react';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginUserToken = await LoginUser({
      username: userName,
      password: password,
      rememberMe: true,
    });
    login(loginUserToken.token)
  };

  return (
    <Grid container sx={{ margin: 0, padding: 0 }}>
      <Grid size={6} sx={{ padding: 0, margin: 0 }}>
        <img
          src={LoginImageLeft}
          alt="Login"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            margin: 0,
            padding: 0
          }}
        />
      </Grid>

      <Grid size={6} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
      }}>
        <Container maxWidth="xs" >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: '25%',
                height: '50%',
                objectFit: 'cover',
                margin: 0,
                padding: 0
              }}
            />

            <Box component="form" sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Nombre de usuario"
                name="userName"
                autoFocus
                onChange={(e) => setUserName(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}

              />

              <Typography align="right" sx={{ mt: 1 }}>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => loginUser(e)}
              >
                Ingresar
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                ¿No tienes una cuenta?{' '}
                <Link href="#" variant="body2">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;