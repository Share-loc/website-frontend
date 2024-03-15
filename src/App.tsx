import { Routes, Route } from 'react-router-dom'
import AppBarLayout from './components/layouts/AppBarLayout'
import HomePage from './pages/HomePage'
import AdPage from './pages/AdPage'

function App() {
  return (
    <AppBarLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/adpage' element={<AdPage />} />
      </Routes>
    </AppBarLayout>
  )
}

export default App
