import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const RootLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className='font-normal'>
      <Navbar />
      <div>
        {children}
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout