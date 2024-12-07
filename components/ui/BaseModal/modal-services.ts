/* 
  Using Jotai-Zustand and immer to manage modals
*/

/* eslint-disable no-param-reassign */
// import { string } from 'components/organisms/BaseModal/ModalCollectionType'
import { useAtom } from 'jotai'
import { withImmer } from 'jotai-immer'
import { atomWithStore } from 'jotai-zustand'
import { create } from 'zustand'
import { produce } from 'immer'
import { ModalOptions } from './types'
import { ModalCollectionIds } from './ModalCollectionTypes'

export const activeModalStore = create<{
  state: {
    id: string
    data?: { closeModal?: () => void; [key: string]: any }
    options?: ModalOptions
  }[]
}>(() => ({
  state: [],
}))

export const activeModalAtom = atomWithStore(activeModalStore)

export const activeModalsAtomWithImmer = withImmer(activeModalAtom)

export const useActiveModalsAtomWithImmer = () => {
  return useAtom(activeModalsAtomWithImmer)
}

export type ModalConfigType = {
  data?: any
  options?: ModalOptions
}

/**
 * Open a modal using the given Id
 * @param modalId
 * @param modalProps data and options to be passed to the modal
 */
export const openModal = <T extends ModalCollectionIds>(
  modalId: T,
  modalProps?: ModalConfigType,
) => {
  const { data, options } = modalProps || {}
  activeModalStore.setState(prev =>
    produce(prev, draft => {
      // open a new modal only if it doesn't already exists
      if (
        !draft.state.find(
          (d: { id: string }) => d.id === (modalId as unknown as string),
        )
      ) {
        draft.state.push({
          id: modalId as unknown as string,
          // pass the closeModal props to be used by the inner modal Component
          data: { closeModal: () => closeModal(modalId), ...data },
          options,
        })
      }
    }),
  )
}

// To completely reset the props, we can have a new handler if required
/**
 * Update an already opened modal by merging the incoming data with the previous data
 * @param modalId
 * @param modalProps data and options to be passed to the modal
 */
export const updateModal = <T extends ModalCollectionIds>(
  modalId: T,
  modalProps: ModalConfigType,
) => {
  const { data, options } = modalProps || {}
  activeModalStore.setState(prev =>
    produce(prev, (draft: { state: any[] }) => {
      const currentModalIndex = draft.state.findIndex(
        (l: { id: string }) => l.id === (modalId as unknown as string),
      )
      if (currentModalIndex > -1) {
        const currentData = draft.state[currentModalIndex].data
        const currentOptions = draft.state[currentModalIndex].options
        // merge new data with prev data
        draft.state[currentModalIndex].data = { ...currentData, ...data }
        // merge new options with prev options
        draft.state[currentModalIndex].options = {
          ...currentOptions,
          ...options,
        }
      }
    }),
  )
}
/**
 * Close a modal using the given Id.
 * If no Id is passed, it will close the top-most modal
 * @param modalId
 */
export const closeModal = <T extends ModalCollectionIds>(modalId?: T) => {
  if (!modalId) {
    closeTopModal()
    return
  }
  activeModalStore.setState(prev =>
    produce(prev, (draft: { state: any[] }) => {
      const list = [...draft.state]
      const modalToClose = list.find(
        m => m.id === (modalId as unknown as string),
      )

      // call the closeback before closing the modal
      if (modalToClose?.options?.closeCallback) {
        modalToClose?.options?.closeCallback?.()
      }
      const filteredList = list.filter(
        m => m.id !== (modalId as unknown as string),
      )
      draft.state = filteredList
    }),
  )
}

export const closeTopModal = () => {
  activeModalStore.setState(prev =>
    produce(prev, (draft: { state: any[] }) => {
      const topModal = draft.state[draft.state.length - 1]
      // call the closeback before closing the modal
      if (topModal?.options?.closeCallback) {
        topModal?.options?.closeCallback()
      }
      draft.state.pop()
    }),
  )
}

/**
 * Check if a modal is open or closed based on the given modal Id
 * @param modalId
 * @returns {boolean}
 */
export const isModalOpen = <T extends ModalCollectionIds>(modalId: T) => {
  const activeModals = activeModalStore.getState()?.state
  if (activeModals?.length === 0) return false
  return !!activeModals?.find(
    modal => modal?.id === (modalId as unknown as string),
  )
}
