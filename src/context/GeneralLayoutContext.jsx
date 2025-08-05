import { createContext, useContext, useEffect, useState } from 'react'

const GeneralContextProvider = createContext({})

export default function GeneralLayoutContext({children}) {

    const [theme, setTheme] = useState(null)

    const [drawer, setDrawer] = useState('')

    const [booking, setBooking] = useState('')

    const [alertBox, setAlertBox] = useState({status:false, msg:''})  // USE TO SHOW SUcCESS OR FAILED ALERT MESSAGE

    const [logoutModal, setLogoutModal] = useState(false)  // USE TO SHOW LOGOUT MODAL BOX

    const [activeMenu, setActiveMenu] = useState('')

    const [shrinkAside, setShrinkAside] = useState(false)

    const [showAsideDrawer, setShowAsideDrawer] = useState('')

    const handleActiveMenu = (name) => {
        if(activeMenu == name){
            setActiveMenu('')
        }else{
            setActiveMenu(name)
        }
    }

    const handleDrawer = (drawerToOpen) => {  // FUNCTION TO DETERMINE WHICH ASIDE DRAWER TO SHOW
      setDrawer((prev)=>{
        if(!prev){
          return drawerToOpen
        }else if(drawerToOpen == prev){
          return ''
        }else{
          return drawerToOpen
        }
      })
    }

    const handleBooking = (bookingToOpen) => {  // FUNCTION TO DETERMINE WHICH ASIDE DRAWER TO SHOW
      setBooking((prev)=>{
        if(!prev){
          return bookingToOpen
        }else if(bookingToOpen == prev){
          return ''
        }else{
          return bookingToOpen
        }
      })
    }

    const handleAlertBox = (valObj) => {
      setAlertBox(valObj)
    }

    const handleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
  }

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }, []);
    
      useEffect(() => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [theme]);

    useEffect(()=>{
      window.addEventListener('resize', ()=>{
          setShrinkAside(false)
          setShowAsideDrawer('')
          setActiveMenu('')
      })
      return () => window.removeEventListener('resize', window.addEventListener('resize', ()=>{
          setShrinkAside(false)
          setShowAsideDrawer('')
          setActiveMenu('')
      }))
  },[])

    let value = {
        theme, handleTheme, 
        activeMenu, handleActiveMenu, 
        drawer, handleDrawer, 
        booking, handleBooking, 
        alertBox, handleAlertBox, 
        logoutModal, setLogoutModal,
        shrinkAside, setShrinkAside,
        showAsideDrawer, setShowAsideDrawer
      }
    
  return (
    <GeneralContextProvider.Provider value={value}>
        {children}
    </GeneralContextProvider.Provider>
  )
}


export const generalLayoutContext = () => {
  return useContext(GeneralContextProvider)
}
