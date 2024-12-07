import {
  openModal,
  updateModal,
} from '@/components/ui/BaseModal/modal-services'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

export const Modal4 = ({ closeModal }: any) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      updateModal('TestModal4', {
        options: {
          hideCloseButton: true,
        },
      })
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="p-5 space-y-3">
      <div className="text-xl">Modal4</div>
      <div>count: {count}</div>
      <div className="text-base">This will be updated in 10 seconds</div>
      <div className='space-x-3'>
        <Button
          onClick={() => {
            setCount(prev => prev + 1)
          }}
        >
          Increase
        </Button>
        <Button onClick={() => openModal('TestModal1')}>Open Modal 1</Button>
        <Button onClick={() => closeModal()}>Close Modal 4 manually</Button>
      </div>
    </div>
  )
}
