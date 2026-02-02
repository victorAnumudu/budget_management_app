import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import notAuthorizeUser from '../helpers/notAuthorizeUser'
import RouteLinks from '../RouteLinks'
import CreateWarrant from '../components/warrants/CreateWarrant'

export default function CreateRecurrentWarrantPage() {

  const navigate = useNavigate()

  const {userDetails:{role}} = useSelector((state) => state.userDetails)

  useEffect(()=>{
    if(notAuthorizeUser(role, ['user', 'tpo']) != 1){
      navigate(RouteLinks.errorPage)
    }
  },[])


  return (
    <CreateWarrant budget_type={'recurrent'} />
  )
}
