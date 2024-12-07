'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect } from 'react'
import { BaseModalProps, ModalOverLayProps } from './types'
import { activeModalStore, closeModal } from './modal-services'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { ModalCollectionIds } from './ModalCollectionTypes'

export const BaseModal: FC<BaseModalProps> = props => {
  const {
    track,
    modalId,
    children,
    hideCloseButton = false,
    variant = 'normal',
    closeOnOverlayClick = true,
    closeOnPressEscKey = true,
    canDismiss = true,
    // CustomErrorBoundary,
  } = props

  /* Variable */
  const modalStyleBase =
    'relative bg-primary-foreground rounded-lg max-h-[calc(100% - 40px)]'
  const modalButtonStyleBase =
    'h-8 w-8 border-[1.5px] border rounded-[50%] grid place-items-center cursor-pointer bg-border/80 hover:bg-border'

  /* Close Modal */
  const closeModalHandler = useCallback(() => {
    closeModal(modalId as ModalCollectionIds)
  }, [modalId])

  /* Close Modal on Overlay Click */
  const onOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
      if (closeOnOverlayClick && canDismiss) {
        closeModalHandler()
      }
    },
    [],
  )

  /* Close Modal on Pressing Esc Key */
  const onPressEscKey = useCallback(
    (event: KeyboardEvent) => {
      // close modal only when its at the last index of activeModal array
      // This will prevent this modal from getting closed if there is another modal on top of it
      if (closeOnPressEscKey && canDismiss && event.key === 'Escape') {
        const activeModalState = activeModalStore.getState().state
        const isLastModal =
          activeModalState?.[activeModalState.length - 1]?.id === modalId
        if (isLastModal) {
          closeModalHandler()
        }
      }
    },
    [canDismiss, closeModalHandler, closeOnPressEscKey, modalId],
  )

  /* UseEffect to handle onPressEscKey listener */
  useEffect(() => {
    document.addEventListener('keydown', onPressEscKey)

    return () => {
      document.removeEventListener('keydown', onPressEscKey)
    }
  }, [onPressEscKey])

  /* Track */
  useEffect(() => {
    // analytics will be fired for every modal
    track(modalId)
  }, [modalId])

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <ModalOverLay overlayBg="blur" onClick={onOverlayClick} />
      {/* Normal variant */}
      {variant === 'normal' && (
        <div className={cn(modalStyleBase, 'flex items-center justify-center transition-all duration-300')}>
          <div className="overflow-auto relative rounded-lg max-w-[calc(100vw_-_20px)] max-h-[calc(100vh_-_40px)] self-stretch">
            {children}
          </div>
          {!hideCloseButton && canDismiss && (
            <div
              onClick={() => {
                closeModalHandler()
              }}
              className={cn(modalButtonStyleBase, 'absolute right-3 top-3')}
            >
              <X size={16} opacity={0.6} className="text-gray-400" />
            </div>
          )}
        </div>
      )}
      {/* Fullscreen variant */}
      {variant === 'fullScreen' && (
        <div className="flex-auto min-h-0 min-w-0 flex h-full">
          {children}
          {!hideCloseButton && canDismiss && (
            <div
              onClick={() => {
                closeModalHandler()
              }}
              className={cn(
                modalButtonStyleBase,
                'absolute right-1 top-1 z-[1]',
              )}
            >
              <X size={16} opacity={0.6} className="text-gray-400" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* Modal Overlay */
const ModalOverLay = ({ onClick, overlayBg }: ModalOverLayProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'absolute left-0 top-0 w-full h-full',
        overlayBg === 'blur' && 'backdrop-blur', // Applies the blur effect
      )}
    />
  )
}
