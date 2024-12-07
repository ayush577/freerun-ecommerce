import React from 'react'

export const Modal3 = (props: any) => {
  const { a } = props
  console.log(props)

  return (
    <div className="p-5 flex-center flex-col">
      Modal3
      <div>{a}</div>
      <div className="h-4" />
      <div className='loader' />
    </div>
  )
}
