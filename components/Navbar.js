'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 w-full z-50 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section - empty on desktop, menu button on mobile */}
        <div className="w-1/3 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo - centered on all screens */}
        <div className="w-1/3 text-center font-bold text-[24px] md:text-[30px] text-white font-inter">
          LogiSearch
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex w-1/3 justify-end gap-4 pr-4">
          <Link href="/" className="text-gray-300 hover:text-white text-[18px] font-inter transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800">Home</Link>
          <Link href="/Chat" className="text-gray-300 hover:text-white text-[18px] font-inter transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800">Chat</Link>
          <Link href="/Profile" className="text-gray-300 hover:text-white text-[18px] font-inter transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800">Profile</Link>
        </div>

        {/* Empty div for layout balance on mobile */}
        <div className="w-1/3 md:hidden"></div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`
          md:hidden absolute w-full bg-gradient-to-r from-gray-900 to-black border-t border-gray-800
          transform transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="flex flex-col px-4 py-2 space-y-2">
          <Link 
            href="/" 
            className="text-gray-300 hover:text-white text-[18px] font-inter transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/Chat" 
            className="text-gray-300 hover:text-white text-[18px] font-inter transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Chat
          </Link>
          <Link 
            href="/Profile" 
            className="text-gray-300 hover:text-white text-[18px] font-inter transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
