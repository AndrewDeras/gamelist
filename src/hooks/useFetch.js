import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { apiUrl, headerConfig, errorStatusList } from '../utils/index';

export const useFetch = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setError(null);

    const getData = async () => {
      setLoading(true);
      try {
        const response = await Promise.race([
          fetch(apiUrl, headerConfig),
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('Server timeout'))
            }, 5000);
          })
        ]);

        const data = await response.json();

        if (isMounted) {
          if (errorStatusList.includes(response.status) || response.status === 400) {
            setError('The server failed to respond, try reloading the page');
            setLoading(false);
            toast.error('The server failed to respond, try reloading the page');
            return;
          }

          if (response.status !== 200) {
            setError('The server will not be able to respond for now, please try to come back later.');
            setLoading(false);
            return toast.error('The server will not be able to respond for now, please try to come back later.');
          }

          setGames(data);
          setLoading(false);
          toast.success('Game list ready');
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
          setError(error.message);
          toast.error(error.message);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    games,
    loading,
    error
  };
};
