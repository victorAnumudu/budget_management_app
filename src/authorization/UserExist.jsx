import { useEffect, useState, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import DashboardLayout from "../components/layouts/DashboardLayout"
import PageLoader from "../components/PageLoader"
import { updateUserDetails } from "../store/UserDetails"
import RouteLinks from "../RouteLinks"
import { userProfile } from '../services/siteServices'
import debounceFunction from '../helpers/debounceFunction'


const UserExist = memo(() => {
      const dispatch = useDispatch()
      const navigate = useNavigate()
  
      const [lastActivityTime, setLastActivityTime] = useState(Date.now()); // HOLDS THE INITIAL TIME USER LOGS IN
  
      const [pageIsLoading, setPageIsLoading] = useState(true)
  
      const {userDetails:{lastname, token}} = useSelector((state) => state.userDetails)
  
      const isLoggedIn = (lastname && token) ? true : false
  
  
      // Function to log the user out
      const logoutUser = () => {
        localStorage.clear()
        navigate(RouteLinks.login, {replace:true})
        window.location.reload()
      };
    
      // Function to reset the activity time
      const resetTimer = () => {
        debounceFunction(setLastActivityTime(Date.now()), 1000)
      };
  
      useEffect(()=>{
        const timer = setTimeout(()=>{
          if(Date.now() - Number(lastActivityTime) >= Number(import.meta.env.VITE_APP_TIMEOUT)){
            logoutUser()
          }
        }, Number(import.meta.env.VITE_APP_TIMEOUT))
  
        // Listen for activity events
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
  
        // Adding event listeners
        events.forEach(event => {
          window.addEventListener(event, resetTimer);
        });
        
        return () => {
          clearTimeout(timer)
          events.forEach(event => {
            window.removeEventListener(event, resetTimer);
          })
        }
      },[lastActivityTime])
  
  
      useEffect(()=>{
          const getUserProfile = async () =>{ // GET USER PROFILE, IF USER IS LOGGED IN WITH A VALID TOKEN
            try {
              const userInfo = await userProfile()
              const userData = userInfo?.data?.user
              dispatch(updateUserDetails({...userData}))
              setPageIsLoading(false)
            } catch (error) {
              navigate(RouteLinks.login, {replace:true}) 
            }
          }
          if(isLoggedIn){
              setPageIsLoading(false)
          }else if(!isLoggedIn && localStorage.getItem('token')){
              getUserProfile(localStorage.getItem('token'))
          }else{
              navigate(RouteLinks.loginPage, {replace:true})
          }
      },[])
  
    return (
      <>
      {pageIsLoading ?
      <PageLoader />
      :
      <DashboardLayout></DashboardLayout>
      }
      </>
    )
  }
)


export default UserExist