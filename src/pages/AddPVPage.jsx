import { useNavigate } from 'react-router-dom'
import AddPVCom from '../components/paymentVouchers/AddPVCom'
import { useSelector } from 'react-redux'
import notAuthorizeUser from '../helpers/notAuthorizeUser'
import RouteLinks from '../RouteLinks'
import { useEffect } from 'react'

export default function AddPVPage() {

  const navigate = useNavigate()

  const {userDetails:{role}} = useSelector((state) => state.userDetails)

  useEffect(()=>{
    if(notAuthorizeUser(role, ['user']) != 1){
      navigate(RouteLinks.errorPage)
    }
  },[])


  return (
    <AddPVCom />
  )
}
