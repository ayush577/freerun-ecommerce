'use client'
import { Header } from '@/components/molecules/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

const UnauthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const showHeader = !pathname.startsWith('/dashboard')

  return (
    <div className="relative flex min-h-screen flex-col">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default UnauthLayout
