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

export const AddMenuSchema = z.object({
  title: z.string().min(1, {
    message: '標題為必填欄位',
  }),
  status: z.string(),
  sort: z.number().min(1, { message: "排序為必填欄位"}),
  systemFeatures: z.array(z.string()).refine(value => value.some(item => item), {
    message: "至少需選擇一個系統功能",
  }),
});

export const AddSystemFeatureSchema = z.object({
  title: z.string().min(1, { message: "標題為必填欄位" }),
  status: z.string(),
  controller: z.string().min(1, { message: "Controller 為必填欄位" }),
  action: z.string().min(1, { message: "Action 為必填欄位" }),
  parameters: z.string().min(1, { message: "參數為必填欄位" }),
  includedFunctions: z.array(
    z.object({
      name: z.string().min(1, { message: "功能名稱不得為空" }),
    })
  ).min(1, { message: "至少需包含一個功能" }),
});
