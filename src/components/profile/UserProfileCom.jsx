import React, { memo, useState } from 'react'
import LazyImageLoader from '../lazyImageLoader/LazyImageLoader'
import MainBtn from '../btn/MainBtn'
import InputText from '../inputs/InputText'
import ProfileBG from '/assets/profile/profilebg.jpg'
import BreadcrumbCom from '../breadcrumb/BreadcrumbCom'
import Icons from '../Icons'
import localImgLoader from '../../helpers/localImageLoader'


const UserProfileCom = memo(() => {

  const [requestStatus, setRequestStatus] = useState({loading:false, status:false, msg:'', name:''}) // STATE TO HOLD REQUEST VALUES

//   const [image, setImage] = useState(UserAvatar) // IMAGE PROFILE iMAGE

  const [uploadBtn, setUploadBtn] = useState(false) // DETERMINES WHEN TO SHOW UPLOAD BUTTON

  const handleImageChange = ({target:{files}}) => {
      setImage(URL.createObjectURL(files[0]))
      setUploadBtn(true)
  }

  const [values, setValues] = useState({
    firstname:'',
    lastname: '',
    state: ''
  })

  const handleChange = ({target:{name, value}}) => {
    setValues((prev) => ({...prev, [name]:value}))
  }

  const handleUploadImg = () => {
    setRequestStatus({loading:true, status:false, msg:'', name:'image'})
    setTimeout(()=>{
        setUploadBtn(false)
        setRequestStatus({loading:false, status:true, msg:'You Have Successfully secured a reservation for Seat Number 18', name:''})
    },2000)
  }

  const handleUpdate = () => {
    setRequestStatus({loading:true, status:false, msg:'', name:'profile'})
    setTimeout(()=>{
        setUploadBtn(false)
        setRequestStatus({loading:false, status:true, msg:'You Have Successfully secured a reservation for Seat Number 18', name:''})
    },2000)
  }

  return (
    <div className="w-full">
      <BreadcrumbCom title='Profile' paths={['Home', 'Profile']} />
      <div className="relative w-full h-48 md:h-96 overflow-hidden text-white border-gray-200 rounded-lg shadow">
        <LazyImageLoader src={'/assets/logos/ICC.webp'} alt='Background Image' />
      </div>
      <div className='flex gap-20'>
        <div className="relative left-10 -top-10 md:-bottom-16 w-20 h-20 md:w-32 md:h-32 flex justify-center items-center rounded-full bg-white-aside dark:bg-black-aside shadow-md">
            <img src={localImgLoader('user_avatar.jpg')} alt='user image' className='w-full h-full p-1 rounded-full' />
            <label htmlFor='profile-image' className='absolute top-1/2 -right-2 md:-right-5 w-6 h-6 md:w-10 md:h-10 rounded-full bg-white dark:bg-black-box shadow-md flex justify-center items-center cursor-pointer'>
              <Icons name='edit' className='dark:text-slate-high' />
            </label>
            <input onChange={handleImageChange} id='profile-image' type='file' className='hidden' />
        </div>
        <MainBtn 
          onClick={handleUploadImg} 
          text={(requestStatus.loading && requestStatus.name=='image') ? 'Uploading...':'Upload'} 
          className={`${uploadBtn ? 'flex' : 'hidden'} mt-2 md:mt-8 text-12 md:text-base bg-sky-600 text-white h-6 md:h-10 flex-col justify-center items-center`} 
          disabled={requestStatus.loading && requestStatus.name=='image'}
        />
      </div>

      <div className='w-full p-3 md:p-6 rounded-md shadow-md bg-white text-black dark:bg-black-box dark:text-white'>
        <div className='w-full flex flex-col gap-3 md:gap-6'>
          <div className='w-full'>
            <InputText
              name='firstname'
              value={values?.firstname}
              placeholder='Enter name'
              onChange={handleChange}
            />
          </div>
          <div className='w-full'>
            <InputText
              name='lastname'
              label='Lastname'
              value={values?.lastname}
              placeholder='Enter name'
              onChange={handleChange}
            />
          </div>
          {/* BUTTON */}
          <div className='w-full'>
            <MainBtn
              onClick={handleUpdate} 
              disabled={requestStatus.loading && requestStatus.name=='profile'}
              text={(requestStatus.loading && requestStatus.name=='profile') ? 'Update...':'Update'}
              className='w-full h-full bg-primary text-white dark:bg-primary/50 dark:text-white-light hover:opacity-70' 
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default UserProfileCom
