import React, { FC } from 'react'
import { CustomErrorBoundaryProps } from './types'
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback'

/* Todo: Add sentry */
const ErrorBoundary = ({ children }: any) => {
  return (
    <div>
      <h1>Import from sentry</h1>
      {children}
    </div>
  )
}

export const CustomErrorBoundary: FC<CustomErrorBoundaryProps> = props => {
  const { children, retryCallback, errorLabel, className } = props

  const fallbackElement = ({ resetError }: any) => {
    return (
      <ErrorBoundaryFallback
        className={className}
        errorLabel={errorLabel}
        retry={() => {
          retryCallback?.()
          resetError()
        }}
      />
    )
  }

  return <ErrorBoundary fallback={fallbackElement}>{children}</ErrorBoundary>
}
