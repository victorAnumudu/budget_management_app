import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AOS from 'aos';

import SiteRoutes from './SiteRoutes';
import LogoutModal from './components/layouts/LogoutModal';
import { generalLayoutContext } from './context/GeneralLayoutContext';

import './App.css';
import 'aos/dist/aos.css'; // Import the AOS styles

function App() {

  const {pathname} = useLocation()

  const {logoutModal, setLogoutModal} = generalLayoutContext()

  useEffect(()=>{
    window.scrollTo(0,0)
    AOS.init({
      offset: 200,
      duration: 500,
      easing: 'ease-in-sine',
      // delay: 100,
    });
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
