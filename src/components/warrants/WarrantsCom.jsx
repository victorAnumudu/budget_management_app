import { memo, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import TablePaginatedWrapper from '../tableWrapper/TablePaginatedWrapper'
import Icons from '../Icons'
import { getAllWarrants, deletePV } from '../../services/siteServices'
import getDateFromDateString from '../../helpers/GetDateFromDateString';
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';

import InputText from '../inputs/InputText'
import SelectDropdown from '../inputs/SelectDropdown'
import MainBtn from '../btn/MainBtn'
import VerifyModal from '../modals/VerifyModal'
import StatusModal from '../modals/StatusModal'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import queryKeys from '../../services/queryKeys'

const WarrantsCom = memo(() =>{

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({type: '', value: ''})
    const [willFilter, setWillFilter] = useState(false)

    const handleFilter = ({target:{name, value}}) => {
        setFilter(prev => ({...prev, [name]:value}))
    }

    const handleFilterByParams = () => {
        if(filter.type && !filter.value){
            return
        }else if(!filter.type){
            setPage(1)
            setWillFilter(prev => !prev)
            setFilter({type: '', value: ''})
        }else{
            setPage(1)
            setWillFilter(prev => !prev)
        }
    }

    //FUNCTION TO OPEN EDIT MODAL
    const [actionModal, setActionModal] = useState({data:{}, name:''})
    const showActionModal = (data, name) => setActionModal({data, name})
    const closeActionModal = () => setActionModal({data:{}, name:''})


    const {data:allWarrantData, isFetching, isError, error} = useQuery({
        queryKey: [...queryKeys.getAllWarrants, page, willFilter],
        queryFn: () => {
            const filterData = filter?.type ? {[filter?.type]: filter.value} : {}
            const reqData = {
                page,
                ...filterData
            }
            return getAllWarrants(reqData)
        },
        staleTime: 0 //0 mins
    })
    const allWarrants = allWarrantData?.data?.data?.warrants // ALL WARRANTS LIST
    const pagination = allWarrantData?.data?.data?.pagination


    const delPV = useMutation({
        mutationFn: (fields) => {
            if(!fields?.expense_uid){
                throw new Error('No payment voucher selected')
            }
            return deletePV(fields)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            queryClient.invalidateQueries({ queryKey: [...queryKeys.getAllPVs] })
        },
        onSettled: () => {
            setTimeout(()=>{
                delPV.reset()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        }
    })

    return (
        <>
            <div className='w-full flex flex-col gap-4'>
                <BreadcrumbCom title='Warrants' paths={['Dashboard', 'Warrants']} />
                {/* <div className='w-48 ml-auto'>
                    <MainBtn 
                        onClick={() => navigate(RouteLinks.addWarrant)} 
                        disabled={false} 
                        className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                        text='Create new Warrant'
                    />
                </div> */}
                <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>

                    <>
                        {/* filter section */}
                        {allWarrants?.length > 0 &&
                            <div className='px-2 py-2 mb-4 flex flex-col sm:flex-row flex-wrap sm:items-center gap-2'>
                                <Icons name='filter' className='text-3xl text-slate-600' />
                                <div className='w-full sm:max-w-48'>
                                    <SelectDropdown
                                        name='type'
                                        value={filter?.type}
                                        onChange={handleFilter}
                                    >
                                        <option value=''>All</option>
                                        <option value='_id'>Warrant Number</option>
                                    </SelectDropdown>
                                </div>
                                <div className='w-full sm:max-w-48'>
                                    <InputText 
                                        id='id' 
                                        name='value' 
                                        value={filter?.value}
                                        disabled={!filter.type}
                                        placeholder={filter.type && `enter ${filter.type}`} 
                                        className={`h-10 w-full p-2 rounded-md text-black-aside dark:text-slate-high outline-none border border-black-aside dark:border-slate-high ${!filter.type && 'opacity-30'}`} 
                                        handleChange={handleFilter}
                                    />
                                </div>
                                <div className='w-20'>
                                    <MainBtn 
                                        onClick={handleFilterByParams} 
                                        disabled={filter.type && !filter.value} 
                                        className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(filter.type && !filter.value) && 'opacity-50'}`}
                                        text='Submit'
                                    />
                                </div>
                            </div>
                        }
                        {/* end of filter section */}
                        {isError &&
                        <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
                            <p className='text-red-500'>{error.message}</p>
                        </div>
                        }
                        <TablePaginatedWrapper data={allWarrants} isFetching={isFetching} setPage={setPage} itemsPerPage={pagination?.limit} pagination={pagination}>
                        {({ data }) => (
                            <>
                                <table className="table-auto py-2 w-full text-sm">
                                    <thead className="text-sm text-slate-higher dark:text-slate-high dark:font-semibold text-left">
                                        <tr>
                                            <th scope="col" className="p-2">
                                                Date
                                            </th>
                                            <th scope="col" className="p-2">
                                                Warrant ID
                                            </th>
                                            <th scope="col" className="p-2">
                                                Total PVs
                                            </th>
                                            <th scope="col" className="p-2">
                                                Gross/Net Amt
                                            </th>
                                            <th scope="col" className="p-2">
                                                Generated
                                            </th>
                                            <th scope="col" className="p-2 text-right">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-black-aside dark:text-slate-high'>
                                        {(data && data.length > 0) ? data?.map((item, index) => {
                                            const lengthOfItem = item?.expenses_id?.length
                                            const gross = item?.expenses_id?.reduce((acc, item)=>{
                                                return acc + item?.gross_amount
                                            },0)
                                            const net = item?.expenses_id?.reduce((acc, item)=>{
                                                return acc + item?.net_amount
                                            },0)

                                           return (
                                                <tr key={item.id || index} className="border-t border-dashed border-slate-high">
                                                    <td className="p-2">
                                                        <div className='w-full flex items-center gap-2 whitespace-nowra'>
                                                            <img className="w-8 h-8 rounded-md" src={localImgLoader(`loan_icons/provide_loan.png`)} alt="Icon" />
                                                            <div className="text-left">
                                                                <div className="font-normal text-slate-higher">{getDateFromDateString(item?.date_issued)}</div>
                                                            </div>  
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            <div title={item?._id} className="text-sm font-semibold line-clamp-1">{item?._id}</div>
                                                            {/* <div className="font-normal text-slate-higher">{item?.economic_code}</div> */}
                                                        </div> 
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            <div className="text-sm font-semibold line-clamp-2">{lengthOfItem}</div>
                                                        </div> 
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            <div className="text-sm font-semibold">{gross}</div>
                                                            <div className="font-normal text-slate-higher">{net}</div>
                                                        </div> 
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            {/* <div className="text-sm font-semibold">{item?.approval_authority}</div> */}
                                                            <div className="font-normal text-slate-higher">{item?.status ? 'true' : 'False'}</div>
                                                        </div> 
                                                    </td>
                                                    <td className="group relative p-2 text-right">
                                                        <div className='flex items-center justify-end gap-3 md:gap-4'>
                                                            <div className='p-2 flex cursor-pointer justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                                {/* <Icons name='eye' /> */}
                                                                <button onClick={()=>navigate(RouteLinks.warrantDetails, {state: item}, {replace: true})}>
                                                                    <Icons name='eye' />
                                                                </button>
                                                            </div>
                                                            {/* <div className='absolute top-2 right-3 hidden group-hover:flex gap-2 p-2 justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                                <button onClick={()=>showActionModal(item, 'delete')}>
                                                                    <Icons name='trash' className='text-red-500' />
                                                                </button>
                                                                <button onClick={()=>showActionModal(item, 'edit')}>
                                                                    <Icons name='edit' className='text-primary ' />
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr className="p-2 border-t border-dashed border-slate-high">
                                            <td className="px-3 py-2" colSpan={6}>
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
                    
                </div>
            </div>
            {actionModal.name == 'delete' && 
                <VerifyModal 
                    text='Are you sure you want to delete this Payment Voucher?' 
                    proceedFunc={()=>{
                        showActionModal(actionModal.data, 'status')
                        const expense_uid = actionModal?.data?.expense_uid
                        delPV.mutate({})
                    }} 
                    cLoseModal={closeActionModal}
                />
            }
            { actionModal.name == 'status' &&
                <StatusModal 
                    isPending={delPV.isPending}
                    text={delPV.isSuccess ? 'PV deleted successfully' : 'Unable to delete payment voucher'} 
                    isSuccess={delPV.isSuccess}
                    cLoseModal={()=>{closeActionModal()}}
                />
            }
        </>
    )
})


export default WarrantsCom