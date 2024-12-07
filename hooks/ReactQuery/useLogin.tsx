import { FormSchema } from '@/components/organisms/LoginForm/validationSchema'
import { login } from '@/endpoints/users'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => login(data),
  })
}
