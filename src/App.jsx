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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: 300000 //5 mins
        // refetchOnMount: false,
        // staleTime: Infinity // can also be a number in millisecond
      },
    },
  })

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <SiteRoutes />

      {/* LOGOUT MODAL */}
      {logoutModal && <LogoutModal close={()=>setLogoutModal(false)} />}
    </QueryClientProvider>
    </>
  );
}

export default App;
