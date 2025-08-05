import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import DashboardAside from './aside/DashboardAside'
import DashboardHeader from './DashboardHeader'
import { generalLayoutContext } from '../../context/GeneralLayoutContext'

export default function DashboardLayout() {
    const [shrinkAside, setShrinkAside] = useState(false)

    const [showAsideDrawer, setShowAsideDrawer] = useState(false)

    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setShrinkAside(false)
            setShowAsideDrawer(false)
        })
    },[])
  return (
    <div className='w-full flex relative m-auto h-screen overflow-hidden'>
        <div 
            className={`${shrinkAside ? 'w-28' : 'w-72'} hidden lg:block relative z-[999] bg-black text-white-light`}
        >
            <div className='sticky top-0 h-full'>
                <DashboardAside shrinkAside={shrinkAside} />
                <button 
                    className='absolute top-[72px] -translate-y-[50px] -right-5 block p-2 rounded shadow-round_black dark:shadow-round_white bg-white dark:bg-black text-black dark:text-white'
                    onClick={()=>setShrinkAside(prev => !prev)}
                >
                    {shrinkAside ? <FaArrowRight />: <FaArrowLeft />}
                </button>
            </div>

        </div>

        <div 
        // onClick={()=>setShowAsideDrawer(prev => !prev)} 
        className={`${showAsideDrawer ? 'left-0' : '-left-96'} w-4/5 sm:w-72 lg:hidden fixed inset-0 z-[999] bg-black text-white-light`}>
            <DashboardAside />
            <button 
                className='absolute top-[72px] -translate-y-[50px] -right-5 block p-2 rounded shadow-round_black dark:shadow-round_white bg-white dark:bg-black text-black dark:text-white'
                onClick={(e)=>setShowAsideDrawer(prev => !prev)}
            >
                <FaArrowLeft />
            </button>
        </div>

        <div className='relative w-full h-full overflow-y-auto'>
            {/* HEADER SECTION generalLayoutContext*/}
            <DashboardHeader showAsideDrawer={showAsideDrawer} setShowAsideDrawer={setShowAsideDrawer} />

            {/* BODY SECTION */}
            {/* main takes the full width minus that of the header and footer 72 for header, 39 for footer total 111 */}
            <div className='main p-3 md:p-10 bg-white-light dark:bg-slate-800 text-brown dark:text-white-light min-h-[calc(99vh-111px)]'> 
                <Outlet />
            </div>

            {/* FOOTER SECTION */}
            <footer className="sticky bottom-0 text-center lg:text-end w-full bg-white dark:bg-slate-800 dark:text-white-light p-3 md:px-10 shadow-[0px_0px_2px_black]">
                <p className="text-10">Copyright @ {new Date().getFullYear()} - Developed by digiFi. All Rights Reserved</p>
            </footer>
        </div>
    </div>
  )
}
