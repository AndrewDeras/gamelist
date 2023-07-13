import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//firestore
import { onAuthStateChanged } from 'firebase/auth';
import { db } from './firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

// context
import { AuthProvider } from './context/AuthContext';

//hooks
import { useAuth } from './hooks/useAuth';
import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';

//pages
import Main from './pages/Main/Main';
import Auth from './pages/Auth/Auth';
import Favorite from './pages/Favorite/Favorite';
import PageNotFound from './pages/404/PageNotFound';

//components
import Modal from './components/modal/Modal';
import Navbar from './components/navbar/Navbar';


function App() {
  const gamesList = useFetch();
  const { auth } = useAuth();
  const [user, setUser] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        const docRef = doc(db, 'users', user.uid);

        // Registra o observador usando onSnapshot()
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
          } else {
            console.log('Documento não encontrado');
          }
        });

        return () => {
          unsubscribe();
        }
      } else {
        setUserData(undefined);
      }
    });

  }, [auth]);


  if (loadingUser) {
    return <Modal message="..." />;
  }

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="dark"
        limit={1}
      />
      <AuthProvider value={{ user, ...gamesList, userData }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
            <Route path="/favorite" element={user ? <Favorite /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
