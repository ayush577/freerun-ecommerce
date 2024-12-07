'use client'
import React, { FC, useEffect, useRef } from 'react'
import { ModalProps } from './types'
import { useActiveModalsAtomWithImmer } from './modal-services'
import { SingleModalTemplate } from './SingleModalTemplate'

export const Modal: FC<ModalProps> = props => {
  const { collection, track, CustomErrorBoundary } = props
  const mounted = useRef(false)
  const [activeModals] = useActiveModalsAtomWithImmer()

  useEffect(() => {
    mounted.current = true
  }, [])

  if (!activeModals.state || activeModals.state.length === 0) {
    return null
  }

  if (mounted.current) {
    return (
      <>
        {activeModals.state.map(activeModals => {
          return (
            <SingleModalTemplate
              key={activeModals.id}
              activeModal={activeModals}
              collection={collection}
              track={track}
              CustomErrorBoundary={CustomErrorBoundary}
            />
          )
        })}
      </>
    )
  }

  return null
}
