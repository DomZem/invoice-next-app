import { LoginType } from '@/components/LoginForm';
import { axiosInstance } from '@/lib/axios';
import { User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const login = async (data: LoginType): Promise<User> => {
  const response = await axiosInstance.post('/auth/login', data, {
    withCredentials: true,
  });

  return response.data;
};

export default function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push('/invoices');
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          `Something went wrong. Error: ${err.response?.data.message}`,
        );
      } else {
        toast.error('Something went wrong. Try maybe later.');
      }
    },
  });
}
