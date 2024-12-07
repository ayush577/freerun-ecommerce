import { ReactNode } from "react";

export interface CustomErrorBoundaryProps {
  children: ReactNode;
  retryCallback?: () => void;
  errorLabel?: string;
  className?: string;
}

export interface ErrorBoundaryFallbackProps {
  retry?: () => void
  errorLabel?: string
  className?: string
}