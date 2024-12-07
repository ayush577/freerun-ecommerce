import { ProductItem } from '@/lib/product-types'
import { api } from './api'
import { SortBy } from '@/components/organisms/Templates/HomeTemplate/types'

export async function products(sort: SortBy = 'asc'): Promise<ProductItem[]> {
  try {
    return await api.get(`/products?sort=${sort}`)
  } catch (error) {
    console.error('There was a problem fetching the products:', error)
    throw error
  }
}

export async function categories(): Promise<string[]> {
  try {
    return await api.get('/products/categories')
  } catch (error) {
    console.error('There was a problem fetching the categories:', error)
    throw error
  }
}

export const patchProduct = async (data: {
  productId: number
  rating: number
}) => {
  try {
    return await api.patch(`/carts/${data.productId}`, {
      rating: {
        rate: data.rating,
      },
    })
  } catch (error) {
    console.error('Failed to patch product item rating', error)
    throw error
  }
}
