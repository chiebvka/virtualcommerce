"use client "

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import { products } from '@/config';
import Image from 'next/image';

type Props = {headings: string, link: string}

export default function ProductCard({headings, link}: Props) {
  return (
    <div className='relative my-8 overflow-hidden bg-white'>
        <div className=' w-11/12 mx-auto  '>
            <div className="flex my-5 justify-between items-center">
                <h1 className='lg:text-3xl md:text-2xl tracking-tight text-base text-palette font-bold  '>{headings}</h1>
                <Button variant="ghost">
                    <Link href={`/${link}`} className='underline'>View More</Link>
                </Button>
            </div>
            <Carousel className="flex relative w-full border-l-2 pl-2  py-3  shadow-lg ">
            <CarouselContent className=" flex -ml-2 gap-x-5">
                {products.map((product) => (
                    <CarouselItem className=" max-w-[20rem] p-4 w-full  min-w-[20rem] border-2 rounded-lg shadow-lg md:basis-1/2 lg:basis-1/3 " key={product.id}>
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-68">
                                <Image
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                width={500}
                                height={400}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                            <h3 className="text-sm text-gray-700">
                                <a href={product.href}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name}
                                </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{product.price}</p>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
        </div>
    </div>
  )
}