import { products } from '@/endpoints/product'
import { ProductItem } from '@/lib/product-types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const productOptions: UseQueryOptions<ProductItem[]> = {
  queryKey: ['products'],
  queryFn: products,
}

export const useGetProductItem = () => {
  return useQuery<ProductItem[]>(productOptions)
}
