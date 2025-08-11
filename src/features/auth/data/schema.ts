import { z } from 'zod'

export const RegisterUserSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter the name' }),
    email: z
      .string()
      .min(1, { message: 'Please enter an email address' })
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(1, { message: 'Please enter a password' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' })
      .min(6, { message: 'Password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Please enter a password' })
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const RegisterResponse = {}

export type User = {
  id: number
  name: string
  email: string
}
