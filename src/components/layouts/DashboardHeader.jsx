import { LuSunDim } from "react-icons/lu";
import { IoMdSunny } from "react-icons/io";
import { useSelector } from "react-redux";

import { generalLayoutContext } from "../../context/GeneralLayoutContext"

import HandBurger from "./HandBurger"
import { Link } from "react-router-dom"
import RouteLinks from "../../RouteLinks"
import MainBtn from "../btn/MainBtn";
import Icons from "../Icons";
import ImgCom from "../img/ImgCom";
import { memo } from "react";

const DashboardHeader = memo(() => {

    // let {pathname} = useLocation()

    const {userDetails:{firstname, lastname, email}} = useSelector((state) => state.userDetails) // GETS LOGGED IN USER ROLE DETAILS

    const {theme, handleTheme, setLogoutModal, activeMenu, handleActiveMenu, showAsideDrawer, setShowAsideDrawer} = generalLayoutContext()

  return (
    <>
        {/* HEADER SECTION*/}
        <header className='text-brown dark:text-white'>
            <div className='w-full flex h-20 justify-between lg:justify-end items-center'>
                <div className="lg:hidden cursor-pointer" onClick={()=>setShowAsideDrawer('aside')}>
                    <HandBurger showAside={showAsideDrawer} />
                </div>

                {/* USER AVATAR */}
                <div className="flex gap-4 justify-end">

                    {/* GO TO WALLET */}
                    <Link to={RouteLinks.walletPage} className="relative px-2 flex justify-center items-center gap-2 cursor-pointer">
                        <i className="fa-solid fa-wallet text-xl"></i>
                    </Link>

                    {/* RIGHT DRAWER BUTTON */}
                     <div onClick={()=>setShowAsideDrawer('right-aside')} className='max_width:hidden  w-10 h-10 border border-slate-high text-slate-higher dark:text-white-body rounded-md px-2 flex justify-center items-center gap-2 cursor-pointer' title='Switch Color Mode'>
                        <Icons name='right-panel' className="text-sm md:text-xl font-bold" />
                    </div>

                     {/* MESSAGE */}
                     {/* <button onClick={()=>handleDrawer(drawerName.chat)} className="relative px-2 flex justify-center items-center gap-2 cursor-pointer">
                        <i className="fa-regular fa-envelope text-xl"></i>
                        <div className="absolute w-4 h-4 right-0 top-4 text-[8px] flex justify-center items-center rounded-full bg-emerald-500 animate-pulse">1</div>
                    </button> */}

                    {/* THEME SELECTION */}
                    <div onClick={handleTheme} className='w-10 h-10 border border-slate-high text-slate-higher dark:text-slate-high rounded-md px-2 flex justify-center items-center gap-2 cursor-pointer' title='Switch Color Mode'>
                        {theme == 'dark' ?
                        <IoMdSunny className="text-sm md:text-xl font-bold" />
                        :
                        <LuSunDim className="text-sm md:text-xl font-bold" />
                        }
                    </div>
                    
                    <div onClick={()=>handleActiveMenu('avatar')} className='relative cursor-pointer w-10 h-10 rounded shadow-round_black dark:shadow-round_white'>
                        <ImgCom src={'user_avatar.jpg'} alt='user avatar' className='w-full h-full p-1 rounded-full' />
                        {activeMenu == 'avatar' &&
                            <>
                                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/10"></div>
                                <div className="pop-modal z-[777] absolute w-52 sm:w-96 bg-white dark:bg-black-box right-0 top-16 overflow-hidden rounded shadow-round_black dark:shadow-round_white">
                                    <div className="w-full h-full flex flex-col gap-4">
                                        <div className="p-4 py-2 flex flex-col gap-2 text-white bg-primary dark:bg-black-box text-base sm:text-lg">
                                            <h1 className="font-semibold">{firstname ? `${firstname} ${lastname}` : 'Username'}</h1>
                                            <p className="-mt-2">{email ? email : 'username@gmail.com'}</p>
                                        </div>
                                        <div className="min-h-28"></div>
                                        <div className="rounded w-full flex justify-center items-center gap-2">
                                            <MainBtn
                                                text='Logout' 
                                                className="text-black-body hover:text-red-500 dark:text-white-body font-bold text-lg" 
                                                onClick={()=>setLogoutModal(true)}
                                                icon='logout'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                </div>
        </header>
    </>
  )
})

export default DashboardHeader