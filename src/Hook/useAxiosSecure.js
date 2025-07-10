import axios from 'axios';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('token'); // Correct token key
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosSecure.interceptors.request.eject(interceptor); // Clean up
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
