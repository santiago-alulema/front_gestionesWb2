import Index from '@/components/Index'
import Login from '@/components/Login.tsx'
import { useLogin } from '@/context/LoginContext';
function App() {

  const { isAuthenticated } = useLogin();

  return (
    <>
      {!isAuthenticated ? <Login /> : <Index />}
    </>
  )
}

export default App
