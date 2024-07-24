'use client'
import { ProductItem } from '@/components/molecules/ProductItem/ProductItem'
import { bookMarkedAtom } from '@/context/JotaiCart'
import { useAtomValue } from 'jotai'
import React from 'react'

export const BookMarkTemplate = () => {
  const bookMarkList = useAtomValue(bookMarkedAtom)

  return (
    <section className="container">
      <h1 className="text-4xl font-bold text-center mt-14 mb-10">
        Yours Bookmarks
      </h1>
      {bookMarkList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 p-4 max-w-7xl m-auto mb-5">
          {bookMarkList.map(item => (
            <ProductItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-lg font-bold">No Bookmark Avaliable</h1>
        </div>
      )}
    </section>
  )
}
