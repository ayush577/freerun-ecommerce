import React, { FC } from 'react'
import { ErrorBoundaryFallbackProps } from './types'
import { cn } from '@/lib/utils'
import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ErrorBoundaryFallback: FC<ErrorBoundaryFallbackProps> = props => {
  const { retry, errorLabel = '', className } = props

  return (
    <div
      id="error-boundary"
      className={cn(
        'flex items-center justify-center mx-auto bg-white rounded-sm shadow-md relative max-w-full w-[600px] p-4 sm:p-5',
        className,
      )}
    >
      <TriangleAlert className="text-red-500" strokeWidth={1.5} size={48} />
      <div className="h-10" />
      <div className="text-lg text-gray-400">
        {errorLabel || 'This could not be loaded'}
      </div>
      <div className="text-gray-400 my-4">We&apos;ve been notified.</div>
      <Button variant="link" onClick={() => retry?.()}>
        Retry
      </Button>
    </div>
  )
}
