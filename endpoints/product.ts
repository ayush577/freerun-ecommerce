import { ProductItem } from '@/lib/product-types'

export async function products(): Promise<ProductItem[]> {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const products: ProductItem[] = await response.json()
    return products
  } catch (error) {
    console.error('There was a problem fetching the products:', error)
    throw error
  }
}

export const updateProduct = async (data: {
  productId?: number
  rating: number
}) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${data.productId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        rating: {
          rate: data.rating
        }
      }),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const updateProduct = await response.json()
    return updateProduct
  } catch (error) {
    console.error('Its failed to update product item rating', error)
  }
}
