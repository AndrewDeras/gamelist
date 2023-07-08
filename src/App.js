import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// context
import { AuthProvider } from './context/AuthContext';

//hooks
import { useAuth } from './hooks/useAuth';
import { useState, useEffect } from 'react';

//components
import List from './pages/List';
import Register from './pages/Register';
import Loading from './components/loading';
import Navbar from './components/navbar';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth]);

  if (loadingUser) {
    return (< Loading message={'Obtendo usuário'} />)
  }

  return (
    <div className="App">
      <ToastContainer limit={1} autoClose={2000} />
      <AuthProvider value={{ user }} >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' Component={List} />
            <Route path='/auth' Component={Register} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
