import { memo, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import TablePaginatedWrapper from '../tableWrapper/TablePaginatedWrapper'
import Icons from '../Icons'
import { getAllMDAData } from '../../services/siteServices'
import formatNumber from '../../helpers/formatNumber'
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';

import { MDAs } from '../../data/mdas' // REMOVE LATER
import InputText from '../inputs/InputText'
import SelectDropdown from '../inputs/SelectDropdown'
import MainBtn from '../btn/MainBtn'
import EditCom from './EditCom'
import VerifyModal from '../modals/VerifyModal'
import StatusModal from '../modals/StatusModal'
import { useQuery } from '@tanstack/react-query'
import queryKeys from '../../services/queryKeys'


const MDAListCom = memo(() => {

    const navigate = useNavigate()

const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({type: '', id: ''})
    const [willFilter, setWillFilter] = useState(false)

    const handleFilter = ({target: {name, value}}) => {
        setFilter(prev => ({...prev, [name]: value}))
    }

    const handleFilterByParams = () => {
        if (filter.type && !filter.id) {
            return
        } else if (!filter.type) {
            setPage(1)
            setWillFilter(prev => !prev)
            setFilter({type: '', id: ''})
        } else {
            setPage(1)
            setWillFilter(prev => !prev)
        }
    }

    const {data, isFetching, isError, error} = useQuery({
        queryKey: [...queryKeys.allMDA, page, willFilter],
        queryFn: () => {
            const filterData = filter?.type ? {[filter?.type]: filter.id} : {}
            const reqData = {
                page,
                ...filterData
            }
            return getAllMDAData(reqData)
        },
        staleTime: 0 //0 mins
    })
    const MdasData = data?.data?.data?.mdas // PRODUCTS LIST
    const pagination = data?.data?.data?.pagination
    // console.log('DATA', data?.data)


    //FUNCTION TO OPEN EDIT MODAL
    const [actionModal, setActionModal] = useState({data:{}, name:''})
    const showActionModal = (data, name) => setActionModal({data, name})
    const closeActionModal = () => setActionModal({data:{}, name:''})

    return (
        <>
            <div className='w-full flex flex-col gap-4'>
                <BreadcrumbCom title='MDAs' paths={['Dashboard', 'MDAs']} />
                <div className='w-28 ml-auto'>
                    <MainBtn 
                        onClick={() => navigate(RouteLinks.addMDA)} 
                        disabled={false} 
                        className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                        text='Add MDA'
                    />
                </div>
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
                                    <option value='org_code'>Org code</option>
                                    <option value='mda_name'>MDA name</option>
                                </SelectDropdown>
                            </div>
                            <div className='w-full sm:max-w-48'>
                                <InputText 
                                    id='id' 
                                    name='id' 
                                    value={filter?.id}
                                    disabled={!filter.type}
                                    placeholder={filter.type && `enter ${filter.type}`} 
                                    className={`h-10 w-full p-2 rounded-md text-black-aside dark:text-slate-high outline-none border border-black-aside dark:border-slate-high ${!filter.type && 'opacity-30'}`} 
                                    handleChange={handleFilter}
                                />
                            </div>
                            <div className='w-20'>
                                <MainBtn 
                                    onClick={handleFilterByParams} 
                                    disabled={filter.type && !filter.id} 
                                    className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(filter.type && !filter.id) && 'opacity-50'}`}
                                    text='Submit'
                                />
                            </div>
                        </div>
                        {/* end of filter section */}

                        {isError ?
                        <p className='text-red-500'>{error?.message}</p>
                        :
                        <TablePaginatedWrapper data={MdasData} isFetching={isFetching} setPage={setPage} itemsPerPage={pagination?.limit} pagination={pagination}>
                        {({ data }) => (
                            <>
                                <table className="table-auto py-2 w-full text-sm">
                                    <thead className="text-sm text-slate-higher dark:text-slate-high dark:font-semibold text-left">
                                        <tr>
                                            <th scope="col" className="p-2">
                                                Org. Code
                                            </th>
                                            <th scope="col" className="p-2">
                                                MDA Name
                                            </th>
                                            <th scope="col" className="p-2">
                                                Recurrent/Bal
                                            </th>
                                            <th scope="col" className="p-2">
                                                Capital/Bal
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
                                                        <img className="w-8 h-8 rounded-md" src={localImgLoader(`loan_icons/provide_loan.png`)} alt="Icon" />
                                                        <div className="text-left">
                                                            <div className="text-sm font-semibold">{item?.org_code}</div>
                                                        </div>  
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold line-clamp-1">{item?.mda_name}</div>
                                                        <Link 
                                                            to={RouteLinks.addEconomicLine} state={{org_code: item?.org_code, mda_name: item?.mda_name, mda_uid: item?.mda_uid}} 
                                                            className='rounded-sm p-1 bg-primary text-white-aside'
                                                        >
                                                            Add Econonic Line
                                                        </Link>
                                                    </div> 
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold line-clamp-2">{formatNumber(item?.recurrent)}</div>
                                                        <div className="font-normal text-slate-higher">{formatNumber(item?.recurrent)}</div>
                                                    </div> 
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold">{formatNumber(item?.capital)}</div>
                                                        <div className="font-normal text-slate-higher">{formatNumber(item?.capital)}</div>
                                                    </div> 
                                                </td>
                                                <td className="group relative p-2 text-right">
                                                    <div className='flex items-center justify-end gap-3 md:gap-4'>
                                                        <div className='p-2 flex cursor-pointer justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
                                                            <Icons name='eye' />
                                                        </div>
                                                        <div className='absolute top-2 right-3 hidden group-hover:flex gap-2 p-2 justify-center items-center text-slate-500 bg-white-body dark:text-white-body dark:bg-black-body rounded-md'>
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
                                            <td className="px-3 py-2" colSpan={5}>
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
                        }
                    </>
                    
                </div>
            </div>

            {actionModal.name == 'edit' && <EditCom data={actionModal} closeModal={closeActionModal} />}
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

export default MDAListCom