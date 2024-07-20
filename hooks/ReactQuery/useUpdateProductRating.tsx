import { updateProduct } from '@/endpoints/product'
import { useMutation } from '@tanstack/react-query'

interface UpdateProductRatingProps {
  productId: number
  rating: number
}

export const useUpdateProductRating = () => {
  return useMutation({
    mutationFn: (data: UpdateProductRatingProps) => updateProduct(data),
  })
}
