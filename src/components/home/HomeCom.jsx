import React from 'react'
import  {Link} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";

import queryKeys from '../../services/queryKeys'
import { getDashData, getDashSummaryData } from '../../services/siteServices'
import BreadcrumbCom from '../../components/breadcrumb/BreadcrumbCom'
import CustomCounter from '../../components/CustomCounter'
import Icons from '../../components/Icons'
import shortenNumber from '../../helpers/shortenNumber';
import { Widget1 } from './Widget1'
import { Widget2 }from './Widget2'
import RecentlyAdded from '../recentlyAdded/RecentlyAdded';

export default function HomeCom() {

  const {data, isFetching, isError, error} = useQuery({
    queryKey: queryKeys.dashboardData,
    queryFn: () => getDashData(),
  })

  const {data:summary, isFetching:summaryIsFetching, isError:summaryIsError, error:summaryError} = useQuery({
    queryKey: queryKeys.dashboardSummaryData,
    queryFn: () => getDashSummaryData(),
  })

  const dashData = data?.data?.data?.dashboard_data // DASHBOARD DATA
  const dashSummaryData = summary?.data?.data // DASHBOARD SUMMARY DATA

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
              <p className='text-base sm:text-lg font-bold hover:text-primary '>{dashData[0]?.budget_type}</p>
              <Widget1 />
              <div className='flex flex-wrap gap-2 items-end font-bold'>
                <p className='text-xl sm:text-[30px]'>
                  <span className='text-lg sm:text-xl'>
                  ₦
                  </span>
                    <CustomCounter targetNumber={dashData[0]?.gross_amount} timeInSeconds='1' />
                </p>
                <p className='sm:text-[13.9px]'>{dashData[0]?.period}</p>
              </div>
            </div>
            <div className='box min-h-[230] justify-between bg-[#CBF0F5] dark:bg-black-box text-black-body dark:text-white-body'>
              <p className='text-base sm:text-lg font-bold hover:text-primary '>{dashData[1]?.budget_type}</p>
              <Widget2 />
              <div className='flex flex-wrap gap-2 items-end font-bold'>
                <p className='text-xl sm:text-[30px]'>
                  <span className='text-lg sm:text-xl'>
                  ₦
                  </span>
                  <CustomCounter targetNumber={dashData[1]?.gross_amount} timeInSeconds='1' />
                </p>
                <p className='sm:text-[13.9px]'>{dashData[1]?.period}</p>
              </div>
            </div>
            <div className='box min-h-[230] justify-between bg-[#CBD4F4] dark:bg-black-box text-black-body dark:text-white-body'>
              <p className='mb-4 text-base sm:text-lg font-bold hover:text-primary '>Summary</p>
              <div className='grid grid-cols-2 gap-4 font-bold'>
                {
                Object.keys(dashSummaryData).map((item, index) => {
                  return (
                    <div key={index} className='flex items-center gap-2'>
                      <div className='min-w-10 min-h-10 bg-white-body dark:bg-black-box dark:shadow-[0_0_0_1px_#f9f9f9] rounded-md flex justify-center items-center'>
                        <Icons name='sales' />
                      </div>
                      <div>
                        <p className='text-12 text-slate-500'>{dashSummaryData[item]?.name}</p>                        
                        <p className='font-bold text-base'>₦{shortenNumber(dashSummaryData[item]?.total_expenses)}</p>
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