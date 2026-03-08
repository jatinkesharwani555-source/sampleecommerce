// Koi matlab nhi iska faltu hai 
import { useState, useEffect } from 'react';
import {fetchAboutApi} from '../api/about.api'

const useAbout = () => {
  const [presentUser, setPresentUser] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    setServerError(null);
    try {
      setLoading(true);
      const response = await fetchAboutApi();
      setPresentUser(response.data.user);
    } catch (err) {
      setServerError(err.response?.data?.message || "Something Went Wrong");
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return {
    serverError,
    loading
  }
}

export default useAbout
