import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className='font-normal'>
      <Navbar />
      <div>
        {children}
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout