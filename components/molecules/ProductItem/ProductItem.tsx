import React from 'react'
import { useCart } from '@/context/CardContext'
import useMediaQuery from '@/hooks/useMediaQuery'
import { ProductItem as ProductItemType } from '@/lib/product-types'
import { FC } from 'react'
import Image from 'next/image'
import { Icons } from '@/components/atom/Icons/Icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface ProductItemProps {
  item: ProductItemType
}

export const ProductItem: FC<ProductItemProps> = ({ item }) => {
  //* Props
  const { title, price, category, image, description } = item

  //* Media Query
  const isDesktop = useMediaQuery('(min-width: 1300px) and (max-width: 2400px)')
  const isTablet = useMediaQuery('(min-width: 600px) and (max-width: 1299px)')

  //* Cart Context
  const { addToCart, cart, decreaseQuantity, increaseQuantity } = useCart()

  //* Functions
  const isItemInCart = cart.some(cartItem => cartItem.product.id === item.id)
  
  const handleAddToCart = () => {
    addToCart(item)
  }
  
  const handleIncreaseQuantity = () => {
    increaseQuantity(item)
  }
  
  const handleDecreaseQuantity = () => {
    decreaseQuantity(item)
  }

  //* Render Functions Component
  const renderAddToCartButton = () => {
    return (
      isItemInCart ? (
        <>
          <div className="z-20 -mt-[2.2rem] flex w-[14rem] items-center justify-between rounded-full bg-orange-500 p-[1rem]">
            <button onClick={handleDecreaseQuantity}>
              <Icons.minus className="h-[24px] w-[24px] text-white" />
            </button>

            <span className="text-lg font-semibold text-white">
              {cart.find(cartItem => cartItem.product.id === item.id)?.quantity}
            </span>
            <button onClick={handleIncreaseQuantity}>
              <Icons.plus className="h-[24px] w-[24px] text-white" />
            </button>
          </div>
        </>
      ) : (
        <button
          className="group z-20 -mt-[2.2rem] flex w-[14rem] items-center justify-center gap-[0.8rem] rounded-full bg-orange-500 p-[1rem] transition-all duration-300 hover:border-orange-500"
          onClick={handleAddToCart}
        >
          <Icons.cart className="h-[24px] w-[24px] text-white" />
          <span className="text-lg font-semibold transition-all duration-300 group-hover:text-orange-100">
            Add to cart
          </span>
        </button>
      )
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative rounded-[0.8rem] border-[4px] bg-white ${isDesktop ? 'h-[24rem] w-full' : isTablet ? 'h-[21rem] w-full' : 'h-[21rem] w-full'} ${isItemInCart ? 'border-orange-500' : 'border-transparent'}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="rounded-[0.8rem] object-contain"
        />
      </div>
      {renderAddToCartButton()}
      <div className="flex w-full flex-col gap-[0.4rem] pt-[1.6rem]">
        <small className="text-lg text-orange-300 capitalize">{category}</small>
        <h2
          className="text-xl font-semibold text-white line-clamp-1"
          title={title}
        >
          {title}
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-orange-500">
            ${price.toFixed(2)}
          </span>

          <Popover>
            <PopoverTrigger>
              <small className="text-orange-300 cursor-pointer font-medium">
                Know more
              </small>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
                <p className="text-white">{description}</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
