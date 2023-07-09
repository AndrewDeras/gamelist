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
import List from './pages/List';
import Auth from './pages/Auth';

//components
import Loading from './components/loading';
import Navbar from './components/navbar';


function App() {
  const { games, loading, error } = useFetch();
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
  console.log(user);

  return (
    <div className="App">
      <ToastContainer limit={1} autoClose={2000} />
      <AuthProvider value={{ user }} >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<List games={games} loading={loading} error={error} />} />
            <Route path='/auth' element={!user ? <Auth /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
