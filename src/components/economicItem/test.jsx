import React from 'react'

export default function test() {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-8'>
        <div className='box min-h-[100] justify-between bg-[#CBD4F4] dark:bg-black-box text-black-body dark:text-white-body'>
            <p className='text-base sm:text-lg font-bold hover:text-primary '>Total Budget</p>
            <div className='flex flex-wrap gap-2 items-end font-bold'>
                <p className='text-xl sm:text-[30px]'>
                <span className='text-lg sm:text-xl'>
                    N
                </span>
                    <CustomCounter targetNumber={1000000} timeInSeconds='1' />
                </p>
            </div>
        </div>
        <div className='box min-h-[100] justify-between bg-[#F7D9E3] dark:bg-black-box text-black-body dark:text-white-body'>
            <p className='text-base sm:text-lg font-bold hover:text-primary '>Total Expenses</p>
            <div className='flex flex-wrap gap-2 items-end font-bold'>
                <p className='text-xl sm:text-[30px]'>
                <span className='text-lg sm:text-xl'>
                    N
                </span>
                    <CustomCounter targetNumber={1000000} timeInSeconds='1' />
                </p>
            </div>
        </div>
        <div className='box min-h-[100] justify-between bg-[#CBF0F5] dark:bg-black-box text-black-body dark:text-white-body'>
            <p className='text-base sm:text-lg font-bold hover:text-primary '>Balance</p>
            <div className='flex flex-wrap gap-2 items-end font-bold'>
                <p className='text-xl sm:text-[30px]'>
                <span className='text-lg sm:text-xl'>
                    N
                </span>
                    <CustomCounter targetNumber={1000000} timeInSeconds='1' />
                </p>
            </div>
        </div>
    </div>
  )
}
