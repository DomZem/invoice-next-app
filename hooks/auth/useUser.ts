import { axiosInstance } from '@/lib/axios';
import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';

const getUser = async () => {
  const response = await axiosInstance.get<User>('/auth/me', {
    withCredentials: true,
  });

  return response.data;
};

export default function useUser() {
  return useQuery({
    queryFn: getUser,
    queryKey: ['user'],
  });
}
