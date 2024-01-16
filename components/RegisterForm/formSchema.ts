import * as z from 'zod';

const passwordMessagePrefix = 'Password must contains at least';

export const registerFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Required' }).max(18),
    lastName: z.string().min(1, { message: 'Required' }).max(18),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        new RegExp('.*[A-Z].*'),
        `${passwordMessagePrefix} one uppercase character`,
      )
      .regex(
        new RegExp('.*[a-z].*'),
        `${passwordMessagePrefix} one lowercase character`,
      )
      .regex(new RegExp('.*\\d.*'), `${passwordMessagePrefix} one number`)
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        `${passwordMessagePrefix} one special character`,
      )
      .min(8, 'Password must be at least 8 characters in length'),
    confirmPassword: z.string(),
    avatar: z.string().url(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterType = z.infer<typeof registerFormSchema>;
