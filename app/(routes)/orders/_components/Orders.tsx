import { getOrdersByEmail } from '@/sanity/utils';
import { currentUser } from '@clerk/nextjs';
import React from 'react'
import OrderEmpty from './OrderEmpty';
import Image from 'next/image';
import { Color } from '../../../../types/Colors';

type Props = {}

export default async function Orders({}: Props) {
    const user = await currentUser();
 
    if (!user) return <div>Not logged in</div>;
  
    const fetchedOrders = await getOrdersByEmail(user?.emailAddresses[0]?.emailAddress);
    console.log(fetchedOrders)
  return (
    <>
        {fetchedOrders === 0 ? <OrderEmpty /> : 
                <div className="flex w-11/12 mx-auto flex-col space-y-4 ">
                    <ul role="list" className="divide-y divide-gray-100">
                        {fetchedOrders.map((order: { _id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; qty: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; color: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; size: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | Iterable<React.ReactNode> | null | undefined; delivered: any; paid: any; }) => (
                            <li key={order._id} className="flex flex-col md:flex-row justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <Image width={500} height={500}  className="h-32 w-32 flex-none rounded-lg bg-gray-50" src='/order.png' alt="" />
                                <div className="min-w-0  flex flex-col justify-center flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{order.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Quantity: {order.qty}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Color: {order.color}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Size: {order.size}</p>
                            </div>
                            </div>
                            <div className="  shrink-0 sm:flex sm:flex-col mt-5 sm:items-end">
                            {
                                order.delivered ? (
                                    <span className="text-green-500">Delivered</span>
                                ) : (
                                    <span className="text-red-500">In transit</span>
                                )
                                }
                                {   order.paid ? (
                                        <span className="text-green-500">Paid</span>
                                    ) : (
                                        <span className="text-red-500">Unpaid</span>
                                    )
                                    }
                            </div>
                            </li>
                        ))}
                    </ul>
                </div>
        }
    </>
  )
}