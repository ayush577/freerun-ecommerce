import React from 'react'
import { HomeTemplate } from '@/components/organisms/Templates/HomeTemplate'
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import { productOptions } from '@/hooks/ReactQuery/useGetProductItem'
import { getQueryClient } from '@/components/atom/ReactQueryProvider/GetQueryClient'

export default function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(productOptions)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeTemplate />
    </HydrationBoundary>
  )
}
