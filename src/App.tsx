import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import AuthContext from './components/context/AuthContext'
import AppBarLayout from './components/layouts/AppBarLayout'
import ContentLayout from './components/layouts/ContentLayout'
import HomePage from './pages/HomePage'
import AdPage from './pages/AdPage'
import ProductPage from './pages/ProductPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

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
    const storedToken = localStorage.getItem('token');
    const storedUserid = localStorage.getItem('userid');
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

  return (
    <AuthContext.Provider value={{ userState, setUserState }}>
      <AppBarLayout>
        <ContentLayout>
          <Routes>
            {/* Unprotected routes */}
            <Route path="/" element={<HomePage />} />
            <Route path='/adpage' element={<AdPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={
              userState.isLogged ? <ProfilePage /> : <LoginPage />
            } />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </ContentLayout>
      </AppBarLayout>
    </AuthContext.Provider>
  )
}

export default App
