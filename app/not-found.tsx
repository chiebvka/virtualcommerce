import SharedNotFound from '@/components/SharedNotFound'
import React from 'react'

type Props = {}

export default function NotFound({}: Props) {
  return (
    <div className='h-[100vh] border-2 border-black'>
        <SharedNotFound />
    </div>
  )
}