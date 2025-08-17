import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "@/components/Login";
import { useLogin } from "@/context/LoginContext";
import MainLayout from "@/routers/MainLayout";

function App() {
  const { isAuthenticated } = useLogin();
  return (
    <>
      <CssBaseline />
      {!isAuthenticated ? <Login /> : <MainLayout />}
    </>
  );
}

export default App;