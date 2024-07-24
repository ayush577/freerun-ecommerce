'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { useState } from 'react'
import { getQueryClient } from './GetQueryClient'

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    d => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [showDevtools, setShowDevTools] = useState(false)

  const queryClient = getQueryClient()

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevTools(prev => !prev)
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
