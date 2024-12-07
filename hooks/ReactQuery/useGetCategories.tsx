import { categories } from '@/endpoints/product'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const categoriesOptions: UseQueryOptions<string[]> = {
  queryKey: ['categories'],
  queryFn: categories,
}

export const useGetCategories = () => {
  return useQuery<string[]>(categoriesOptions)
}
