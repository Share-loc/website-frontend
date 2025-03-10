import { Routes, Route, Navigate } from 'react-router-dom'
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
import ItemsPage from './pages/ItemsPage.tsx'
import axios from 'axios'
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.tsx'
import AdminLayout from './components/layouts/AdminLayout.tsx'
import AdminUsersPape from './pages/Admin/AdminUsersPage.tsx'
import AdminItemsPage from './pages/Admin/AdminItemsPages.tsx'
import AdminCategoriesPage from './pages/Admin/AdminCategoriesPage.tsx'
import AdminReviewsPage from './pages/Admin/AdminReviewsPage.tsx'
import AdminReportsPage from './pages/Admin/AdminReportsPage.tsx'
import { getToken } from './const/func.ts'
import FavorisPage from './pages/FavorisPage.tsx'
import MessagePage from './pages/MessagePage.tsx'
import { WebSocketProvider } from './components/context/WebSocketContext.tsx'
import UserPublicProfile from './pages/UserPublicProfile.tsx'
import { Toaster } from '@/components/ui/toaster';

function App() {

  // Check if we are in development mode
  const devMode = (import.meta.env.VITE_DEVELOPEMENT_MODE === "development");
  
  // Initialize user state
  const [userState, setUserState] = useState(() => {
    if (devMode) {
      return {
        isLogged: true,
      }
    }
    const storedToken = getToken();
    if (storedToken) {
      return {
        isLogged: true,
      }
    }
    return {
      isLogged: false,
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
        setUserState(
          {
            isLogged: true,
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
        }
      )
    })
  }, [])

  return (
    <AuthContext.Provider value={{ userState, setUserState }}>
      <WebSocketProvider>
        <Toaster />
        <Routes>
          {/* Login route - outside of any layout */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route element={<AppBarLayout />}>
            <Route element={<ContentLayout />}>

              {/* Unprotected routes */}
              <Route path="/" element={<HomePage />} />
              <Route path='/about' element={<AboutUsPage />} />
              <Route path='/cgu' element={<CGUPage />} />
              <Route path='/cgv' element={<CGVPage />} />
              <Route path='/gdpr' element={<GDPRPage />} />
              <Route path='/help' element={<HelpPage />} />
              <Route path='/stripe' element={<StripePage />} />
              <Route path='/security' element={<SecurityPage />} />
              <Route path='/reservation' element={<ReservationPage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/annonces' element={<ItemsPage />} />

              {/* Protected routes */}
              <Route path='/profile' element={
                userState.isLogged ? <ProfilePage /> : <Navigate to="/login" />
              } />
              <Route path='/adpage' element={
                userState.isLogged ? <AdPage /> : <Navigate to="/login" />
              } />
              <Route path='/favoris' element={
                userState.isLogged ? <FavorisPage /> : <Navigate to="/login" />
              } />
              <Route path='/messages' element={
                userState.isLogged ? <MessagePage /> : <Navigate to="/login" />
              } />

              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />

              {/* Protected routes */}
              <Route path='/profile' element={
                userState.isLogged ? <ProfilePage /> : <LoginPage />
              } />
              <Route path='/adpage' element={
                userState.isLogged ? <AdPage /> : <LoginPage />
              } />
              <Route path="/userProfile/:userId" element={<UserPublicProfile />} />
            </Route>

          </Route>

          <Route element={<AdminLayout />}>
              {/* ADMIN routes */}
              <Route path='/admin' element={
                  userState.isLogged ? <AdminDashboardPage /> : <Navigate to="/login" />
                } />
              <Route path='/admin/users' element={
                  userState.isLogged ? <AdminUsersPape /> : <Navigate to="/login" />
                } />
              <Route path='/admin/items' element={
                  userState.isLogged ? <AdminItemsPage /> : <Navigate to="/login" />
                } />
              <Route path='/admin/categories' element={
                  userState.isLogged ? <AdminCategoriesPage /> : <Navigate to="/login" />
                } />
              <Route path='/admin/reviews' element={
                  userState.isLogged ? <AdminReviewsPage /> : <Navigate to="/login" />
                } />
              <Route path='/admin/reports' element={
                  userState.isLogged ? <AdminReportsPage /> : <Navigate to="/login" />
                } />
          </Route>

        </Routes>
      </WebSocketProvider>
    </AuthContext.Provider>
  )
}

export default App
