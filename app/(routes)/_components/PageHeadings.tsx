import { Separator } from '@/components/ui/separator';
import React from 'react';


type Props = {}
interface headinProps {
    title: string,
    description: string
}
export default function PageHeadings({title, description}: headinProps) {
  return (
    <div>
        <div className="flex flex-col gap-y-5 justify-center">
            <h1 className='lg:text-3xl md:text-2xl text-lg text-palette font-extrabold  '>{title}</h1>
            <p className='text-sm md:text-base'>{description} </p>
        </div>
        <Separator className='my-5' />
    </div>
  )
}