import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//firestore
import { db } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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

//components
import Loading from './components/loading/Loading';
import Navbar from './components/navbar/Navbar';


function App() {
  const gamesList = useFetch();

  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingUser(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  // useEffect(() => {
  //   if (user) {
  //     const getData = async () => {
  //       try {
  //         const docRef = doc(db, 'users', user.uid);
  //         const docSnap = await getDoc(docRef);

  //         if (docSnap.exists()) {
  //           setUserData(docSnap.data());
  //         } else {
  //           console.log("No such document!");
  //         }
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     };

  //     getData();
  //   }
  // }, [user, userData]);

  if (loadingUser) {
    return <Loading message="..." />;
  }


  return (
    <div className="App">
      <ToastContainer limit={1} autoClose={2000} />
      <AuthProvider value={{ user, ...gamesList, ...userData }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
            <Route path="/favorite" element={user ? <Favorite /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
