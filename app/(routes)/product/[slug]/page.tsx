import React from 'react'
import ProductDetails from './_components/ProductDetails'
import CommentCard from './_components/CommentCard'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='fle flex-col space-y-4'>
      <ProductDetails />
      <CommentCard />
    </div>
  )
}