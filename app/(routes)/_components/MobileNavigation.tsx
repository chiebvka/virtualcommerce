"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignLeft, Bookmark, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
  } from "@clerk/nextjs";
import { usePathname, useRouter } from 'next/navigation';
import { navigationLink } from '@/config';

type Props = {}



type NavigationItem = {
    title: string;
    href: string;
  };


export default function MobileNavigation({}: Props) {


    const pathname = usePathname();
    const router = useRouter();

    const isActive = (href: string) =>
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

    const onClick = (href: string) => {
        router.push(href);
    };

  return (
    <div className='"mx-auto  md:hidden w-full items-center border-2 border-black justify-between p-3 py-6 '>
    <div className="flex w-full items-center justify-between">
        <div className='flex'>
            <Sheet>
                <SheetTrigger>
                    <AlignLeft className='text-palette' />
                </SheetTrigger>
                <SheetContent side="left" className=' p-0   w-[350px]'>
                    {/* <Link href="/" className='p-6 mt-3 text-palette'>
                        Virtual Commerce
                    </Link> */}
                    <div className="mt-16 flex flex-col gap-y-4">
                        {navigationLink.map((navigation: NavigationItem) => (
                            <SheetClose key={navigation.title}  asChild >
                                <Link 
                                    href={navigation.href}
                                    className={cn(
                                        "flex items-center py-3 pl-6 text-foreground text-sm font-[500] transition-all hover:text-slate-600 hover:bg-slate-300/20 ",
                                        isActive(navigation.href) && "text-palette border-r-4 border-r-palette bg-indigo-200/20 hover:bg-indigo-200/20 hover:text-palette"
                                    )}
                                >

                                {navigation.title}
                                </Link>
                            </SheetClose>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="/" className="ml-4 text-palette" >
                Virtual Commerce
            </Link>
        </div>
        <div className='flex space-x-2'>
            <Link href="/cart" className="text-center text-gray-700 mt-2 hover:text-slate-400 mr-3 transition relative">
                <div className="text-2xl">
                    <ShoppingCart  size={25} />
                </div>
                <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-palette text-white text-[10px]">0</span>
            </Link>
            <SignedIn>
              {/* Mount the UserButton component */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Signed out users get sign in button */}
              <Link href="/sign-in">
                <Button >Sign In</Button>
              </Link>
            </SignedOut>

        </div>
    </div>
</div>
  )
}
