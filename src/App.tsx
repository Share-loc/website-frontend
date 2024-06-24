import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthContext from './components/context/AuthContext'
import AppBarLayout from './components/layouts/AppBarLayout'
import ContentLayout from './components/layouts/ContentLayout'
import HomePage from './pages/HomePage'
import AdPage from './pages/AdPage'
import ProductPage from './pages/ProductPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import AboutUsPage from './pages/AboutUsPage.tsx'
import CGUPage from './pages/CGUPage.tsx'
import CGVPage from './pages/CGVPage.tsx'
import GDPRPage from './pages/GDPRPage.tsx'
import HelpPage from './pages/HelpPage.tsx'
import StripePage from './pages/StripePage.tsx'
import SecurityPage from './pages/SecurityPage.tsx'
import ReservationPage from './pages/ReservationPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import axios from 'axios'
import { getToken, getUserid } from './const/func.ts'
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.tsx'
import AdminLayout from './components/layouts/AdminLayout.tsx'
import AdminUsersPape from './pages/Admin/AdminUsersPage.tsx'
import AdminItemsPage from './pages/Admin/AdminItemsPages.tsx'
import AdminCategoriesPage from './pages/Admin/AdminCategoriesPage.tsx'
import AdminReviewsPage from './pages/Admin/AdminReviewsPage.tsx'
import AdminReportsPage from './pages/Admin/AdminReportsPage.tsx'

function App() {

  // Check if we are in development mode
  const devMode = (import.meta.env.VITE_DEVELOPEMENT_MODE === "development");
  
  // Initialize user state
  const [userState, setUserState] = useState(() => {
    if (devMode) {
      return {
        isLogged: true,
        userid: "DEVMODE",
      }
    }
    const storedToken = getToken();
    const storedUserid = getUserid();
    if (storedToken && storedUserid) {
      return {
        isLogged: true,
        userid: storedUserid,
      }
    }
    return {
      isLogged: false,
      userid: null,
    }
  })

  // Check if token is valid
  useEffect(() => {
    const token = getToken();
    if (!token || devMode) {
      // set user state to logged out
      setUserState(
        {
          isLogged: false,
          userid: null
        }
      )
      return;
    }
    axios.get(`${import.meta.env.VITE_API_URL}/token/validate`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (response.status === 200) {
        // set user state to logged in
        const userid = response.data.user_id;
        setUserState(
          {
            isLogged: true,
            userid: userid
          }
        )
      }
    })
    .catch(error => {
      console.error(error);
      // set user state to logged out
      setUserState(
        {
          isLogged: false,
          userid: null
        }
      )
    })
  }, [])

  return (
    <AuthContext.Provider value={{ userState, setUserState }}>
      <Routes>
        <Route element={<AppBarLayout />}>
          <Route element={<ContentLayout />}>

            {/* Unprotected routes */}
            <Route path="/" element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/cgu' element={<CGUPage />} />
            <Route path='/cgv' element={<CGVPage />} />
            <Route path='/gdpr' element={<GDPRPage />} />
            <Route path='/help' element={<HelpPage />} />
            <Route path='/stripe' element={<StripePage />} />
            <Route path='/security' element={<SecurityPage />} />
            <Route path='/reservation' element={<ReservationPage />} />
            <Route path='/product/:id' element={<ProductPage />} />

            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />

            {/* Protected routes */}
            <Route path='/profile' element={
              userState.isLogged ? <ProfilePage /> : <LoginPage />
            } />
            <Route path='/adpage' element={
              userState.isLogged ? <AdPage /> : <LoginPage />
            } />
          </Route>
        </Route>

        <Route element={<AdminLayout />}>
            {/* ADMIN routes */}
            <Route path='/admin/dashboard' element={
                userState.isLogged ? <AdminDashboardPage /> : <LoginPage />
              } />
            <Route path='/admin/users' element={
                userState.isLogged ? <AdminUsersPape /> : <LoginPage />
              } />
            <Route path='/admin/items' element={
                userState.isLogged ? <AdminItemsPage /> : <LoginPage />
              } />
            <Route path='/admin/categories' element={
                userState.isLogged ? <AdminCategoriesPage /> : <LoginPage />
              } />
            <Route path='/admin/reviews' element={
                userState.isLogged ? <AdminReviewsPage /> : <LoginPage />
              } />
            <Route path='/admin/reports' element={
                userState.isLogged ? <AdminReportsPage /> : <LoginPage />
              } />
        </Route>

            {/* Login route */}


      </Routes>
    </AuthContext.Provider>
  )
}

export default App
