import { db } from '../firebase/config';
import { toast } from 'react-toastify';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return
    };
  }

  // create user

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, { displayName: data.userName });

      // criando documento do usuário na coleção users

      const userDocRef = doc(db, 'users', user.uid);

      await setDoc(userDocRef, {
        userName: data.userName,
        favGames: [],
        ratedGames: []
      });

      setLoading(false);
      toast.success(`Welcome ${user.displayName}`);

      return user;

    } catch (error) {
      let errorMsg;

      if (error.message.includes('email-already')) {
        errorMsg = 'E-mail already in use';
      } else if (error.message.includes('Password')) {
        errorMsg = 'Password should be at least 6 characters';
      } else {
        errorMsg = 'Something went wrong, try again later.'
      }
      setLoading(false);
      setError(errorMsg);
    }
  }

  // logout

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  }

  // login

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
      toast.success(`Welcome again ${user.displayName}`);

    } catch (error) {
      let errorMsg;

      if (error.message.includes('user-not-found')) {
        errorMsg = 'User not found';
      } else if (error.message.includes('wrong-password')) {
        errorMsg = 'Wrong password';
      } else {
        errorMsg = 'Something went wrong, try again later.'
      }

      setLoading(false);
      setError(errorMsg);
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  }

};


