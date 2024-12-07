import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { cn } from '@/lib/utils'
import React from 'react'
import { Providers } from './Providers'
import UnauthLayout from '@/components/organisms/UnauthLayout/UnauthLayout'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Product list with cart | Freerun Ecommerce',
  description:
    'This is the product list with card assignment from Freerun Ecommerce and it is built using Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        id="main-body"
        className={cn(
          'min-h-screen font-sans antialiased dark',
          fontSans.variable,
        )}
      >
        {/* Main Body */}
        <Providers>
          <UnauthLayout>{children}</UnauthLayout>
        </Providers>
        {/* Modal Root */}
        <div id="modal-root" />
      </body>
    </html>
  )
}
