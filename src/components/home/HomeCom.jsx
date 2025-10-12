import React from 'react'
import  {Link} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";

import queryKeys from '../../services/queryKeys'
import { getDashData, getDashSummaryData } from '../../services/siteServices'
import BreadcrumbCom from '../../components/breadcrumb/BreadcrumbCom'
import CustomCounter from '../../components/CustomCounter'
import Icons from '../../components/Icons'
import shortenNumber from '../../helpers/shortenNumber';
import formatNumber from '../../helpers/formatNumber'
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

        <div className='grid grid-cols-1 gap-8'>
          <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-8'>
            {(isFetching || isError) ?
              <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
                {isError ? <p className='text-red-500'>{error.message}</p> : <p className='text-slate-800'>Loading...</p>}
              </div>
              :
              <>
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
              </>
            }


            {(summaryIsFetching || summaryIsError) ?
              <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
                {summaryIsError ? <p className='text-red-500'>{summaryError.message}</p> : <p className='text-slate-800'>Loading...</p>}
              </div>
              :
              <>
                <div className='box min-h-[230] justify-between bg-[#CBD4F4] dark:bg-black-box text-black-body dark:text-white-body'>
                  <p className='mb-4 text-base sm:text-lg font-bold hover:text-primary '>Expenses (Summary)</p>
                  <div className='grid grid-cols-2 gap-4 font-bold'>
                    {
                    Object.keys(dashSummaryData)?.map((item, index) => {
                      const spanFull = dashSummaryData[item]?.name.toLowerCase() == 'Revised Budget'.toLowerCase()
                      return (
                        <div key={index} className={`${spanFull && 'col-span-2 flex justify-center text-center'}`}>
                          <div className='flex items-center gap-2'>
                            {!spanFull &&
                            <div className='min-w-9 min-h-9 bg-white-body dark:bg-black-box dark:shadow-[0_0_0_1px_#f9f9f9] rounded-md flex justify-center items-center'>
                              <Icons name='sales' />
                            </div>
                            }
                            <div className='flex flex-col gap-0'>
                              <p className='text-12 text-slate-500'>{dashSummaryData[item]?.name}</p>                        
                              <p className='font-bold text-base'>₦{spanFull ? formatNumber(dashSummaryData[item]?.total_expenses) : shortenNumber(dashSummaryData[item]?.total_expenses)}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                    }
                  </div>
                </div>
              </>
            }

          </div>

        </div>

      <div className='box gap-8 bg-white dark:bg-black-box text-black-body dark:text-white-body overflow-x-auto'>
        <RecentlyAdded />
      </div>
    </div>
  )
}