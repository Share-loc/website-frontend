import React from 'react'
import AppBar from '../AppBar'
import Footer from '../Footer'

const AppBarLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <AppBar />
        {children}
        <Footer />
    </>
  )
}

export default AppBarLayout