import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import SiteRoutes from './SiteRoutes';
import LogoutModal from './components/layouts/LogoutModal';
import { generalLayoutContext } from './context/GeneralLayoutContext';

import './App.css';

function App() {

  const {pathname} = useLocation()

  const {logoutModal, setLogoutModal} = generalLayoutContext()

  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  return (
    <>
      <SiteRoutes />

      {/* LOGOUT MODAL */}
      {logoutModal && <LogoutModal close={()=>setLogoutModal(false)} />}
    </>
  );
}

export default App;
