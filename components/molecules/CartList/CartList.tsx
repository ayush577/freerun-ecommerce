'use client'

import { useCart } from '@/context/CardContext'
import { ProductItem } from '@/lib/product-types'
import React, { FC } from 'react'
import Image from 'next/image'
import { Icons } from '@/components/atom/Icons/Icons'
import { Button } from '@/components/ui/button'

interface CartListProps {
  item: ProductItem
  quantity: number
}

export const CartList: FC<CartListProps> = ({ item, quantity }) => {
  //* Props
  const { title, price, image } = item

  //* Hooks
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart()

  //* Functions
  const handleIncreaseQuantity = () => {
    increaseQuantity(item)
  }

  const handleDecreaseQuantity = () => {
    decreaseQuantity(item)
  }

  return (
    <li className="flex items-center justify-between border-b border-zinc-900 pb-[1.6rem]">
      <div className="flex items-center gap-5">
        <div className="relative rounded-md h-[80px] w-[80px] bg-white overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="rounded-[0.8rem] object-contain"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
          <p className="flex gap-2">
            <button onClick={handleDecreaseQuantity}>
              <Icons.minus className="h-[24px] w-[24px] text-white" />
            </button>
            <span className="mx-1 text-lg font-semibold text-orange-500">
              {quantity}x
            </span>
            <button onClick={handleIncreaseQuantity}>
              <Icons.plus className="h-[24px] w-[24px] text-white" />
            </button>
            <span className="ml-4 w-[5rem] text-lg text-orange-300">
              @${price.toFixed(2)}
            </span>
            <span className="w-[3.8rem] text-lg font-semibold text--orange-300">
              ${(price * quantity).toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      <Button onClick={() => removeFromCart(item)} variant="ghost">
        <Icons.cross className="h-[24px] w-[24px] text-orange-300" />
      </Button>
    </li>
  )
}
