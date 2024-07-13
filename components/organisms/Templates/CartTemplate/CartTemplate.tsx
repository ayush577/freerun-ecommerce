'use client'
import React from 'react'
import { useCart } from '@/context/CardContext'
import { EmptyCart } from '@/components/molecules/EmptyCart/EmptyCart'
import { CartList } from '@/components/molecules/CartList/CartList'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Icons } from '@/components/atom/Icons/Icons'

export const CartTemplate = () => {
  const { cart, placeOrder } = useCart()
  const allItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0)

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  )

  return (
    <section className="container flex w-full max-w-[50rem] flex-col gap-[2.4rem] rounded-[1.2rem] p-[2.4rem]">
      <h2 className="text-3xl max-md:text-xl font-bold text-orange-400 max-md:text-center">
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

          <Dialog>
            <DialogTrigger>
              <Button
                variant={'default'}
                size={'lg'}
                onClick={placeOrder}
                className="text-white bg-orange-500 hover:bg-orange-600 w-full"
              >
                Confirm Order
              </Button>
            </DialogTrigger>
            <DialogContent className="justify-items-center">
              <Icons.greenTick className="size-20 text-green-500 mb-3" />
              <DialogTitle className="mb-2">
                Great! Your order has been successfully placed.
              </DialogTitle>
              <DialogClose
                onClick={placeOrder}
                className="p-2 rounded-sm text-white bg-orange-500 hover:bg-orange-600"
              >
                Continue Shopping
              </DialogClose>
            </DialogContent>
          </Dialog>
        </>
      )}
    </section>
  )
}
