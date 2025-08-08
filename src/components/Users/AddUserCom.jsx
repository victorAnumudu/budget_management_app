import { memo, useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {Link} from 'react-router-dom'
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import { getTransactions } from '../../services/siteServices'
import getDateFromDateString from '../../helpers/GetDateFromDateString';
import localImgLoader from '../../helpers/localImageLoader';
import RouteLinks from '../../RouteLinks';
import InputText from '../inputs/InputText'
import SelectDropdown from '../inputs/SelectDropdown'
import MainBtn from '../btn/MainBtn'
import { addUserByAdmin } from '../../services/siteServices'
import Icons from '../Icons'
import TextareaCom from '../inputs/TextareaCom';
import VerifyModal from '../modals/VerifyModal';
import StatusModal from '../modals/StatusModal';

import { addUserFields, addUserFieldsValidation } from '../../helpers/formikValues'; // FORMIK INITIAL VALUES AND VALIDATION 
import ModalWrapper from '../modals/ModalWrapper';
import queryKeys from '../../services/queryKeys';


// To get the validation schema
const validationSchema = addUserFieldsValidation


const AddUserCom = memo(({closeModal}) =>{
    
    const queryClient = useQueryClient()

    const initialValues = useMemo(()=>{
        return {...addUserFields }
    },[])

      const registerUser = useMutation({
        mutationFn: (fields) => {
            if(!fields.email){
                throw new Error('Please provide all required fields')
            }
            return addUserByAdmin(fields)
        },
        onError: (error) => {
            setTimeout(()=>{registerUser.reset()}, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            queryClient.refetchQueries({
                queryKey: [...queryKeys.getAllUsers],
                // type: 'active',
                // exact: true,
            })
            setTimeout(()=>{
                closeModal()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        },
    })

    //FUNCTION TO HANDLE ADD USER
    const handleSubmit = (values, helper) => {
        registerUser.mutate(values)
    };

    return (
        <>
            <ModalWrapper maxWidth={'max-w-6xl'}>
                <div className='relative bg-white rounded-lg shadow-round_black dark:border-[1px] dark:border-[#1E2027] dark:bg-black-box dark:text-white'>
                    {/* <!-- Modal header --> */}
                    <div className="p-8 sm:p-12 flex items-center justify-between border-b rounded-t border-gray-300 dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        ADD USER
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
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8'>
                                        <div className='relative text-input flex flex-col gap-1'>
                                            <p className='text-sm font-semibold dark:text-slate-high'>
                                                FirstName <span className='text-red-500 text-10'>{(props.errors.firstname && props.touched.firstname) ? props.errors.firstname : ''}</span>
                                            </p>
                                            <InputText 
                                                id='firstname' 
                                                type='text' 
                                                name='firstname' 
                                                value={props.values.firstname}
                                                handleChange={props.handleChange}
                                            />
                                        </div>
                                        <div className='relative text-input flex flex-col gap-1'>
                                            <p className='text-sm font-semibold dark:text-slate-high'>
                                                LastName <span className='text-red-500 text-10'>{(props.errors.lastname && props.touched.lastname) ? props.errors.lastname : ''}</span>
                                            </p>
                                            <InputText 
                                                id='lastname' 
                                                type='text' 
                                                name='lastname' 
                                                value={props.values.lastname}
                                                handleChange={props.handleChange}
                                            />
                                        </div>
                                        <div className='relative text-input flex flex-col gap-1'>
                                            <p className='text-sm font-semibold dark:text-slate-high'>
                                                Status <span className='text-red-500 text-10'>{(props.errors.status && props.touched.status) ? props.errors.status : ''}</span>
                                            </p>
                                            <SelectDropdown
                                                name='status'
                                                value={props.values.status}
                                                onChange={props.handleChange}
                                            >
                                                <option value=''>select</option>
                                                <option value='disabled'>Disabled</option>
                                                <option value='pending'>Pending</option>
                                                <option value='active'>Active</option>
                                            </SelectDropdown>
                                        </div>
                                        <div className='relative text-input flex flex-col gap-1'>
                                            <p className='text-sm font-semibold dark:text-slate-high'>
                                                Role <span className='text-red-500 text-10'>{(props.errors.role && props.touched.role) ? props.errors.role : ''}</span>
                                            </p>
                                            <SelectDropdown
                                                name='role'
                                                value={props.values.role}
                                                onChange={props.handleChange}
                                            >
                                                <option value=''>select</option>
                                                <option value='user'>User</option>
                                                <option value='tpo'>TPO</option>
                                                <option value='admin'>Admin</option>
                                            </SelectDropdown>
                                        </div>
                                    </div>
                                    <div className='relative text-input flex flex-col gap-1'>
                                        <p className='text-sm font-semibold dark:text-slate-high'>
                                            Email <span className='text-red-500 text-10'>{(props.errors.email && props.touched.email) ? props.errors.email : ''}</span>
                                        </p>
                                        <InputText 
                                            id='emial' 
                                            type='text' 
                                            name='email' 
                                            value={props.values.email}
                                            handleChange={props.handleChange}
                                        />
                                    </div>
                                    {(registerUser.isSuccess || registerUser.isError) &&
                                    <div className="px-6 flex flex-col gap-6 justify-center items-center">
                                        <p className={`${!registerUser.isSuccess ? 'text-red-500' : 'text-emerald-800'} text-base leading-relaxed text-black-aside dark:text-slate-high`}>
                                            {registerUser.isSuccess ? 'User added successfully' : registerUser.error.message}
                                        </p>
                                    </div>
                                    }
                                    <MainBtn 
                                        type='submit'
                                        loading={registerUser.isPending}
                                        disabled={props.errors.length || registerUser.isPending || registerUser.isSuccess} 
                                        className={`bg-secondary px-2 py-1 mt-4 rounded-md text-white font-medium sm:self-end`}
                                        text='ADD USER'
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </ModalWrapper>
            {/* { (registerUser.isSuccess || registerUser.isError) &&
                <StatusModal 
                    text={registerUser.isSuccess ? 'User added successfully' : registerUser.error.message}
                    isSuccess={registerUser.isSuccess}
                    cLoseModal={()=>{registerUser.reset()}}
                />
            } */}
        </>
    )
})

export default AddUserCom