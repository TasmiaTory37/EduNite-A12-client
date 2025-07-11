import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const StudentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !loading
  });

  if (loading || isLoading) return <div className='text-center'>Loading...</div>;
  if (user && dbUser?.role === 'student') return children;
  return <Navigate to="/" />;
};

export default StudentRoute;
