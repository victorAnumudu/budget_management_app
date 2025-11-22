import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import notAuthorizeUser from '../helpers/notAuthorizeUser'
import RouteLinks from '../RouteLinks'
import WarrantsCom from '../components/warrants/WarrantsCom'

export default function WarrantsPage() {

  const navigate = useNavigate()

  const {userDetails:{role}} = useSelector((state) => state.userDetails)

  useEffect(()=>{
    if(notAuthorizeUser(role, ['user', 'tpo']) != 1){
      navigate(RouteLinks.errorPage)
    }
  },[])


  return (
    <WarrantsCom />
  )
}
