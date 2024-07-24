'use client'
import React from 'react'
import { ProductItem } from '@/components/molecules/ProductItem/ProductItem'
import { productOptions } from '@/hooks/ReactQuery/useGetProductItem'
import { ProductItem as ProductItemType } from '@/lib/product-types'
import { useSuspenseQuery } from '@tanstack/react-query'

export const HomeTemplate = () => {
  const { data: productList, isLoading } = useSuspenseQuery(productOptions)
  const list: ProductItemType[] = productList || []

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-lg font-bold">Loading...</h1>
      </div>
    )
  }

  return (
    <section className="container">
      <h1 className="text-4xl font-bold text-center mt-14 mb-10">
        Welcome to TVerito Mart
      </h1>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 p-4 max-w-7xl m-auto mb-5">
          {list.map(item => (
            <ProductItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-lg font-bold">No products available</h1>
        </div>
      )}
    </section>
  )
}

