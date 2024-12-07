import { FormSchema } from '@/components/organisms/LoginForm/validationSchema'
import { api } from './api'
import { z } from 'zod'

export const login = async (data: z.infer<typeof FormSchema>): Promise<any> => {
  try {
    const authToken = api.post('/auth/login', data)
    return authToken
  } catch (error) {
    console.error('Failed to login')
    throw error
  }
}
