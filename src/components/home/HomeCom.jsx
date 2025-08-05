import React from 'react'
import  {Link} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import BreadcrumbCom from '../../components/breadcrumb/BreadcrumbCom'
import CustomCounter from '../../components/CustomCounter'
import Icons from '../../components/Icons'
import formatNumber from '../../helpers/formatNumber'

import queryKeys from '../../services/queryKeys'
import { getDashData } from '../../services/siteServices'
import getDateFromDateString from '../../helpers/GetDateFromDateString';
import getTimeFromDateString from '../../helpers/GetTimeFromDateString';
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';
import { Widget1 } from './Widget1'
import { Widget2 }from './Widget2'

import { dashboardData } from '../../data/dashboardData'; // REMOVE LATER AFTER CALLING MAIN ENDPOINT TO POPULATE
import RecentlyAdded from '../recentlyAdded/RecentlyAdded';

export default function HomeCom() {

  // const {data, isFetching, isError, error} = useQuery({
  //   queryKey: queryKeys.dashboard,
  //   queryFn: () => getDashData(),
  // })

  // const dashData = data?.data // DASHBOARD DATA


  const isFetching = false
  const isError = false
  const dashData = dashboardData

  return (
    <div className='w-full flex flex-col gap-8'>
      <BreadcrumbCom title='Dashboard' paths={['Home', 'Dashboard']} />

      {(isFetching || isError) ?
      <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
        {isError ? <p className='text-red-500'>{error.message}</p> : <p className='text-slate-800'>Loading...</p>}
      </div>
      :
      <>
        <div className='grid grid-cols-1 gap-8'>
          <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-8'>
            <div className='box min-h-[230] justify-between bg-[#F7D9E3] dark:bg-black-box text-black-body dark:text-white-body'>
              <p className='text-base sm:text-lg font-bold hover:text-primary '>Capital</p>
              <Widget1 />
              <div className='flex flex-wrap gap-2 items-end font-bold'>
                {/* <p className='text-3xl sm:text-[39px]'><span className='text-xl sm:text-2xl'>{dashData?.loans?.currency_text}</span><CustomCounter targetNumber={dashData?.loans?.value} timeInSeconds='1' /></p> */}
                <p className='text-xl sm:text-[30px]'>
                  <span className='text-lg sm:text-xl'>
                  {dashData?.loans?.currency_text}
                  </span>
                    <CustomCounter targetNumber={dashData?.loans?.value} timeInSeconds='1' />
                </p>
                <p className='sm:text-[13.9px]'>{dashData?.loans?.text}</p>
              </div>
            </div>
            <div className='box min-h-[230] justify-between bg-[#CBF0F5] dark:bg-black-box text-black-body dark:text-white-body'>
              <p className='text-base sm:text-lg font-bold hover:text-primary '>Recurrent</p>
              <Widget2 />
              <div className='flex flex-wrap gap-2 items-end font-bold'>
                <p className='text-xl sm:text-[30px]'>
                  <span className='text-lg sm:text-xl'>
                  {dashData?.payments?.currency_text}
                  </span>
                  <CustomCounter targetNumber={dashData?.payments?.value} timeInSeconds='1' />
                </p>
                <p className='sm:text-[13.9px]'>{dashData?.payments?.text}</p>
              </div>
            </div>
            <div className='box min-h-[230] justify-between bg-[#CBD4F4] dark:bg-black-box text-black-body dark:text-white-body'>
              <p className='mb-4 text-base sm:text-lg font-bold hover:text-primary '>Summary</p>
              <div className='grid grid-cols-2 gap-4 font-bold'>
                {
                Object.values(dashData?.request_summary).map((item, index) => {
                  return (
                    <div key={index} className='flex items-center gap-2'>
                      <div className='min-w-10 min-h-10 bg-white-body dark:bg-black-box dark:shadow-[0_0_0_1px_#f9f9f9] rounded-md flex justify-center items-center'>
                        <Icons name='sales' />
                      </div>
                      <div>
                        <p className='text-12 text-slate-500'>{item?.name}</p>
                        <p className='font-bold text-base'>₦<CustomCounter targetNumber={item?.value} timeInSeconds='1' />k</p>
                      </div>
                    </div>
                  )
                })
                }
              </div>
            </div>
          </div>
        </div>
        <div className='box gap-8 bg-white dark:bg-black-box text-black-body dark:text-white-body overflow-x-auto'>
          <RecentlyAdded />
        </div>
      </>
      }
    </div>
  )
}