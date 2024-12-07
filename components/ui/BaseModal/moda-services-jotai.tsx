'use client'
import { atom, useAtom } from 'jotai'
import { withImmer } from 'jotai-immer'
import { produce } from 'immer'
import { ModalOptions } from './types'
import { ModalCollectionIds } from './ModalCollectionTypes'

type ModalState = {
  state: {
    id: string
    data?: { closeModal?: () => void; [key: string]: any }
    options?: ModalOptions
  }[]
}

type ModalConfigType = {
  data?: any
  options?: ModalOptions
}

// Define the initial state atom
const modalStateAtom = atom<ModalState>({ state: [] })

// Create an Immer-wrapped atom to mutate the state
export const modalStateAtomWithImmer = withImmer(modalStateAtom)

export const useModal = () => {
  const [modalState, setModalState] = useAtom(modalStateAtomWithImmer)

  /* Close Top Modal */
  const closeTopModal = () => {
    setModalState(prev => {
      produce(prev, draft => {
        const topModal = draft.state[draft.state.length - 1]

        // call the closeback before closing the modal
        if (topModal?.options?.closeCallback) {
          topModal?.options?.closeCallback()
        }
        draft.state.pop()
      })
    })
  }

  /**
   * Close a modal using the given Id.
   * If no Id is passed, it will close the top-most modal
   * @param modalId
   */
  const closeModal = (modalId?: ModalCollectionIds) => {
    if (!modalId) {
      closeTopModal()
      return
    }

    setModalState(prev => {
      produce(prev, draft => {
        const list = [...draft.state]
        const modalToClose = list.find(
          m => m.id === (modalId as unknown as string),
        )

        // call the closeback before closing the modal
        if (modalToClose?.options?.closeCallback) {
          modalToClose?.options?.closeCallback()
        }
        const filteredList = list.filter(
          m => m.id !== (modalId as unknown as string),
        )
        draft.state = filteredList
      })
    })
  }

  /**
   * Open a modal using the given Id
   * @param modalId
   * @param modalProps data and options to be passed to the modal
   */

  const openModal = (
    modalId: ModalCollectionIds,
    modalProps: ModalConfigType,
  ) => {
    const { data, options } = modalProps || {}

    setModalState(prev => {
      produce(prev, draft => {
        if (!draft.state.find(m => m.id === (modalId as unknown as string))) {
          draft.state.push({
            id: modalId as unknown as string,
            data: { closeModal: () => closeModal(modalId), ...data },
            options,
          })
        }
      })
    })
  }

  /**
   * Update an already opened modal by merging the incoming data with the previous data
   * @param modalId
   * @param modalProps data and options to be passed to the modal
   */

  const updateModal = (
    modalId: TemplateStringsArray,
    modalProps: ModalConfigType,
  ) => {
    const { data, options } = modalProps || {}

    setModalState(prev => {
      produce(prev, draft => {
        const currentModalIndex = draft.state.findIndex(
          m => m.id === (modalId as unknown as string),
        )

        if (currentModalIndex > -1) {
          const currentData = draft.state[currentModalIndex].data
          const currentOptions = draft.state[currentModalIndex].options
          /* merge new data  with prev data */
          draft.state[currentModalIndex].data = { ...currentData, ...data }
          /* merge new options with prev options */
          draft.state[currentModalIndex].options = {
            ...currentOptions,
            ...options,
          }
        }
      })
    })
  }

  /**
   * Check if a modal is open or closed based on the given modal Id
   * @param modalId
   * @returns {boolean}
   */

  const isModalOpen = (modalId: ModalCollectionIds) => {
    const activeModals = modalState.state
    if (activeModals.length === 0) return false
    return !!activeModals.find(m => m?.id === (modalId as unknown as string))
  }

  return {
    openModal,
    closeModal,
    updateModal,
    isModalOpen,
  }
}
