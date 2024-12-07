'use client'
import React, { FC } from 'react'
import { SingleModalTemplateProps } from './types'
import { createPortal } from 'react-dom'
import { BaseModal } from './BaseModal'

export const SingleModalTemplate: FC<SingleModalTemplateProps> = props => {
  const { activeModal, collection, track, CustomErrorBoundary } = props
  const { options } = activeModal

  const {
    closeOnOverlayClick,
    closeOnPressEscKey,
    hideCloseButton,
    variant,
    closeCallback,
    canDismiss,
  } = options ?? {}

  const ModalElement = collection(activeModal.data)?.[activeModal.id]

  return createPortal(
    <BaseModal
      track={track}
      hideCloseButton={hideCloseButton}
      closeOnPressEscKey={closeOnPressEscKey}
      variant={variant}
      modalId={activeModal.id}
      closeOnOverlayClick={closeOnOverlayClick}
      closeCallback={closeCallback}
      canDismiss={canDismiss}
      CustomErrorBoundary={CustomErrorBoundary}
    >
      {ModalElement}
    </BaseModal>,
    document.querySelector('#modal-root') as HTMLElement,
  )
}
