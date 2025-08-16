import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import localImgLoader from '../../helpers/localImageLoader'

// import ErrorLogo from '/assets/404-error.png'

const ErrorCom = memo(() => {

  const navigate = useNavigate()
  
  return (
    <>
      <div className={`h-screen bg-sky-300 flex flex-col items-center justify-center bg-[url('/assets/login-bg.jpg')] bg-cover bg-center bg-no-repeat`}>
        <div className='p-4 sm:p-8 w-full max-w-7xl mx-auto grid gap-8 place-content-center'>
          <div className='w-4/5 md:w-[650px] h-full'>
                <div className='flex flex-col gap-8 w-full bg-white rounded-xl p-16 sm:px-20 sm:py-16 shadow'>
                    <div className='w-full flex flex-col gap-1 items-center'>
                        <h1 className='text-2xl md:text-3xl font-bold text-black-body'>Oops!</h1>
                        <p className='text-sm font-medium text-slate-500'>We can't find that page.</p>
                    </div>

                    {/* <div className='relative h-[1px] bg-slate-300/50'>
                        <p className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white p-4 text-12 text-slate-500'>Or with email</p>
                    </div> */}

                    <div className='flex flex-col items-center gap-6'>
                        <img src={localImgLoader('404-error.png')} className='w-4/5 md:w-80 h-auto' alt='error logo' />
                        <div className='h-10 mb-10 flex justify-center'>
                            <button onClick={()=>navigate('/', {replace:true})} className='px-2 h-full bg-primary dark:bg-primary-dark text-sm text-white font-medium rounded-md'>Return Home</button>
                        </div>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default ErrorCom