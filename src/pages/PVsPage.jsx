import React, { useEffect } from 'react'
import PVsCom from '../components/paymentVouchers/PVsCom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import notAuthorizeUser from '../helpers/notAuthorizeUser'
import RouteLinks from '../RouteLinks'

export default function PVsPage() {

  const navigate = useNavigate()

  const {userDetails:{role}} = useSelector((state) => state.userDetails)

  useEffect(()=>{
    if(notAuthorizeUser(role, ['user']) != 1){
      navigate(RouteLinks.errorPage)
    }
  },[])


  return (
    <PVsCom />
  )
}
