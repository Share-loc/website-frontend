import { Outlet } from 'react-router-dom'

const ContentLayout = () => {
  return (
    <div className='flex flex-col items-center w-full grow'>
      <main className='w-full px-5 py-5 md:w-5/6 md:p-10'>
        <Outlet />
      </main>
    </div>
  )
}

export default ContentLayout