import { ReactNode } from 'react'

const SectionTitle = ({children}: {children: ReactNode}) => {
  return (
    <h2 className='mt-10 mb-3 text-3xl font-bold text-black'>
        {children}
    </h2>
  )
}

export default SectionTitle