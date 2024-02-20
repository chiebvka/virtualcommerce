"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import PageHeadings from '../../_components/PageHeadings'
import Image from 'next/image'
import { people } from '@/config';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { useUser } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';
import { Trash } from 'lucide-react';
import useCartStore from '@/cartStore';
import { useToast } from '@/components/ui/use-toast';
import axios from "axios";
import EmptyCart from './EmptyCart';
EmptyCart
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from 'next/navigation';
import { createOrder } from '@/sanity/utils';

type Props = {}

export default function Cart({}: Props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cart = useCartStore((state) => state.cart)
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const totalItems = useCartStore((state) => state.totalItems);
    const carttTotal = useCartStore((state) => state.cartTotal);
    const[loading,setLoading] = React.useState(false);
    const delivery = carttTotal * 0.2
    const taxes = carttTotal * 0.35
    const totals = carttTotal + delivery + taxes
    const router = useRouter();
    const { isLoaded, isSignedIn, user } = useUser();



    const { toast } = useToast()

  const stripe = useStripe();
  const elements = useElements();


    const handleRemoveFromCart = (productId: any) => {
        removeFromCart(productId)
        toast({
            title: "Success",
            description: "Item Removed from cart successfully",
          })
    }

    const onSubmit = async () => {
    
        const cardElement = elements?.getElement("card");
        setLoading(true);
        
        try {
          if (!stripe || !cardElement) return null;
          const  data  = await axios.post("/api/stripe", {
            data: { amount: totals.toFixed(0) },
          });
    
          console.log(data);
          const res = await stripe?.confirmCardPayment(data?.data?.intent, {
            payment_method: { card: cardElement },
          });
          //console.log(res.paymentIntent.status);
          const status = res?.paymentIntent?.status;
          if (status === 'succeeded') {
            setLoading(false);
            toast({
                title: "Success",
                description: "Payment Made Successfully",
              });
            const email = user?.emailAddresses[0]?.emailAddress;
    
            if(email){
              const res = await createOrder(email,cart);
              if(res) {
              router.push("/order");
              }
            }
            
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      };
  return (
        <>
        {totalItems === 0 ? <EmptyCart /> :
            <div className='w-11/12 mx-auto'>
        {/* <h1 className="text-3xl text-center font-semibold text-[#5B20B6] mb-6">{totalItems} items in Cart</h1> */}
        <div className="flex flex-col space-y-4 md:space-x-5  md:flex-row">
            <ul role="list" className="divide-y md:basis-2/3 divide-gray-100">
                {cart?.map((product: { _id: React.Key | null | undefined; image: string | StaticImport; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; color: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; size: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; price: number; }) => (
                    <li key={product?._id} className="flex flex-col md:flex-row justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <Image width={500} height={500}  className="h-32 w-32 flex-none rounded-lg bg-gray-50" src={product?.image} alt="" />
                        <div className="min-w-0  flex flex-col justify-center flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{product?.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"> <span className='text-palette'>Quantity: </span> {product?.quantity}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"> <span className='text-palette'>Color: </span> {product?.color}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"> <span className='text-palette'>Size: </span> {product?.size}</p>
                    </div>
                    </div>
                    <div className=" shrink-0 sm:flex sm:flex-col mt-5 sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{formatPrice(product?.price)}</p>
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <p className="text-xs leading-5  text-red-600">
                                <Trash onClick={()=>{handleRemoveFromCart(product?._id)}} />
                            </p>
                        </div>
                    </div>
                    </li>
                ))}
            </ul>
            <div className="flex h-auto shadow-lg md:basis-1/3">
                <Card className='w-full'>
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>
                    Here is the subtotal and total of your cart
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <span className="flex justify-between">
                    <p className='font-bold'>Subtotal</p>
                    <p className='text-xs'>{formatPrice(carttTotal)}</p>
                    </span>
                    <span className="flex justify-between">
                    <p className='font-bold'>Delivery Fee</p>
                    <p className='text-xs'>{formatPrice(delivery)}</p>
                    </span>
                    <span className="flex justify-between">
                    <p className='font-bold'>Taxes</p>
                    <p className='text-xs'>{formatPrice(taxes)}</p>
                    </span>
                    <span className="flex justify-between">
                    <p className='font-bold'>Total</p>
                    <p className='text-xs'>{formatPrice(totals)}</p>
                    </span>
                </CardContent>
                <CardFooter className='w-full  flex flex-col'>
                    {/* <div className="relative border-2 my-5">
                    <div className="absolute inset-1  flex items-center">
                    <span className="w-full border-t border-t-palette" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                    </div>
                </div> */}
                    
            <div className=' w-full p-5 bg-palette/10'>
             <CardElement />
            </div>
                <Button onClick={onSubmit} >        {
                  loading ? "Loading..." : "Checkout"
                }</Button>
                </CardFooter>
                </Card>
                {
     
   
          }
     
            </div>
        </div>
            </div>
            }
        </>
  )
}