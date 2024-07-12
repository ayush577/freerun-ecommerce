'use client'
import React from 'react'
import { useCart } from '@/context/CardContext'
import { EmptyCart } from '@/components/molecules/EmptyCart/EmptyCart'
import { CartList } from '@/components/molecules/CartList/CartList'
import { Button } from '@/components/ui/button'

export const CartTemplate = () => {
  const { cart, placeOrder } = useCart()
  const allItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0)

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  )

  return (
    <section className="container flex w-full max-w-[50rem] flex-col gap-[2.4rem] rounded-[1.2rem] p-[2.4rem]">
      <h2 className="text-3xl font-bold text-orange-400">
        Your Cart ({allItemsInCart})
      </h2>

      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <ul className="flex flex-col gap-[1.6rem]">
            {cart.map(item => (
              <CartList
                key={item.product.id}
                item={item.product}
                quantity={item.quantity}
              />
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <h3 className="text-lg">Order Total</h3>
            <p className="text-2xl font-bold text-orange-400">
              ${total.toFixed(2)}
            </p>
          </div>

          <Button
            variant={'default'}
            size={'lg'}
            onClick={placeOrder}
            className="text-white bg-orange-500 hover:bg-orange-600"
          >
            Confirm Order
          </Button>
        </>
      )}
    </section>
  )
}
