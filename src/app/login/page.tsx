import React from 'react'
import { Login, Navbar, LoginAndRegister } from '@/components'
import { Toaster } from 'react-hot-toast'

export default function page() {
  return (
    <div>
        <Toaster></Toaster>
        <Navbar>
          <LoginAndRegister/>
        </Navbar>

        <div className='w-4/12 mx-auto mt-14'>
          <Login/>
        </div>
    </div>
  )
}
