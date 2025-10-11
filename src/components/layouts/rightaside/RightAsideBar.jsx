import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import queryKeys from '../../../services/queryKeys'
import { getDashRightPanelSummaryData } from '../../../services/siteServices'
import Icons from '../../Icons'
import Capital from './Capital'
import Tickets from './Tickets'
import Reserved from './Reserved'

export default function RightAsideBar() {

    let [active, setActive] = useState('capital')

    const handleActiveMenu = (name) => {
        let lowerStr = name.toLowerCase()
        setActive(lowerStr)
    }

    const {data, isFetching, isError, error} = useQuery({
        queryKey: queryKeys.dashboardRightPanelData,
        queryFn: () => getDashRightPanelSummaryData(),
    })

    const dashRightPanelSummaryData = data?.data?.data // DASHBOARD RIGHT PANEL SUMMARY DATA

  return (
    <div className='w-full h-full flex flex-col gap-8'>
        {/* Menu */}
        <div className='grid grid-cols-2 gap-8'>
            <button name='capital' onClick={() => handleActiveMenu('capital')} className={`flex flex-col gap-1 justify-center items-center px-2 py-3 large:px-4 large:py-5 rounded-md shadow-round_white bg-[#0E172E] dark:bg-black-box text-white-body hover:scale-[1.1] ${active == 'capital' && 'scale-[1.2]'}`}>
                <Icons name='dashboard' className='text-3xl' />
                {/* <span className='text-12'>Capital/Recurrent</span> */}
            </button>
            <button name='reserved' onClick={() => handleActiveMenu('reserved')} className={`flex flex-col gap-1 justify-center items-center px-2 py-3 large:px-4 large:py-5 rounded-md shadow-round_white bg-[#0E172E] dark:bg-black-box text-white-body hover:scale-[1.1] ${active == 'reserved' && 'scale-[1.2]'}`}>
                <Icons name='dashboard' className='text-3xl' />
                {/* <span className='text-12'>Contingency/comm. ser</span> */}
            </button>
        </div>

        {/* Body */}
        {active == 'capital' && <Capital status={{isFetching, isError, error}} data={dashRightPanelSummaryData} />}
        {active == 'reserved' && <Reserved status={{isFetching, isError, error}} data={dashRightPanelSummaryData} />}
    </div>
  )
}
