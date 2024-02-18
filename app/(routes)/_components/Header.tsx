import React from 'react'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className='border-y-1 flex sticky top-0 z-50 border-black/5 bg-gray-50/60 shadow-sm shadow-gray-300 backdrop-blur-lg'>
        <DesktopNavigation />
        <MobileNavigation />
    </div>
  )
}