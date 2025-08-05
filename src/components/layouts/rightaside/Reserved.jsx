import React from 'react'
import CustomCounter from '../../CustomCounter'
import ImgCom from '../../img/ImgCom'

export default function Reserved() {
    return (
        <div className='h-full p-2 sm:p-4 large:p-8 flex flex-col gap-8 overflow-y-auto aside-scroll-design'>
            <div className='flex flex-col gap-4'>
                <p className='text-base text-slate-high font-bold'>Contingency</p>
                <div className='grid grid-cols-2 gap-4 sm:gap-6 large:gap-8'>
                    <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-higher border-dashed'>
                        <p className='text-base font-bold text-slate-high'>
                        <CustomCounter targetNumber={110} timeInSeconds={1} />k
                        </p>
                        <p className='text-sm text-slate-higher'>Total</p>
                    </div>
                    <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-higher border-dashed'>
                        <p className='text-base font-bold text-slate-high'>
                        <CustomCounter targetNumber={30} timeInSeconds={1} />k
                        </p>
                        <p className='text-sm text-slate-higher'>Balance</p>
                    </div>
                </div>
            </div>
             <div className='flex flex-col gap-4'>
                <p className='text-base text-slate-high font-bold'>Common Service</p>
                <div className='grid grid-cols-2 gap-4 sm:gap-6 large:gap-8'>
                    <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-higher border-dashed'>
                        <p className='text-base font-bold text-slate-high'>
                        <CustomCounter targetNumber={50} timeInSeconds={1} />k
                        </p>
                        <p className='text-sm text-slate-higher'>Total</p>
                    </div>
                    <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-higher border-dashed'>
                        <p className='text-base font-bold text-slate-high'>
                        <CustomCounter targetNumber={24} timeInSeconds={1} />k
                        </p>
                        <p className='text-sm text-slate-higher'>Balance</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-base text-slate-high font-bold'>Recent Loans</p>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-3 items-center'>
                        <div className='px-4 py-2 bg-[#0E172E] rounded-md'>
                            <ImgCom src={'user_avatar.jpg'} className='w-8' alt="Order Image" />
                        </div>
                        <div className='flex-col'>
                            <p className='text-base font-bold text-slate-high'>Project Briefing</p>
                            <p className='text-sm text-slate-higher'>Project Manager</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
