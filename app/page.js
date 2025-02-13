"use client"

import React from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  return (
    <>
      <div className='bg-gradient-to-br from-gray-900 via-slate-900 to-black w-full h-screen flex justify-center items-center gap-8'>
        <div className='flex flex-col items-center mt-20'>
          <h1 className='text-white text-4xl font-bold text-center max-w-[1100px] leading-tight mb-8 font-inter'>
            LogiSearch is a chatbot that does realtime web retrieval.
          </h1>
          <div className='text-white font-bold text-center max-w-full leading-tight h-[290px]'>
            <button 
              onClick={() => router.push('/Chat')}
              className='bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-inter font-semibold py-4 px-8 rounded-[10px] text-xl transition-all duration-200 transform hover:scale-105 border border-gray-600'
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page