import { Outlet } from 'react-router-dom'

const ContentLayout = () => {
  return (
    <div className='flex flex-col w-full justify-start items-center'>
        <div className='flex flex-col w-full px-5 py-5 md:w-5/6 md:p-10'>
            <Outlet />
        </div>
    </div>
  )
}

export default ContentLayout