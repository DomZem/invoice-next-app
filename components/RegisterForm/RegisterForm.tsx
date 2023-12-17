"use client";

import { axiosInstance } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
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
import { RegisterType, registerFormSchema } from "./formSchema";

const register = async (data: RegisterType) => {
  return axiosInstance.post("/auth/register", data, {
    withCredentials: true,
  });
};

export default function RegisterForm() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterType) =>
      toast.promise(register(data), {
        loading: "Creating account ...",
        success: "Account has been created 🔥",
        error: (error: Error | AxiosError) => {
          let message = "Something went wrong. Account hasn't been created";

          if (axios.isAxiosError(error)) {
            return `${message}. Error: ${error.response?.data.message}`;
          }

          return message;
        },
      }),
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    mutate(data);
  };

  return (
    <section className="w-full max-w-lg rounded-lg bg-white p-6 shadow-wrapper dark:bg-midnightBlue">
      <h2 className="heading-m-text md:heading-l-text mb-6 text-starlessNight dark:text-white">
        Register
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>

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
                  <FormLabel>Last name</FormLabel>

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>

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
                <FormLabel>Avatar link</FormLabel>

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
            {isPending ? "Processing ..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
