import { Facebook, Instagram, Twitter } from 'lucide-react'



export default function Footer() {
  return (
    <div className=' w-11/12 mx-auto  mt-24'>
        
        <div className="bg-white">
            <div className=" w-full  text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
                <div className="py-5">
                <a href="/" className='protest-revolution-regular font-bold text-3xl text-palette  '>
                    <span className="sr-only">Your Company</span>
                    VirtualsGlobal
                </a>
                </div>
                <div className="">
                    <div className="text-lg uppercase text-palette font-bold">Services</div>
                    <a className="my-3 block" href="/#services">Documentation </a><a
                        className="my-3 block" href="/#services">Tutorials </a><a
                        className="my-3 block" href="/#services">Support</a>
                </div>
                <div className="">
                    <div className="text-lg uppercase text-palette font-bold">About Us</div>
                    <a className="my-3 block" href="/#about">Help Center </a><a
                        className="my-3 block" href="/#services">Privacy Policy </a><a
                        className="my-3 block" href="/#why">Conditions </a>
                </div>
                <div className="">
                    <div className="text-lg uppercase text-palette font-bold">Contact us</div>
                    <a className="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA
                        <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">operations@virtualsglobal.com
                        <span className="text-teal-600 text-xs p-1"></span></a>
                </div>
            </div>
        </div>
        
        <div className="bg-white pt-2">
            <div className="flex pb-5 px-3 m-auto pt-5 border-t text-palette text-sm flex-col
            max-w-screen-lg items-center">
                <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
                    <a href="/#" className="w-6 mx-1">
                        <Facebook />
                    </a>
                    <a href="/#" className="w-6 mx-1">
                        <Instagram />
                    </a>
                    <a href="/#" className="w-6 mx-1">
                        <Twitter />
                    </a>
                </div>
                <div className="my-5">© Copyright 2024. All Rights Reserved.</div>
            </div>
        </div>
    </div>
  )
}