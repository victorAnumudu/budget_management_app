import React, { memo } from 'react'
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import { addMDAFieldsValidation } from '../../helpers/formikValues'; // FORMIK INITIAL VALUES AND VALIDATION 
import ModalWrapper from '../modals/ModalWrapper';
import InputText from '../inputs/InputText';
import TextareaCom from '../inputs/TextareaCom';
import MainBtn from '../btn/MainBtn';

const validationSchema = addMDAFieldsValidation



const EditCom = memo(({data, closeModal}) => {
    const initialValues = {...data?.data}
    
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
                        <Form className='p-8 sm:p-12 '>                
                            <div className='px-2 py-2 mb-4 flex flex-col flex-wrap gap-4 lg:gap-8'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Org code <span className='text-red-500 text-10'>{(props.errors.org_code && props.touched.org_code) ? props.errors.org_code : ''}</span>
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
                                            Year <span className='text-red-500 text-10'>{(props.errors.year && props.touched.year) ? props.errors.year : ''}</span>
                                        </p>
                                        <InputText 
                                            id='year' 
                                            name='year' 
                                            value={props.values.year}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='relative text-input flex flex-col gap-1'>
                                    <p className='text-sm font-semibold dark:text-slate-high'>
                                        MDA Name <span className='text-red-500 text-10'>{(props.errors.mda_name && props.touched.mda_name) ? props.errors.mda_name : ''}</span>
                                    </p>
                                    <TextareaCom 
                                        id='mda_name' 
                                        name='mda_name' 
                                        value={props.values.mda_name}
                                        handleChange={props.handleChange}
                                    />
                                </div>

                                <div className='flex justify-center items-center gap-4'>
                                    <MainBtn 
                                        type='submit'
                                        // disabled={props.errors} 
                                        className={`bg-primary dark:bg-primary-dark px-2 py-1 mt-4 rounded-md text-white font-medium sm:self-end`}
                                        text='Update'
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

export default EditCom
