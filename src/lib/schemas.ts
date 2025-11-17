import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: '帳號 / 電子郵件 為必填欄位',
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
  email: z
    .string()
    .min(1, '帳號 / 電子郵件 為必填欄位')
    .email({
      message: '請輸入有效的電子郵件地址。',
    }),
});

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, {
      message: '舊密碼為必填項。',
    }),
    newPassword: z.string().min(8, {
      message: '新密碼長度至少需 8 個字元。',
    }),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '新密碼與確認密碼不相符。',
    path: ['confirmPassword'],
  });

export const AddAttendeeSchema = z.object({
  name: z.string().min(1, {
    message: '姓名為必填欄位',
  }),
  email: z.string().email({
    message: '請輸入有效的電子郵件地址。',
  }),
  phone: z.string().min(1, {
    message: '手機為必填欄位',
  }),
});

export const EditAttendeeSchema = z.object({
  id: z.string().min(1, {
    message: 'ID 為必填欄位',
  }),
  name: z.string().min(1, {
    message: '姓名為必填欄位',
  }),
  email: z.string().email({
    message: '請輸入有效的電子郵件地址。',
  }),
  phone: z.string().min(1, {
    message: '手機為必填欄位',
  }),
  status: z.string(),
});
