import React from 'react'
import CustomCounter from '../../CustomCounter'
import ImgCom from '../../img/ImgCom'
import shortenNumber from '../../../helpers/shortenNumber'

export default function Reserved({data}) {
    
    const newData = {Contingency: data.contingency, ComServices: data.common_service}

    return (
        <div className='h-full p-2 sm:p-4 large:p-8 flex flex-col gap-8 overflow-y-auto aside-scroll-design'>
            {Object.keys(newData).map((item, index)=>(
                <div className='flex flex-col gap-4'>
                    <p className='text-base text-slate-high font-bold'>{item}</p>
                    <div className='grid grid-cols-2 gap-4 sm:gap-6 large:gap-8'>
                        <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-higher border-dashed'>
                            <p className='text-base font-bold text-slate-high'>
                                ₦{shortenNumber(newData[item]?.revised_budget, 2)}
                            </p>
                            <p className='text-sm text-slate-higher'>Budget</p>
                        </div>
                        <div className='p-2 sm:p-3 large:p-4 flex flex-col border border-slate-higher border-dashed'>
                            <p className='text-base font-bold text-slate-high'>
                                ₦{shortenNumber(newData[item]?.balance, 2)}
                            </p>
                            <p className='text-sm text-slate-higher'>Balance</p>
                        </div>
                    </div>
                </div>
            ))}
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
