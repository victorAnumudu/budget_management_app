import { memo, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import TablePaginatedWrapper from '../tableWrapper/TablePaginatedWrapper'
import Icons from '../Icons'
import { getAllEconomicItems, getTransactions } from '../../services/siteServices'
import getDateFromDateString from '../../helpers/GetDateFromDateString';
import getTimeFromDateString from '../../helpers/GetTimeFromDateString';
import formatNumber from '../../helpers/formatNumber';
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';

import { EconomicItemsRecords } from '../../data/ecomonicLines' // REMOVE LATER
import InputText from '../inputs/InputText'
import SelectDropdown from '../inputs/SelectDropdown'
import MainBtn from '../btn/MainBtn'
import VerifyModal from '../modals/VerifyModal'
import StatusModal from '../modals/StatusModal'
import ViewEconomicItem from './ViewEconomicItem'
import EditEconomicItem from './EditEconomicItem'
import queryKeys from '../../services/queryKeys'
import { useQuery } from '@tanstack/react-query'

const EconomicItemsCom = memo(() =>{

    const navigate = useNavigate()

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


    const {data, isFetching, isError, error} = useQuery({
        queryKey: [...queryKeys.getAllPVs, page, willFilter],
        queryFn: () => {
            const filterData = filter?.type ? {[filter?.type]: filter.value} : {}
            const reqData = {
                page,
                ...filterData
            }
            return getAllEconomicItems(reqData)
        },
        staleTime: 0 //0 mins
    })
    const allEconomicItems = data?.data?.data?.economic_items // ECONOMIC ITEMS LIST
    const pagination = data?.data?.data?.pagination

    return (
        <>
            <div className='w-full flex flex-col gap-4'>
                <BreadcrumbCom title='Economic Items' paths={['Dashboard', 'Economic Items']} />
                {/* <div className='w-48 ml-auto'>
                    <MainBtn 
                        onClick={() => navigate(RouteLinks.addEconomicLine)} 
                        disabled={false} 
                        className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                        text='Add Economic Line'
                    />
                </div> */}
                <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>

                    <>
                        {/* filter section */}
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
                                </SelectDropdown>
                            </div>
                            <div className='w-full sm:max-w-48'>
                                <InputText 
                                    id='value' 
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
                        {/* end of filter section */}

                        <TablePaginatedWrapper data={allEconomicItems} isFetching={isFetching} setPage={setPage} itemsPerPage={pagination?.limit} pagination={pagination}>
                        {({ data }) => (
                            <>
                                <table className="table-auto py-2 w-full text-sm">
                                    <thead className="text-sm text-slate-higher dark:text-slate-high dark:font-semibold text-left">
                                        <tr>
                                            <th scope="col" className="p-2">
                                                MDA/Org. Code
                                            </th>
                                            <th scope="col" className="p-2">
                                                Economic Description
                                            </th>
                                            <th scope="col" className="p-2">
                                                Year/Budget Type
                                            </th>
                                            <th scope="col" className="p-2">
                                                Vired To/Vired From
                                            </th>
                                            <th scope="col" className="p-2">
                                                Supplementary Amt
                                            </th>
                                            <th scope="col" className="p-2">
                                                Initial Budget/Total Budget
                                            </th>
                                            <th scope="col" className="p-2">
                                                Expenses/Balance
                                            </th>
                                            <th scope="col" className="p-2 text-right">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-black-aside dark:text-slate-high'>
                                        {(data && data.length > 0) ? data?.map((item, index) => (
                                            <tr key={item.id || index} className="border-t border-dashed border-slate-high">
                                                <td className="p-2">
                                                    <div className='w-full flex items-center gap-2 whitespace-nowra'>
                                                        {/* <img className="w-8 h-8 rounded-md" src={localImgLoader(`loan_icons/provide_loan.png`)} alt="Icon" /> */}
                                                        <div className="text-left">
                                                            <div title={item?.mda_info?.mda_name} className="text-sm font-semibold line-clamp-1">{item?.mda_info?.mda_name}</div>
                                                            <div className="font-normal text-slate-higher">{item?.economic_code}</div>
                                                        </div>  
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div title={item?.economic_description} className="text-sm font-semibold line-clamp-1">{item?.economic_description}</div>
                                                    </div> 
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold">{item?.year}</div>
                                                        <div className="font-normal text-slate-higher">{item?.budget_type}</div>
                                                    </div> 
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold">{formatNumber(item?.vired_to)}</div>
                                                        <div className="font-normal text-slate-higher">{formatNumber(item?.vired_frm)}</div>
                                                    </div> 
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold">{formatNumber(item?.supplementary_budget)}</div>
                                                    </div> 
                                                </td>
                                                 <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold">{formatNumber(item?.initial_budget)}</div>
                                                        <div className="font-normal text-slate-higher">{formatNumber(item?.revised_budget)}</div>
                                                    </div> 
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold">{formatNumber(item?.total_expenses)}</div>
                                                        <div className="font-normal text-slate-higher">{formatNumber(item?.current_balance)}</div>
                                                    </div> 
                                                </td>
                                                <td className="group relative p-2 text-right">
                                                    <div className='flex items-center justify-end gap-3 md:gap-4'>
                                                        <div className='p-2 flex cursor-pointer justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                            <Icons name='eye' />
                                                        </div>
                                                        <div className='absolute top-2 right-3 hidden group-hover:flex gap-2 p-2 justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                            <button onClick={()=>showActionModal(item, 'view')}>
                                                                <Icons name='eye' />
                                                            </button>
                                                            <button onClick={()=>showActionModal(item, 'delete')}>
                                                                <Icons name='trash' className='text-red-500' />
                                                            </button>
                                                            <button onClick={()=>showActionModal(item, 'edit')}>
                                                                <Icons name='edit' className='text-primary ' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
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

            {actionModal.name == 'view' && <ViewEconomicItem data={actionModal} closeModal={closeActionModal} />}
            {actionModal.name == 'edit' && <EditEconomicItem data={actionModal} closeModal={closeActionModal} />}
            {actionModal.name == 'delete' && 
                <VerifyModal 
                    text='Are you sure you want to delete this Payment Voucher?' 
                    proceedFunc={()=>{
                        showActionModal(actionModal.data, 'status')
                    }} 
                    cLoseModal={closeActionModal}
                />
            }
            { actionModal.name == 'status' &&
                <StatusModal 
                    text='Payment Voucher deleted successfully' 
                    isSuccess={true}
                    cLoseModal={()=>{closeActionModal()}}
                />
            }
        </>
    )
})


export default EconomicItemsCom