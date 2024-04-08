import { ReactNode } from 'react'

const TextIcon = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex flex-row items-center justify-between p-3 w-fit gap-3'>
        {children}
    </div>
  )
}

export default TextIcon