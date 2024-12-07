/* eslint-disable no-unused-vars */
import { CustomErrorBoundaryProps } from "@/components/molecules/CustomErrorBoundary/types"
import { ComponentType } from "react"


export type ModalProps = {
  collection: (props: any) => any
  track: (props: any) => any
  CustomErrorBoundary: ComponentType<CustomErrorBoundaryProps>
}

export type ModalVariant = 'fullScreen' | 'normal'

export interface ModalOptions {
  closeOnOverlayClick?: boolean
  closeOnPressEscKey?: boolean
  closeCallback?: () => void
  hideCloseButton?: boolean
  canDismiss?: boolean
  variant?: ModalVariant
}

export interface SingleModalTemplateProps extends ModalProps {
  activeModal: {
    id: string
    data?: { closeModal?: () => void, [key: string]: any }
    options?: ModalOptions
  }
}

export interface BaseModalProps {
  track: (popupId: string) => void
  modalId: string
  children: React.ReactNode
  hideCloseButton?: boolean
  closeOnPressEscKey?: boolean
  closeCallback?: () => void
  closeOnOverlayClick?: boolean
  variant?: ModalVariant
  canDismiss?: boolean
  CustomErrorBoundary: ComponentType<CustomErrorBoundaryProps>
}


export interface ModalOverLayProps { 
  overlayBg?: 'blur'
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}