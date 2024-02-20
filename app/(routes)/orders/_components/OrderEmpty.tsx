
import { Button } from '@/components/ui/button'
// import { Link } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/image'
import React from 'react'

type Props = {}

export default function OrderEmpty({}: Props) {
  return (
    <div className='h-fullw-11/12 mx-auto py-5 rounded-lg'>
        <div className="h-2/3 border-2 border-dashed border-palette">
            <Image width={500} height={500} src="/orders.png" alt="" className="object-contain w-full h-full" />
        </div>
        <div className="flex flex-col items-center gap-y-4 mt-5 justify-center">
            <h2 className='font-extrabold text-lg md:text-3xl'>You haven&apos;t ordered anything...yet!</h2>
            <p className='text-center text-sm md:text-base'>Once you do, it&apos;ll show up here so you can complete your purchases.</p>
        </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="/"
            className="rounded-md bg-palette px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette"
            >
            Go back home
            </a>
            <a href="/products" className="text-sm font-semibold text-gray-900">
            Browse Products <span aria-hidden="true">&rarr;</span>
            </a>
            </div>
    </div>
  )
}