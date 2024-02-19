import Image from 'next/image'
import React from 'react'

type Props = {}

export default function FlashCard({}: Props) {
  return (
    <div className=" max-w-[20rem] p-4 w-full  min-w-[20rem] border-2 border-red-600 rounded-lg shadow-lg md:basis-1/2 lg:basis-1/3 " >
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-68">
            <Image
            src="https://images.pexels.com/photos/5974251/pexels-photo-5974251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="produce"
            width={500}
            height={400}
            className=" min-h-56 max-h-56 h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
    </div>
    <div className="mt-4 flex justify-between">
        <div>
        <h3 className="text-sm text-gray-700">
            <a href='/'>
            <span aria-hidden="true" className="absolute inset-0" />
            Basic Tee
            </a>
        </h3>
        <p className="mt-1 text-sm text-gray-500">Green</p>
        </div>
        <p className="text-sm font-medium text-gray-900">38/78</p>
    </div>
</div>
  )
}