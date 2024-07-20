import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/app/page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('Home', () => {
  const queryClient = new QueryClient()

  it('displays loading text when isloading is true', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument(),
    )
  })
})
