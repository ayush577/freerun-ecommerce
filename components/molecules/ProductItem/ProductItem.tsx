import React, { useMemo } from 'react'
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { useAtomValue } from 'jotai'
import {
  bookMarkedAtom,
  cartAtom,
  useBookMark,
  useCart,
} from '@/context/JotaiCart'
import { cn } from '@/lib/utils'

interface ProductItemProps {
  item: ProductItemType
}

export const ProductItem: FC<ProductItemProps> = ({ item }) => {
  //* Props
  const {
    title,
    price,
    category,
    image,
    description,
    rating: { rate },
  } = item

  //* Media Query
  const isDesktop = useMediaQuery('(min-width: 1300px) and (max-width: 2400px)')
  const isTablet = useMediaQuery('(min-width: 600px) and (max-width: 1299px)')

  //* Cart state
  const quantity = useAtomValue(cartAtom)
  const { addToCart, increaseQuantity, decreaseQuantity } = useCart()

  const bookMark = useAtomValue(bookMarkedAtom)
  const { addToBookMark, removeFromBookMark } = useBookMark()

  //* Functions
  const isItemInBookMark = useMemo(
    () => bookMark?.some?.(bookMarkItem => bookMarkItem.id === item.id),
    [bookMark, item],
  )

  const isItemInCart = quantity?.some?.(
    cartItem => cartItem.product.id === item.id,
  )

  const itemQuantity = quantity?.find?.(
    cartItem => cartItem.product.id === item.id,
  )?.quantity

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
    return isItemInCart ? (
      <>
        <div className="z-20 -mt-[2.2rem] flex w-[14rem] items-center justify-between rounded-full bg-orange-500 p-[1rem]">
          <button onClick={handleDecreaseQuantity}>
            <Icons.minus className="h-[24px] w-[24px] text-white" />
          </button>

          <span className="text-lg font-semibold text-white">
            {itemQuantity}
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
  }

  //* Rating Component
  const renderRating = () => {
    return (
      <Dialog>
        <DialogContent className="py-10 flex items-center gap-2">
          <React.Fragment>
            {Array.from({ length: 5 }).map((_, index) => (
              <Button key={index} variant="ghost">
                <Icons.star className="h-6 w-6 text-yellow-400" />
              </Button>
            ))}
          </React.Fragment>
        </DialogContent>
        <DialogTrigger className="absolute top-3 left-3">
          <div className="rounded-sm bg-orange-400 h-8 w-8 flex items-center justify-center cursor-pointer">
            <span className="text-white">{rate}</span>
          </div>
        </DialogTrigger>
      </Dialog>
    )
  }

  //* Bookmark Component
  const renderBookmark = () => {
    return isItemInBookMark ? (
      <button
        onClick={() => removeFromBookMark(item)}
        className={cn(
          buttonVariants({
            variant: 'ghost',
            className: 'hover:bg-orange-100',
          }),
          'absolute top-3 right-3 p-2',
        )}
      >
        <Icons.bookmarkFilled className="h-6 w-6 text-orange-500" />
      </button>
    ) : (
      <button
        onClick={() => addToBookMark(item)}
        className={cn(
          buttonVariants({
            variant: 'ghost',
            className: 'hover:bg-orange-100',
          }),
          'absolute top-3 right-3 p-2',
        )}
      >
        <Icons.bookmark className="h-6 w-6 text-orange-500" />
      </button>
    )
  }

  return (
    <div className="group relative flex flex-col items-center cursor-pointer">
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
      {renderRating()}
      {renderBookmark()}
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
                <h3 className="text-white text-xl font-semibold mb-3">
                  {title}
                </h3>
                <p className="text-white">{description}</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
