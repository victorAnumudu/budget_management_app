import React from 'react'
import Img from '../../../assets/user_avatar.jpg'
import CustomCounter from '../../CustomCounter'

export default function Tickets() {
  return (
    <div className='h-full p-2 sm:p-4 large:p-8 flex flex-col gap-16 overflow-y-auto aside-scroll-design'>
        <div className='flex flex-col gap-4'>
            <p className='text-base text-white-body font-bold'>Recent Repayment</p>
            <div className='grid grid-cols-2 gap-4 sm:gap-6 large:gap-8'>
                <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-500 border-dashed'>
                    <p className='text-base font-bold text-white-body'>
                    <CustomCounter targetNumber={18} timeInSeconds={1} />
                    </p>
                    <p className='text-sm text-slate-500'>Pending</p>
                </div>
                <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-500 border-dashed'>
                    <p className='text-base font-bold text-white-body'>
                    <CustomCounter targetNumber={2} timeInSeconds={1} />
                    </p>
                    <p className='text-sm text-slate-500'>Offers</p>
                </div>
                <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-500 border-dashed'>
                    <p className='text-base font-bold text-white-body'>
                    <CustomCounter targetNumber={3} timeInSeconds={1} />
                    </p>
                    <p className='text-sm text-slate-500'>Created</p>
                </div>
                <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-500 border-dashed'>
                    <p className='text-base font-bold text-white-body'>
                    <CustomCounter targetNumber={1} timeInSeconds={1} />
                    </p>
                    <p className='text-sm text-slate-500'>Rejected</p>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            <p className='text-base text-white-body font-bold'>Tracked Errors</p>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                    <div className='px-4 py-2 bg-[#0E172E] rounded-md'>
                        <img src={Img} className='w-8' alt="Order Image" />
                    </div>
                    <div className='flex-col'>
                        <p className='text-base font-bold text-white-body'>Project Briefing</p>
                        <p className='text-sm text-slate-500'>Project Manager</p>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <div className='px-4 py-2 bg-[#0E172E] rounded-md'>
                        <img src={Img} className='w-8' alt="Order Image" />
                    </div>
                    <div className='flex-col'>
                        <p className='text-base font-bold text-white-body'>Project Briefing</p>
                        <p className='text-sm text-slate-500'>Project Manager</p>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <div className='px-4 py-2 bg-[#0E172E] rounded-md'>
                        <img src={Img} className='w-8' alt="Order Image" />
                    </div>
                    <div className='flex-col'>
                        <p className='text-base font-bold text-white-body'>Project Briefing</p>
                        <p className='text-sm text-slate-500'>Project Manager</p>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <div className='px-4 py-2 bg-[#0E172E] rounded-md'>
                        <img src={Img} className='w-8' alt="Order Image" />
                    </div>
                    <div className='flex-col'>
                        <p className='text-base font-bold text-white-body'>Project Briefing</p>
                        <p className='text-sm text-slate-500'>Project Manager</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
