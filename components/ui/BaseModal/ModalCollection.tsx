import React from 'react'
import { ModalCollectionData } from './ModalCollectionTypes'
import dynamic from 'next/dynamic'

const Loader = () => {
  return (
    <div className="w-40 h-40 mx-auto bg-primary-foreground flex-center">
      <div className="loader" />
    </div>
  )
}

const TestModal1 = dynamic(
  () =>
    import('@/components/molecules/TestModals/Modal1').then(mod => mod.Modal1),
  {
    loading: () => {
      return <Loader />
    },
  },
)
const TestModal2 = dynamic(
  () =>
    import('@/components/molecules/TestModals/Modal2').then(mod => mod.Modal2),
  {
    loading: () => {
      return <Loader />
    },
  },
)
const TestModal3 = dynamic(
  () =>
    import('@/components/molecules/TestModals/Modal3').then(mod => mod.Modal3),
  {
    loading: () => {
      return <Loader />
    },
  },
)
const TestModal4 = dynamic(
  () =>
    import('@/components/molecules/TestModals/Modal4').then(mod => mod.Modal4),
  {
    loading: () => {
      return <Loader />
    },
  },
)

const LoginForm = dynamic(
  () => import('@/components/organisms/LoginForm').then(mod => mod.LoginForm),
  {
    loading: () => {
      return <Loader />
    },
  },
)

export const ModalCollection = (props: any) => {
  const data: ModalCollectionData = {
    TestModal1: <TestModal1 {...props} />,
    TestModal2: <TestModal2 {...props} />,
    TestModal3: <TestModal3 {...props} />,
    TestModal4: <TestModal4 {...props} />,
    LoginForm: <LoginForm {...props} />,
  }
  return data
}
