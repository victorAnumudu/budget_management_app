import { memo } from 'react'
import { Outlet } from 'react-router-dom'

import DashboardHeader from './DashboardHeader'
import { generalLayoutContext } from '../../context/GeneralLayoutContext'
import DashboardAside from './aside/DashboardAside'
import RightAsideBar from './rightaside/RightAsideBar'

const DashboardLayout = memo(() => {
    
        // let {pathname} = useLocation()
    
      const {showAsideDrawer, setShowAsideDrawer} = generalLayoutContext()
      
      return (
        <div className='w-full flex gap-10 relative m-auto h-screen overflow-x-hidden overflow-y-auto bg-white-body dark:bg-black-body p-8 pt-0 lg:p-10'>
            <div className='hidden lg:block min-w-[300px] px-8 py-4 rounded-3xl sticky top-0 h-full bg-white-aside dark:bg-black-aside shadow-round_black dark:shadow-round_white'>
                <DashboardAside />
            </div>
    
            <div className={`${showAsideDrawer =='aside' ? 'left-0' : '-left-full'} lg:hidden w-full fixed inset-0 z-[999]`}>
                <div className={`${showAsideDrawer =='aside' ? 'fixed left-0 top-0 inset-0' : '-left-full'} w-full bg-[rgba(0,_0,_0,_0.2)] dark:bg-[rgba(0,_0,_0,_0.4)] transition-all cursor-pointer`} onClick={()=>setShowAsideDrawer('')} ></div>
                <div className={`fixed px-8 py-4 h-full w-4/5 sm:w-[400px] bg-white-aside dark:bg-black-aside dark:text-white-light`}>
                    <DashboardAside />
                </div>
            </div>
    
            <div className={`main w-full bg-inherit large:mr-[400px]`}>
                <div className='fixed top-0 left-0 z-[980] w-full px-8 bg-inherit lg:hidden'>
                    <DashboardHeader />
                </div> 
    
                {/* main body section */}
                <div className='min-h-[calc(99vh-111px)] pt-20 lg:pt-0'>
                    <Outlet />
                </div>
    
                {/* FOOTER SECTION */}
                <footer className="py-5 text-center lg:text-end w-full text-brown dark:text-white-light">
                    <p className="text-10">Copyright @ {new Date().getFullYear()} - Developed by Government of Abia State. All Rights Reserved</p>
                </footer>
            </div>
    
            {/* Right Aisde */}
            <>
                <div className={`px-8 py-4 hidden large:flex fixed right-5 top-0 bottom-0 sm:w-[400px] bg-[#192440] dark:bg-black-aside text-white-body`}>
                    <RightAsideBar />
                </div>
                <div className={`${showAsideDrawer =='right-aside' ? 'right-0 w-full' : '-right-full w-0'} fixed inset-0 z-[999] large:hidden bg-[rgba(0,_0,_0,_0.2)] dark:bg-[rgba(0,_0,_0,_0.4)] transition-all cursor-pointer`} onClick={()=>setShowAsideDrawer('')}>
                    {/* <div className={`${showAsideDrawer =='right-aside' ? 'right-0' : '-right-full'} fixed z-[999] right-0 top-0 inset-0 w-full bg-white/20 bg-red-400 transition-all cursor-pointer`} onClick={()=>setShowAsideDrawer('')} ></div> */}
                    <div onClick={(e)=>e.stopPropagation()} className={`${showAsideDrawer =='right-aside' ? 'right-0' : '-right-full'} fixed z-[999] top-0 botom-0 px-8 py-4 h-full w-4/5 sm:w-[400px] bg-[#192440] dark:bg-black-aside text-white-body`}>
                        <RightAsideBar />
                    </div>
                </div>
            </>
        </div>
      )
    }
)

export default DashboardLayout
