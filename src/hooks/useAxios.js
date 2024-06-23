import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook personnalisé pour effectuer des requêtes Axios.
 * @param {string} url - L'URL pour récupérer les données.
 * @param {string} [method='GET'] - La méthode HTTP à utiliser.
 * @param {Object} [body=null] - La charge utile pour les requêtes POST/PUT.
 * @returns {Object} Les données de réponse, l'erreur et l'état de chargement.
 */
const useAxios = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({ url, method, data: body });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, error, loading };
};

export default useAxios;
