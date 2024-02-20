"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import PageHeadings from '../_components/PageHeadings'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Cart from './_components/Cart';

type Props = {}

export default function page({}: Props) {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');



    
  return (
    <div className='min-h-screen w-full relative my-auto py-16 gap-y-5 px-3 max-w-7xl mx-auto'>
        <PageHeadings
            title='Your Cart' 
            description='Find your most trusted and reliable brands while also discovering new brands'
        />
      

            <Elements stripe={stripePromise}>
                <Cart />
            </Elements>
     
    </div>
  )
}