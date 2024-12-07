'use client'
import React, { FC, useEffect } from 'react'
// import { CartProvider } from '@/context/CardContext'
import { ReactQueryProvider } from '@/components/atom/ReactQueryProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Modal } from '@/components/ui/BaseModal/Modal'
import { ModalCollection } from '@/components/ui/BaseModal/ModalCollection'
import { CustomErrorBoundary } from '@/components/molecules/CustomErrorBoundary/CustomErrorBoundary'
import { activeModalAtom } from '@/components/ui/BaseModal/modal-services'
import { Provider, useAtomValue } from 'jotai'
import { Toaster } from '@/components/ui/toaster'

export const Providers: FC<
  Readonly<{
    children: React.ReactNode
  }>
> = ({ children }) => {
  const modals = useAtomValue(activeModalAtom)

  useEffect(() => {
    const body = document.body // Target the body directly

    if (modals.state.length > 0) {
      body.classList.add('modal-scroll-hidden')
    } else {
      body.classList.remove('modal-scroll-hidden')
    }

    // Cleanup on component unmount or when `isAnyModalOpen` changes
    return () => {
      body.classList.remove('modal-scroll-hidden')
    }
  }, [modals.state])

  return (
    <ReactQueryProvider>
      <Provider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <Modal
          collection={ModalCollection}
          track={() => {
            console.log('track')
          }}
          CustomErrorBoundary={CustomErrorBoundary}
        />
      </Provider>
    </ReactQueryProvider>
  )
}
