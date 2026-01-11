import { Link, useLocation } from 'react-router-dom';
import { dashboardData } from '../../data/dashboardData'; // REMOVE LATER AFTER CALLING MAIN ENDPOINT TO POPULATE
import getDateFromDateString from '../../helpers/GetDateFromDateString';
import localImgLoader from '../../helpers/localImageLoader';
import Icons from '../Icons';
import getTimeFromDateString from '../../helpers/GetTimeFromDateString';
import RouteLinks from '../../RouteLinks';
import { memo } from 'react';

import { PVrecords } from '../../data/PVData';
import { useQuery } from '@tanstack/react-query';
import { getAllPVData } from '../../services/siteServices';
import queryKeys from '../../services/queryKeys';

const RecentlyAdded = memo(() => {

    const {pathname} = useLocation()

    const tableLength = pathname == RouteLinks.addPV ? 4 : 8

    const {data:allPVsData, isFetching, isError, error} = useQuery({
        queryKey: [...queryKeys.getAllPVs],
        queryFn: () => {
            const reqData = {
            }
            return getAllPVData(reqData)
        },
    })
    const allPVs = allPVsData?.data?.data?.pvs // PVS LIST

    return (
        <>
            {(isFetching || isError) ?
            <>
                {isError ? <p className='text-red-500'>{error?.message}</p> : <p className='text-slate-800'>Loading...</p>}
            </>
            :
            <>
                <div className='grid grid-cols-1 xs:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1 order-2 xs:order-1'>
                        <p className='font-bold text-base'>Recently Added Request</p>
                        {/* <p className='text-12'>Over 500 members</p> */}
                    </div>
                    {/* <div className='order-1 xs:order-2 text-left xs:text-right'>
                        <button className='font-bold bg-white-aside text-black-body text-12 px-4 py-2 hover:text-primary  hover:bg-sky-50 dark:hover:text-white dark:hover:bg-primary dark:bg-primary-dark dark:text-white-body dark:bg-black-body rounded-md'>+ New Member</button>
                    </div> */}
                </div>
                
                <div className="table-scroll w-full overflow-x-auto">
                    <table className="table-auto py-2 w-full text-sm">
                        <thead className="text-sm text-slate-higher dark:text-slate-high dark:font-semibold text-left">
                            <tr>
                                <th scope="col" className="p-2">
                                    MDA/Date
                                </th>
                                <th scope="col" className="p-2">
                                    Economic Description
                                </th>
                                <th scope="col" className="p-2">
                                    PV Description
                                </th>
                                <th scope="col" className="p-2">
                                    Beneficiary
                                </th>
                                <th scope="col" className="p-2">
                                    Gross/Net Amt
                                </th>
                                <th scope="col" className="p-2">
                                    Approval
                                </th>
                                <th scope="col" className="p-2">
                                    Status
                                </th>
                                {/* <th scope="col" className="p-2 text-right">
                                    Action
                                </th> */}
                            </tr>
                        </thead>
                        <tbody className='text-black-aside dark:text-slate-high'>
                            {(allPVs?.length > 0) ? allPVs?.map((item, index) => {
                            if(index <= tableLength) {
                                return (
                                    <tr key={item.id || index} className={`${index%2 == 0 && 'bg-white-aside dark:bg-black-aside'} border-t border-dashed border-slate-high`}>
                                        <td className="p-2">
                                            <div className='w-full flex items-center gap-2 whitespace-nowra'>
                                                <img className="w-8 h-8 rounded-md" src={localImgLoader(`loan_icons/provide_loan.png`)} alt="Icon" />
                                                <div className="text-left">
                                                    <div title={item?.mda_name} className="text-sm font-semibold line-clamp-1">{item?.mda_name}</div>
                                                    <div className="text-sm font-semibold">{item?.pv_number}</div>
                                                    <div className="font-normal text-slate-higher">{getDateFromDateString(item?.date_captured)}</div>
                                                </div>  
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-left">
                                                <div title={item?.economic_description} className="text-sm font-semibold line-clamp-1">{item?.economic_description}</div>
                                                <div className="font-normal text-slate-higher">{item?.economic_code}</div>
                                            </div> 
                                        </td>
                                        <td className="p-2">
                                            <div className="text-left">
                                                <div title={item?.pv_description} className="text-sm font-semibold line-clamp-2">{item?.pv_description}</div>
                                            </div> 
                                        </td>
                                        <td className="p-2">
                                            <div className="text-left">
                                                <div className="text-sm font-semibold">{item?.beneficiary_name}</div>
                                                <div className="font-normal text-slate-higher">{item?.beneficiary_account}</div>
                                                <div className="font-normal text-slate-higher">{item?.beneficiary_bank}</div>
                                            </div> 
                                        </td>
                                        <td className="p-2">
                                            <div className="text-left">
                                                <div className="text-sm font-semibold">{item?.gross_amount}</div>
                                                <div className="font-normal text-slate-higher">{item?.net_amount}</div>
                                            </div> 
                                        </td>
                                        <td className="p-2">
                                            <div className="text-left">
                                                <div className="text-sm font-semibold">{item?.approval_authority}</div>
                                                <div className="font-normal text-slate-higher">{item?.budget_type}</div>
                                            </div> 
                                        </td>
                                        
                                        <td className="p-2">
                                            <div className="text-left flex flex-col items-center">
                                                <div className="font-normal text-slate-higher">
                                                    {item.warrant_number ? 1 : 0}
                                                </div>
                                                <div className="relative h-[6px] w-full bg-white-body dark:bg-black-body rounded-full overflow-hidden">
                                                    <div className={`absolute left-0 h-full w-full ${item.warrant_number ? 'bg-emerald-600' : 'bg-red-500'}`}></div>
                                                </div>
                                            </div> 
                                        </td>
                                        {/* <td className="group relative p-2 text-right">
                                            <div className='flex items-center justify-end gap-3 md:gap-4'>
                                                <div className='p-2 flex justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                    <Icons name='eye' />
                                                </div>
                                                <div className='absolute top-2 right-3 hidden group-hover:flex flex-col gap-2 p-2 justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                    <Link to={RouteLinks.transaction_details_page} state={{transactionID: item?.transaction_id}}>
                                                        <Icons name='eye' />
                                                    </Link>
                                                    <Icons name='trash' className='text-red-500' />
                                                    <Icons name='edit' className='text-primary ' />
                                                </div>
                                            </div>
                                        </td> */}
                                    </tr>
                                )
                            }
                            }
                            )
                            :
                            <tr className="p-2 border-t border-dashed border-slate-high">
                                <td className="px-3 py-2" colSpan={8}>
                                    <div className="flex justify-center items-center">
                                        No Record Found
                                    </div>
                                </td>
                            </tr>
                            }
                            <>
                            {PVrecords?.data.length > tableLength &&
                            <tr className="py-2 border-t border-dashed text-right text-primary  border-slate-300">
                                <td className="px-3 py-2" colSpan={8}>
                                    <Link to={RouteLinks.paymentVouchers} className="flex justify-end items-center">
                                        More ...
                                    </Link>
                                </td>
                            </tr>
                            }
                            </>
                        </tbody>
                    </table>
                </div>
            </>
            }
        </>
    )
}
)


export default RecentlyAdded