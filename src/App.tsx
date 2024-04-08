import { Routes, Route } from 'react-router-dom'
import AppBarLayout from './components/layouts/AppBarLayout'
import ContentLayout from './components/layouts/ContentLayout'
import HomePage from './pages/HomePage'
import AdPage from './pages/AdPage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <AppBarLayout>
      <ContentLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/adpage' element={<AdPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
      </ContentLayout>
    </AppBarLayout>
  )
}

export default App
