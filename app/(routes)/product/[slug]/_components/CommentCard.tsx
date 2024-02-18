"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { people } from '@/config';
import Image from 'next/image';

type Props = {}

export default function CommentCard({}: Props) {

    const [rating, setRating] = useState(0);


    const handleRatingChange = (newRating: React.SetStateAction<number>) => {
        setRating(newRating);
      };
    
  return (
    <div className='relative overflow-hidden bg-white'>
        <div className=" w-11/12 mx-auto sm:pt-24 lg:pt-40">
            <Separator className='my-5' />
            <h2 className="text-2xl text-palette font-bold mb-4">Comments</h2>
            {/* Star Rating */}
            <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={star <= rating ? 'fill-[#FFD700] text-[#FFD700] text-2xl  cursor-pointer' : 'text-gray-300 text-2xl cursor-pointer'}
                    onClick={() => handleRatingChange(star)}
                />
                ))}
            </div>

            {/** Input form */}
            <div className="grid w-full gap-2">
                <Textarea placeholder="Type your message here." />
                <Button>Leave Review</Button>
            </div>
            <Separator className='my-5' />
            
            {/** Dynamic Review */}
            <ul role="list" className="divide-y divide-gray-100">
                {people.map((person) => (
                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <Image width={500} height={500}  className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                        <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                    </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
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