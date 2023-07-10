import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// context
import { AuthProvider } from './context/AuthContext';

//hooks
import { useAuth } from './hooks/useAuth';
import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';

//pages
import Main from './pages/Main/Main';
import Auth from './pages/Auth/Auth';

//components
import Loading from './components/loading/Loading';
import Navbar from './components/navbar/Navbar';


function App() {
  const gamesList = useFetch();

  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);


  if (loadingUser) {
    return (< Loading message={'Obtendo usuário'} />)
  }

  return (
    <div className="App">
      <ToastContainer limit={1} autoClose={2000} />
      <AuthProvider value={{ user, ...gamesList }} >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/auth' element={!user ? <Auth /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
