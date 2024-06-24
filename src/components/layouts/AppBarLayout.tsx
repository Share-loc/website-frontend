import AppBar from '../AppBar'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

const AppBarLayout = () => {
  return (
    <>
        <AppBar />
        <Outlet />
        <Footer />
    </>
  );
}

export default AppBarLayout