'use client'

import React, { useEffect, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Icons } from '@/components/atom/Icons/Icons'
import { MainNav } from './MainNav'
import { useAtomValue } from 'jotai'
import { cartAtom } from '@/context/JotaiCart'
import { LogIn } from 'lucide-react'
import { openModal } from '@/components/ui/BaseModal/modal-services'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/context/userAtom'
import { useRouter } from 'next/navigation'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import Link from 'next/link'

export const Header = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isLoggedIn } = useUser()

  /* Cart */
  const cart = useAtomValue(cartAtom)
  const allItemInCart = cart.length
    ? cart?.reduce((acc, item) => acc + item.quantity, 0)
    : 0

  useEffect(() => {
    setIsClient(true)
  }, [])

  /* Handle Navigation */
  const handleNavigation = (href: string) => {
    if (isLoggedIn()) {
      router.push(href)
    } else {
      openModal('LoginForm')
    }
  }

  return (
    <>
      <header className="sticky z-20 top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 md:container flex h-14 max-w-screen-2xl items-center">
          <MainNav />
          <div className="flex flex-1 items-center space-x-2 justify-end">
            <nav className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                      }),
                      'w-9 px-0 relative',
                    )}
                    onClick={() => handleNavigation('/bookmarks')}
                  >
                    <Icons.bookmarkFilled className="h-[18px] w-[18px] fill-current" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={15}>
                  <p>Save for later</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                      }),
                      'w-9 px-0 relative',
                    )}
                    onClick={() => handleNavigation('/cart')}
                  >
                    <Icons.cart className="h-[18px] w-[18px] fill-current" />
                    {isClient && allItemInCart > 0 && (
                      <span className="absolute -top-[2px] -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                        {allItemInCart}
                      </span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={15}>
                  <p>Go to Cart</p>
                </TooltipContent>
              </Tooltip>
              {isLoggedIn() ? (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Avatar className="ml-6 size-8">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>AG</AvatarFallback>
                      </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent
                      sideOffset={10}
                      className="w-full bg-white p-0 m-0 space-y-3"
                    >
                      <div className="py-1 px-2 text-black text-sm hover:bg-gray-100 rounded-md">
                        <Link href="/logout">Logout</Link>
                      </div>
                      <div className="py-1 px-2 text-black text-sm hover:bg-gray-100 rounded-md">
                        <Link href="/dashboard">Dashboard</Link>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
              ) : (
                <Button
                  className="ml-6"
                  size="sm"
                  onClick={() => openModal('LoginForm')}
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
