import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import Icons from '../Icons'
import localImgLoader from '../../helpers/localImageLoader'
import getDateFromDateString from '../../helpers/GetDateFromDateString'
import formatNumber from '../../helpers/formatNumber'
import groupByEconomicCode from '../../helpers/groupByEconomicCode'
import MainBtn from '../btn/MainBtn'
import { getAllWarrants, removeWarrantItem, deleteWarrant, generateWarrant } from '../../services/siteServices'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import queryKeys from '../../services/queryKeys'
import VerifyModal from '../modals/VerifyModal'
import StatusModal from '../modals/StatusModal'
import { useSelector } from 'react-redux'
import RouteLinks from '../../RouteLinks'
import { useNavigate } from 'react-router-dom'
import WarrantHeaderCom from './WarrantHeaderCom'
import GenerateWarrantModal from './GenerateWarrantModal'


export default function WarrantDetails({stateData}) {

    const warrantPrefix = 'MOF/HCF/CEW/'

    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ 
        contentRef, 
        documentTitle: `${warrantPrefix}${stateData?.warrant_number}`
    });

    const {userDetails:{email}} = useSelector((state) => state.userDetails)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [actionModal, setActionModal] = useState({data:{}, name:''})
    const showActionModal = (data, name) => setActionModal({data, name})
    const closeActionModal = () => setActionModal({data:{}, name:''})

    const [itemsToRemove, setItemsToRemove] = useState([])
    const handleAddItemToRemove = (id) => {
        if(itemsToRemove.includes(id)){
            const oldItems = itemsToRemove.slice(0)
            const IndexToRemove = oldItems.indexOf(id)
            oldItems.splice(IndexToRemove, 1)
            const newItems = oldItems
            setItemsToRemove(newItems)
        }else{
            setItemsToRemove(prev => ([...prev, id]))
        }
    }

    const {data:allWarrantData, isFetching, isError, error} = useQuery({
        queryKey: [...queryKeys.getWarrantById],
        queryFn: () => {
            const reqData = {
                _id: stateData?._id
            }
            return getAllWarrants(reqData)
        },
        staleTime: 0 //0 mins
    })

    const singleWarrant = allWarrantData?.data?.data?.warrants[0] // SINGLE WARRANT
    // const gross = singleWarrant?.expenses_id?.reduce((acc, item)=>{
    //     return acc + item?.gross_amount
    // },0)
    const net = singleWarrant?.expenses_id?.reduce((acc, item)=>{
        return acc + item?.net_amount
    },0)
    
    const groupDataByMDA = groupByEconomicCode(singleWarrant?.expenses_id)

    // mutation to remove items from warrant
    const removeItemFromWarrant = useMutation({
        mutationFn: (fields) => {
            if(!fields?.warrant_id){
                throw new Error('No valid warrant ID was selected')
            }
            return removeWarrantItem(fields)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            queryClient.invalidateQueries({ queryKey: [...queryKeys.getWarrantById] })
        },
        onSettled: () => {
            setItemsToRemove([])
            setTimeout(()=>{
                removeItemFromWarrant.reset()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        }
    })

    // mutation to delete warrant
    const warrantDelete = useMutation({
        mutationFn: (fields) => {
            if(!fields?.warrant_id){
                throw new Error('No valid warrant ID was selected')
            }
            return deleteWarrant(fields)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            navigate(RouteLinks.warrants)
        },
        onSettled: () => {
            setItemsToRemove([])
            setTimeout(()=>{
                warrantDelete.reset()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        }
    })

    const generateWarrantMutation = useMutation({
        mutationFn: (fields) => {
            if(!fields?.warrant_id){
                throw new Error('No valid warrant ID was selected')
            }
            return generateWarrant(fields)
        },
        onError: (err) => {
            // alert(err.message)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            // alert('Successful')
            setTimeout(()=>{
                queryClient.invalidateQueries({ queryKey: [...queryKeys.getWarrantById] })
                closeActionModal()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        },
        onSettled: () => {
            setTimeout(()=>{
                generateWarrantMutation.reset()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        }
    })

    const proceed = ()=>{
        showActionModal(actionModal.data, 'status')
        const data = {
            warrant_id: stateData?._id,
            issued_by: email,
            expenses_id: actionModal.data
        }
        removeItemFromWarrant.mutate(data)
    }

    const proceedDelWarrant = ()=>{
        showActionModal(actionModal.data, 'delete_warrant_status')
        const data = {
            warrant_id: stateData?._id,
            issued_by: email,
        }
        warrantDelete.mutate(data)
    }

    const proceedToGenerateWarrant = (warrant_number)=>{
        // closeActionModal()
        const data = {
            warrant_id: stateData?._id,
            warrant_number: warrant_number,
            issued_by: email,
        }
        // console.log('warrant_number', warrant_number)
        generateWarrantMutation.mutate(data)
    }
  

    return (
        <>
        <div className='w-full flex flex-col gap-4'>
            <BreadcrumbCom title='Warrants Details' paths={['Dashboard', 'Warrants Details']} />
            {(isFetching || isError) ?
            <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
                {isError ? <p className='text-red-500'>{error.message}</p> : <p className='text-slate-800'>Loading...</p>}
            </div>
            :
            <>
                <div className='w-full flex justify-between items-center gap-4'>
                    {itemsToRemove.length > 0 &&
                    <div className='w-36'>
                        <MainBtn 
                            onClick={()=>showActionModal(itemsToRemove, 'delete_many')}
                            disabled={false} 
                            className={`bg-red-600 dark:bg-red-700 px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                            text={`Remove ${itemsToRemove.length > 1 ? `${itemsToRemove.length} items` : `${itemsToRemove.length} item`}`}
                        />
                    </div>
                    }
                    
                    <>
                    {groupDataByMDA?.length >= 1 ?
                    <div className='w-full flex justify-end gap-2'>
                        <div className='w-16'>
                            <MainBtn 
                                onClick={reactToPrintFn}
                                disabled={false} 
                                className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                                text={`Print`}
                            />
                        </div>
                        {singleWarrant?.status != 1 &&
                            <div className='w-52'>
                                <MainBtn 
                                    onClick={()=>showActionModal([stateData?._id], 'generate_warrant')}
                                    disabled={false} 
                                    className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                                    text={`${generateWarrantMutation.isPending ? 'Loading...' : 'Generate Warrant'}`}
                                />
                            </div>
                        }
                    </div>
                    : 
                    null
                    }
                    </>
                    
                </div>
                <div ref={contentRef} className='w-full flex flex-col gap-10'>
                    {/* header on each page printed */}
                    {/* <div className="hidden print:flex print:text-sm fixed top-0 right-0">
                        <h2>
                            {warrantPrefix}{singleWarrant?.warrant_number}
                        </h2>
                    </div> */}
                    <div className='w-full flex flex-col gap-4'>
                        <div className='text-base font-bold dark:text-white-aside flex flex-col gap-4'>
                            {/* Warrant Number: <span>{singleWarrant?._id}</span> */}
                            {singleWarrant?.status != 1 &&
                            <>
                                <div>
                                    <button
                                        onClick={()=>navigate(`${singleWarrant?.warrant_type == 'recurrent' ? RouteLinks.createRecurrentWarrant : RouteLinks.createCapWarrant}`, {state: {expenses_id:singleWarrant?.expenses_id, warrant_id: singleWarrant?._id}})}
                                        className={`print:hidden text-sm bg-sky-800 dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                                    >
                                        Add Items to this Warrant
                                    </button>
                                </div>
                            </>
                            }
                        </div>
                        {groupDataByMDA.length > 0 &&
                        <WarrantHeaderCom amt={net} status={singleWarrant?.status} warrantNumber={singleWarrant?.warrant_number} warrant_type={singleWarrant?.warrant_type} />
                        }
                    </div>
                    {groupDataByMDA?.map((data, index)=>{
                        const groupNetAmt = data?.pvs?.reduce((acc, item)=>{
                            return acc + item?.net_amount
                        },0)
                        return(
                            <div key={data?.org_code || index} className='w-full print:text-sm print:font-medium'>
                                <p className='text-base font-bold dark:text-slate-high'>{data?.org_code} - {data?.beneficiary_mda}</p>
                                <div className='overflow-x-auto'>
                                    <table className="table-auto py-2 w-full text-sm">
                                        <thead className="text-sm text-black dark:text-slate-high font-semibold text-left">
                                        <tr>
                                            <th scope="col" className="print:hidden p-2">
                                            </th>
                                            <th scope="col" className="p-2">
                                                Code/Description
                                            </th>
                                            <th scope="col" className="p-2 min-w-[200px] max-w-[200px]">
                                                PV Description
                                            </th>
                                            <th scope="col" className="p-2">
                                                Beneficiary
                                            </th>
                                            <th scope="col" className="p-2">
                                                Amt (₦)
                                            </th>
                                            <th scope="col" className="print:hidden p-2 text-right">
                                                Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className='text-black-aside dark:text-slate-high'>

                                        {data?.pvs && data.pvs.map((item, index) => {
                                            return (
                                                <tr key={item.id || index} className="border-t border-dashed border-slate-high">
                                                    <td className="print:hidden p-2">
                                                        <div className="text-left">
                                                            <input type='checkbox' onClick={()=>handleAddItemToRemove(item?._id)} />
                                                        </div> 
                                                    </td>
                                                    <td className="p-2">
                                                        <div className='w-full flex items-center gap-2 whitespace-nowrap'>
                                                            {/* <img className="w-8 h-8 rounded-md" src={localImgLoader(`loan_icons/provide_loan.png`)} alt="Icon" /> */}
                                                            <div className="text-left">
                                                                <div className="text-sm font-semibold print:font-normal line-clamp-1">{item?.economic_code}</div>
                                                                <div title={item?.economic_description} className="font-normal">{item?.economic_description}</div>
                                                            </div>  
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            <div title={item?.pv_description} className="text-sm font-semibold print:font-normal">{item?.pv_description}</div>
                                                        </div> 
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            <div className="text-sm font-semibold print:font-normal">{item?.beneficiary_name}</div>
                                                            <div className="font-normal">{item?.beneficiary_account}</div>
                                                            <div className="font-normal">{item?.beneficiary_bank}</div>
                                                        </div> 
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            <div className="font-normal">{formatNumber(item?.net_amount)}</div>
                                                        </div> 
                                                    </td>
                                                    <td className="print:hidden group relative p-2 text-right">
                                                        <div className='flex items-center justify-end gap-3 md:gap-4'>
                                                            <div className='p-2 flex cursor-pointer justify-center items-center bg-white-body dark:bg-black-body rounded-md'>
                                                                <button onClick={()=>showActionModal([item?._id], 'delete')}>
                                                                    <Icons name='trash' className={`text-red-500 ${itemsToRemove.length && 'opacity-30'}`} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )})
                                        }
                                        <tr className="border-y border-dashed border-slate-high">
                                            <td className="p-2" colSpan={3}>
                                                <div className='w-full flex items-center gap-2 whitespace-nowrap'>
                                                    <div className="text-sm font-semibold">Sub Total</div>
                                                </div>
                                            </td>
                                            <td className="p-2" colSpan={1}>
                                                <div className='w-full flex items-center gap-2 whitespace-nowrap'>
                                                    <div className="text-sm font-semibold">{formatNumber(groupNetAmt)}</div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    })}
                    <p className='mt-4 text-center font-bold'>Grand Total: {formatNumber(net)}</p>
                </div>
                {groupDataByMDA.length < 1 &&
                    <div className='w-full flex flex-col gap-4'>
                        <p className='text-base font-bold text-red-600'>This Warrant is empty, would you want it deleted, click delete</p>
                        <div className='w-36'>
                            <MainBtn 
                                onClick={()=>showActionModal(itemsToRemove, 'delete_warrant')}
                                disabled={false} 
                                className={`bg-red-600 dark:bg-red-700 px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                                text={`Delete Warrant`}
                            />
                        </div>
                    </div>
                }
            </>
            }

        </div>
        {(actionModal.name == 'delete' || actionModal.name == 'delete_many') && 
            <VerifyModal 
                text='Are you sure you want to remove item(s) ?' 
                proceedFunc={proceed} 
                cLoseModal={closeActionModal}
            />
        }
        {actionModal.name == 'generate_warrant' && 
            // <VerifyModal 
            //     text='Are you sure you want to generate this warrant as a working document?' 
            //     proceedFunc={proceedToGenerateWarrant} 
            //     cLoseModal={closeActionModal}
            // />
            <GenerateWarrantModal 
                text='Are you sure you want to generate this warrant as a working document?' 
                proceedFunc={proceedToGenerateWarrant} 
                cLoseModal={closeActionModal}
                generateWarrantMutation={generateWarrantMutation}
            />
        }
        { actionModal.name == 'status' &&
            <StatusModal 
                isPending={removeItemFromWarrant.isPending}
                text={removeItemFromWarrant.isSuccess ? 'removed successfully' : 'Unable to remove item'} 
                isSuccess={removeItemFromWarrant.isSuccess}
                cLoseModal={()=>{closeActionModal()}}
            />
        }

        {(actionModal.name == 'delete_warrant' || actionModal.name == 'delete_many') && 
            <VerifyModal 
                text='Are you sure you want to delete this warrant?' 
                proceedFunc={proceedDelWarrant} 
                cLoseModal={closeActionModal}
            />
        }
        { actionModal.name == 'delete_warrant_status' &&
            <StatusModal 
                isPending={warrantDelete.isPending}
                text={warrantDelete.isSuccess ? 'deleted successfully' : 'Unable to delete'} 
                isSuccess={warrantDelete.isSuccess}
                cLoseModal={()=>{closeActionModal()}}
            />
        }
        </>
    )
}
