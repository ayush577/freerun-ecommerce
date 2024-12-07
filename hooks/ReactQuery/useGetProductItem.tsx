import { SortBy } from '@/components/organisms/Templates/HomeTemplate/types'
import { products } from '@/endpoints/product'
import { ProductItem } from '@/lib/product-types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const productOptions: UseQueryOptions<ProductItem[]> = {
  queryKey: ['products'],
  queryFn: () => products(),
}

export const useGetProductItem = (sort: SortBy = 'asc') => {
  return useQuery<ProductItem[]>({
    queryKey: ['products', sort],
    queryFn: () => products(sort),
  })
}
