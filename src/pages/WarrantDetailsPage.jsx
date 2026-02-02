import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import notAuthorizeUser from '../helpers/notAuthorizeUser'
import RouteLinks from '../RouteLinks'
import WarrantDetails from '../components/warrants/WarrantDetails'

export default function WarrantDetailsPage() {

  const navigate = useNavigate()

  const {userDetails:{role}} = useSelector((state) => state.userDetails)
  const {state} = useLocation()


  useEffect(()=>{
    if(notAuthorizeUser(role, ['user', 'tpo']) != 1 || !state){
      navigate(RouteLinks.errorPage)
    }
  },[])


  return (
    <WarrantDetails stateData={state} />
  )
}
