'use client';

import React, { useEffect, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Icons } from '@/components/atom/Icons/Icons';
import { MainNav } from './MainNav';
import { useAtomValue } from 'jotai';
import { cartAtom } from '@/context/JotaiCart';

export const Header = () => {
  const [isClient, setIsClient] = useState(false)
  const cart = useAtomValue(cartAtom);

  const allItemInCart = cart.length ? cart?.reduce((acc, item) => acc + item.quantity, 0) : 0

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/cart">
                  <button
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                      }),
                      'w-9 px-0 relative',
                    )}
                  >
                    <Icons.bookmarkFilled className="h-[18px] w-[18px] fill-current" />
                  </button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={15}>
                <p>Save for later</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/cart">
                  <button
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                      }),
                      'w-9 px-0 relative',
                    )}
                  >
                    <Icons.cart className="h-[18px] w-[18px] fill-current" />
                    {isClient && allItemInCart > 0 && (
                      <span className="absolute -top-[2px] -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                        {allItemInCart}
                      </span>
                    )}
                  </button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={15}>
                <p>Go to Cart</p>
              </TooltipContent>
            </Tooltip>
          </nav>
        </div>
      </div>
    </header>
  );
};
