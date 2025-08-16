import React, { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {Formik, Form} from 'formik'
import * as Yup from "yup";

import InputText from '../inputs/InputText'
import { updateUserDetails } from "../../store/UserDetails";
import { loginUser } from '../../services/siteServices'

import RouteLinks from '../../RouteLinks'

import localImgLoader from '../../helpers/localImageLoader';
import MainBtn from '../btn/MainBtn'
import Logo from '../../assets/logos/Abia_logo.png'

const initialValues = {
  email: "",
  password: "",
};

// To get the validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required").min(4, 'must be upto 4 characters').max(12, 'must not exceed 12 characters'),
});

const LoginCom = memo(() => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const login = useMutation({
    mutationFn: (fields) => {
        if(!fields.email || !fields.password){
            throw new Error('Please provide all fields marked *')
        }
        return loginUser(fields)
    },
    onError: (error) => {
        // console.log(error)
    },
      onSuccess: (res) => {
        if(res?.data?.status != 1){
          throw new Error(res?.data?.message)
        }
        const {token, user} = res?.data?.data
        if(token){
            localStorage.setItem('token', token)
            // localStorage.setItem('room', room)
            const data = {token, ...user}
            dispatch(updateUserDetails({ ...data }));
          }
          navigate(RouteLinks.homePage, {state:{proceed:'true'}}) // later add redux to dispatch state
    }
  })

  //FUNCTION TO HANDLE LOGIN
  const handleSubmit = (values, helper) => {
    login.mutate(values)
  };


  return (
    <>
      <div className={`h-screen bg-sky-300 flex flex-col items-center justify-center bg-[url('./assets/auth_logo.jpeg')] bg-cover bg-center bg-no-repeat overflow-y-auto`}>
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
                      <img src={Logo} className='w-28' alt='logo'/>
                    </div>

                    <div className='w-full flex flex-col gap-1 items-center'>
                      <h1 className='text-2xl md:text-3xl font-bold text-black-body'>Sign In</h1>
                      <p className='text-sm font-medium text-slate-500'>Welcome back, please login to your account</p>
                    </div>

                    {/* social login */}
                    {/* <div className='grid grid-cols-2 gap-4 text-sm'>
                      <div className='px-4 py-2 flex gap-2 items-center justify-center text-black-body font-medium border border-slate-300/50 rounded-md hover:text-primary  hover:bg-sky-50 cursor-pointer'>
                        <Icons name='google' />
                        <span>Sign in with Google</span>
                      </div>
                      <div className='px-4 py-2 flex gap-2 items-center justify-center text-black-body font-medium border border-slate-300/50 rounded-md hover:text-primary  hover:bg-sky-50 cursor-pointer'>
                        <Icons name='apple' />
                        <span>Sign in with Apple</span>
                      </div>
                    </div> */}

                    <div className='relative h-[2px] bg-slate-300/50'>
                      <p className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white p-4 text-12 text-slate-500'>With Email</p>
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
                        {/* <p className='text-sm text-end font-medium text-primary '>Forget password ?</p> */}
                      </div>
                      <div className=''>
                        {/* <button 
                          type='submit' 
                          disabled={login.isPending} 
                          className={`${login.isPending && 'dots-loading'} w-full h-full bg-primary dark:bg-primary-dark text-white font-bold rounded-md`}
                        >
                          Login
                        </button> */}
                        <MainBtn 
                          type='submit' 
                          text='Login'
                          className='bg-primary dark:bg-primary-dark text-lg text-white font-bold'
                          loading={login.isPending}
                          disabled={login.isPending}
                          shrinkAside={false}
                        />
                      </div>
                  
                      <div className={`${login.error ? 'visible' : 'invisible'} h-5 w-full text-center`}>
                          <p className='text-red-500 text-sm'>{login?.error?.message}</p>
                      </div>
                    </div>

                    {/* <p className='text-sm text-center font-medium text-slate-500'>Not yet a member? <span className='text-primary '>Sign Up</span></p> */}

                    <div className='flex justify-end gap-4 text-[13px] font-medium'>
                      <Link className='text-primary' to=''>FAQs</Link>
                      <Link className='text-primary' to=''>Contact Us</Link>
                    </div>


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


export default LoginCom