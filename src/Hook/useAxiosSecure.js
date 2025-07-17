import axios from 'axios';


const axiosSecure = axios.create({
  baseURL: 'https://assignment-12-server-psi-jade.vercel.app',
});


axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Return as hook
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
