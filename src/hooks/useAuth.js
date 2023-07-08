import { db } from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return
    };
  }

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

      setLoading(false);

      return user;

    } catch (error) {
      let errorMsg;

      if (error.message.includes('email-already-in-use')) {
        errorMsg = 'E-mail already in use';
      } else if (error.message.includes('Password should be at least 6 characters')) {
        errorMsg = 'Password should be at least 6 characters';
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
    loading
  }

};


