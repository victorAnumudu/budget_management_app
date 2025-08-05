import { memo, useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { TiHomeOutline } from 'react-icons/ti'
import DashboardHeader from '../layouts/DashboardHeader'

const BreadcrumbCom = memo(({title, span, paths}) => {

  const [stickNav, setStickNav] = useState(false)

  useEffect(()=>{
      // var rect = navRef?.current?.getBoundingClientRect()?.bottom;
      var rect = 10;
      window.addEventListener('scroll', ()=>{
          if(window.scrollY >= rect + 20){
              setStickNav(true)
              console.log('tru')
          }else{
              setStickNav(false)
              console.log('false')
          }
      })
  },[])

  return (
    // ${stickNav ? 'sticky top-0 transition-[top] duration-1000 shadow-md shadow-black' : '-top-[100px] static'}
    <div className={`sticky z-[970] top-[78px] lg:-top-10 bg-white-body dark:bg-black-body border-b border-transparent dark:border-black-box dark:shadow-sm dark:shadow-black-box`}>
      <div className= {`w-full py-2 flex justify-between items-center`}>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col md:flex-row gap-1 md:items-center'>
            <h1 className='text-12 sm:text-lg md:text-2xl text-black dark:text-slate-high font-semibold'>{title}</h1>
            <span className='text-red-500 text-10 sm:text-base'>{span && span}</span>
          </div>
          <div className='flex gap-2 items-center text-black-gray dark:text-slate-high text-base'>
              <TiHomeOutline className='text-black dark:text-slate-high' />
              {paths.map((item, index) => (
                <div className='flex gap-2 items-center text-black dark:text-slate-high text-10 sm:text-sm' key={index}>
                  <MdKeyboardDoubleArrowRight />
                  <p className={`${index + 1 == paths.length ? 'text-primary  dark:text-slate-higher' : ''}`}>{item}</p>
                </div>
              ))}
          </div>
        </div>
        <div className='hidden lg:flex'>
          <DashboardHeader />
        </div>
      </div>
    </div>
  )
})


export default BreadcrumbCom