import React from 'react'
import { HomeTemplate } from '@/components/organisms/Templates/HomeTemplate'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/components/atom/ReactQueryProvider/GetQueryClient'
import { categoriesOptions } from '@/hooks/ReactQuery/useGetCategories'

export default function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(categoriesOptions)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeTemplate />
    </HydrationBoundary>
  )
}
