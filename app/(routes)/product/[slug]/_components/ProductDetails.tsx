"use client"

import React,{ useState } from 'react';
import Image from 'next/image';
import { produces } from '@/config';
import { RadioGroup } from '@headlessui/react';
import { Star } from 'lucide-react';
import { formatPrice } from '@/lib/format';



interface Product {
    description: string;
    extraImages: string[];
    color: {name: string, _id: string}[];
    size: {name: string, _id: string}[];
    slug: string;
    image: string ;
    name: string;
    price: number;
    // Add other necessary properties here
  }
  
  type Props = {
    product: Product;
  };

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function producesDetails({product}: Props) {

{

    JSON.stringify(product)
}


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedColor, setSelectedColor] = useState<string>(product.color[0].name);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedSize, setSelectedSize] = useState<string>(product.size[0].name);



  return (
    <div className='relative overflow-hidden bg-white'>
        <div className=" w-11/12 mx-auto sm:pt-24 lg:pt-40">
            <div className="bg-white">
        <div className="pt-6">
           {JSON.stringify(product)}
            <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {produces.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                    <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                        {breadcrumb.name}
                    </a>
                    <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                    >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                    </div>
                </li>
                ))}
                <li className="text-sm">
                <a href={produces.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                    {produces.name}
                </a>
                </li>
            </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden border-2 border-palette  overflow-hidden rounded-lg lg:block">
                <Image
                src={product.extraImages[0]}
                alt={product.slug}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 border-2 border-palette  aspect-w-3 overflow-hidden rounded-lg">
                <Image
                    src={product.extraImages[0]}
                    alt={product.slug}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center"
                />
                </div>
                <div className="aspect-h-2 aspect-w-3 border-2 border-palette overflow-hidden rounded-lg">
                <Image
                    src={product.extraImages[1]}
                    alt={product.slug}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center"
                />
                </div>
            </div>
            <div className="aspect-h-5 aspect-w-4  border-2 border-palette lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <Image
                src={product.image}
                alt={product.slug}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center"
                />
            </div>
            </div>

            {/* produces info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">produces information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{formatPrice(product.price)}</p>

                {/* Reviews */}
                <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                    <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <p className="ml-1 text-sm font-bold text-gray-900 dark:text-white">4.85</p>
                            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                            <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">41 reviews</span>
                    {/* {[0, 1, 2, 3, 4].map((rating) => (
                        <Star
                        key={rating}
                        className={classNames(
                            reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                        />
                    ))} */}
                    </div>
                    {/* <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a href={reviews.href} className="ml-3 text-sm font-medium text-palette hover:text-palette/30">
                    {reviews.totalCount} reviews
                    </a> */}
                </div>
                </div>

                <form className="mt-10">
                {/* Colors */}
                <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    {/* Color Selection Circles */}
                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                            {product.color.map((cool) => (
                                <RadioGroup.Option
                                    key={cool._id}
                                    value={cool}
                                    className={({ active, checked }) =>
                                        classNames(
                                            active ? 'border-4 border-palette' : '',
                                            !active && checked ? 'ring-2' : '',
                                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                        )
                                    }
                                >
                                    <RadioGroup.Label as="span" className="sr-only">
                                        {cool.name}
                                    </RadioGroup.Label>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                                            cool.name === selectedColor ? 'border-[#5b20b6]' : ''
                                        )}
                                        style={{ backgroundColor: cool.name }}
                                    />
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
        
                </div>

                {/* Sizes */}
                <div className="mt-10">
                    <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-palette hover:text-palette/30">
                        Size guide
                    </a>
                    </div>

                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {product.size.map((sic) => (
                        <RadioGroup.Option
                            key={sic._id}
                            value={sic.name}
                            // disabled={!size.inStock}
                            className={({ active, checked }) =>
                            classNames(
                                active ? 'border-4 border-palette' : '',
                                !active && checked ? 'border' : '',
                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                            }
                        >
                            {({ active, checked }) => (
                            <>
                                <RadioGroup.Label as="span">{sic.name}</RadioGroup.Label>
        
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                    <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                    >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                    </svg>
                                </span>
                         
                            </>
                            )}
                        </RadioGroup.Option>
                        ))}
                    </div>
                    </RadioGroup>
                </div>

                <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-palette px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-palette/30 focus:ring-offset-2"
                >
                    Add to bag
                </button>
                </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                    <p className="text-base text-gray-900">{product.description}</p>
                </div>
                </div>

                <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {produces.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>

                <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{produces.details}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
            </div>
        </div>
    </div>
  )
}