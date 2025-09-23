import { memo, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import TablePaginatedWrapper from '../tableWrapper/TablePaginatedWrapper'
import Icons from '../Icons'
import { getAllUsersData } from '../../services/siteServices'
import formatNumber from '../../helpers/formatNumber'
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';

import { UsersDB } from '../../data/mdas' // REMOVE LATER
import InputText from '../inputs/InputText'
import SelectDropdown from '../inputs/SelectDropdown'
import MainBtn from '../btn/MainBtn'
import EditCom from './EditCom'
import VerifyModal from '../modals/VerifyModal'
import StatusModal from '../modals/StatusModal'
import AddUserCom from './AddUserCom'
import queryKeys from '../../services/queryKeys'
import DeleteUser from './DeleteUser'


const UsersListCom = memo(() => {

    const {userDetails:{email, role}} = useSelector((state) => state.userDetails)

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

    const {data:allUsersData, isFetching, isError, error} = useQuery({
        queryKey: [...queryKeys.getAllUsers, page, willFilter],
        queryFn: () => {
            const filterData = filter?.type ? {[filter?.type]: filter.value} : {}
            const reqData = {
                page,
                ...filterData
            }
            return getAllUsersData(reqData)
        },
        staleTime: 0 //0 mins
    })
    const allUsers = allUsersData?.data?.data?.users // USERS LIST
    const pagination = allUsersData?.data?.data?.pagination

    return (
        <>
            <div className='w-full flex flex-col gap-4'>
                <BreadcrumbCom title='Users' paths={['Dashboard', 'Users']} />
                <div className='w-28 ml-auto'>
                    <MainBtn 
                        onClick={() => showActionModal({}, 'add')} 
                        disabled={false} 
                        className={`bg-primary dark:bg-primary-dark px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                        text='Add a User'
                    />
                </div>
                <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
                    {isError ?
                    <p>{error?.message}</p>
                    :
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
                                    <option value='lastname'>Lastname</option>
                                    <option value='firstname'>Firstname</option>
                                    <option value='email'>Email</option>
                                    <option value='role'>Role</option>
                                    <option value='status'>Status</option>
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
                        {/* end of filter section */}

                        <TablePaginatedWrapper data={allUsers} isFetching={isFetching} setPage={setPage} itemsPerPage={pagination?.limit} pagination={pagination}>
                        {({ data }) => (
                            <>
                                <table className="table-auto py-2 w-full text-sm">
                                    <thead className="text-sm text-slate-higher dark:text-slate-high dark:font-semibold text-left">
                                        <tr>
                                            <th scope="col" className="p-2">
                                                Email/Name
                                            </th>
                                            <th scope="col" className="p-2">
                                                Role
                                            </th>
                                            <th scope="col" className="p-2">
                                                Status
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
                                                            <div className="text-sm font-semibold">{item?.email}</div>
                                                            <div className="font-normal text-slate-higher">{item?.firstname} {item?.lastname}</div>
                                                        </div>  
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className="text-sm font-semibold line-clamp-1">{item?.role}</div>
                                                    </div> 
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">
                                                        <div className={`text-sm font-semibold line-clamp-2 ${item?.status == 'active' ? 'text-emerald-500': 'text-red-800'}`}>{item?.status ? item?.status : 'null'}</div>
                                                    </div> 
                                                </td>
                                                {item.email != email && (
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
                                                )}
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
                    </>
                    }
                    
                </div>
            </div>

            {actionModal.name == 'edit' && <EditCom data={actionModal} closeModal={closeActionModal} />}
            {actionModal.name == 'add' && <AddUserCom data={actionModal} closeModal={closeActionModal} />}
            {actionModal.name == 'delete' && 
                <DeleteUser 
                    text={ `Are you sure you want to delete`} 
                    data={actionModal.data}
                    cLoseModal={closeActionModal}
                />
            }
            { actionModal.name == 'status' &&
                <StatusModal 
                    text='User deleted successfully' 
                    isSuccess={true}
                    cLoseModal={()=>{closeActionModal()}}
                />
            }
        </>
    )
})

export default UsersListCom