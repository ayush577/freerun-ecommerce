import { Button } from '@/components/ui/button'
import React from 'react'

export const Modal1 = (props: any) => {
  const { hideButton, closeModal } = props

  return (
    <div className="p-20 w-[550px] max-w-full flex-center flex-col space-y-5">
      <div className="text-base">Modal 1</div>
      {!hideButton && <Button onClick={() => closeModal()}>Close Modal</Button>}
    </div>
  )
}
