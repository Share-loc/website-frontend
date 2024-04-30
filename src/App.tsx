import { Routes, Route } from 'react-router-dom'
import AppBarLayout from './components/layouts/AppBarLayout'
import ContentLayout from './components/layouts/ContentLayout'
import HomePage from './pages/HomePage'
import AdPage from './pages/AdPage'
import ProductPage from './pages/ProductPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <AppBarLayout>
      <ContentLayout>
        <Routes>
          {/* Unprotected routes */}
          <Route path="/" element={<HomePage />} />
          <Route path='/adpage' element={<AdPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          {/* Protected routes */}
        </Routes>
      </ContentLayout>
    </AppBarLayout>
  )
}

export default App
