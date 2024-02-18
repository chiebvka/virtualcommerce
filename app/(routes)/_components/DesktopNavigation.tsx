import { Button } from '@/components/ui/button'
import { navigationLink } from '@/config';
import { Bookmark, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function DesktopNavigation({}: Props) {
  return (
    <>
        <nav className="mx-auto hidden max-w-7xl w-full items-center border-2 border-black justify-between p-4 py-6 md:flex">
            <Link href="/" className='rounded-md no-underline   text-palette bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm'>Virtual Commerce</Link>
            <div className=" flex flex-col gap-y-2 ">
            <div className="flex  mt-2 items-center justify-center gap-x-6">
              {navigationLink.map((navigation) => (
                <Link key={navigation.title} href={navigation.href}>
                  {navigation.title}
                </Link>
              ))}
            </div>
          </div>
            <div className="flex">
            <div className="flex mx-4 space-x-4">
              <Link href="/wishlist" className="text-center text-gray-700 hover:text-slate-400 transition relative">
                  <div className="text-2xl">
                      <Bookmark  size={25} />
                  </div>
                  <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-palette text-white text-[10px]">0</span>
              </Link>
              <Link href="/cart" className="text-center text-gray-700 hover:text-slate-400 transition relative">
                  <div className="text-2xl">
                      <ShoppingCart size={25} />
                  </div>
                  <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-palette text-white text-[10px]">0</span>
              </Link>
            </div>
            <div className="flex -mt-2 ml-4">
              <Link href="/login">
                <Button >Sign In</Button>
              </Link>
            </div>
          </div>
        </nav>
    </>
  )
}