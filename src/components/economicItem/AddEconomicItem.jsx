import { memo, useEffect, useMemo, useState } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { useMutation } from "@tanstack/react-query";
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import { addEconomicLine } from '../../services/siteServices'
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

import { addEconomicItemFields, addEconomicItemFieldsValidation } from '../../helpers/formikValues'; // FORMIK INITIAL VALUES AND VALIDATION 

import formatNumber from '../../helpers/formatNumber';
import RecentlyAdded from '../recentlyAdded/RecentlyAdded';
import InputFile from '../inputs/InputFile';


// To get the validation schema
const validationSchema = addEconomicItemFieldsValidation

const addEconomicItem = memo(() =>{

    const currentYear = new Date().getFullYear()

    const [reqData, setReqData] = useState({})

    const {state} = useLocation()
    const navigate = useNavigate()

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
        return {...addEconomicItemFields, ...state }
    },[])

    const addEconomicItemFunc = useMutation({
        mutationFn: (fields) => {
            return addEconomicLine(fields)
        },
        onError: (error) => {
            // console.log(error)
            setTimeout(()=>{
            addEconomicItemFunc.reset()
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
        const newReqData = {...reqData, economic_code: `${reqData?.org_code}/${reqData?.economic_code}`}
        addEconomicItemFunc.mutate(newReqData)
    }

    useEffect(()=>{
        if(!state?.org_code){
            navigate(RouteLinks.homePage, {replace: true})
        }
    },[])
    return (
        <>
            <div className='w-full flex flex-col gap-8'>
                <BreadcrumbCom title='Add Economic Item' paths={['Dashboard', 'Add Economic Item']} />
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
                                                disabled={true}
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
                                            <SelectDropdown
                                                id='year' 
                                                name='year' 
                                                value={props.values.year}
                                                onChange={props.handleChange}
                                            >
                                                <option value=''>Select</option>
                                                <option value={currentYear}>{currentYear}</option>
                                            </SelectDropdown>
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
                                                MDA Name <span className='text-red-500 text-10'>{(props.errors.mda_name && props.touched.mda_name) ? props.errors.mda_name : ''}</span>
                                            </p>
                                            <TextareaCom 
                                                id='mda_name' 
                                                name='mda_name' 
                                                value={props.values.mda_name}
                                                handleChange={props.handleChange}
                                                disabled={true}
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
                                    
                                    <MainBtn 
                                        type='submit'
                                        // disabled={props.errors} 
                                        className={`bg-secondary px-2 py-1 mt-4 rounded-md text-white font-medium sm:self-end`}
                                        text='Add Economic Item'
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
                    text='Are you sure you want to add this Economic Item?' 
                    proceedFunc={proceedFunc} 
                    cLoseModal={()=>setVerifyModal(false)}
                />
            }
            { (addEconomicItemFunc?.isPending || addEconomicItemFunc?.isSuccess || addEconomicItemFunc?.isError) &&
                <StatusModal 
                    text= {addEconomicItemFunc?.isSuccess ? 'Economic Item added successfully' : addEconomicItemFunc?.error?.message}
                    isSuccess={addEconomicItemFunc?.isSuccess}
                    isPending={addEconomicItemFunc?.isPending}
                    cLoseModal={()=>{addEconomicItemFunc.reset()}}
                />
            }
        </>
    )
})

export default addEconomicItem