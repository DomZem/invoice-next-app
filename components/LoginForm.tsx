'use client';

import useLoginMutation from '@/hooks/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLoader2 } from 'react-icons/lu';
import * as z from 'zod';
import { Button } from './UI/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './UI/Form';
import { Input } from './UI/Input';

const loginFormSchema = z.object({
  email: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
});

export type LoginType = z.infer<typeof loginFormSchema>;

const defaultValues: LoginType = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const { mutate, isPending } = useLoginMutation();

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="space-y-8"
      >
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
