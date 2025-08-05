import React from 'react'
import { FaCircleNotch } from "react-icons/fa";

export default function PageLoader() {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
    <div className="flex justify-center items-center mt-[50vh]">
        <FaCircleNotch className='text-5xl text-violet-600 animate-spin' />
    </div>
    </div>
  )
}
