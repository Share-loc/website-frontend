import { Routes, Route } from 'react-router-dom'
import AppBarLayout from './components/layouts/AppBarLayout'
import ContentLayout from './components/layouts/ContentLayout'
import HomePage from './pages/HomePage'
import AdPage from './pages/AdPage'
import ProductPage from './pages/ProductPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <AppBarLayout>
      <ContentLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/adpage' element={<AdPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
      </ContentLayout>
    </AppBarLayout>
  )
}

export default App
