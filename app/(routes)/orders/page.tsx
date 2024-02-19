import React from 'react'
import PageHeadings from '../_components/PageHeadings'
import { people } from '@/config'
import Image from 'next/image'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='min-h-screen w-full relative my-auto py-16 gap-y-5 px-3 max-w-7xl mx-auto'>
        <PageHeadings
            title='Your Orders' 
            description='Brwose through your order history'
        />
                {/** Dynamic Review */}
                <div className="flex flex-col space-y-4 ">
            <ul role="list" className="divide-y divide-gray-100">
                {people.map((person) => (
                    <li key={person.email} className="flex flex-col md:flex-row justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <Image width={500} height={500}  className="h-32 w-32 flex-none rounded-lg bg-gray-50" src={person.imageUrl} alt="" />
                        <div className="min-w-0  flex flex-col justify-center flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                    </div>
                    </div>
                    <div className="  shrink-0 sm:flex sm:flex-col mt-5 sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                        {person.lastSeen ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                        </p>
                        ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                        )}
                    </div>
                    </li>
                ))}
            </ul>

        </div>
    </div>
  )
}