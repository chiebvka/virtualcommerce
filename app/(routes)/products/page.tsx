/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import React, { useState, useEffect } from 'react';
import PageHeadings from '../_components/PageHeadings'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import FlashCard from './_components/FlashCard'
import { getAllProducts } from '@/sanity/utils'

type Props = {}

interface Product {
  _id: string;
  createdAt: string;
  name: string;
  slug: string;
  description: string;
  price: string; // Assuming price is a number
  image: string;
  extraImages: string[];
  color: { name: string; _id: string }[];
  category: { name: string; _id: string }[];
  size: { name: string; _id: string }[];
}


export default  function page({}: Props) {

  const [data, setData] = useState<Product[]>([]); 
  const [minPrice, setMinPrice] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage,setProductsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      const products = await getAllProducts();
      setData(products);
    };
    fetchData();
  }, []);


  const applyFilters = () => {
    const filteredProducts = data.filter(product => {
      const price = parseFloat(product.price); // assuming price is a string
      const isMinPriceValid = !minPrice || price >= parseFloat(minPrice);

      const matchesSearchQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // Add additional checks based on other relevant attributes
        // For example: product.description.toLowerCase().includes(searchQuery.toLowerCase())
        false;

      return isMinPriceValid && matchesSearchQuery;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'highest') {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortBy === 'lowest') {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });

    setData(sortedProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [minPrice, sortBy, searchQuery]);

  const resetFilters = () => {
    setMinPrice('');
    setSortBy('latest');
    setCurrentPage(1);
    setProductsPerPage(5);
    setSearchQuery('');
    fetchData();
  };

  const fetchData = async () => {
    const products = await getAllProducts();
    setData(products);
  };

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='min-h-screen w-full relative my-auto py-16 gap-y-5 px-3 max-w-7xl mx-auto'>
      <PageHeadings
          title='All Products' 
          description='Find your most trusted and reliable brands while also discovering new brands'
      />
        <div className="flex flex-col md:flex-row border-2 space-y-5 border-black p-8 ">
        <div className="mr-5">
            <h1 className="text-2xl font-semibold text-palette mb-4">Filters</h1>
            <div className="space-y-4">
              {/* Search Input */}
              <div className="space-y-2">
                <h2 className="text-lg font-medium">Search</h2>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <h2 className="text-lg font-medium">Price Range</h2>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Filter and Sort Dropdowns */}
              <div className="space-y-2">
                

                {/* Sort Dropdown */}
                <div className="my-5 relative">
                <h2 className="text-lg font-medium">Sort</h2>
                  <Select
                    value={sortBy}
                    onValueChange={(e) => setSortBy(e)}
                    // className="block appearance-none w-full bg-white border border-gray-300 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-[#5B20B6]"
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sort</SelectLabel>
                        <SelectItem value="latest">Sort by Latest</SelectItem>
                        <SelectItem value="oldest">Sort by Oldest</SelectItem>
                        <SelectItem value="highest">Sort by Most Expensive</SelectItem>
                        <SelectItem value="lowest">Sort by Lowest Price</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                    {/* <option value="latest">Sort by Latest</option>
                    <option value="oldest">Sort by Oldest</option>
                    <option value="highest">Sort by Most Expensive</option>
                    <option value="lowest">Sort by Lowest Price</option> */}
                  </Select>
        
                </div>
              </div>
            </div>
            {/** Pagination  */}
            <div className="relative space-y-4 my-5">
              <h2 className="text-lg font-medium">Pagination</h2>
              <Select
                value={productsPerPage.toString()}
                onValueChange={(e) => setProductsPerPage(Number(e))}
                
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Product Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Products Per Page</SelectLabel>
                    <SelectItem value="1">1 Product Per Page</SelectItem>
                    <SelectItem value="3">3 Product Per Page</SelectItem>
                    <SelectItem value="5">5 Product Per Page</SelectItem>
                    <SelectItem value="10">10 Product Per Page</SelectItem>
                    <SelectItem value="15">15 Product Per Page</SelectItem>
                    <SelectItem value="20">20 Product Per Page</SelectItem>
                  </SelectGroup>
                </SelectContent>
                {/* <option value="latest">Sort by Latest</option>
                <option value="oldest">Sort by Oldest</option>
                <option value="highest">Sort by Most Expensive</option>
                <option value="lowest">Sort by Lowest Price</option> */}
              </Select>
            </div>
            <Button
                onClick={resetFilters}
              >
                Reset
              </Button>
          </div>
          <div className='flex flex-col items-center space-y-5'>

              <p className='text-2xl text-palette'>
                {
                  data.length > productsPerPage && (<>
                    Page {currentPage} of {Math.ceil(data.length / productsPerPage)}
                  </>)
                  }
              </p>

              {/** Product Grid */}
              <div className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8'>
              {currentProducts?.map((product) => (
                <FlashCard key={product._id}  product={product} />
                ))}
              </div>
            {/* Pagination */}
            <div className="mt-4">
                {data.length > productsPerPage && (
                  <ul className="flex list-none justify-center space-x-2">
                    {Array.from({ length: Math.ceil(data.length / productsPerPage) }, (_, index) => (
                      <li key={index} className="cursor-pointer">
                        <a onClick={() => paginate(index + 1)} className="bg-palette/40 hover:bg-palette/20 px-3 py-2 rounded-md">
                          {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            </div>


          </div>
                  
      
    </div>
  )
}