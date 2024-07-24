'use client'

import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { useState } from 'react'


const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {

  const [showDevtools, setShowDevTools] = useState(false)

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

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevTools((prev) => !prev)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
