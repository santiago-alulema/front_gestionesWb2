// App.tsx
import Login from "@/components/Login";
import { useLogin } from "@/context/LoginContext";
import MainLayout from "@/routers/MainLayout";

function App() {
  const { isAuthenticated } = useLogin();

  return (
    <>
      {!isAuthenticated ? <Login /> : <MainLayout />}
    </>
  );
}

export default App;
