'use client';

import { axiosInstance } from '@/lib/axios';
import { UserContext, UserContextType } from '@/providers/UserProvider';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuLoader2 } from 'react-icons/lu';
import { Button } from '../UI/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../UI/Form';
import { Input } from '../UI/Input';
import { RegisterType, registerFormSchema } from './formSchema';

const register = async (data: RegisterType): Promise<User> => {
  const response = await axiosInstance.post('/auth/register', data, {
    withCredentials: true,
  });

  return response.data;
};

interface RegisterFormProps {
  defaultValues: RegisterType;
}

export default function RegisterForm({ defaultValues }: RegisterFormProps) {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  const { setUser } = useContext(UserContext) as UserContextType;
  const router = useRouter();

  const { mutate, isPending } = useMutation({
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
    onSuccess: (user) => {
      setUser(user);
      router.push('/invoices');
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>last name</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>address email</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>

              <FormControl>
                <Input {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>

              <FormControl>
                <Input {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>avatar link</FormLabel>

              <FormControl>
                <Input {...field} type="url" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="flex w-full items-center justify-center"
          type="submit"
          disabled={isPending}
        >
          {isPending && (
            <LuLoader2 className="mr-2 animate-spin text-base font-bold" />
          )}
          {isPending ? 'Processing ...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
