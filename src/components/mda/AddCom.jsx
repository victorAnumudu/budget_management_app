import { memo, useEffect, useMemo, useState } from 'react'
import {Link} from 'react-router-dom'
import { useMutation } from "@tanstack/react-query";
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import { addMDA } from '../../services/siteServices'
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

import { addMDAFields, addMDAFieldsValidation } from '../../helpers/formikValues'; // FORMIK INITIAL VALUES AND VALIDATION 

import formatNumber from '../../helpers/formatNumber';
import RecentlyAdded from '../recentlyAdded/RecentlyAdded';
import InputFile from '../inputs/InputFile';
import { isPending } from '@reduxjs/toolkit';


// To get the validation schema
const validationSchema = addMDAFieldsValidation

const AddCom = memo(() =>{

    const [reqData, setReqData] = useState({})

    const [isFile, setIsFile] = useState(false)
    const [selectedFile, setSelectedFile] = useState('')
    const handleSelectedFile = ({target}) => {
        const fileToRead = target.files[0]
        console.log('Target', fileToRead)
            const reader = new FileReader();
            // reader.onload = function(e) {
            //     const data = e.target.result; // The file content
            //     // Pass data to an Excel parsing library
            // };
            const main = reader.readAsBinaryString(fileToRead); // Or reader.readAsArrayBuffer(file);
            console.log('main', main)
    }

    const [verifyModal, setVerifyModal] = useState(false)

    const initialValues = useMemo(()=>{
        return {...addMDAFields }
    },[])

    const addMDAFunc = useMutation({
        mutationFn: (fields) => {
            return addMDA(fields)
        },
        onError: (error) => {
            // console.log(error)
            setTimeout(()=>{
            addMDAFunc.reset()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
            throw new Error(res?.data?.message)
            }
        }
    })

    //FUNCTION TO HANDLE ADD PV
    const handleSubmit = (values, helper) => {
        setVerifyModal(true)
        setReqData(values)
    };

    const proceedFunc = ()=>{
        setVerifyModal(false)
        addMDAFunc.mutate(reqData)
    }

    return (
        <>
            <div className='w-full flex flex-col gap-8'>
                <BreadcrumbCom title='Add MDA' paths={['Dashboard', 'Add MDA']} />
                <div className='box bg-white dark:bg-black-box text-black-body dark:text-white-body'>
                    <div className='w-30 ml-auto'>
                        <MainBtn 
                            onClick={() => setIsFile(prev => !prev)} 
                            disabled={false} 
                            className={`bg-secondary px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                            text={`${isFile ? 'Single Upload' : 'File Upload'}`}
                        />
                    </div>
                    <>  
                    { isFile ? 
                    <div className='mt-4 w-full flex flex-col gap-4'>
                        <div className='w-full'>
                            <InputFile
                                id='name'
                                type='file'
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={handleSelectedFile}
                            />
                        </div>
                        {isFile && 
                        <div className='w-28'>
                            <MainBtn 
                                // onClick={} 
                                disabled={false} 
                                className={`bg-secondary px-2 py-1 rounded-md text-white font-medium sm:self-end ${(false) && 'opacity-50'}`}
                                text='Upload File'
                            />
                        </div>
                        }
                    </div>
                    :
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props)=>(
                            <Form>                
                                <div className='px-2 py-2 mb-4 flex flex-col flex-wrap gap-4 lg:gap-8'>
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
                                                Year <span className='text-red-500 text-10'>{(props.errors.year && props.touched.year) ? props.errors.year : ''}</span>
                                            </p>
                                            <SelectDropdown
                                                id='year' 
                                                name='year' 
                                                value={props.values.year}
                                                onChange={props.handleChange}
                                            >
                                                <option value=''>Select</option>
                                                <option value='2025'>2025</option>
                                            </SelectDropdown>
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
                                    <MainBtn 
                                        type='submit'
                                        // disabled={props.errors} 
                                        className={`bg-secondary px-2 py-1 mt-4 rounded-md text-white font-medium sm:self-end`}
                                        text='Add MDA'
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                    }
                    </>
                </div>
            </div>

            {verifyModal && 
                <VerifyModal 
                    text='Are you sure you want to add this MDA?' 
                    proceedFunc={proceedFunc} 
                    cLoseModal={()=>setVerifyModal(false)}
                />
            }
            { (addMDAFunc?.isPending || addMDAFunc?.isSuccess || addMDAFunc?.isError) &&
                <StatusModal 
                    text= {addMDAFunc?.isSuccess ? 'MDA added successfully' : addMDAFunc?.error?.message}
                    isSuccess={addMDAFunc?.isSuccess}
                    isPending={addMDAFunc?.isPending}
                    cLoseModal={()=>{addMDAFunc.reset()}}
                />
            }
        </>
    )
})

export default AddCom