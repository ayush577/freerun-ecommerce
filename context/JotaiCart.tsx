'use client'

import { atom, useSetAtom } from 'jotai'
import { ProductItem } from '@/lib/product-types'
import { atomWithStorage } from 'jotai/utils'

export type CartItem = {
  product: ProductItem
  quantity: number
}

type CartState = {
  cart: CartItem[]
  isOrderConfirmed: boolean
}

const initialState: CartState = {
  cart: [],
  isOrderConfirmed: false,
}

export const cartAtom = atomWithStorage<CartItem[]>('cart', initialState.cart)
export const isOrderConfirmedAtom = atom<Boolean>(initialState.isOrderConfirmed)

export const useCart = () => {
  const setCart = useSetAtom(cartAtom)

  const addToCart = (item: ProductItem) => {
    setCart((prev: CartItem[] | undefined) => {
      const cartItems = Array.isArray(prev) ? prev : []

      const itemIndex = cartItems.findIndex(
        cartItem => cartItem.product.id === item.id,
      )

      if (itemIndex !== -1) {
        const updatedCart = [...cartItems]
        updatedCart[itemIndex].quantity += 1
        return updatedCart
      } else {
        return [...cartItems, { product: item, quantity: 1 }]
      }
    })
  }

  const increaseQuantity = (item: ProductItem) => {
    setCart((prev: CartItem[]) => {
      const updateCart = prev.map(cartItem => {
        if (cartItem.product.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        }
        return cartItem
      })

      const isItemUpdated = updateCart.some(
        cartItem => cartItem.product.id === item.id,
      )

      return isItemUpdated
        ? updateCart
        : [...prev, { product: item, quantity: 1 }]
    })
  }

  const decreaseQuantity = (item: ProductItem) => {
    setCart((prev: CartItem[]) => {
      const updateCart = prev
        .map(cartItem => {
          if (cartItem.product.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
          }
          return cartItem
        })
        .filter(cartItem => cartItem.quantity > 0)

      return updateCart.length > 0 ? updateCart : []
    })
  }

  const removeFromCart = (item: ProductItem) => {
    setCart((prev: CartItem[]) => {
      const updatedCart = prev.filter(
        cartItem => cartItem.product.id !== item.id,
      )

      return updatedCart
    })
  }

  return {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  }
}
