"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { people } from '@/config';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { createComment, getCommentsByProductId } from '@/sanity/utils';



export default function CommentCard({product}) {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
    const { isLoaded, isSignedIn, user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress;


    useEffect(() => {
        // Fetch comments for the current product
        const fetchComments = async () => {
          const fetchedComments = await getCommentsByProductId(product?._id);
          setComments(fetchedComments);
        };
    
        fetchComments();
      }, [product]);


    const handleRatingChange = (newRating) => {
        setRating(newRating);
      };

      const handleCommentChange = (e) => {
        setComment(e.target.value);
      };

      const handleAddComment = async () => {
        if (comment.trim() !== '') {
          // Call createComment function to create a new comment
          const newComment = await createComment(product?._id, comment, rating, email);
          toast({
            title: "Success",
            description: "Comment Added Successfully",
          });
    
          // Update the state with the new comment received from Sanity
          setComments([...comments, newComment]);
    
          // Reset input values
          setComment('');
          setRating(0);
        }
      };
    
  return (
    <div className='relative overflow-hidden bg-white'>
        <div className=" w-11/12 mx-auto sm:pt-24 lg:pt-40">
            <Separator className='my-5' />
            <h2 className="text-2xl text-palette font-bold mb-4">Comments</h2>
            {/* Star Rating */}
            <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={star <= rating ? 'fill-[#FFD700] text-[#FFD700] text-2xl  cursor-pointer' : 'text-gray-300 text-2xl cursor-pointer'}
                    onClick={() => handleRatingChange(star)}
                />
                ))}
            </div>

            {/** Input form */}
            <div className="grid w-full gap-2">
                <Textarea           
                    value={comment}
                    onChange={handleCommentChange} 
                    placeholder="Type your message here." 
                />
                <Button  onClick={handleAddComment}>Leave Review</Button>
            </div>
            <Separator  className='my-5' />
            
            {/** Dynamic Review */}
            <ul role="list" className="divide-y divide-gray-100">
            {comments.map((comment, index) => (
                    <li key={index} className="flex flex-col md:flex-row justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                    <Avatar>
                        <AvatarImage src="/avatar.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                        <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{comment.email}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.commentText}</p>
                    </div>
                    </div>
                    <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-palette">Ratings</p>
                        <div className="flex flex-row space-x-1">
                            {[...Array(comment.stars)].map((_, i) => (
                                <Star size={16} key={i} className="fill-[#FFD700] text-[#FFD700]   cursor-pointer" />
                            ))}
                        </div>
                    </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}