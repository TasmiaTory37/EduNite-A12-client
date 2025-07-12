import axios from 'axios';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000', // ✅ Update to your correct backend port
});

const useAxiosSecure = () => {
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosSecure.interceptors.request.eject(interceptor);
  }, []);

  return axiosSecure; // ✅ Return as single value, not array
};

export default useAxiosSecure;
