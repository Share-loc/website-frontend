import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const ContentLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className='flex flex-col items-center w-full grow'>
      <main className={`w-full ${isHomePage ? '' : 'px-5 py-5 md:w-5/6 md:p-10'}`}>
        <Outlet />
      </main>
    </div>
  )
}

export default ContentLayout