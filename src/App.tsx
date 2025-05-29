import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import AppBarLayout from './components/layouts/AppBarLayout'
import ContentLayout from './components/layouts/ContentLayout'
import HomePage from './pages/HomePage'
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
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.tsx'
import AdminLayout from './components/layouts/AdminLayout.tsx'
import AdminUsersPape from './pages/Admin/AdminUsersPage.tsx'
import AdminItemsPage from './pages/Admin/AdminItemsPages.tsx'
import AdminCategoriesPage from './pages/Admin/AdminCategoriesPage.tsx'
import AdminReviewsPage from './pages/Admin/AdminReviewsPage.tsx'
import AdminReportsPage from './pages/Admin/AdminReportsPage.tsx'
import FavorisPage from './pages/FavorisPage.tsx'
import MessagePage from './pages/MessagePage.tsx'
import { WebSocketProvider } from './components/context/WebSocketContext.tsx'
import UserPublicProfile from './pages/UserPublicProfile.tsx'
import { Toaster } from '@/components/ui/toaster';
import ItemPage from './pages/ItemPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import ReservationsListPage from './pages/ReservationsListPage.tsx'
import EditProfilePage from './pages/EditProfilePage.tsx'
import ScrollToTop from "./components/ScrollToTop";
import ResetPasswordPage from './pages/ResetPasswordPage.tsx'
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx'

function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <Toaster />
        <ScrollToTop />
        <Routes>
          {/* Login route - outside of any layout */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/password/reset' element={<ResetPasswordPage /> } />

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
                <ProtectedRoute requiredRole='ROLE_USER'><ProfilePage /></ProtectedRoute>
              } />
              <Route path='/profile/edit' element={
                <ProtectedRoute requiredRole='ROLE_USER'><EditProfilePage /></ProtectedRoute>
              } />
              <Route path='/create-item' element={
                <ProtectedRoute requiredRole='ROLE_USER'><ItemPage /></ProtectedRoute>
              } />
              <Route path='/edit-item/:id' element={
                <ProtectedRoute requiredRole='ROLE_USER'><ItemPage /></ProtectedRoute>
              } />
              <Route path='/favoris' element={
                <ProtectedRoute requiredRole='ROLE_USER'><FavorisPage /></ProtectedRoute>
              } />
              <Route path='/messages' element={
                <ProtectedRoute requiredRole='ROLE_USER'><MessagePage /></ProtectedRoute>
              } />
              <Route path='/settings' element={
                <ProtectedRoute requiredRole='ROLE_USER'><SettingsPage /></ProtectedRoute>
              } />
              <Route path='/reservations' element={
                <ProtectedRoute requiredRole='ROLE_USER'><ReservationsListPage /></ProtectedRoute>
              } />

              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />

              <Route path="/userProfile/:userId" element={<UserPublicProfile />} />
            </Route>

          </Route>

          <Route element={<AdminLayout />}>
              {/* ADMIN routes */}
              <Route path='/admin' element={
                <ProtectedRoute requiredRole='ROLE_ADMIN'><AdminDashboardPage /></ProtectedRoute>
                } />
              <Route path='/admin/users' element={
                <ProtectedRoute requiredRole='ROLE_ADMIN'><AdminUsersPape /></ProtectedRoute>
                } />
              <Route path='/admin/items' element={
                <ProtectedRoute requiredRole='ROLE_ADMIN'><AdminItemsPage /></ProtectedRoute>
                } />
              <Route path='/admin/categories' element={
                <ProtectedRoute requiredRole='ROLE_ADMIN'><AdminCategoriesPage /></ProtectedRoute>
                } />
              <Route path='/admin/reviews' element={
                <ProtectedRoute requiredRole='ROLE_ADMIN'><AdminReviewsPage /></ProtectedRoute>
                } />
              <Route path='/admin/reports' element={
                <ProtectedRoute requiredRole='ROLE_ADMIN'><AdminReportsPage /></ProtectedRoute>
                } />
          </Route>

        </Routes>
      </WebSocketProvider>
    </AuthProvider>
  )
}

export default App
