import React, { useEffect } from 'react'
import AddCom from '../components/mda/AddCom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import notAuthorizeUser from '../helpers/notAuthorizeUser'
import RouteLinks from '../RouteLinks'

export default function AddMDAPage() {

  const navigate = useNavigate()

  const {userDetails:{role}} = useSelector((state) => state.userDetails)

  useEffect(()=>{
    if(notAuthorizeUser(role, ['user', 'tpo']) != 1){
      navigate(RouteLinks.errorPage)
    }
  },[])


  return (
    <AddCom />
  )
}
