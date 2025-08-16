import React, { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import InputText from '../inputs/InputText'
import { userVerify } from '../../services/siteServices'

import RouteLinks from '../../RouteLinks'

import localImgLoader from '../../helpers/localImageLoader';
import MainBtn from '../btn/MainBtn'
import AlertStatus from '../alert/AlertStatus'


const initialValues = {
    password: "",
    confirm_password: "",
    email: ''
};

// To get the validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string().required("password is required").min(4, 'must be upto 4 characters').max(12, 'must not exceed 12 characters'),
    confirm_password: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password')], 'Passwords must match'),
    email: Yup.string().required("email is required"),
});

const VerifyUser = memo(() => {

  const {token} = useParams()
  const navigate = useNavigate()

  const completeVerification = useMutation({
    mutationFn: (fields) => {
        if(!fields.password){
            throw new Error('Please provide all fields marked *')
        }
        return userVerify(fields)
    },
    onError: (error) => {
        // console.log(error)
    },
    onSuccess: (res) => {
        if(res?.data?.status != 1){
            throw new Error(res?.data?.message)
        }
        setTimeout(()=>{
            navigate(RouteLinks.loginPage) // navigate to login page
        }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
    },
  })

  //FUNCTION TO HANDLE LOGIN
  const handleSubmit = (values, helper) => {
    delete values.confirm_password
    completeVerification.mutate(values)
  };

  useEffect(()=>{ // go back to login page if there is no token
    if(!token){
        navigate(RouteLinks.loginPage)
    }
  },[])


  return (
    <>
      <div className={`h-screen bg-sky-300 flex flex-col items-center justify-center bg-[url('/assets/auth_logo.jpeg')] bg-cover bg-center bg-no-repeat overflow-y-auto`}>
        <div className='p-4 sm:p-8 w-full max-w-7xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-2'>
          <div className='col-span-1 md:col-span-2 lg:col-span-1 h-full'>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(props)=>(
                <Form>
                  <div className='flex flex-col gap-8 w-full bg-white rounded-xl p-8 xs:p-12 sm:px-20 sm:py-16 shadow'>
                    <div className='w-full flex justify-center items-center'>
                      <img src={localImgLoader('logos/Abia_logo.png')} className='w-28' alt='logo'/>
                    </div>

                    <div className='w-full flex flex-col gap-1 items-center'>
                      <h1 className='text-2xl md:text-3xl font-bold text-black-body'>Verify User</h1>
                      <p className='text-sm font-medium text-slate-500'>Please enter your desired password</p>
                    </div>
                    <div className='relative h-[2px] bg-slate-300/50'>
                      <p className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white p-4 text-12 text-slate-500'>User mail here: dummymail@dummy.com</p>
                    </div>

                    <div className='flex flex-col gap-8'>
                      <div className='relative text-input flex flex-col gap-2'>
                        <p className='absolute left-0 -top-4 text-10'>
                          Email <span className='text-red-500'>{(props.errors.email && props.touched.email) ? props.errors.email : ''}</span>
                        </p>
                        <InputText 
                          id='email' 
                          placeholder='Email' 
                          name='email' 
                          value={props.values.email}
                          handleChange={props.handleChange}
                        />
                      </div>
                      <div className='relative text-input flex flex-col gap-2'>
                        <p className='absolute left-0 -top-4 text-10'>
                          Password <span className='text-red-500'>{(props.errors.password && props.touched.password) ? props.errors.password : ''}</span>
                        </p>
                        <InputText 
                          id='password' 
                          placeholder='Password' 
                          name='password' 
                          type='password' 
                          value={props.values.password}
                          handleChange={props.handleChange}
                        />
                      </div>
                      <div className='relative text-input flex flex-col gap-2'>
                        <p className='absolute left-0 -top-4 text-10'>
                          Confirm Password <span className='text-red-500'>{(props.errors.confirm_password && props.touched.confirm_password) ? props.errors.confirm_password : ''}</span>
                        </p>
                        <InputText 
                          id='confirm_password' 
                          placeholder='Confirm Password' 
                          name='confirm_password' 
                          type='password' 
                          value={props.values.confirm_password}
                          handleChange={props.handleChange}
                        />
                        {/* <p className='text-sm text-end font-medium text-primary '>Forget password ?</p> */}
                      </div>
                      <div className='flex flex-col gap-2'>
                        <MainBtn 
                          type='submit' 
                          text='Proceed'
                          className='bg-primary dark:bg-primary-dark text-lg text-white font-bold'
                          loading={completeVerification.isPending}
                          //   disabled={completeVerification.isPending}
                          shrinkAside={false}
                        />
                        {(completeVerification.isError || completeVerification.isSuccess) &&
                        <AlertStatus 
                            text={completeVerification.isSuccess ? 'User verified successfully, redirecting...' : completeVerification.error.message}
                            isSuccess={completeVerification.isSuccess}
                            cLoseAlert={()=>{completeVerification.reset()}}
                        />
                        }
                      </div>
                    </div>

                    <p className='text-sm text-center font-medium text-slate-500'>Back to <Link to={RouteLinks.loginPage} className='text-primary '>Login</Link></p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
})


export default VerifyUser