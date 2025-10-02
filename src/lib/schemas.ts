import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: '帳號為必填項。',
  }),
  password: z.string().min(1, {
    message: '密碼為必填項。',
  }),
});

export const SignUpSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long.',
    }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});
