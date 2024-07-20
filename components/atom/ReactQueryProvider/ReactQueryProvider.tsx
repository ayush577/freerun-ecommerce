'use client'

import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { useState } from 'react'

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 24 * 30, // 30 days
            gcTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
          mutations: {
            gcTime: Infinity,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
