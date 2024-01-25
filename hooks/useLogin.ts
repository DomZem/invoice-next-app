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
    onError: (error: Error | AxiosError) => {
      let message = 'Something went wrong. You have not been logged in';

      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;

        if (errorMessage) {
          toast.error(`${message}. Error: ${errorMessage}`);
        }
      }

      toast.error(message);
    },
  });
}
