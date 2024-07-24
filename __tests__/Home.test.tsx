import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/components/atom/ReactQueryProvider/GetQueryClient'

describe('Home', () => {
  const queryClient = getQueryClient()

  it('renders a heading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    )

    const heading = screen.getByRole('heading', {
      name: /Welcome to TVerito Mart\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
