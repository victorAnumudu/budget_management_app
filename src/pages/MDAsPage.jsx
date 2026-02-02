
import { useNavigate } from 'react-router-dom'
import MDAListCom from '../components/mda/MDAListCom'
import { useSelector } from 'react-redux'
import notAuthorizeUser from '../helpers/notAuthorizeUser'
import RouteLinks from '../RouteLinks'
import { useEffect } from 'react'

export default function MDAsPage() {

  const navigate = useNavigate()

  const {userDetails:{role}} = useSelector((state) => state.userDetails)

  useEffect(()=>{
    if(notAuthorizeUser(role, ['user', 'tpo']) != 1){
      navigate(RouteLinks.errorPage)
    }
  },[])


  return (
    <MDAListCom />
  )
}
