import { axiosInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const logout = async (): Promise<{ message: string }> => {
  const response = await axiosInstance.get('/auth/logout', {
    withCredentials: true,
  });

  return response.data;
};

export default function useLogoutMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: () =>
      toast.promise(logout(), {
        loading: 'Logging out ...',
        success: 'You have been logged out',
        error: (error: Error | AxiosError) => {
          let message = 'Something went wrong. You have not been logged out';

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
      router.replace('/');
    },
  });
}
