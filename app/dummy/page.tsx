'use client'
import {
  openModal,
  updateModal,
} from '@/components/ui/BaseModal/modal-services'
import { Button } from '@/components/ui/button'
import React from 'react'

const DummyPage = () => {
  return (
    <div className="mt-20 container h-screen space-x-3 space-y-3">
      <Button
        onClick={() => {
          openModal('TestModal1')
        }}
      >
        Open Modal 1
      </Button>
      <Button
        onClick={() => {
          openModal('TestModal2')
        }}
      >
        Open Modal 2
      </Button>
      <Button
        onClick={() => {
          openModal('TestModal3', {
            data: { a: 'hello from modal 3' },
          })
          setTimeout(() => {
            updateModal('TestModal3', {
              data: {
                b: 'new b hello',
                a: 'updated hello from modal 3 after 3 seconds',
              },
            })
          }, 3000)
        }}
      >
        Open Modal 3
      </Button>
      <Button
        onClick={() => {
          openModal('TestModal4')
        }}
      >
        Open Modal 4
      </Button>
      <div className='space-y-3'>
        <div>
          Hide closebutton, close on overlay click, close on press esc key
        </div>
        <div>You cant close this modal without page reload. 😈</div>
        <Button
          onClick={() => {
            openModal('TestModal1', {
              data: {
                hideButton: true
              },
              options: {
                hideCloseButton: true,
                closeOnOverlayClick: false,
                closeOnPressEscKey: false,
              },
            })
          }}
        >
          Open Modal 1 with operations
        </Button>
      </div>
    </div>
  )
}

export default DummyPage
