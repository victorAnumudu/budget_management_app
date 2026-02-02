import { memo, useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import TablePaginatedWrapper from '../tableWrapper/TablePaginatedWrapper'
import Icons from '../Icons'
import { getAllPVData, createWarrant, addMoreToWarrant } from '../../services/siteServices'
import getDateFromDateString from '../../helpers/GetDateFromDateString';
import getTimeFromDateString from '../../helpers/GetTimeFromDateString';
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';

import InputText from '../inputs/InputText'
import SelectDropdown from '../inputs/SelectDropdown'
import MainBtn from '../btn/MainBtn'
import VerifyModal from '../modals/VerifyModal'
import StatusModal from '../modals/StatusModal'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import queryKeys from '../../services/queryKeys'
import ViewAddedPV from '../paymentVouchers/ViewAddedPV'
import { useSelector } from 'react-redux'

const AddToWarrant = memo(() =>{

    const {state} = useLocation()

    const idsFromState = state?.expenses_id?.length ? state?.expenses_id.map(item => item._id) : []
        
    const {userDetails:{email}} = useSelector((state) => state.userDetails)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [itemsToAdd, setItemsToAdd] = useState([...idsFromState])
    const handleAddItemsToItemsToAdd = (id) => {
        if(itemsToAdd.includes(id)){
            const oldItems = itemsToAdd.slice(0)
            const IndexToRemove = oldItems.indexOf(id)
            oldItems.splice(IndexToRemove, 1)
            const newItems = oldItems
            setItemsToAdd(newItems)
        }else{
            setItemsToAdd(prev => ([...prev, id]))
        }
    }

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


    const {data:allPVsData, isFetching, isError, error} = useQuery({
        queryKey: [...queryKeys.getAllPVs, page, willFilter],
        queryFn: () => {
            const filterData = filter?.type ? {[filter?.type]: filter.value} : {}
            const reqData = {
                page,
                ...filterData
            }
            return getAllPVData(reqData)
        },
        staleTime: 0 //0 mins
    })
    const allPVs = allPVsData?.data?.data?.pvs.filter(item => !item?.warrant_status) // PVS LIST
    const pagination = allPVsData?.data?.data?.pagination


    const addToWarrant = useMutation({
        mutationFn: (fields) => {
            if(!fields?.expenses_id.length){
                throw new Error('No payment voucher was added')
            }
            return createWarrant(fields)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            setItemsToAdd([])
            navigate(RouteLinks.warrants, {replace: true})
            queryClient.invalidateQueries({ queryKey: [...queryKeys.getAllPVs] })
        },
        onSettled: () => {
            setTimeout(()=>{
                addToWarrant.reset()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        }
    })

    const addMoreToWarrantMutation = useMutation({
        mutationFn: (fields) => {
            if(!fields?.warrant_id){
                throw new Error('No warrant found')
            }
            return addMoreToWarrant(fields)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            setItemsToAdd([])
            navigate(RouteLinks.warrants, {replace: true})
        },
        onSettled: () => {
            setTimeout(()=>{
                addMoreToWarrantMutation.reset()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        }
    })

    const proceedToAddToWarrant = () => {
        showActionModal(actionModal.data, 'status')
        const data = {
            status: 0,
            issued_by: email,
            date_issued: new Date().toLocaleDateString(),
            expenses_id: actionModal.data
        }

        // "date_issued": "2025-08-06T00:00:00.000Z"
        addToWarrant.mutate(data)
    }

    const proceedToAddMoreItemsToWarrant = () => {
        showActionModal(actionModal.data, 'status')
        const data = {
            warrant_id: state.warrant_id,
            expenses_id: itemsToAdd
        }
        addMoreToWarrantMutation.mutate(data)
    }

    const proceed = () => {
        if(state){
            return proceedToAddMoreItemsToWarrant()
        }else{
            return proceedToAddToWarrant()
        }
    }

    return (
        <>
            <div className='w-full flex flex-col gap-4'>
                <BreadcrumbCom title='Add to Warrants' paths={['Dashboard', 'Add to Warrants']} />
                {itemsToAdd.length > 0 &&
                    <div className='w-36'>
                        <MainBtn 
                            onClick={()=>showActionModal(itemsToAdd, 'add')}
                            disabled={false} 
                            className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                            text={`Add ${itemsToAdd.length > 1 ? `${itemsToAdd.length} items` : `${itemsToAdd.length} item`}`}
                        />
                    </div>
                }

                <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>

                    <>
                        {/* filter section */}
                        {allPVs?.length > 0 &&
                        <div className='px-2 py-2 mb-4 flex flex-col sm:flex-row flex-wrap sm:items-center gap-2'>
                            <Icons name='filter' className='text-3xl text-slate-600' />
                            <div className='w-full sm:max-w-48'>
                                <SelectDropdown
                                    name='type'
                                    value={filter?.type}
                                    onChange={handleFilter}
                                >
                                    <option value=''>All</option>
                                    <option value='economic_code'>Economic Code</option>
                                    <option value='beneficiary_name'>Beneficiary Name</option>
                                    <option value='beneficiary_bank'>Beneficiary Bank</option>
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

                        <TablePaginatedWrapper data={allPVs} isFetching={isFetching} setPage={setPage} itemsPerPage={pagination?.limit} pagination={pagination}>
                        {({ data }) => (
                            <>
                                <table className="table-auto py-2 w-full text-sm">
                                    <thead className="text-sm text-slate-higher dark:text-slate-high dark:font-semibold text-left">
                                        <tr>
                                            <th scope="col" className="p-2">
                                            </th>
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
                                            <th scope="col" className="p-2 text-right">
                                                View
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-black-aside dark:text-slate-high'>
                                        {(data && data.length > 0) ? data?.map((item, index) => {
                                            return (
                                                <tr key={item.id || index} className="border-t border-dashed border-slate-high">
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            <input type='checkbox' onClick={()=>handleAddItemsToItemsToAdd(item?.expense_uid)} />
                                                        </div> 
                                                    </td>
                                                    <td className="p-2">
                                                        <div className='w-full flex items-center gap-2 whitespace-nowra'>
                                                            <img className="w-8 h-8 rounded-md" src={localImgLoader(`loan_icons/provide_loan.png`)} alt="Icon" />
                                                            <div className="text-left">
                                                                <div title={item?.beneficiary_mda} className="text-sm font-semibold line-clamp-1">{item?.beneficiary_mda}</div>
                                                                <div className="text-sm font-semibold">{item?.pv_number}</div>
                                                                <div className="font-normal text-slate-higher">{getDateFromDateString(item?.date_captured)}</div>
                                                            </div>  
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            <div title={item?.economic_description} className="text-sm font-semibold line-clamp-1">{item?.economic_description}</div>
                                                            <div className="font-normal text-slate-higher">{item?.economic_code}</div>
                                                            {/* <div className="font-normal text-slate-higher">{item?.org_code}/{item?.economic_code}</div> */}
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
                                                    <td className="group relative p-2 text-right">
                                                        <div className='flex items-center justify-end gap-3 md:gap-4'>
                                                            <div className='p-2 flex cursor-pointer justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                                <button onClick={()=>showActionModal(item, 'view')}>
                                                                    <Icons name='eye' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr className="p-2 border-t border-dashed border-slate-high">
                                            <td className="px-3 py-2" colSpan={8}>
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
            {actionModal.name == 'view' && <ViewAddedPV data={actionModal} closeModal={closeActionModal} />}
            {actionModal.name == 'add' && 
                <VerifyModal 
                    text='Are you sure you want to add this Payment Voucher and proceed to generate warrant?' 
                    proceedFunc={proceed} 
                    cLoseModal={closeActionModal}
                />
            }
            { actionModal.name == 'status' &&
                <StatusModal 
                    isPending={addToWarrant.isPending || addMoreToWarrantMutation.isPending}
                    text={(addToWarrant.isSuccess || addMoreToWarrantMutation.isSuccess) ? 'Warrant added, preceed to generate the warrant' : 'Unable to add'} 
                    isSuccess={addToWarrant.isSuccess || addMoreToWarrantMutation.isSuccess}
                    cLoseModal={()=>{closeActionModal()}}
                />
            }
        </>
    )
})


export default AddToWarrant