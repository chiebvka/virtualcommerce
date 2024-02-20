import React from 'react'
import PageHeadings from '../_components/PageHeadings'
import { people } from '@/config'
import Image from 'next/image'
import Orders from './_components/Orders'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='min-h-screen w-full relative my-auto py-16 gap-y-5 px-3 max-w-7xl mx-auto'>
        <PageHeadings
            title='Your Orders' 
            description='Brwose through your order history'
        />
                {/** Dynamic Review */}
                <Orders />
    </div>
  )
}