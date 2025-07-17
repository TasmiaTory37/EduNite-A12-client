import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useRole = () => {
  const { user } = useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = localStorage.getItem('access-token');
      const res = await fetch(`https://assignment-12-server-psi-jade.vercel.app/users/${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch role');

      const data = await res.json();
      return data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;