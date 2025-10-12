import { memo, useEffect, useMemo, useState } from 'react'
import {Link} from 'react-router-dom'
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import { getAnEconomicItem, addNewPV } from '../../services/siteServices'
import getDateFromDateString from '../../helpers/GetDateFromDateString';
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';
import InputText from '../inputs/InputText'
import SelectDropdown from '../inputs/SelectDropdown'
import MainBtn from '../btn/MainBtn'
import Icons from '../Icons'
import TextareaCom from '../inputs/TextareaCom';
import VerifyModal from '../modals/VerifyModal';
import StatusModal from '../modals/StatusModal';

import { addPVFields, addPVFieldsValidation } from '../../helpers/formikValues'; // FORMIK INITIAL VALUES AND VALIDATION 

import { searchedEconomicCode } from '../../data/PVData'
import formatNumber from '../../helpers/formatNumber';
import RecentlyAdded from '../recentlyAdded/RecentlyAdded';
import CustomCounter from '../CustomCounter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from '../../services/queryKeys';


// To get the validation schema
const validationSchema = Yup.object().shape({})//addPVFieldsValidation

const AddPVCom = memo(() => {

    const queryClient = useQueryClient()

    const [reqData, setReqData] = useState({})

    const [economicCode, setEconomicCode] = useState({code: '', enabled: false})
    
    const [searchCode, setSearchCode] = useState({loading: false, status:null, data:{}})

    const [verifyModal, setVerifyModal] = useState(false)
    const [status, setStatus] = useState(false)

    const {data, isFetching, isError, error} = useQuery({
        queryKey: queryKeys.getAnEconomicItem,
        queryFn: () => {
            const reqData = {
                economic_code: economicCode.code
            }
            return getAnEconomicItem(reqData)
        },
        staleTime: 0, //0 mins
        enabled: economicCode?.enabled,
    })
    const economicItem = data?.data?.data?.economic_item // ECONOMIC ITEM LIST
    const itemValues = economicItem ? economicItem[0] : {}

    const initialValues = useMemo(()=>{
        return {...addPVFields, ...itemValues, beneficiary_mda:itemValues?.mda_info?.mda_name}
    },[data])

    const addPV = useMutation({
        mutationFn: (fields) => {
            return addNewPV(fields)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            setSearchCode(prev => ({...prev, code: ''}))
            queryClient.refetchQueries({
                queryKey: [...queryKeys.getAllPVs],
                // type: 'active',
                // exact: true,
            })
        },
        onSettled: () => {
            setTimeout(()=>{
            addPV.reset()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        },
    })

    //FUNCTION TO DISPLAY VERIFY MODAL
    const handleVerify = (values, helper) => {
        setReqData(values)
        setVerifyModal(true)
        // console.log(helper)
        // helper.resetForm()
    };

    //FUNCTION TO HANDLE ADD PV
    const handleSubmit = () => {
        delete reqData.approval_authorities
        delete reqData.id
        delete reqData._id
        delete reqData.balance
        delete reqData.total_amount
        delete reqData.year
        reqData.captured_by = 'admin@admin.com'
        addPV.mutate(reqData)
    };

   useEffect(()=>{
        setEconomicCode(prev => ({...prev, enabled: false}))
   },[isFetching])

    return (
        <>
            <div className='w-full flex flex-col gap-8'>
                <BreadcrumbCom title='Add Payment Voucher' paths={['Dashboard', 'Add Payment Voucher']} />

                
                {economicCode.code && economicItem && economicItem.length > 0 ?
                    <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
                        <>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleVerify}
                            >
                                {(props)=>(
                                    <Form>                
                                        <div className='px-2 py-2 mb-4 flex flex-col flex-wrap gap-4 lg:gap-8'>
                                            {/* <div className=''>
                                                <h2 className='text-2xl text-center'>
                                                    Current Bal: 
                                                    <span className='font-semibold'>{formatNumber(searchCode.data.balance)}</span>
                                                </h2>
                                                <h2 className='text-2xl text-center'>
                                                    Commissioner Monthly Approval: 
                                                    <span className='font-semibold'>{formatNumber(8356000)}</span>
                                                </h2>
                                            </div> */}
                                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-8'>
                                                <div className='box min-h-[100] justify-between bg-[#CBD4F4] dark:bg-black-box text-black-body dark:text-white-body'>
                                                    <p className='text-base sm:text-lg font-bold hover:text-primary '>Revised Budget</p>
                                                    <div className='flex flex-wrap gap-2 items-end font-bold'>
                                                        <p className='text-xl sm:text-[30px]'>
                                                        <span className='text-lg sm:text-xl'>
                                                            N
                                                        </span>
                                                            <CustomCounter targetNumber={props.values.revised_budget} timeInSeconds='1' />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='box min-h-[100] justify-between bg-[#CBF0F5] dark:bg-black-box text-black-body dark:text-white-body'>
                                                    <div className='flex justify-between gap-4'>
                                                        <div className='flex flex-col gap-1'>
                                                            <p className='text-base sm:text-lg font-bold hover:text-primary '>Total Expenses</p>
                                                            <div className='flex flex-wrap gap-2 items-end font-bold'>
                                                                <p className='text-lg sm:text-xl'>
                                                                <span className='text-base'>
                                                                    N
                                                                </span>
                                                                    <CustomCounter targetNumber={props.values.total_expenses} timeInSeconds='1' />
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col gap-1'>
                                                            <p className='text-base sm:text-lg font-bold hover:text-primary '>Current Balance</p>
                                                            <div className='flex flex-wrap gap-2 items-end font-bold'>
                                                                <p className='text-lg sm:text-xl'>
                                                                <span className='text-base'>
                                                                    N
                                                                </span>
                                                                    <CustomCounter targetNumber={props.values.current_balance} timeInSeconds='1' />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                                <div className='relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Date Captured <span className='text-red-500 text-10'>{(props.errors.date && props.touched.date) ? props.errors.date : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='date_captured' 
                                                        type='date' 
                                                        name='date_captured' 
                                                        value={props.values.date_captured}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                                <div className='relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        PV Number <span className='text-red-500 text-10'>{(props.errors.pv_number && props.touched.pv_number) ? props.errors.pv_number : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='pv_name' 
                                                        name='pv_number' 
                                                        value={props.values.pv_number}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                                <div className='relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Budget Type <span className='text-red-500 text-10'>{(props.errors.budget_type && props.touched.budget_type) ? props.errors.budget_type : ''}</span>
                                                    </p>
                                                    <SelectDropdown 
                                                        id='budget_type' 
                                                        name='budget_type' 
                                                        value={props.values.budget_type}
                                                        onChange={props.handleChange}
                                                        disabled={true}
                                                    >
                                                        <option value=''>Select</option>
                                                        <option value='capital'>Capital</option>
                                                        <option value='recurrent'>Recurrent</option>
                                                    </SelectDropdown>
                                                </div>
                                                <div className='relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Approval Authority <span className='text-red-500 text-10'>{(props.errors.approval_authority && props.touched.approval_authority) ? props.errors.approval_authority : ''}</span>
                                                    </p>
                                                    <SelectDropdown 
                                                        id='approval_authority' 
                                                        name='approval_authority' 
                                                        value={props.values.approval_authority}
                                                        onChange={props.handleChange}
                                                    >
                                                        <>
                                                        <option value=''>Select</option>
                                                        {initialValues?.approval_authorities ? initialValues?.approval_authorities?.map(item => (
                                                            <option key={item} value={item}>{item}</option>
                                                        ))
                                                        :
                                                        <>
                                                        <option value='capital'>Governor</option>
                                                        <option value='recurrent'>Commissioner</option>
                                                        </>
                                                        }
                                                        </>
                                                    </SelectDropdown>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8'>
                                                <div className='relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Economic Code <span className='text-red-500 text-10'>{(props.errors.economic_code && props.touched.economic_code) ? props.errors.economic_code : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='economic_code' 
                                                        placeholder='Economic Code'
                                                        name='economic_code' 
                                                        value={props.values.economic_code}
                                                        handleChange={props.handleChange}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className='w-full relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Beneficiary MDA <span className='text-red-500 text-10'>{(props.errors.beneficiary_mda && props.touched.beneficiary_mda) ? props.errors.beneficiary_mda : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='beneficiary_mda' 
                                                        name='beneficiary_mda' 
                                                        value={props.values.beneficiary_mda}
                                                        handleChange={props.handleChange}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8'>
                                                <div className='relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Economic Description <span className='text-red-500 text-10'>{(props.errors.economic_description && props.touched.economic_description) ? props.errors.economic_description : ''}</span>
                                                    </p>
                                                    <TextareaCom 
                                                        id='economic_description' 
                                                        name='economic_description' 
                                                        value={props.values.economic_description}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                                <div className='w-full relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        PV Description <span className='text-red-500 text-10'>{(props.errors.pv_description && props.touched.pv_description) ? props.errors.pv_description : ''}</span>
                                                    </p>
                                                    <TextareaCom 
                                                        id='pv_description' 
                                                        name='pv_description' 
                                                        value={props.values.pv_description}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                                <div className='relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Beneficiary Name <span className='text-red-500 text-10'>{(props.errors.beneficiary_name && props.touched.beneficiary_name) ? props.errors.beneficiary_name : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='beneficiary_name' 
                                                        placeholder='Iyke Yanky'
                                                        name='beneficiary_name' 
                                                        value={props.values.beneficiary_name}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                                <div className='w-full relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Beneficiary Bank <span className='text-red-500 text-10'>{(props.errors.beneficiary_bank && props.touched.beneficiary_bank) ? props.errors.beneficiary_bank : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='beneficiary_bank' 
                                                        placeholder='Union'
                                                        name='beneficiary_bank' 
                                                        value={props.values.beneficiary_bank}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                                <div className='w-full relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Beneficiary Account <span className='text-red-500 text-10'>{(props.errors.beneficiary_account && props.touched.beneficiary_account) ? props.errors.beneficiary_account : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='beneficiary_account' 
                                                        placeholder='1000000000'
                                                        name='beneficiary_account' 
                                                        value={props.values.beneficiary_account}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                                <div className='relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Gross Amount <span className='text-red-500 text-10'>{(props.errors.total_amount && props.touched.total_amount) ? props.errors.total_amount : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='gross_amount' 
                                                        placeholder='0'
                                                        name='gross_amount' 
                                                        value={props.values.gross_amount}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                                <div className='w-full relative text-input flex flex-col gap-1'>
                                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                                        Net Amount <span className='text-red-500 text-10'>{(props.errors.cash_paid && props.touched.cash_paid) ? props.errors.cash_paid : ''}</span>
                                                    </p>
                                                    <InputText 
                                                        id='net_amount' 
                                                        placeholder='0'
                                                        name='net_amount' 
                                                        value={props.values.net_amount}
                                                        handleChange={props.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <MainBtn 
                                                type='submit'
                                                // disabled={props.errors.length} 
                                                className={`bg-secondary px-2 py-1 mt-4 rounded-md text-white font-medium sm:self-end`}
                                                text='Add Payment Voucher'
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </>
                    </div>
                    :
                    <>
                    <div className='flex flex-col gap-4'>
                        <div className='grid grid-cols-1 xxs:grid-cols-2 gap-4'>
                            <div className='w-full relative text-input flex flex-col gap-1'>
                                <p className='text-sm font-semibold dark:text-slate-high'>
                                    Enter Economic Code
                                </p>
                                <InputText 
                                    id='code' 
                                    placeholder='Code'
                                    name='code' 
                                    value={economicCode.code}
                                    handleChange={(e)=>setEconomicCode(prev => ({...prev, code: e.target.value}))}
                                />
                            </div>
                            <MainBtn 
                                type='button'
                                disabled={isFetching || !economicCode.code} 
                                loading={isFetching}
                                onClick={()=>setEconomicCode(prev => ({...prev, enabled: true}))}
                                className={`bg-primary dark:bg-primary-dark px-2 py-1 mt-4 rounded-md text-white font-medium sm:self-end`}
                                text='Search'
                            />
                        </div>
                        {isError && <p className='text-red-500 text-center p-3'>Opps! AN error occurred, try again</p>}
                        {economicItem?.length < 1 && <p className='text-red-500 text-center p-3'>Opps! No such Economic Line was found</p>}
                    </div>
                    <div className='box gap-8 bg-white dark:bg-black-box text-black-body dark:text-white-body overflow-x-auto'> 
                        <RecentlyAdded />
                    </div>
                    </>
                }
            </div>

            {verifyModal && 
                <VerifyModal 
                    text='Are you sure you want to add this Payment Voucher?' 
                    proceedFunc={()=>{
                        setVerifyModal(false)
                        handleSubmit()
                    }} 
                    cLoseModal={()=>setVerifyModal(false)}
                />
            }
            { (addPV.isError || addPV.isSuccess || addPV.isPending) &&
                <StatusModal 
                    text='Payment Voucher added successfully' 
                    isSuccess={addPV.isSuccess}
                    isPending={addPV.isPending}
                    cLoseModal={()=>{setSearchCode({loading: false, status:null, data:{}}); addPV.reset()}}
                />
            }
        </>
    )
})

export default AddPVCom