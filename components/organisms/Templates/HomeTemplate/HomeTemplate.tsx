'use client'
import React, { useState, useMemo, useCallback } from 'react'
import { ProductItem } from '@/components/molecules/ProductItem/ProductItem'
import { useGetProductItem } from '@/hooks/ReactQuery/useGetProductItem'
import { ProductItem as ProductItemType } from '@/lib/product-types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { categoriesOptions } from '@/hooks/ReactQuery/useGetCategories'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SortBy } from './types'

export const HomeTemplate = () => {
  /* State */
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSort, setSelectedSort] = useState<SortBy>('asc')

  /* Fetch Products and Categories */
  const {
    data: productList,
    isLoading: productLoading,
    isError: productError,
  } = useGetProductItem(selectedSort)
  const { data: categories, isError: categoriesError } =
    useSuspenseQuery(categoriesOptions)

  /* Derived Data */
  const categoryList: string[] = useMemo(
    () => (categories ? ['all', ...categories] : []),
    [categories],
  )
  const filteredProducts: ProductItemType[] = useMemo(() => {
    if (!productList) return []
    return selectedCategory === 'all'
      ? productList
      : productList.filter(item => item.category === selectedCategory)
  }, [productList, selectedCategory])

  /* Event Handlers */
  const filterByCategory = useCallback(
    (category: string) => setSelectedCategory(category),
    [],
  )
  const handleSortChange = useCallback(
    (sort: SortBy) => setSelectedSort(sort),
    [],
  )

  return (
    <section className="container">
      <h1 className="text-4xl font-bold text-center mt-14 mb-16">
        Welcome to <span className="text-orange-500">freerun</span> ecommerce
      </h1>

      {/* Category Filters */}
      {categoriesError ? (
        <div className="text-center mt-10">
          <h1 className="text-lg font-bold">Failed to load categories</h1>
        </div>
      ) : categoryList.length > 0 ? (
        <div className="flex-center gap-x-6 max-w-5xl m-auto">
          {categoryList.map(category => (
            <button
              key={category}
              className={cn(
                'hover:bg-zinc-700 cursor-pointer px-4 py-2 rounded-md',
                category === selectedCategory && 'text-orange-500',
              )}
              onClick={() => filterByCategory(category)}
              aria-label={`Filter by ${category}`}
            >
              <p className="text-lg font-bold capitalize">{category}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-lg font-bold">No categories available</h1>
        </div>
      )}

      <div className="h-5" />
      <div className="max-w-7xl border-b-[1px] border-gray-50/50 w-full mx-auto" />
      <div className="h-5" />

      {/* Sorting */}
      <div className="max-w-7xl flex items-start justify-end py-4">
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Desc</SelectItem>
            <SelectItem value="asc">Asc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      {productError ? (
        <div className="text-center mt-10">
          <h1 className="text-lg font-bold">Failed to load products</h1>
        </div>
      ) : productLoading ? (
        <div className="flex-center text-center">Loading...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 p-4 max-w-7xl m-auto mb-5">
          {filteredProducts.map(item => (
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
