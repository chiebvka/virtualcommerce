import { formatPrice } from '@/lib/format'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



export default function FlashCard({product}) {
  return (
    <Link href={`/product/${product?.slug}`} className=" group p-4 border-2 space-y-4 rounded-lg shadow-lg h-[320px]" >
    <div className="aspect-h-1 aspect-w-1 w-full h-[80%] overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-68">
            <Image
            src={product.image}
            alt={product.slug}
            width={500}
            height={400}
            className=" min-h-56 max-h-56 h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
    </div>
    <div className="mt-4 h-[20%] flex justify-between">
        <div>
        <h3 className="text-sm group-hover:underline relative text-gray-700">
            <span href='/'>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
            </span>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.color.map(color => color.name).join(', ')}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</p>
    </div>
</Link>
  )
}