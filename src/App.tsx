import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "@/components/Login";
import { useLogin } from "@/context/LoginContext";
import MainLayout from "@/routers/MainLayout";

function App() {
  const { isAuthenticated } = useLogin(); // Suponiendo que añades isLoading en tu contexto



  return (
    <> {/* Opcional si usas temas */}
      <CssBaseline /> {/* Normaliza estilos y hace que MUI funcione mejor */}
      {!isAuthenticated ? <Login /> : <MainLayout />}
    </>
  );
}

export default App;