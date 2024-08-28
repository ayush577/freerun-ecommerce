import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
// import { CartProvider } from '@/context/CardContext'
import React from 'react'
import ReactQueryProvider from '@/components/atom/ReactQueryProvider/ReactQueryProvider'
import { Header } from '@/components/molecules/Header'
import { JotaiProvider } from '@/components/atom/JotaiProvider/JotaiProvider'

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
        className={cn(
          'min-h-screen font-sans antialiased dark overflow-y-scroll',
          fontSans.variable,
        )}
      >
        <ReactQueryProvider>
          <JotaiProvider>
            <TooltipProvider>
              <div className="relative z-50 flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
              </div>
            </TooltipProvider>
          </JotaiProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
