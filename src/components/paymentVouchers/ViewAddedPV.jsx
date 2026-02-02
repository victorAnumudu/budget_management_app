import React, { memo } from 'react'
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import { addPVFieldsValidation } from '../../helpers/formikValues'; // FORMIK INITIAL VALUES AND VALIDATION 
import ModalWrapper from '../modals/ModalWrapper';
import InputText from '../inputs/InputText';
import SelectDropdown from '../inputs/SelectDropdown';
import TextareaCom from '../inputs/TextareaCom';
import MainBtn from '../btn/MainBtn';

const validationSchema = addPVFieldsValidation



const ViewAddedPV = memo(({data, closeModal}) =>{
    const capturedDate = new Date(data?.data?.date_captured) 
    const dateCaptured = `${capturedDate.getFullYear()}-${capturedDate.getMonth() > 9 ? capturedDate.getMonth() : '0'+capturedDate.getMonth()}-${capturedDate.getDate() > 9 ? capturedDate.getDate() : '0'+capturedDate.getDate()}`
    const initialValues = {...data?.data, date_captured: dateCaptured}
    //FUNCTION TO HANDLE ADD PV
    const handleSubmit = (values, helper) => {
        // login.mutate(values)
        // setVerifyModal(true)
    };

    return (
        <>
        <ModalWrapper maxWidth={'max-w-6xl'}>
            <div className='relative bg-white rounded-lg shadow-round_black dark:border-[1px] dark:border-[#1E2027] dark:bg-black-box dark:text-white'>
                {/* <!-- Modal header --> */}
                <div className="p-8 sm:p-12 flex items-center justify-between border-b rounded-t border-gray-300 dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        VIEW
                    </h3>
                    <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(props)=>(
                        <Form className='p-8 sm:p-12 '>                
                            <div className='px-2 py-2 mb-4 flex flex-col flex-wrap gap-4 lg:gap-8'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Date <span className='text-red-500 text-10'>{(props.errors.date_captured && props.touched.date_captured) ? props.errors.date_captured : ''}</span>
                                        </p>
                                        <InputText 
                                            id='date_captured' 
                                            type='date' 
                                            name='date_captured' 
                                            value={props.values.date_captured}
                                            handleChange={props.handleChange}
                                            disabled={true}
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
                                            disabled={true}
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
                                            disabled={true}
                                        >
                                            <>
                                            <option value=''>Select</option>
                                            {initialValues?.approval_authorities ? initialValues?.approval_authorities?.map(item => (
                                                <option key={item} value={item}>{item}</option>
                                            ))
                                            :
                                            <>
                                            <option value='governor'>Governor</option>
                                            <option value='commissioner'>Commissioner</option>
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
                                            disabled={true}
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
                                            disabled={true}
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
                                            disabled={true}
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
                                            disabled={true}
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
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Gross Amount <span className='text-red-500 text-10'>{(props.errors.gross_amount && props.touched.gross_amount) ? props.errors.gross_amount : ''}</span>
                                        </p>
                                        <InputText 
                                            id='gross_amount' 
                                            placeholder='0'
                                            name='gross_amount' 
                                            value={props.values.gross_amount}
                                            handleChange={props.handleChange}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='w-full relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Net Amount <span className='text-red-500 text-10'>{(props.errors.net_amount && props.touched.net_amount) ? props.errors.net_amount : ''}</span>
                                        </p>
                                        <InputText 
                                            id='net_amount' 
                                            placeholder='0'
                                            name='net_amount' 
                                            value={props.values.net_amount}
                                            handleChange={props.handleChange}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalWrapper>
        </>
    )
})

export default ViewAddedPV