import React from 'react'
import AppBar from '../AppBar'

const AppBarLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <AppBar />
        {children}
    </>
  )
}

export default AppBarLayout