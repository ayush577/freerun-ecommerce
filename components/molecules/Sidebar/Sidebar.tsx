'use client';
import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react'
import Image from 'next/image'
import React, { createContext, useState } from 'react'
import { SidebarProps } from './types'

export const SidebarContext = createContext({ expanded: true })

export function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="https://github.com/shadcn.png"
            className={`overflow-hidden transition-all`}
            width={expanded ? 32 : 0}
            height={expanded ? 32 : 0}
            alt=""
          />
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst className='text-gray-600' /> : <ChevronLast className='text-gray-600' />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <Image
            src="https://github.com/shadcn.png"
            alt=""
            className="w-10 h-10 rounded-md"
            width={10}
            height={10}
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}
