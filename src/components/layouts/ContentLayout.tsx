import { ReactNode } from 'react'

const ContentLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex flex-col w-full justify-start items-center'>
        <div className='flex flex-col w-full px-5 py-5 md:w-5/6 md:p-10'>
            {children}
        </div>
    </div>
  )
}

export default ContentLayout