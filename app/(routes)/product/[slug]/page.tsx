import React from 'react'
import ProductDetails from './_components/ProductDetails'
import CommentCard from './_components/CommentCard'
import { getProductBySlug } from '@/sanity/utils';

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const {slug} = params
  const product = await getProductBySlug(slug);

  if(!product) {
    return {
      notFound:true
    }
  }

  return (
    <div className='flex flex-col space-y-4'>
      <ProductDetails product={product[0]} />
      <CommentCard product={product[0]} />
    </div>
  )
}