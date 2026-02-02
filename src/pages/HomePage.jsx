import React, { useEffect } from 'react'
import HomeCom from '../components/home/HomeCom'
import { useSelector } from 'react-redux'
import notAuthorizeUser from '../helpers/notAuthorizeUser'
import { useNavigate } from 'react-router-dom'
import RouteLinks from '../RouteLinks'

export default function HomePage() {
  const navigate = useNavigate()

  const {userDetails:{role}} = useSelector((state) => state.userDetails)

  useEffect(()=>{
    if(notAuthorizeUser(role, []) != 1){
      navigate(RouteLinks.errorPage)
    }
  },[])
  
  return (
    <HomeCom />
  )
}
