import { ReactNode } from 'react'

const ContentLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex flex-col w-full justify-start items-center'>
        <div className='flex flex-col w-5/6 p-10'>
            {children}
        </div>
    </div>
  )
}

export default ContentLayout