"use client";

import { axiosInstance } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import * as z from "zod";
import { Button } from "../ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";

const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginFormSchema>;

const login = async (data: LoginType) => {
  return axiosInstance.post("/auth/login", data, {
    withCredentials: true,
  });
};

export default function LoginForm() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/invoice");
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        toast.error(`Something went wrong. ${err.response?.data.message}`);
      } else {
        toast.error("Something went wrong. Try maybe later.");
      }
    },
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    mutate(data);
  };

  return (
    <section className="w-full max-w-lg rounded-lg bg-white p-6 shadow-wrapper dark:bg-midnightBlue">
      <h2 className="heading-m-text md:heading-l-text mb-6 text-starlessNight dark:text-white">
        Login
      </h2>
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address email</FormLabel>
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
                <FormLabel>Password</FormLabel>
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
            {isPending ? "Processing ..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
