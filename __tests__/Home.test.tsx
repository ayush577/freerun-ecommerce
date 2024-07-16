import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

it('should render the Home page', () => {
  const queryClient = new QueryClient();
  
  render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
  expect(screen.getByText('loading...')).toBeInTheDocument();
});