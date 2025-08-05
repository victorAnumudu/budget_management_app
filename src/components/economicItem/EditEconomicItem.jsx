import React, { memo } from 'react'
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import { addEconomicItemFieldsValidation } from '../../helpers/formikValues'; // FORMIK INITIAL VALUES AND VALIDATION 
import ModalWrapper from '../modals/ModalWrapper';
import InputText from '../inputs/InputText';
import SelectDropdown from '../inputs/SelectDropdown';
import TextareaCom from '../inputs/TextareaCom';
import MainBtn from '../btn/MainBtn';

const validationSchema = addEconomicItemFieldsValidation



const EditEconomicItem = memo(({data, closeModal}) => {
    const initialValues = {...data?.data}
    
    //FUNCTION TO HANDLE ADD PV
    const handleSubmit = (values, helper) => {
        console.log('values', values)
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
                        EDIT
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
                        <Form>                
                            <div className='p-8 sm:p-12 mb-4 flex flex-col flex-wrap gap-4 lg:gap-8'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Org. Code <span className='text-red-500 text-10'>{(props.errors.org_code && props.touched.org_code) ? props.errors.org_code : ''}</span>
                                        </p>
                                        <InputText 
                                            id='org_code' 
                                            type='text' 
                                            name='org_code' 
                                            value={props.values.org_code}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Economic Code <span className='text-red-500 text-10'>{(props.errors.economic_code && props.touched.economic_code) ? props.errors.economic_code : ''}</span>
                                        </p>
                                        <InputText 
                                            id='economic_code' 
                                            type='text' 
                                            name='economic_code' 
                                            value={props.values.economic_code}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Year <span className='text-red-500 text-10'>{(props.errors.year && props.touched.year) ? props.errors.year : ''}</span>
                                        </p>
                                        <InputText 
                                            id='year' 
                                            type='date' 
                                            name='year' 
                                            value={props.values.year}
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
                                        >
                                            <option value=''>Select</option>
                                            <option value='capital'>Capital</option>
                                            <option value='recurrent'>Recurrent</option>
                                        </SelectDropdown>
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Initial Budget <span className='text-red-500 text-10'>{(props.errors.initial_budget && props.touched.initial_budget) ? props.errors.initial_budget : ''}</span>
                                        </p>
                                        <InputText 
                                            id='initial_budget' 
                                            type='text' 
                                            name='initial_budget' 
                                            value={props.values.initial_budget}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Vired From <span className='text-red-500 text-10'>{(props.errors.vired_frm && props.touched.vired_frm) ? props.errors.vired_frm : ''}</span>
                                        </p>
                                        <InputText 
                                            id='vired_frm' 
                                            type='text' 
                                            name='vired_frm' 
                                            value={props.values.vired_frm}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Vired To <span className='text-red-500 text-10'>{(props.errors.vired_to && props.touched.vired_to) ? props.errors.vired_to : ''}</span>
                                        </p>
                                        <InputText 
                                            id='vired_to' 
                                            type='text' 
                                            name='vired_to' 
                                            value={props.values.vired_to}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Supplementary <span className='text-red-500 text-10'>{(props.errors.supplementary_budget && props.touched.supplementary_budget) ? props.errors.supplementary_budget : ''}</span>
                                        </p>
                                        <InputText 
                                            id='supplementary_budget' 
                                            type='text' 
                                            name='supplementary_budget' 
                                            value={props.values.supplementary_budget}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8'>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            MDA Name <span className='text-red-500 text-10'>{(props.errors.mda && props.touched.mda) ? props.errors.mda : ''}</span>
                                        </p>
                                        <TextareaCom 
                                            id='mda' 
                                            name='mda' 
                                            value={props.values.mda}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
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
                                </div>

                                <div className='flex justify-center items-center gap-4'>
                                    <MainBtn 
                                        type='submit'
                                        // disabled={props.errors} 
                                        className={`bg-primary dark:bg-primary-dark px-2 py-1 mt-4 rounded-md text-white font-medium sm:self-end`}
                                        text='Update Economic Item'
                                    />
                                    <MainBtn 
                                        type='button'
                                        // disabled={props.errors} 
                                        className={`bg-red-500 px-2 py-1 mt-4 rounded-md text-white font-medium sm:self-end`}
                                        text='Close'
                                        onClick={closeModal}
                                    />
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

export default EditEconomicItem