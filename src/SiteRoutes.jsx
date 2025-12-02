import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import RouteLinks from './RouteLinks'

import UserExist from './authorization/UserExist'
import PageLoader from './components/PageLoader'

import LoginPage from './pages/LoginPage' // LOGIN PAGE
import VerifyPage from './pages/VerifyPage' // USER VERIFY PAGE

import HomePage from './pages/HomePage' // Home PAGE
import PVsPage from './pages/PVsPage' // ALL PAYMENT VOUCHERS PAGE
import AddPVPage from './pages/AddPVPage' // ADD PAYMENT VOUCHERS PAGE
import MDAsPage from './pages/MDAsPage'
import ErrorPage from './pages/ErrorPage' // ERROR PAGE
import AddMDAPage from './pages/AddMDAPage' //ADD MDA PAGE
import UsersPage from './pages/UsersPage' //USERS LIST PAGE
import AddEconomicItemPage from './pages/AddEconomicItemPage' //ALL ECONOMIC ITEMS PAGE
import EconomicItemsPage from './pages/EconomicItemsPage' //ADD ECONOMIC ITEM PAGE
import ProfilePage from './pages/ProfilePage' // USER PROFILE PAGE
import WarrantsPage from './pages/WarrantsPage' // WARRANT PAGE
import WarrantDetailsPage from './pages/WarrantDetailsPage' // WARRANT DETAILS PAGE
import CreateCapWarrantPage from './pages/CreateCapWarrantPage' // CREATE CAPITAL WARRANT PAGE
import CreateRecurrentWarrantPage from './pages/CreateRecurrentWarrantPage' // CREATE RECURRENT WARRANT PAGE


// const Home = lazy(() => import('./pages/Home'));

export default function SiteRoutes() {
  return (
    <Routes>
      <Route path={RouteLinks.loginPage} element={<LoginPage />} /> {`*/LOGIN PAGE*/`}
      <Route path={RouteLinks.userVerifyPage} element={<VerifyPage />} /> {`*/USER VERIFY PAGE*/`}

      <Route element={<UserExist />}>
        <Route path={RouteLinks.homePage} element={<HomePage />} /> {`*/HOME PAGE*/`}
        <Route path={RouteLinks.paymentVouchers} element={<PVsPage />} /> {`*/ALL PVs PAGE*/`}
        <Route path={RouteLinks.addPV} element={<AddPVPage />} /> {`*/ADD PV PAGE*/`}
        <Route path={RouteLinks.mdaList} element={<MDAsPage />} /> {`*/MDA LIST PAGE*/`}
        <Route path={RouteLinks.addMDA} element={<AddMDAPage />} /> {`*/ADD MDA PAGE*/`}
        <Route path={RouteLinks.users} element={<UsersPage />} /> {`*/USERS LIST PAGE*/`}
        <Route path={RouteLinks.economicLines} element={<EconomicItemsPage />} /> {`*/ALL ECONOMIC ITEMS PAGE*/`}
        <Route path={RouteLinks.addEconomicLine} element={<AddEconomicItemPage />} /> {`*/ADD ECONOMIC ITEM PAGE*/`}
        <Route path={RouteLinks.profile} element={<ProfilePage />} /> {`*/USER PROFILE PAGE*/`}
        <Route path={RouteLinks.warrants} element={<WarrantsPage />} /> {`*/WARRANT PAGE*/`}
        <Route path={RouteLinks.warrantDetails} element={<WarrantDetailsPage />} /> {`*/WARRANT DETAILS PAGE*/`}
        <Route path={RouteLinks.createRecurrentWarrant} element={<CreateRecurrentWarrantPage />} /> {`*/ADD WARRANT PAGE*/`}
        <Route path={RouteLinks.createCapWarrant} element={<CreateCapWarrantPage />} /> {`*/CREATE CAPITAL WARRANT PAGE*/`}
      </Route>

      {/* ERROR PAGE */}
      <Route 
        path={RouteLinks.errorPage} // error page
        element={
          <Suspense fallback={<PageLoader />}>
            <ErrorPage />
          </Suspense>
        } 
      />
    </Routes>
  )
}
