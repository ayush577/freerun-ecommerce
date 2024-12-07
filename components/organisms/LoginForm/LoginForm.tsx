import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FormSchema } from './validationSchema'
import { setCookie } from 'cookies-next'
import { z } from 'zod'
import { useLogin } from '@/hooks/ReactQuery/useLogin'
import { useToast } from '@/components/ui/use-toast'
import { useUser } from '@/context/userAtom'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Icons } from '@/components/atom/Icons/Icons'
// import { useUserStore } from '@/context/zustandUser'

/* 
  @username: johnd 
  @password: m38rmF$
  @description: It's fake login provide by fakestoreapi.com | (username and password - https://fakestoreapi.com/users)
  @params: username and password (https://fakestoreapi.com/auth/login)
  @return: token
*/

export const LoginForm = ({ closeModal }: { closeModal: () => void }) => {
  const { toast } = useToast()

  const { setToken } = useUser()

  const { mutate: loginMutation, isPending } = useLogin()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: 'johnd',
      password: 'm38rmF$',
    },
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    loginMutation(data, {
      onSuccess: data => {
        setCookie('token', data.token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
        })
        setToken(data.token)
        toast({
          title: 'Login Successful',
          description: 'You have successfully logged in',
        })
        closeModal()
      },
      onError: () => {
        toast({
          title: 'Uh oh! Login Failed',
          description: 'Wrong username or password provided',
        })
      },
    })
  }

  return (
    <div className="w-[450px] px-5 py-8 flex-center flex-col">
      <h2 className="text-xl font-bold text-orange-500">Login</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                <FormControl className="relative">
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-2" />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Username
          </Button>
        </form>
      </Form>
    </div>
  )
}
