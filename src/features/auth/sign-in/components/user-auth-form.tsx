import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from '@tabler/icons-react'
import axiosClient from '@/lib/axios-client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { useAuth } from '@/features/auth/context/auth-context'
import {
  LoginSchema,
  LoginSchemaType,
  RegisterUserSchema,
  RegisterUserSchemaType,
} from '../../data/schema'
import { toast } from 'sonner'

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginSchemaType) {
    setIsLoading(true)
    try {
      const res = await axiosClient.post('/auth/login', data)

      const { user, accessToken } = res.data.data
      login(user, accessToken)

      form.reset()
      navigate({ to: '/' })
    } catch (error: any) {
      const apiErrors = error.response?.data

      if (apiErrors?.errors) {
        Object.entries(apiErrors.errors).forEach(([field, messages]) => {
          form.setError(field as keyof LoginSchemaType, {
            type: 'server',
            message: (messages as string[])[0],
          })
        })
      } else if (apiErrors?.message) {
        toast.error(apiErrors.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          Login
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>
              Or continue with
            </span>
          </div>
        </div>

        {/* <div className='grid grid-cols-1'>
          <Button variant='outline' type='button' disabled={isLoading}>
            <IconBrandGoogle className='h-4 w-4' /> Google
          </Button>
        </div> */}
      </form>
    </Form>
  )
}
