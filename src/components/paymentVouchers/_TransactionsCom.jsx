import React, { useState } from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {Link} from 'react-router-dom'

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import TablePaginatedWrapper from '../tableWrapper/TablePaginatedWrapper'
import Icons from '../Icons'

import Avatar from '../../assets/user_avatar.jpg'
import queryKeys from '../../services/queryKeys'
import { getTransactions } from '../../services/siteServices'
import getDateFromDateString from '../../helpers/GetDateFromDateString';
import getTimeFromDateString from '../../helpers/GetTimeFromDateString';
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';

export default function TransactionsCom() {

    const queryClient = useQueryClient()

    const [page, setPage] = useState(1)

    const [filter, setFilter] = useState({transaction_id: '', account_id: ''})
    const handleFilter = ({target:{name, value}}) => {
        setFilter(prev => ({...prev, [name]:value}))
    }

    const handleFilterByParams = () => {
        // setPage(1)
        queryClient.invalidateQueries({ queryKey: [...queryKeys.transactions] })
    }

    const {data, isFetching, isError, error, isPlaceholderData, isPending} = useQuery({
        queryKey: [...queryKeys.transactions, page],
        queryFn: () => getTransactions({...filter, page}),
        staleTime: 0,
        // placeholderData: keepPreviousData,
    })

    const transactions = data?.data?.transactions // TRANSACTIONS LIST
    const pagination = data?.data?.pagination

    return (
        <div className='w-full flex flex-col gap-8'>
            <BreadcrumbCom title='Transactions' paths={['Dashboard', 'Transactions']} />

            <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
                {isFetching ? 
                <>
                    <p className='text-slate-800'>Loading...</p>
                </>
                : isError ?
                    <p className='text-red-500'>{error.message}</p>
                :
                <>
                    {/* filter section */}
                    <div className='px-2 py-2 mb-4 flex items-end gap-2'>
                        <Icons name='filter' className='text-3xl' />
                        <div className='flex gap-4 items-center'>
                            <div className=''>
                                <p>Transaction ID</p>
                                <select name='transaction_id' value={filter?.transaction_id} className='p-2' onChange={handleFilter}>
                                    <option value=''>select</option>
                                    <>
                                    {transactions.map((item, index) => (
                                        <option key={index} value={item?.transaction_id}>{item?.transaction_id}</option>
                                    ))}
                                    </>
                                </select>
                            </div>
                            <div className=''>
                                <p>Account ID</p>
                                <select name='account_id' value={filter?.account_id} className='p-2' onChange={handleFilter}>
                                    <option value=''>select</option>
                                    <>
                                    {transactions.map((item, index) => (
                                        <option key={index} value={item?.account_id}>{item?.account_id}</option>
                                    ))}
                                    </>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleFilterByParams} className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium`}>Submit</button>
                    </div>
                     {/* end of filter section */}

                    <TablePaginatedWrapper data={transactions} isFetching={isFetching} setPage={setPage} itemsPerPage={pagination?.limit} pagination={pagination}>
                    {({ data }) => (
                        <>
                            <table className="py-2 w-full text-sm">
                                <thead className="py-2 text-sm text-slate-500 text-left">
                                    <tr>
                                        <th scope="col" className="px-2 py-2">
                                            Request
                                        </th>
                                        <th scope="col" className="px-2">
                                            Account
                                        </th>
                                        <th scope="col" className="px-2">
                                            Activity
                                        </th>
                                        <th scope="col" className="px-2 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(data && data.length > 0) ? data?.map((item, index) => (
                                        <tr key={index} className="py-2 border-t border-dashed border-slate-300">
                                            <td className="px-2 py-2">
                                                <div className='w-full min-w-48 flex items-center gap-2 whitespace-nowrap'>
                                                <img className="w-10 h-10 rounded-md" src={localImgLoader(`loan_icons/${item?.type}.png`)} alt="Icon" />
                                                <div className="text-left">
                                                    <div className="text-base font-semibold">{item?.transaction_id}</div>
                                                    <div className="font-normal text-gray-500">{getDateFromDateString(item?.created_at)} {getTimeFromDateString(item?.created_at)}</div>
                                                </div>  
                                                </div>
                                            </td>
                                            <td className="px-2">
                                                <div className="text-left">
                                                    <div className="text-base font-semibold">{item?.account_id}</div>
                                                    <div className="font-normal text-gray-500">{item?.type}</div>
                                                </div> 
                                            </td>
                                            <td className="px-2">
                                                <div className="text-left">
                                                    <div className="font-normal text-gray-500">50%</div>
                                                    <div className="relative h-[6px] w-full bg-white-body dark:bg-black-body rounded-full overflow-hidden">
                                                    <div className={`absolute left-0 h-full w-1/2 bg-emerald-600`}></div>
                                                    </div>
                                                </div> 
                                            </td>
                                            <td className="px-2 text-right">
                                                <div className='flex items-center justify-end gap-3 md:gap-4'>
                                                    <div className='p-2 flex justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                        <Link to={RouteLinks.transaction_details_page} state={{transactionID: item?.transaction_id}}>
                                                            <Icons name='eye' />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr className="py-2 border-t border-dashed border-slate-300">
                                        <td className="px-3 py-2" colSpan={4}>
                                            <div className="flex justify-center items-center">
                                                No Record Found
                                            </div>
                                        </td>
                                    </tr>
                                    }
                                </tbody>
                            </table>
                        </>
                    )}
                    </TablePaginatedWrapper>
                </>
                }
            </div>
        </div>
    )
}