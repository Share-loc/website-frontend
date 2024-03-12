import { Routes, Route } from 'react-router-dom'
import AppBarLayout from './components/layouts/AppBarLayout'
import HomePage from './pages/HomePage'

function App() {
  return (
    <AppBarLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AppBarLayout>
  )
}

export default App
