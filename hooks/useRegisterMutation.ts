import { RegisterType } from '@/components/RegisterForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const register = async (data: RegisterType): Promise<User> => {
  const response = await axiosInstance.post('/auth/register', data, {
    withCredentials: true,
  });

  return response.data;
};

export default function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterType) =>
      toast.promise(register(data), {
        loading: 'Creating account ...',
        success: 'Account has been created 🔥',
        error: (error: Error | AxiosError) => {
          let message = "Something went wrong. Account hasn't been created";

          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.message;

            if (errorMessage) {
              return `${message}. Error: ${errorMessage}`;
            }
          }

          return message;
        },
      }),
    onSuccess: () => {
      router.push('/invoices');
    },
  });
}
