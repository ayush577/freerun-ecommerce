/* eslint-disable no-unused-vars */
'use client'

import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'
import { ProductItem } from '@/lib/product-types'

export type CartItem = {
  product: ProductItem
  quantity: number
}

type CartState = {
  cart: CartItem[]
  isOrderConfirmed: boolean
}

type CartAction =
  | { type: 'ADD_TO_CART'; item: ProductItem }
  | { type: 'REMOVE_FROM_CART'; item: ProductItem }
  | { type: 'CLEAR_CART' }
  | { type: 'INCREASE_QUANTITY'; item: ProductItem }
  | { type: 'DECREASE_QUANTITY'; item: ProductItem }
  | { type: 'PLACE_ORDER' }

const initialState: CartState = {
  cart: [],
  isOrderConfirmed: false,
}

function cartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(
        cardItem => cardItem.product.id === action.item.id,
      )

      if (existingIndex !== -1) {
        const updatedCart = [...state.cart]
        updatedCart[existingIndex].quantity += 1
        return { ...state, cart: updatedCart }
      } else {
        return {
          ...state,
          cart: [...state.cart, { product: action.item, quantity: 1 }],
        }
      }
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(
          cardItem => cardItem.product.id !== action.item.id,
        ),
      }
    }

    case 'INCREASE_QUANTITY': {
      const updatedCart = state.cart.map(cartItem => {
        if (cartItem.product.id === action.item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        }
        return cartItem
      })

      const isItemUpdated = updatedCart.some(
        (cartItem, index) => cartItem.quantity !== state.cart[index].quantity,
      )

      return isItemUpdated ? { ...state, cart: updatedCart } : state
    }

    case 'DECREASE_QUANTITY': {
      const updatedCart: CartItem[] = state.cart.reduce(
        (acc: CartItem[], cartItem) => {
          if (cartItem.product.id === action.item.id) {
            const newQuantity = cartItem.quantity - 1
            if (newQuantity > 0) {
              acc.push({ ...cartItem, quantity: newQuantity })
            }
          } else {
            acc.push(cartItem)
          }
          return acc
        },
        [],
      )

      const isCartChanged =
        updatedCart.length !== state.cart.length ||
        updatedCart.some(
          (item, index) => item.quantity !== state.cart[index].quantity,
        )

      return isCartChanged ? { ...state, cart: updatedCart } : state
    }

    case 'PLACE_ORDER':
      return { ...state, isOrderConfirmed: true }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

const CartContext = createContext<{
  cart: CartItem[]
  isOrderConfirmed: boolean
  addToCart: (item: ProductItem) => void
  removeFromCart: (item: ProductItem) => void
  increaseQuantity: (item: ProductItem) => void
  decreaseQuantity: (item: ProductItem) => void
  placeOrder: () => void
  clearCart: () => void
}>({
  cart: [],
  isOrderConfirmed: false,
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  placeOrder: () => {},
  clearCart: () => {},
})

function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if(typeof window === 'undefined') return initialState
    const localData = localStorage.getItem('cart')
    return localData ? JSON.parse(localData) : initialState
  })

  useEffect(() => {
    if (typeof window !== 'undefined'){
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);

  function addToCart(item: ProductItem) {
    dispatch({ type: 'ADD_TO_CART', item })
  }

  function removeFromCart(item: ProductItem) {
    dispatch({ type: 'REMOVE_FROM_CART', item })
  }

  function increaseQuantity(item: ProductItem) {
    dispatch({ type: 'INCREASE_QUANTITY', item })
  }

  function decreaseQuantity(item: ProductItem) {
    dispatch({ type: 'DECREASE_QUANTITY', item })
  }

  function placeOrder() {
    dispatch({ type: 'PLACE_ORDER' })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value = {
    cart: state.cart,
    isOrderConfirmed: state.isOrderConfirmed,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    placeOrder,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart }
